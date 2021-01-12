import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import FlashMessage from '../../Components/FlashMessage'
import Loading from '../../Components/Loading'

function SignUp (props) {

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ success, setSuccess ] = useState('');
    const [ error, setError ] = useState(''); 

    const isLoggedIn = localStorage.getItem('isLoggedIn')

    useEffect(() => {
        if (isLoggedIn)
            props.history.push('/')

        setTimeout(() => {
            setError('')
            setSuccess('')
        }, 3000)
    }, [error, isLoggedIn, success, props.history])

    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
            credentials: 'include'
        };

        fetch('http://localhost:4000/user/sign-in', requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setLoading(false)
                    return
                }
                if (data.success) {
                    setSuccess(data.success)
                    setLoading(false)
                }
            })
            .catch(err => {
                setLoading(false)
                setError('Internal server error')
            })
    }

    return (
        <>
            <div className="form">
                <h1 className="title">Sign Up</h1>
                <div className="form-item">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" id="username" placeholder="username" 
                        onChange={  e => {
                            setUsername(e.target.value)
                        }}
                        value={username}
                        required
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" id="email" placeholder="Email" 
                        onChange={  e => {
                            setEmail(e.target.value)
                        }}
                        value={email}
                        required
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
                        value={password}
                        required
                    />
                </div>
                <button onClick={e => {handleSubmit(e)}} >Sign up</button>
            </div>

            {loading && <div className="loading-bg"><Loading /></div>}

            {error && 
                <FlashMessage type="err" >
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

export default withRouter(SignUp)
