import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';
import '../css/SignIn.css';
import googleBtn from '../img/web_neutral_sq_na@1x.png';
import kakaoBtn from '../img/kakaotalk_sharing_btn_small.png'
import naverBtn from '../img/btnG_icon_square.png'
import testLogo from '../img/size_s_icon_137187.png'
import { signUp } from '../util/APIUtils';
import { GOOGLE_AUTH_URL, NAVER_AUTH_URL, KAKAO_AUTH_URL } from '../constants/index';

function SignUpModal(props) {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     password: ''
    // });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // 각각의 입력 필드에 대해 상태 업데이트
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            email: email,
            password: password,
        };

        signUp(formData)
            .then(() => {
                navigate('/signin'); // 회원가입 성공 시 /signin url로 이동
                props.onHide();
            })
            .catch((error) => {
                alert('Signup Failed!');
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
                        <img className={"form-logo"} src={testLogo} alt="로고 이미지"/>
                        <div>
                            <input
                                className={"form-input"}
                                value={name}
                                onChange={handleInputChange}
                                type={"text"}
                                name={"name"}
                                placeholder={"이름"}
                            />
                        </div>
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
                        {/*<div>*/}
                        {/*    <input*/}
                        {/*        className={"form-input"}*/}
                        {/*        // value={}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        type={"text"}*/}
                        {/*        placeholder={"비밀번호 확인"}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div>
                            <button type={"submit"} className={"form-button"}>
                                가입하기
                            </button>
                        </div>
                        <div className={"form-find-div"}>
                            <a href="/" className={"form-find"}>아이디 찾기</a>
                            <a href="/" className={"form-find"}>비밀번호 찾기</a>
                            <a href="/SignInModal" className={"form-find"}>로그인</a>
                        </div>
                    </form>
                    <div className={"hr-sect"}>
                        간편 회원가입
                    </div>
                    <div>
                        <a href={NAVER_AUTH_URL}>
                            <img className={"from-signup-btn"} src={naverBtn} alt="네이버 로그인"/>
                        </a>
                        <a href={KAKAO_AUTH_URL}>
                            <img className={"from-signup-btn"} src={kakaoBtn} alt="카카오 로그인"/>
                        </a>
                        <a href={GOOGLE_AUTH_URL}>
                            <img className={"from-signup-btn"} src={googleBtn} alt="구글 로그인"/>
                        </a>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModal;
