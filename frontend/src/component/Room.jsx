import axios from "axios";
import { useRef, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Canvas from './Canvas';
import { ACCESS_TOKEN } from "../constants";
import Chat from "./Chat";
import { Stomp } from "@stomp/stompjs";

function Room() {
    const [username, setUsername] = useState(null);
    const stompClientRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const getUsername = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsername(response.data.name);
                console.log(response.data.name);
            } catch (error) {
                console.error(error);
            }
        };

        getUsername();

        const socket = new SockJS('http://localhost:8080/ws');
        stompClientRef.current = Stomp.over(socket);
        stompClientRef.current.connect({}, () => {
            console.log('WebSocket connected');
        }, (error) => {
            console.error('WebSocket connection error:', error);
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div>
            {/*<Canvas*/}
            {/*    socket={socket.current}*/}
            {/*    username={username}*/}
            {/*/>*/}
            {username && (
                <Chat
                    username={username}
                    stompClient={stompClientRef.current}
                />
            )}
        </div>
    );
}

export default Room;