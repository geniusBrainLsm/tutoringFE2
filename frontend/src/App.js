import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./component/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInModal from "./component/SignInModal";
import SignUpModal from "./component/SignUpModal";
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';
import { ACCESS_TOKEN } from './constants/index';
import {getCurrentUser} from "./util/APIUtils";
import RoomList from './component/RoomList';
import Room from './component/Room';
import RoomCreate from './component/RoomCreate';
function App() {

    const [authenticated, setAuthenticated] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);

    useEffect(() => {
        loadCurrentlyLoggedInUser();
    }, []);

    function loadCurrentlyLoggedInUser() {
        // 로그인 유저 정보 가져오기
        getCurrentUser()
            .then(user => {
                setCurrentUser(user);
                setAuthenticated(true);
            })
            .catch(err => {
                // Error Handling
            });
    }

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        setAuthenticated(false);
        setCurrentUser(null);
    }

    return (
        <Router>
            <Header authenticated={authenticated} onLogout={handleLogout}/>
            <Routes>
                <Route path="/signIn" element={<SignInModal />} />
                <Route path="/signUp" element={<SignUpModal />} />
                <Route path="/" element={<RoomList />} />

                <Route path="/rooms/new" element={<RoomCreate />} />

                <Route path="/rooms/:id" element={<Room />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            </Routes>
        </Router>
    );
}

export default App;
