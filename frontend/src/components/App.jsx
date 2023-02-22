import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Home from "./Home";
import Footer from "./Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function revertIsLoggedIn(event) {
    setIsLoggedIn((prev) => {
      return !prev;
    });
  }

  return (
    <div>
      <Header />
      {isLoggedIn ? <Main /> : <Home revertIsLoggedIn={revertIsLoggedIn} />}
      {isLoggedIn ? null : <Footer />}
    </div>
  );
}

export default App;
