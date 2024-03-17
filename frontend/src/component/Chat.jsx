import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import '../css/chat.css'; // 적절한 CSS 스타일링 경로로 바꾸세요

const colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function Chat({username}) {

    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const stompClient = useRef(null);

    useEffect(() => {
        return () => {
            if (stompClient.current !== null) {
                //stompClient.current.disconnect();
            }
            const socket = new SockJS('http://localhost:8080/ws');
            stompClient.current = Stomp.over(socket);
            stompClient.current.connect({}, onConnected, onError)
        };
    }, []);

    const connect = (event) => {
        event.preventDefault();
        if (username.trim()) {
            const socket = new SockJS('http://localhost:8080/ws');
            stompClient.current = Stomp.over(socket);
            stompClient.current.connect({}, onConnected, onError);
        }
    };

    const onConnected = () => {
        setConnected(true);
        stompClient.current.subscribe('/topic/public', onMessageReceived);
        console.log("구독됌");
        stompClient.current.send("/app/chatAddUser",
            {},
            JSON.stringify({ type: 'JOIN' })
        );
    };

    const onError = (error) => {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!', error);
    };

    const sendMessage = (event) => {
        event.preventDefault();
        console.log("실행됐다.")
        if (message.trim() && stompClient.current) {
            const chatMessage = {
                sender: username,
                content: message,
                type: 'CHAT'
            };
            stompClient.current.send("/app/chatSendMessage", {}, JSON.stringify(chatMessage));
            setMessage('');
        }
    };

    const onMessageReceived = (payload) => {
        console.log("리시브");g
        const message = JSON.parse(payload.body);
        setMessages(messages => [...messages, message]);
    };

    const getAvatarColor = (messageSender) => {
        let hash = 0;
        for (let i = 0; i < messageSender.length; i++) {
            hash = 31 * hash + messageSender.charCodeAt(i);
        }
        return colors[Math.abs(hash % colors.length)];
    };

    return (
        <div>
            { (
                <div id="chat-page">
                    <div className="chat-container">
                        <div className="chat-header">
                            <h2>Spring WebSocket Chat Demo</h2>
                        </div>
                        <ul id="messageArea">
                            {messages.map((message, index) => (
                                <li key={index} className={message.type === 'JOIN' || message.type === 'LEAVE' ? 'event-message' : 'chat-message'}>
                                    {message.type !== 'JOIN' && message.type !== 'LEAVE' && (
                                        <i style={{ backgroundColor: getAvatarColor(message.sender) }}>{message.sender[0]}</i>
                                    )}
                                    <span>{message.sender}: </span>
                                    {message.content}
                                </li>
                            ))}
                        </ul>
                        <form id="messageForm" onSubmit={sendMessage}>
                            <div className="form-group">
                                <div className="input-group clearfix">
                                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." autoComplete="off" className="form-control" />
                                    <button type="submit" className="primary chat-submit">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
