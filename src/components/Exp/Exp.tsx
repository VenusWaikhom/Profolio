import React, { useEffect, useState } from "react";
import "./Exp.css";
import { ExpItems } from "./ExpItems";

function Exp() {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    const element = document.getElementById("Exps-Wrapper");
    if (element) {
      const elementTop = element.getBoundingClientRect().top + scrollPosition;
      if (scrollPosition + windowHeight >= elementTop) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="Exps-Wrapper"
      className="flex flex-wrap content-center justify-center Exps-Wrapper"
    >
      <div className="Exp-Header-Text z-1 flex flex-wrap content-center justify-center p-n">
        Professional Experiences
      </div>
      <div className="Exp-Cards">
        {ExpItems.map((item, index) => (
          <div
            className={`Exp-CardBackGround flex-wrap flex content-center justify-center z-1 ${
              visible ? "visible" : ""
            }`}
            key={index}
          >
            <div className="Exp-Card flex flex-wrap content-center justify-center p-d">
              <div className="Exp-Card-Header flex flex-wrap content-center justify-center">
                {item.name}
              </div>
              <div className="Exp-Card-Body">&nbsp;&nbsp;&nbsp;{item.text}</div>
              <a
                href={item.link}
                className="Project-GitHubLink flex flex-wrap content-center justify-center"
              >
                Git Link
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exp;
