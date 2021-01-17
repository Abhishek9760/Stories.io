import React from 'react'
import easterImg from '../../assets/easter.png'

function Easter() {

    const img = {
        maxWidth: '80%',
        maxHeight: '80%',
        margin: '0 auto'
    }

    const style = {
        width: '95vw',
        height: '100vh',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        placeContent: 'center',
        overflow: 'hidden'
    }

    return (
        <div style={style}>
            <img style={img} src={easterImg} alt="Easters.."></img>
        </div>
    )
}

export default Easter
