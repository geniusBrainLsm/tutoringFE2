// Chat.js

import { useState } from 'react';

function Chat({ socket }) {
    const [texts, setTexts] = useState([]);
    const [input, setInput] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('chat', input);
    }

    socket.onmessage('chat', (text) => {
        setTexts(prev => [...prev, text]);
    });

    return (
        <div>
            <ul>{texts.map(t => <li>{t}</li>)}</ul>

            <form onSubmit={handleSubmit}>
                <input />
                <button>전송</button>
            </form>
        </div>
    );
}

export default Chat;
