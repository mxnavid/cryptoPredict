import React from "react";

const Header = () => {
  return (
    <nav className="navbar" style={{backgroundColor: '#0018A8'}}>
      <div className="navbar-brand">
        <a className="navbar-item" >
         <p className="has-text-white" style={{textTransform: "uppercase", fontSize: '24px', fontFamily: 'Arial'}}>Cryptowatch</p>
        </a>
      </div>
    </nav>
  );
};

export default Header;
