import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../../Landing/pages/Home";
import Login from "../../Auth/pages/Login";

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
