import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import FlashMessage from '../../Components/FlashMessage'

function SignUp (props) {

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    // eslint-disable-next-line
    const [ error, setError ] = useState(''); 

    useEffect(() => {

    })

    const handleSubmit = e => {
        e.preventDefault();
        console.log("pressed")
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
                <button onClick={(e) => {handleSubmit(e)}} >Sign up</button>
            </div>
            {error && 
                <FlashMessage type="error" duration={3000}>
                    {error}
                </FlashMessage>
            }
        </>
    )
}

export default withRouter(SignUp)
