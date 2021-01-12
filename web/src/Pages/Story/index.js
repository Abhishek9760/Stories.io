import React, { useState, useEffect } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import './Story.css'
import { Link } from 'react-router-dom'
import Loading from '../../Components/Loading'
import Error from '../../Components/Error'
import CommentBox from '../../Components/CommentBox'
import ClapBtn from '../../Components/ClapBtn'
import DeleteDialog from '../../Components/DeleteDialog'

function Story ( props ) {

    const [ loading, setLoading ] = useState( true )
    const [ story, setStory ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ showDelete, setShowdelete ] = useState(false)
    const { slug } = useParams();

    const username = localStorage.getItem('isLoggedIn') 
        ? JSON.parse(localStorage.getItem('currentUser')).username
        : null

    useEffect(() => {
        
        document.querySelector('#root').classList.remove('disable')
        
        fetch(`http://localhost:4000/story/${slug}`)
            .then(res => res.json())
            .then(data => {
                if (!data.story) {
                    setLoading(false)
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
            
    }, [slug])

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
                        <ClapBtn clap={story.claps} username={username} id={story._id}/>
                            {username && story.writtenBy === username ? 
                                <>
                                    <Link
                                        className="btn edit"
                                        to={{
                                           pathname: `/story/edit/${story.slug}`,
                                           story: story
                                        }}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="delete"
                                        onClick={() => {
                                            setShowdelete(true)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </> :
                                ''
                            }
                        </div>
                    </div>
                    <CommentBox story={story} currentUser={username} />
                </>
            }
            {showDelete && 
                <DeleteDialog 
                    id={story._id}
                    storyName={story.title}
                    setshowDelete={setShowdelete} 
                    setError={setError}
                />
            }
            {error && <Error message={error} />}
        </>
    )
}

export default withRouter(Story)
