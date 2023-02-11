import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../../Landing/pages/Home";
import Login from "../../Auth/pages/Login";
import Main from "../../Main/pages/Main";

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="home" element={<Main />} />
            </Routes>
        </Router>
    );
}

export default App;
