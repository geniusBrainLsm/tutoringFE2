import React from 'react';
import Modal from 'react-bootstrap/Modal';
import '../css/SignIn.css';
import googleBtn from '../img/web_neutral_sq_na@1x.png';
import kakaoBtn from '../img/kakaotalk_sharing_btn_small.png'
import naverBtn from '../img/btnG_icon_square.png'
import testLogo from '../img/size_s_icon_137187.png'
function SignInModal(props) {

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className={"form-background"}>
                    <img className={"form-logo"} src={testLogo} alt='로고'/>
                    <div>
                        <input
                            className={"form-input"}
                            // value={}
                            // onChange={}
                            type={"text"}
                            placeholder={"이메일"}
                        />
                    </div>
                    <div>
                        <input
                            className={"form-input"}
                            // value={}
                            // onChange={}
                            type={"text"}
                            placeholder={"비밀번호"}
                        />
                    </div>
                    <div>
                        <button type={"submit"} className={"form-button"}>
                            로그인
                        </button>
                    </div>
                    <div className={"form-find-div"}>
                        <a href="#" className={"form-find"}>아이디 찾기</a>
                        <a href="#1" className={"form-find"}>비밀번호 찾기</a>
                        <a href="/frontend/src/component/SignUpModal" className={"form-find"}>회원가입</a>
                    </div>
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
