import React from "react";
import './Header.css';

function Header({header}) {
  return (
    <div className="headerContainer">
      <h1>{header}</h1>
    </div>
  );
}

export default Header;
