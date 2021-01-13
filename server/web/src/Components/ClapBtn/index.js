import React, { useState, useEffect } from 'react'
import clapIcon from '../../assets/Clap.svg'
import clappedIcon from '../../assets/Clapped.svg'

function ClapBtn({clap, username, id}) {
    
    const [ claps, setClaps ] = useState(clap.length)
    const [ hasClapped, setHasClapped ] = useState(clap.includes(username))

    function handleOnClick () {
        if(username === null) return

        const url = `/api/story/clap/${id}`
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                username: username
            }),
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.increment) {
                    setHasClapped(true)
                    setClaps(prev => prev+=1)
                } else {
                    setHasClapped(false)
                    setClaps(prev => prev-=1)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {

    }, [claps, hasClapped])

    return (
        <div className="clap">
            <img 
                className="clap-icon" 
                src={hasClapped ? clappedIcon: clapIcon} alt="Clap" 
                onClick={handleOnClick} 
            />

            <span className="clap-counts">
                {claps}
            </span>
        </div>
    )
}

export default ClapBtn
