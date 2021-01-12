import React, { useState, useEffect } from 'react'
import './StoryList.css'
import { Link } from 'react-router-dom'
import DeleteDialog from '../DeleteDialog'
import FlashMessage from '../FlashMessage' 

const StoryList = ({ stories }) => {

    const username = localStorage.getItem('isLoggedIn') 
        ? JSON.parse(localStorage.getItem('currentUser')).username
        : null

    const [ showDelete, setShowdelete ] = useState(false)
    const [ selectedStory, setSelectedStory ] = useState(stories[0])
    const [ error, setError ] = useState('')

    useEffect(() => {

        setTimeout(() => {
            setError('')
        }, 3000)

    }, [error])

    return (
        <div className="story-list">
            {stories.map((story, index) => (
                    <div className="container" key={index} >
                        <div className="head">
                            <h2>{story.title}</h2>
                            <p>{story.createdAt}</p>
                        </div>
                        <p className="story">{story.content}</p>
                        <div className="actions">
                            <Link
                                className="btn"
                                to={{
                                    pathname: `/story/${story.slug}`,
                                }}
                            >
                                view
                            </Link>
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
                                            setSelectedStory(story)
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
                )
            )}
            {showDelete && 
                <DeleteDialog 
                    id={selectedStory._id}
                    storyName={selectedStory.title}
                    setshowDelete={setShowdelete} 
                    setError={setError}
                />
            }
            {error &&
                <FlashMessage type="err" duration={3000}>
                    {error}
                </FlashMessage>
            }
        </div>
    )
}

export default StoryList
