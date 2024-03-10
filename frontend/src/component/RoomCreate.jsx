import React, { useState } from 'react';
import { createRoom } from "../util/APIUtils";

function RoomCreate() {
    const [title, setTitle] = useState('');



    return (
        <div>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={createRoom}>방 만들기</button>
        </div>
    );
}

export default RoomCreate;
