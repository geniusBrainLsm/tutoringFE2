// Room.js

import { useRef, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Canvas from './Canvas';
import {ACCESS_TOKEN} from "../constants";

function Room() {

    const socket = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        socket.current = new SockJS('http://localhost:8080/ws', null);

        return () => {
            socket.current.close();
        }
    }, []);



    return (
        <div>
            <Canvas
                socket={socket.current}
            />
        </div>
    )

}

export default Room;
