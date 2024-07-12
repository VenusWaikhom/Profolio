import React from "react";
import "./Introduction.css";
import { ReactTyped } from "react-typed";

const Introduction = () => {
  return (
    <div
      id="HomeWrapper"
      className="Headers flex content-center justify-center flex-wrap p-e"
    >
      <div className="TextWrapper flex content-center justify-center z-1 p-n">
        <h1 className="MainHeader flex content-start justify-center flex-col">
          <div>
            Hi, my name is&nbsp;
            <span style={{ color: "#429EA6", textTransform: "uppercase" }}>
              Venus Waikhom
            </span>
          </div>
          <span className="flex content-start justify-start">
            I <i id="i">&nbsp;am a&nbsp;</i>
            <ReactTyped
              backSpeed={50}
              typeSpeed={50}
              showCursor
              loop
              style={{ color: "#824C71", textDecoration: "underline" }}
              strings={[
                "MERN stack developer",
                "Front-End Developer",
                "Back-End Developer",
                "Full-Stack Developer",
                "JavaScript Developer",
              ]}
            />
          </span>
        </h1>
      </div>
      <div className=" flex content-center justify-center flex-wrap">
        <div className="ImageMainWrapper flex content-center justify-center flex-wrap p-n z-1">
          <img src="/Images/apo_white_2.png" alt="Profile Pic" />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
