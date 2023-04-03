import React, { useState } from 'react'

export default function Chat({ sendMessage, allMessages, username }) {
    const [message, setMessage] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(message)
        setMessage('')
    }
    return (
        <div className="chat">
            <div className="contact bar">
                <div className="pic stark"></div>
                <div className="name">
                    Tony Stark
                </div>
                <div className="seen">
                    Today at 12:56
                </div>
            </div>
            <div className="messages" id="chat">
                {allMessages.map((item, index) => (
                    <div key={index} className={item.username == '' ? "time" : item.username == username ? "message parker" : "message stark"}>
                        {item.text}
                    </div>
                ))}
                <div className="message stark typing">
                    <div className="typing typing-1"></div>
                    <div className="typing typing-2"></div>
                    <div className="typing typing-3"></div>
                </div>
            </div>
            <form className="input" onSubmit={handleSubmit}>
                <textarea name="" id="" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here!" autoFocus></textarea>
                <button className="btn btn-inside" type='submit'>
                    <img src="send.svg" alt='send' />
                </button>

            </form>
        </div>
    )
}
