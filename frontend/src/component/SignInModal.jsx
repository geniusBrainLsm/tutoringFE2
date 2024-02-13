import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import '../css/SignIn.css';
import googleBtn from '../img/web_neutral_sq_na@1x.png';
import kakaoBtn from '../img/kakaotalk_sharing_btn_small.png'
import naverBtn from '../img/btnG_icon_square.png'
import testLogo from '../img/size_s_icon_137187.png'
import {useNavigate} from "react-router-dom";
import { signIn } from "../util/APIUtils";
function SignInModal(props) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target; // e.target에서 name과 value 속성을 추출

        // 각각의 입력 필드에 대해 상태 업데이트
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email: email,
            password: password,
        };

        signIn(formData)
            .then(() => {
                navigate('/'); // 로그인 성공시 메인화면으로 이동
                props.onHide();
            })
            .catch((error) => {
                alert('SignIn Failed!');
            });
    };
        
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={"form-background"}>
                    <form onSubmit={handleSubmit}>
                        <img className={"form-logo"} src={testLogo} alt='로고'/>
                        <div>
                            <input
                                className={"form-input"}
                                value={email}
                                onChange={handleInputChange}
                                type={"text"}
                                name={"email"}
                                placeholder={"이메일"}
                            />
                        </div>
                        <div>
                            <input
                                className={"form-input"}
                                value={password}
                                onChange={handleInputChange}
                                type={"password"}
                                name={"password"}
                                placeholder={"비밀번호"}
                            />
                        </div>
                        <div>
                            <button type={"submit"} className={"form-button"}>
                                로그인
                            </button>
                        </div>
                        <div className={"form-find-div"}>
                            <a href="/" className={"form-find"}>아이디 찾기</a>
                            <a href="/" className={"form-find"}>비밀번호 찾기</a>
                            <a href="/frontend/src/component/SignUpModal" className={"form-find"}>회원가입</a>
                        </div>
                    </form>
                    <div className={"hr-sect"}>
                        간편로그인
                    </div>
                    <div>
                        <a href="#">
                            <img className={"from-signup-btn"} src={naverBtn}/>
                        </a>
                        <a href="#">
                            <img className={"from-signup-btn"} src={kakaoBtn}/>
                        </a>
                        <a href="#">
                            <img className={"from-signup-btn"} src={googleBtn}/>
                        </a>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default SignInModal;
