import React, { useState } from 'react'

export default function Login({ handleJoin, username, setUsername, room, setRoom }) {
    return (
        <div className='login-container'>
            <form className="screen-1" onSubmit={handleJoin}>
                <h2 style={{ textAlign: "center" }}>
                    Join Room
                </h2>
                <div className="email">
                    <label htmlFor="email">Nickname</label>
                    <div className="sec-2">
                        <input name='username' required placeholder="John, kittie" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
                <div className="password">
                    <label htmlFor="password">Room ?</label>
                    <div className="sec-2">
                        <input className="pas" name="room" required placeholder="room name/id" value={room} onChange={(e) => setRoom(e.target.value)} />
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <button className="login" type='submit'>Join</button>
                </div>
            </form>
        </div>
    )
}
