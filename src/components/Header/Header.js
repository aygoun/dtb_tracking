import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="container-header">
      <h1>
        <a style={{textDecoration: "none", color: "white"}} href="https://aygoun.github.io/Attack-On-Castle-Web.github.io/">
          DTB
        </a>{" "}
        | Start tracking your progress!
      </h1>
    </div>
  );
}

export default Header;