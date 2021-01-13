import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import './browse.css'
import StoryList from '../../Components/StoryList'
import Loading from '../../Components/Loading'
import Error from '../../Components/Error'

const Browse = ( props ) => {

    const [ stories, setStories ] = useState([])
    const [ error, setError ] = useState(null) 
    const [ loading, setLoading ] = useState(true)

    const fetchStories = async () => {
        await fetch('/api/story')
            .then(response => response.json())
            .then(data => {
                if (!data.result) setError("Error Fetching Stories")
                else {
                    setStories(data.result)
                    setLoading(false)
                }
            })
            .catch(err => {
                setLoading(false)
                setError("Unable to fetch stories")
            })
    }

    useEffect(() => {
        document.getElementById('root').classList.add('disable');
        fetchStories()
    }, [])


    return (
        <>            
            {loading && <Loading />}

            {!loading && !error &&
                <div className="container"> 
                    <h1>BROWSE</h1>
                    <StoryList stories={stories} />
                </div>
            }
            {error && <Error message={error} />}

        </>
    )
}

export default withRouter(Browse)