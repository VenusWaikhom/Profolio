import React from "react";
import "./About.css";

function About() {
  return (
    <div
      id="AboutWrapper"
      className="flex content-center justify-center p-n z-1"
    >
      <div className="AboutMain z-1 flex content-center justify-start gap-6">
        <h1 className="AboutHeader z-1 flex content-center justify-center">
          About
        </h1>
        <div className="AboutTextWrapper z-1">
          Hello! I'm Venus Waikhom, a MERN Stack Developer with experience in
          developing full-stack projects, including an e-commerce website and a
          medical center website. I am passionate about Computer Science and
          eager to gain more experience and improve my social interactions. I
          enjoy painting, playing guitar, camping, listening to music, and
          gaming. I am skilled in HTML5, CSS, JavaScript, React, Node.js,
          Express, MongoDB, Python, and C/C++.
        </div>
      </div>
    </div>
  );
}

export default About;
