import React, { useEffect, useRef, useState } from "react";
import { useMedia } from "use-media";
import "./Top.css";

const Top: React.FC = () => {
  const isPhone = useMedia({ maxWidth: 480 });
  const isTablet = useMedia({ minWidth: 482, maxWidth: 766 });
  const [menuOpened, setMenuOpened] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Stop event propagation here
    setMenuOpened(!menuOpened);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setMenuOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleNavLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        event.preventDefault();
        const targetId = target.getAttribute("href")!.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
          setMenuOpened(false); // Close menu after navigation click
        }
      }
    };

    document.addEventListener("click", handleNavLinkClick);

    return () => {
      document.removeEventListener("click", handleNavLinkClick);
    };
  }, []);

  return (
    <div className="TopBar z-10 flex flex-wrap content-center justify-between pl-5 pr-5 pt-3 h-20">
      <img src="/Images/logo.png" alt="Simple Logo" className="h-16 w-16" />
      {!isPhone && !isTablet ? (
        <div
          id="NavItems"
          className="flex content-center justify-center gap-5 uppercase tracking-widest"
        >
          <a
            className="flex flex-wrap content-center justify-center h-16 w-25"
            href="#HomeWrapper"
          >
            Introduction
          </a>
          <a
            className="flex flex-wrap content-center justify-center h-16 w-25"
            href="#AboutWrapper"
          >
            About
          </a>
          <a
            className="flex flex-wrap content-center justify-center h-16 w-25"
            href="#Exps-Wrapper"
          >
            Experiences
          </a>
          <a
            className="flex flex-wrap content-center justify-center h-16 w-25"
            href="#Skill-Block"
          >
            Skills
          </a>
          <a
            className="flex flex-wrap content-center justify-center h-16 w-25"
            href="#Contact-Wrapper"
          >
            Contact
          </a>
        </div>
      ) : (
        <>
          <button
            className={`menu ${menuOpened ? "opened" : ""}`}
            onClick={toggleMenu}
            aria-label="Main Menu"
            aria-expanded={menuOpened}
          >
            <svg width="50" height="50" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>

          <div
            ref={navRef}
            className={`NavSmallViewPort flex content-center pt-3 justify-start gap-2 uppercase tracking-widest ${
              menuOpened ? "opened" : "hidden"
            }`}
          >
            <a
              className="flex content-center justify-center "
              href="#HomeWrapper"
            >
              Introduction
            </a>
            <a
              className="flex content-center justify-center "
              href="#AboutWrapper"
            >
              About
            </a>
            <a
              className="flex content-center justify-center "
              href="#Exps-Wrapper"
            >
              Experiences
            </a>
            <a
              className="flex content-center justify-center "
              href="#Skill-Block"
            >
              Skills
            </a>
            <a
              className="flex content-center justify-center "
              href="#Contact-Wrapper"
            >
              Contact
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Top;
