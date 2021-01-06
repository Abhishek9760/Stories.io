import React, { useState, useEffect } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import './Story.css'
import Loading from '../../Components/Loading'
import Error from '../../Components/Error'
import clapIcon from '../../assets/Clap.svg'
import CommentBox from '../../Components/CommentBox'

function Story ( props ) {

    const [ loading, setLoading ] = useState( true )
    const [ story, setStory ] = useState(null)
    const [ error, setError ] = useState(null)
    const { slug } = useParams();

    const fetchStory = async () => {
        fetch(`http://localhost:4000/story/${slug}`)
            .then(res => res.json())
            .then(data => {
                if (!data.story) {
                    setError('Unable to find the story')
                }
                else {
                    setStory(data.story)
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                setError('Error fetching the story')
            })
    }

    useEffect(() => {
        
        document.querySelector('#root').classList.remove('disable')

        setTimeout(() => {
            fetchStory()
        }, 2000)
            
    }, [])

    return (

        <>
            {loading && 
                <Loading />
            }

            {!loading && !error && story &&
                <>
                    <div className="story-container">
                        <h1 className="title">{story.title}</h1>
                        <p className="date">{story.createdAt.toLocaleString()}</p>
                        <div 
                            dangerouslySetInnerHTML={{ __html: story.convertedHtml }} 
                            className="story" />
                        <div className="written-by">
                            <p>- {story.writtenBy}</p>
                        </div>
                        <div className="actions">
                            <button className="clap">
                                <img src={clapIcon} alt="Clap" />
                            </button>
                            {story.claps}
                        </div>
                    </div>
                    <CommentBox story={story} />
                </>
            }

            {error && <Error message={error} />}
        </>
    )
}

export default withRouter(Story)
