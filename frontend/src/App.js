import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./component/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path="/SignIn" element={<SignIn />} />

            </Routes>
        </Router>
    );
}

export default App;
