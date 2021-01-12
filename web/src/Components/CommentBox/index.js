import React, { useState, useEffect } from 'react'
import FlashMessage from '../FlashMessage'
import './CommentBox.css'

function CommentBox({ story, currentUser }) {

    const [ comments, setComments ] = useState([...story.comments].reverse())
    const [ text, setText ] = useState(''); 
    const [ error, setError ] = useState('');

    const pushComment = async () => {

        if (!currentUser) {
            setError('Login to comment..')
            return
        }

        if (text.length <= 0) return

        await fetch(
            `http://localhost:4000/story/comment/${story._id}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    currentUser: currentUser,
                    comment: text
                }),
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }).then(res => res.json())
            .then(data => {
                if(!data.story) {
                    return
                }
                setComments([...data.story.comments].reverse())
                setText("")
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setError('')
        }, 3000)
    }, [error])

    return (
        <>
            <div className="comment-container">
                <h3>Comments</h3>
                <div className="comment-input">
                    <input 
                        type="text"
                        placeholder="Write a Comment.."
                        onChange={e => setText(e.target.value)}
                        value={text}
                    />
                    <button 
                        className="button"
                        onClick={pushComment}
                    >comment</button>
                </div>
                <div className="comments">
                    {comments.map((comment, index) => (
                        <div className="comment" key={index}>
                            <div>{comment.comment}</div>
                            <span>-{comment.by}</span>
                        </div>
                    ))}
                </div>
            </div>
            {error && 
                <FlashMessage type='err' duration={3000}>
                    {error}
                </FlashMessage>
            }
        </>

    )
}

export default CommentBox
