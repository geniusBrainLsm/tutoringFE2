import { useRef, useEffect } from 'react';

function Canvas({ socket }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!socket) {
            return;
        }

        const ctx = canvasRef.current.getContext('2d');

        // 서버에서 온 draw 이벤트 처리
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data); // 메시지 데이터 파싱
            if (message.type === 'draw') { // 메시지 타입이 'draw'인 경우에만 처리
                const { x, y } = message;
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        };

        // 마우스 이벤트 핸들러
        function onMouseMove(e) {
            const message = JSON.stringify({ // 메시지 데이터를 문자열로 변환
                type: 'draw',
                x: e.offsetX,
                y: e.offsetY,
            });
            socket.send(message); // 서버로 메시지 전송
            console.log("sended coordinate")
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }

        canvasRef.current.addEventListener('mousemove', onMouseMove);

        return () => {
            canvasRef.current.removeEventListener('mousemove', onMouseMove);
        }

    }, [socket]);

    return <canvas ref={canvasRef} />;
}

export default Canvas;
