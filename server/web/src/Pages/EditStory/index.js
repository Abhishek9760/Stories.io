import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import './EditStory.css'
import FlashMessage from '../../Components/FlashMessage'

function EditStory(props) {

    const [ story, setStory ] = useState({...props.location.story})
    const [ title, setTitle ] = useState(story.title)
    const [ content, setContent ] = useState(story.content)
    const [ isPosting, setIsPosting ] = useState(false)
    const [ error, setError ] = useState('') 

    function saveStory () {

        setIsPosting(true)

        setStory(prev => (
            {...prev, title: title, content: content}
        ))

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content,
            }),
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        }
        
        fetch(`http://localhost:4000/story/edit/${story._id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setIsPosting(false)
                    setError('Failed to save story')
                }
                if (data.updatedStory) {
                    props.history.push(`/story/${data.updatedStory.slug}`)
                }
            })
            .catch(err => {
                setIsPosting(false)
                setError('Internal Server Error')
            })
    }


    useEffect(() => {
        if(!story || !story.writtenBy) {
            props.history.push('/browse')
        }

        setTimeout(() => {
            setError('')    
        }, 3000);

    }, [props.history, story])

    return (
        <>  
            <div className='edit-page'>
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
                        value={content}
                        disabled={isPosting}
                        onChange={e => setContent(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className="actions">
                    <button 
                        disabled={isPosting} 
                        className="btn" onClick={props.history.goBack} > 
                        Cancel 
                    </button>

                    <button 
                        disabled={isPosting} 
                        className="btn" onClick={saveStory} > 
                        Update Story 
                    </button>
                </div>

            </div>

            {error && 
                <FlashMessage type='err' >
                    {error}
                </FlashMessage>
            }

        </>
    )
}

export default withRouter(EditStory)
