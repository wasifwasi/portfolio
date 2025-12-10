import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer--container container grid">
        <ul className="footer--links">
          <li>
            <a href="#about" className="footer--link">
              About
            </a>
          </li>

          <li>
            <a href="#services." className="footer--link">
              Services
            </a>
          </li>

          <li>
            <a href="#projects" className="footer--link">
              Projects
            </a>
          </li>
        </ul>

        <span className="footer--copy">
          &#169; All Rights Reserved By
          <a href="#home">wasifwasi.</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
