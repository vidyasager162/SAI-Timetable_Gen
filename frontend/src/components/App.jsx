import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Home from "./Home";
import Footer from "./Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function invertIsLoggedIn(event) {
    setIsLoggedIn((prev) => {
      return !prev;
    });
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn ? <Main /> : <Home invertIsLoggedIn={invertIsLoggedIn} />}
      {isLoggedIn ? null : <Footer />}
    </div>
  );
}

export default App;
