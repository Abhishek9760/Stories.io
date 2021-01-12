import React from 'react'
import './About.css'
import instaIcon from '../../assets/instagram.svg'
import mailIcon from '../../assets/gmail.svg'

function About() {
    return (
        <div className="container">
           <div className="contents">
                <div className="about-container">
                    <span className="name">Stories.io</span> 
                    made using the 
                    <span className="stack"> MERN </span> stack
                    <br/> with 
                    <span className="heart"> ❤ </span>
                    <ul className="links">
                        <li className="link">
                            <a 
                                href="https://www.instagram.com/ar_t__z_studios/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={instaIcon} alt="i"/>
                            </a>
                        </li>
                        <li className="link">
                            <a href="mailto:stories.io@yahoo.com">
                                <img src={mailIcon} alt="m"/>  
                            </a>
                        </li>
                    </ul>
                </div>
                <a className="btn-bug" href="mailto:stories.io@yahoo.com">
                    Found bug ?
                </a>
            </div> 
        </div>
    )
}

export default About
