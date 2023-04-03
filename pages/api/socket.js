import { Server } from "socket.io";

export const config = {
    api: {
        bodyParser: false,
    },
};

function formateMessage(username, text) {
    return {
        username, text
    }
}

const users = [];

function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function userLeave(id) {
    let leavedUser;
    users.forEach(user => {
        if (user.id === id) {
            leavedUser = user;
        }
    })
    return leavedUser;
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room)
}

export default async (req, res) => {
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    let botName = ""
    io.on('connection', socket => {
        socket.on('join-room', ({ username, room }) => {
            const user = userJoin(socket.id, username, room);
            socket.join(user.room)

            console.log("user join orom=", user)
            // welcome current user 
            socket.emit('message', formateMessage(botName, 'welcome to chat room'));

            // broadcast when user joined 
            socket.broadcast.to(user.room).emit('message', formateMessage(botName, `${user.username} has joined the chat`));
            //send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        });

        // listen for chat message
        socket.on('chatMessage', (msg) => {
            const user = getCurrentUser(socket.id)
            console.log("user=", user)
            if (user) {
                io.to(user.room).emit('message', formateMessage(user.username, msg));
            } else {
                console.log("login again")
                return
            }
        });

        socket.on('disconnect', () => {
            const user = userLeave(socket.id)
            if (user) {
                io.to(user.room).emit('message', formateMessage(botName, `${user.username} has left the chat`));
                //send users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                })
            }
        });
    })

    console.log("Setting up socket");
    res.end();

};
