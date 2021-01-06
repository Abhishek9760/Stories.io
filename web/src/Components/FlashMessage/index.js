
import React from 'react'
import './FlashMessage.css'
import { useRef, useEffect } from 'react';

export default function FlashMessage({ type, children, duration }) {
    
    const container = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            container.current.classList.add('dismiss')
        }, duration)
    }, [duration])

    const dismiss = () => {
        container.current.classList.add('dismiss')
    }

    return (
        <div className={`flash ${type}`} ref={container} >
            {children}
            <span onClick={() => {dismiss()}}>&times;</span>
        </div>
    )
}
