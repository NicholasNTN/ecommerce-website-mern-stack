import React from 'react'
import '../styles/messagebox.css'

const MessageBox = (props) => {
    return (
            <div className="message-container">
                <h2 className="message">{props.children}</h2>
            </div>
    )
}

export default MessageBox