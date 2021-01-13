import React from 'react'
import './Error.css'
import errorIcon from '../../assets/Error.svg'

function Error({ message }) {

    const handleReload = () => {
        window.location.reload()
    }

    return (
        <div className="error">
            <img src={errorIcon} alt="&times;" />
            <div className="message">{message}</div>
            <button onClick={handleReload} >Reload ?</button>
        </div>
    )
}

export default Error
