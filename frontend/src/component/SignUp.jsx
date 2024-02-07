import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Link, useNavigate} from 'react-router-dom';
import '../css/SignIn.css';
import googleBtn from '../img/web_neutral_sq_na@1x.png';
import kakaoBtn from '../img/kakaotalk_sharing_btn_small.png'
import naverBtn from '../img/btnG_icon_square.png'
import testLogo from '../img/size_s_icon_137187.png'
import { signup } from '../util/APIUtils';
import { GOOGLE_AUTH_URL, NAVER_AUTH_URL, KAKAO_AUTH_URL } from '../constants/index';

function SignUp(props) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        signup(formData)
            .then(() => {
                navigate('/login');     // 회원가입 성공 시 /loign url로 이동
                props.onHide();
            })
            .catch(error => {
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
                                value={formData.name}
                                onChange={handleInputChange}
                                type={"text"}
                                placeholder={"이름"}
                            />
                        </div>
                        <div>
                            <input
                                className={"form-input"}
                                value={formData.email}
                                onChange={handleInputChange}
                                type={"text"}
                                placeholder={"이메일"}
                            />
                        </div>
                        <div>
                            <input
                                className={"form-input"}
                                value={formData.password}
                                onChange={handleInputChange}
                                type={"text"}
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
                            <a href="#" className={"form-find"}>아이디 찾기</a>
                            <a href="#1" className={"form-find"}>비밀번호 찾기</a>
                            <a href="/signup" className={"form-find"}>로그인</a>
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

export default SignUp;
