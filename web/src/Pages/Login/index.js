import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './Login.css'
import FlashMessage from '../../Components/FlashMessage'
import { loginUser, useAuthState, useAuthDispatch } from '../../Context' 

function Login ( props ) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } =useAuthState()

    useEffect(() => {
        //if user already logged in redirect to users page

    }, [props])

    async function handleSubmit (e) {
        e.preventDefault();
        let payload = { username, password }
        //8+ chars username and pass length
        // if (this.state.username.length < 8 || this.state.password.length < 8) return;

        try {
            let data = await loginUser(dispatch, payload)
            if(!data.user) return;
            else
                props.history.push('/')
        } catch (error) {
            console.log(error)
        }
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
                <hr style={{
                    width: "100%",
                    marginTop: '1em'
                }}/>


            </div>
            {errorMessage && 
                <FlashMessage type="error" duration={3000}>
                    {errorMessage}
                </FlashMessage>
            }
        </>
    )
}

export default withRouter(Login)