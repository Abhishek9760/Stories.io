import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import '../Browse/browse.css'
import StoryList from '../../Components/StoryList'
import Loading from '../../Components/Loading'
import Error from '../../Components/Error'

function YourStories(props) {

    const [ stories, setStories ] = useState([])
    const [ error, setError ] = useState(null) 
    const [ loading, setLoading ] = useState(true)
    const username = props.location.username

    useEffect(() => {
        if (!username) {
            props.history.push('/browse')
            return
        }
        document.getElementById('root').classList.add('disable');
        
        fetch(`/api/story?name=${username}`)
            .then(response => response.json())
            .then(data => {
                if (!data.result) setError("Error Fetching Stories")
                else {
                    setStories(data.result)
                    setLoading(false)
                }
            })
            .catch(_err => {
                setLoading(false)
                setError("Unable to fetch stories")
            })
    }, [props.history, username])

    return (
        <>            
            {loading && <Loading />}

            {!loading && !error &&
                <div className="container"> 
                    <h1>Your Stories</h1>
                    <StoryList stories={stories} />
                </div>
            }
            {error && <Error message={error} />}

        </>
    )
}

export default withRouter(YourStories)
