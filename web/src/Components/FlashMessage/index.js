
import React from 'react'
import './FlashMessage.css'
import { useRef } from 'react';

export default function FlashMessage({ type, children }) {
    
    const container = useRef(null);

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
