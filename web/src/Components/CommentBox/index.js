import React, { useState, useRef } from 'react'
import './CommentBox.css'

function CommentBox({ story }) {

    const [ comments, setComments ] = useState([...story.comments].reverse())
    const [ text, setText ] = useState(''); 
    const curentUser = 'WallFlower'

    const pushComment = async () => {

        if (text.length <= 0) return

        await fetch(
            `http://localhost:4000/story/comment/${story._id}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    currentUser: curentUser,
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

    return (
        
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
    )
}

export default CommentBox
