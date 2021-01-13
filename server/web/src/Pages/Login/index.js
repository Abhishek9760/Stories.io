import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './Login.css'
import FlashMessage from '../../Components/FlashMessage'
import Loading from '../../Components/Loading'

function Login ( props ) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [ notVerified, setNotVerified ] = useState(false);
    const [loading, setLoading] = useState(false);
    const ROOT_URL = '/api/user';
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const [ success, setSuccess ] = useState('');

    useEffect(() => {
        if (isLoggedIn)
            props.history.push('/')

        setTimeout(() => {
            setError('')
            setSuccess('')
        }, 3000)

    }, [error, isLoggedIn, props.history, success])

    async function handleResendMail () {
        const url = '/api/resend-token';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({username: username}),
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }})
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                if (data.success) {
                    setSuccess(data.success)                
                }
            })
        
    }

    async function handleSubmit (e) {

        setLoading(true)
        e.preventDefault();
        //8+ chars username and pass length
        // if (this.state.username.length < 8 || this.state.password.length < 8) return;
        
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            }),
            credentials: 'include'
        };

        fetch(`${ROOT_URL}/login`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.notVerified) {
                    setLoading(false)
                    setNotVerified(true)
                    setError(data.notVerified)
                }

                if(data.error) {
                    setLoading(false)
                    setError(data.error)
                }
                if(data.user) {
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    localStorage.setItem('isLoggedIn', true)
                    props.history.push('/')
                    window.location.reload()
                }
            })
            .catch(err => { 
                setError('Internal server error')
                setLoading(false)
            })
    }

    return (
        <>
            <div className="form">
                <h1 className="title">Login</h1>
                <div className="form-item">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" id="username" placeholder="username" 
                        onChange={  e => {
                            setUsername(e.target.value)
                        }}
                        value={username}
                        disabled={loading}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" id="password" placeholder="password"
                        onChange={  e => {
                            setPassword(e.target.value)
                        }}
                        disabled={loading}
                        value={password}
                    />
                </div>
                <button disabled={loading} onClick={(e) => {handleSubmit(e)}} >Login</button>
                {notVerified &&
                    <input 
                        className="resend-mail" 
                        type="button" 
                        value="Resend mail ?"
                        onClick={handleResendMail}
                        />
                }
            </div>

            {loading && <div className="loading-bg"><Loading /></div>}

            {error && 
                <FlashMessage type='err' >
                    {error}
                </FlashMessage>
            }
            {success && 
                <FlashMessage type="success" >
                    {success}
                </FlashMessage>
            }
        </>
    )
}

export default withRouter(Login)