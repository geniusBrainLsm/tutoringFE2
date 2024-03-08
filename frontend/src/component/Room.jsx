// Room.js

import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { useState, useEffect } from 'react';
import Canvas from './Canvas';
import Chat from './Chat';
function Room() {

    const [sock, setSock] = useState();

    useEffect(() => {
        const socket = new SockJS('/ws');
        socket.onopen = () => {
            console.log('connection opened');
        };

        setSock(socket);

        return () => {
            sock.close();
        }
    }, []);

    const handleDraw = (x, y) => {
        const msg = JSON.stringify({type:'draw', x, y});
        sock.send(msg);
    }

    return (
        <div>
            <Canvas onDraw={handleDraw} />
            <Chat sock={sock} />
        </div>
    )
}

export default Room;
