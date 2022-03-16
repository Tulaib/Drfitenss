/* eslint-disable */

import React from "react";
import '../Navbar/logo.css'
import logo from'../Image/LGO.png'

const Logo = () => (
  <h2 style={{marginTop:8}}>
    {/* TRAINING <span id="logo-span">STUDIO</span>  */}
    <img src={logo} width='200px'/>
  </h2>
);



// const styles = css`
//   color: #fff;
//   font-size: 30px;
//   font-weight: 900;
//   line-height: 1;
//   cursor: pointer;
//   span {
//     color: #ed563b;
//   }
// `;

export default Logo;
