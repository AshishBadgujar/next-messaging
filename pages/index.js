import Chat from "@/components/Chat";
import Contacts from "@/components/Contacts";
import Login from "@/components/Login";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Home = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([])

  useEffect(() => {
    socketInitializer();

    return () => {
      socket?.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on('message', msg => {
      setAllMessages(i => ([...i, msg]))
      // setAllMessages(temp)
      console.log("msg=", msg);
      // allMessages.push(msg)

      //scroll down
    })

    // get user and room 
    socket.on('roomUsers', ({ room, users }) => {
      setRoom(room);
      setRoomUsers(users);
      console.log("room & user=", room, users)
    });


  }

  function sendMessage(message) {
    console.log("emitted=", message);
    socket.emit('chatMessage', message);
  }

  const handleJoin = (e) => {
    e.preventDefault()
    setIsAuth(true)
    console.log(username, room)
    socket.emit('join-room', { username, room });

  }
  return (
    <div>
      {isAuth ?
        <div className="center">
          <Contacts room={room} />
          <Chat sendMessage={sendMessage} allMessages={allMessages} username={username} />
        </div>
        :
        <Login handleJoin={handleJoin} username={username} setUsername={setUsername} room={room} setRoom={setRoom} />
      }
    </div>
  );
};

export default Home;