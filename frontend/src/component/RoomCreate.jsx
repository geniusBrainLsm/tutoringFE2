import React, { useState } from 'react';

function RoomCreate() {
    const [title, setTitle] = useState('');

    const handleSubmit = () => {
        // 백엔드 방 생성 API 요청
        fetch('/api/rooms', {
            method: 'POST',
            body: JSON.stringify({ title })
        });
    }

    return (
        <div>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleSubmit}>방 만들기</button>
        </div>
    );
}

export default RoomCreate;
