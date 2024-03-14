import { useRef, useState, useEffect } from 'react';

function Canvas({ roomId }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setStartX] = useState(null);
    const [startY, setStartY] = useState(null);

    const baseURL = 'http://localhost:8080';

    useEffect(() => {
        // 현재 컨텍스트를 ctxRef로 직접 참조하도록 설정
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.style.width ='100%';
        canvas.style.height='100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // 이벤트 리스너에서 사용할 ctx는 이 함수 스코프 내에서 정의된 ctx를 사용
        const startDrawing = (e) => {
            setIsDrawing(true);
            const offsetX = e.offsetX * canvas.width / canvas.clientWidth;
            const offsetY = e.offsetY * canvas.height / canvas.clientHeight;
            setStartX(offsetX);
            setStartY(offsetY);
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
        };

        const draw = (e) => {
            if (!isDrawing) return;
            const offsetX = e.offsetX * canvas.width / canvas.clientWidth;
            const offsetY = e.offsetY * canvas.height / canvas.clientHeight;
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        };

        const endDrawing = (e) => {
            if (!isDrawing) return;
            const offsetX = e.offsetX * canvas.width / canvas.clientWidth;
            const offsetY = e.offsetY * canvas.height / canvas.clientHeight;
            ctx.closePath();
            saveDrawing([{ x0: startX, y0: startY, x1: offsetX, y1: offsetY }]);
            setIsDrawing(false);
        };

        // 이벤트 리스너 추가
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
        };
    }, [isDrawing, startX, startY]); // 의존성 배열에 isDrawing, startX, startY 추가

    useEffect(() => {
        const interval = setInterval(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            getDrawings().then(drawings => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                console.log(drawings);
                drawings.forEach(drawing => {
                    ctx.beginPath();
                    ctx.moveTo(drawing.x0, drawing.y0);
                    ctx.lineTo(drawing.x1, drawing.y1);
                    ctx.stroke();
                });
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);
//이거 url추출하는거 넣어야함
    async function getDrawings() {
        try {
            const response = await fetch(`${baseURL}/api/rooms/1/get-drawings`);
            const data = await response.json();
            // 서버에 요청한 URL 출력
            console.log("Requested URL:", response.url);

// 서버 응답 상태코드 출력
            console.log("Response Status:", response.status);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function saveDrawing(coordinates) {
        // 서버가 기대하는 객체 형식으로 변환
        const drawings = {
            id: null,
            room: null,
            coordinates: coordinates
        };

        try {
            const response = await fetch(`${baseURL}/api/rooms/1/save-drawings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(drawings),
            });
            console.log(drawings);

            // ..
        }  catch (error) {
            console.error("데이터 전송 중 오류 발생:", error);
        }
    }


    return <canvas ref={canvasRef} />;
}

export default Canvas;
