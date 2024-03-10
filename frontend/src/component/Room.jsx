// Room.js

import { useRef, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Canvas from './Canvas';
import {ACCESS_TOKEN} from "../constants";

function Room() {

    const socket = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        socket.current = new SockJS('http://localhost:8080/ws', null, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
        socket.current.onopen = () => {
            socket.current.send(JSON.stringify({
                type: 'auth',
                token
            }));
        };
        return () => {
            socket.current.close();
        }
    }, []);

    const handleDraw = (x, y) => {
        const msg = JSON.stringify({type:'draw', x, y});
        socket.current.send(msg);
    }

    return (
        <div>
            <Canvas
                socket={socket.current}
                onDraw={handleDraw}
            />
        </div>
    )

}

export default Room;
