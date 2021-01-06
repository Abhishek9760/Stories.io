import React from 'react'
import './StoryList.css'
import { Link } from 'react-router-dom'

const index = ({ stories }) => {

    const currentUser = 'WallFlower'

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
                                    story: story
                                }}
                            >
                                view
                            </Link>
                            {story.writtenBy === currentUser ? 
                                <>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </> :
                                ''
                            }
                        </div>
                        {/* edit and delete btn if user's story */}
                    </div>
                )
            )}
        </div>
    )
}

export default index
