import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();    
    return(
        <div className="footer-container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <p>&copy; SSSIHL MDH {currentYear}</p>
                    </div>
                </div>
            </div>
        </div>                    
    );
}

export default Footer;