// Room.js
import axios from "axios";
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import SockJS from 'sockjs-client';
import Canvas from './Canvas';
import {ACCESS_TOKEN} from "../constants";
import Chat from "./Chat";
import { Stomp } from "@stomp/stompjs";

function Room() {

    const socket = useRef(null);

    const [username, setUsername] = useState(null);


    useEffect(() => {


        const token = localStorage.getItem(ACCESS_TOKEN);
        const getUsername = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const username = response.data.name;
                console.log(username)
                // username 사용
            } catch (error) {
                console.error(error);
            }
        };

        getUsername();
        socket.current = new SockJS('http://localhost:8080/ws', null);

        return () => {
            socket.current.close();
        }
    }, []);



    return (
        <div>
            {/*<Canvas*/}
            {/*    socket={socket.current}*/}
            {/*    username={username}*/}
            {/*/>*/}
            <Chat
                socket={socket.current}
            />
        </div>
    )

}

export default Room;
