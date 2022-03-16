/* eslint-disable */

import { jsx, css } from "@emotion/react";
import React from "react";
import Button from "../GlobalComponents/Button";
import "./ourClasses.css"

const Output = ({ title, info, img }) => (
  <div className="output">
    <img id="output-img" src={img} alt="class" />
    <h2 id="output-h2">{title}</h2>
    <p id="output-p">{info}</p>
    <Button className="output-button" text="Rate Feature" />
  </div>
);

const styles = css`
  text-align: left;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  h2 {
    margin: 34px 0 0 0;
    font-size: 22px;
    font-weight: 600;
    line-height: 1;
  }
  p {
    margin: 20px 0;
  }
  .btn {
    padding: 14px 26px;
  }
  @media(max-width: 900px){
    img{
      height: 260px;
    }
  }
`;

export default Output;
