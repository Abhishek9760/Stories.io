
import React, { useEffect } from 'react'
import Page from '../../Components/Page'
import Blogpost from '../../assets/Blogpost.svg'
import Typing from '../../assets/Typing.svg'
import Markdown from '../../assets/Illustration.svg'
import { withRouter, Link } from 'react-router-dom'

function Home( props ) {

    useEffect(() => {
        document.getElementById('root').classList.remove('disable')        
    }, [])

    return (
        <>
            <Page leftContent={
                <div className="row">
                <h1> Learn.. Share </h1>
                <Link className="btn" to="/browse">Browse Stories</Link>
                </div>
            } 
            rightContent={
                <img className="responsive" src={Blogpost} alt="blog" 
                    title={"created by stories - www.freepik.com"} 
                />
            } />

            <Page leftContent={
                <img className="responsive" src={Typing} alt="typing" 
                title={"created by stories - www.freepiok.com"} 
                />
            }
                rightContent={
                <div className="row">
                    <h1>Write Stories</h1>
                    <h3>and Share around</h3>
                    <p>create a free account to start sharing</p>
                    <Link className="btn" to="/sign-up">Sign Up</Link>
                </div>
            } 
                inverse={true}/>

            <Page leftContent={
                <div className="row">
                <h1>Rich <br/> Markdown <br/> Support</h1>
                <a className="btn" target="_blank" rel="noreferrer" href="https://www.markdownguide.org/basic-syntax">
                    Check Syntax
                </a>
                </div>
            } 
                rightContent={
                <img className="normal" src={Markdown} alt="markdown" 
                    title="created by SeyTonic.."
                />
            }/>
        </>

    )
}

export default withRouter(Home)