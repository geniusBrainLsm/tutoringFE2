import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function RoomList() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // 백엔드의 방 리스트 API 요청
        fetch('/api/rooms')
            .then(res => res.json())
            .then(data => setRooms(data));
    }, []);

    return (
        <ul>
            {rooms.map(room => (
                <li key={room.id}>
                    <Link to={`/rooms/${room.id}`}>{room.title}</Link>
                </li>
            ))}
        </ul>
    );
}

export default RoomList;
