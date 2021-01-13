import React, { useState, useEffect, useRef } from 'react'
import './AddStory.css'
import crossImg from '../../assets/Error.svg'
import { useHistory } from 'react-router-dom'
import FlashMessage from '../../Components/FlashMessage'

function Add(props) {

    const [ title, setTitle ] = useState('')
    const [ story, setStory ] = useState('')
    const [ isPosting, setIsPosting ] =  useState(false)
    const [ isShowing, setIsShowing ] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory()

    const addPage = useRef(null)
    const addBtn = useRef(null)
    const addBtnImg = useRef(null)

    const url = '/api/story/new'

    function hide () {
        addPage.current.classList.add('disable')
        addBtn.current.classList.add('add')
        addBtnImg.current.classList.remove('cross')
    }

    function show () {
        addPage.current.classList.remove('disable')
        addBtn.current.classList.remove('add')
        addBtnImg.current.classList.add('cross')
    }

    function resetFields () {
        hide()
        setTitle('')
        setStory('')
        setIsPosting()
    }

    useEffect(() => {
        if (isShowing) show()
        else hide()
        
        setTimeout(() => {
            setError('')
        }, 3000)
        
    }, [isShowing, error])

    const postStory = () => {

        if (title.length <= 0 && story.length <= 0) return
        
        setIsPosting(true)

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: story,
                writtenBy: props.userName
            }),
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        }
        
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                if(data.error) {
                    setError('Unable to post Story')
                    setIsPosting(false)
                    return
                }       
                resetFields()                
                history.push(`/story/${data.story.slug}`)
            })
            .catch(err => {
                setError('Internal server error')
                setIsPosting(false)
            })

    }

    return (
        <>
            <div className='add-page disable' ref={addPage}>
                <div className="item">
                    <label htmlFor="title">Title</label>
                    <input
                        placeholder="Story's title..."
                        name="title"
                        value={title}
                        disabled={isPosting}
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="item">
                    <label htmlFor="content">Story</label>
                    <textarea name="content" 
                        id="content"
                        value={story}
                        disabled={isPosting}
                        onChange={e => setStory(e.target.value)}
                    >
                    </textarea>
                </div>

                <button disabled={isPosting} className="post-btn" onClick={postStory} > Post </button>

            </div>
            <div
                className="add-btn"
                onClick={() => setIsShowing(prev => !prev)}
                ref={addBtn}
            >
                <img className="add-btn-img" ref={addBtnImg} src={crossImg} alt="x"/>
            </div>
            {error && 
                <FlashMessage type='err'>
                    {error}
                </FlashMessage>
            }
        </>
    )
}

export default Add
