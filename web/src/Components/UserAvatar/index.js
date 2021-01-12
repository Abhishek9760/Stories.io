import React,{ useRef } from 'react'
import './UserAvatar.css'
import { Link, useHistory } from 'react-router-dom'

function UserAvatar({ user, setUser, setIsLoggedIn }) {

    const userOptions = useRef(null);
    const history = useHistory();

    const toggleUserOptions = () => {
        if (userOptions.current === null) return
        userOptions.current.classList.toggle('hide');
    }

    const hide = () => {
        if (userOptions.current === null) return
        userOptions.current.classList.add('hide');
    }
    
    function logOut () {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        setUser({username: ' '})
        setIsLoggedIn(false)
        hide()
        history.push('/')
        window.location.reload();
    }

    return (
        <div className="user-avatar">
            <div 
                className="avatar"
                onClick={toggleUserOptions}
            >
                <div>
                    {user && 
                        user.username[0].toUpperCase()
                    }
                </div>
            </div>
            <div className="user-options hide" ref={userOptions}>
                <div className="theme-selector">
                    <div className="theme-btn white active"></div>
                    <div className="theme-btn black"></div>
                </div>
                <div className="option" onClick={hide()}>
                    <Link 
                        to={{
                            pathname: '/your-stories',
                            username: user.username
                        }}
                    > 
                        Your Stories 
                    </Link>
                </div>
                <div className="option" onClick={logOut}>
                    Log out
                </div>
            </div>
        </div>
    )
}

export default UserAvatar
