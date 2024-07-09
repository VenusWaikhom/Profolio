/** @format */

import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div id="Contact-Wrapper">
      <div className="Contact-Text text-white">Contact me</div>
      <div className="Contact-Icons-Wrapper flex content-center justify-center flex-wrap">
        <a href="https://www.instagram.com/apocalpyse7/">
          <div className="Contact-Icon-Wrapper flex content-center justify-center flex-wrap">
            <img
              className="Contact-Icon"
              src="./Images/instagram.png"
              alt="Iglink"
            />
          </div>
        </a>

        <a href="https://in.linkedin.com/in/venus-waikhom-64b85721b">
          <div className="Contact-Icon-Wrapper flex content-center justify-center flex-wrap">
            <img
              className="Contact-Icon"
              src="./Images/linkedin.png"
              alt="LinkedIn"
            />
          </div>
        </a>
        <a href="https://github.com/VenusWaikhom">
          <div className="Contact-Icon-Wrapper flex content-center justify-center flex-wrap">
            <img
              className="Contact-Icon"
              src="./Images/github.png"
              alt="GitHub"
            />
          </div>
        </a>
        <a href="https://wa.me/(+91)9612095542">
          <div className="Contact-Icon-Wrapper flex content-center justify-center flex-wrap">
            <img
              className="Contact-Icon"
              src="https://img.icons8.com/?size=100&id=uZWiLUyryScN&format=png&color=000000"
              alt="WathsApp"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;
