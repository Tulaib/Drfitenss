/* eslint-disable */

import { jsx, css } from "@emotion/react";
import React from "react";
import DumbbellBg from "../Image/dumbbellOrange.png";
import Button from "../GlobalComponents/Button";
import "./ourClasses.css"

const LinksContainer = ({ setTraining, training }) => (
  <div className="linksContainer img-fluid container" id="ourClasses-linkContainer">
    <button id="btnn-link"
      className={training === "FirstClass" ? "active" : ""}
      onClick={() => setTraining("FirstClass")}
    >
      <img id="btnn-img" src={DumbbellBg} alt="dumbbell" /> BMI FEATURE
    </button>
    <button id="btnn-link"
      className={training === "SecondClass" ? "active" : ""}
      onClick={() => setTraining("SecondClass")}
    >
      <img id="btnn-img" src={DumbbellBg} alt="dumbbell" /> POSE COUNTER
    </button>
    <button id="btnn-link"
      className={training === "ThirdClass" ? "active" : ""}
      onClick={() => setTraining("ThirdClass")}
    >
      <img id="btnn-img" src={DumbbellBg} alt="dumbbell" /> LIVE CONSULTANCY
    </button>
    <button id="btnn-link"
      className={training === "FourthClass" ? "active" : ""}
      onClick={() => setTraining("FourthClass")}
    >
      <img id="btnn-img" src={DumbbellBg} alt="dumbbell" /> EXERCISES AND DIET 
    </button>
    <Button className="ourClasses-button" text="View All Features" />
  </div>
);

const styles = css`
  width: 100%;
  max-width: 33%;
  display: flex;
  flex-direction: column;
  button {
    width: 100%;
    padding: 28px 36px;
    color: #232d39;
    font-weight: 500;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    margin-bottom: 36px;
    border: none;
    outline: none;
    font-size: 20px;
    &.active {
      color: #ed563b;
    }
    img {
      margin-right: 20px;
    }
  }
  .btn {
    padding: 24px 0;
    border-radius: 4px;
  }
  @media (max-width: 900px) {
    max-width: 590px;
  }
  @media (min-width: 901px) and (max-width: 1226px) {
    max-width: 280px;
  }
`;

export default LinksContainer;
