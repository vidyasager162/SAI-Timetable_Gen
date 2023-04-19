import React, { useEffect, useState } from "react";
import Login from "./Login";

function Home(props) {
  const [quotation, setQuotation] = useState("");

  function generateQuote() {
    fetch("http://192.168.34.129:8000/gen-quote", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setQuotation(data.quote.quote);
          console.log(data);
        }
      });
  }

  useEffect(() => {
    generateQuote();
  }, [setQuotation]);
  return (
    <div className="container col-xxl-8 px-4 py-3">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5 hero-landing">
        <div className="col-10 col-sm-8 col-lg-6 text-center login-container">
          <Login handleLogin={props.handleLogin} />
        </div>
        <div className="col-lg-6">
          <div className="Hero-text container">
            <h1 className="display-1">SSSIHL</h1>
            <h1 className="display-1">MDH</h1>
            {/* <div className="d-grid gap-2 d-md-flex justify-content-md-start"> */}
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2 quote-container"
              onClick={generateQuote}
            >
              <p className="quote">{'"' + quotation + '"'}</p>
            </button>
          </div>
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}

export default Home;
