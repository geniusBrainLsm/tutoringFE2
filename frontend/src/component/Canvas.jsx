// Canvas.js

import { useRef, useEffect } from 'react';
let isDrawing = false;

function Canvas({ socket }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        // 마우스 이벤트 핸들러
        function onMouseMove(e) {
            if(!isDrawing) return;

            socket.emit('draw', {
                x: e.offsetX,
                y: e.offsetY
            });

            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }

        // 소켓 이벤트 핸들러
        socket.on('draw', ({x, y}) => {
            ctx.lineTo(x, y);
            ctx.stroke();
        });

    }, []);

    return <canvas ref={canvasRef} />;
}

export default Canvas;
