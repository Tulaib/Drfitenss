/* eslint-disable */

import { css } from "@emotion/react";
import React from "react";
import Links from "./Link";
import '../Navbar/Navbar.css'
import Button from "../GlobalComponents/Button"; 
import { Link } from 'react-router-dom'

const LinksContainer = ({ hidden }) => {
  return (
    <div id="link-container" className={(hidden ? "hidden" : "") + " linksContainer"}>
      <Links name="HOME" linkTo="#home" />
      <Links name="OUR TEAM" linkTo="#trainers" />
      <Links name="FEATURES" linkTo="#ourClasses" />
      <Links name="SCHEDULES" linkTo="#schedule" />
      <Button className="link-btn" text="SIGN UP" >
        <Link to="/select"></Link>
      </Button>
    </div>
  );
};


const styles = css`
  width: 100%;
  max-width: 620px;
  display: flex;
  background-color:red;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1000px) {
    max-width: 100%;
    padding: 0 30px 20px 30px;
    flex-direction: column;
    align-items: flex-start;
    opacity: 1;
    position: absolute;
    left: 0;
    top: 70px;
    background: rgba(35, 45, 57, 0.8);
    transition: top 1100ms ease-in-out, opacity 1100ms ease-in-out;
    &.hidden {
      left: 0;
      top: -500px;
      opacity: 0;
    }
    .btn {
      width: 100%;
      text-align: center;
      padding: 16px;
    }
  }
`;

export default LinksContainer;
