import React, { useRef, useState } from 'react'
import './DeleteDialog.css'
import closeBtn from '../../assets/Error.svg'
import { useHistory } from 'react-router-dom'

function DeleteDialog({ storyName, id, setshowDelete, setError }) {

    const container = useRef(null)
    const [ isDeleting, setIsDeleting ] = useState(false)
    const history = useHistory()

    function handleOnCancel () {
        container.current.classList.add('disable')
        setIsDeleting(false)
        setshowDelete(false)
    }

    function handleOnDelete () {
        setIsDeleting(true)
        const url = `http://localhost:4000/story/delete/${id}?_method=DELETE`

        const requestOptions = {
            method: 'POST',
        }

        fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    handleOnCancel()
                    history.push('/browse')
                } else{
                    setError('Network error')
                    handleOnCancel()
                }
            })
            .catch(error => {
                setError('Internal server error')
            })
    }

    return (
        <div className="add-page more" ref={container} >
            <div className="delete-dialog">
                <div className="top">
                    <div>Delete ?</div>
                    <img src={closeBtn} onClick={handleOnCancel} alt="&times;"/>
                </div>
                <div className="mid">
                    <div>
                        <span> {storyName} </span> <br/>
                        will be deleted!!
                    </div>
                </div>
                <div className="actions">
                    <button onClick={handleOnCancel} disabled={isDeleting}>
                        Cancel
                    </button>
                    <button className="delete" onClick={handleOnDelete} disabled={isDeleting}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog
