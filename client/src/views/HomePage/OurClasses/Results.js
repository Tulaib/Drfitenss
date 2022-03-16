/* eslint-disable */

import { jsx, css } from "@emotion/react";
import React from "react";
import Output from "./Output";
import ClassOneBg from "../Image/classOne.jpg";
import ClassTwoBg from "../Image/classTwo.jpg";
import ClassThreeBg from "../Image/classThree.jpg";
import ClassFourBg from "../Image/classFour.jpg";
import "./ourClasses.css"

const Results = ({ training }) => (
  <div className="results">
    {training === "FirstClass" && (
      <Output
        title="BMI Calculator"
        info="Calculate you BMI, If you're Underweight/Overweight Our App will Sugges you to Gain / Lean Weight. "
        img={ClassOneBg}
      />
    )}

    {training === "SecondClass" && (
      <Output
        title="Pose Estimation Counter"
        info="When you Open any Exercise in our App, click on Angle Checker Our App will use your camera then will count only correct reps of that Application."
        img={ClassTwoBg}
      />
    )}
    {training === "ThirdClass" && (
      <Output
        title="Live Consultancy"
        info="You Can Consult with Doctor for any query , Injury and other physical problem. And with Trainer For Exercise PLan. "
        img={ClassThreeBg}
      />
    )}

    {training === "FourthClass" && (
      <Output
        title="Exercises and Diet Plan"
        info="Our App provide Exercises for Weight Gain And Lean, Full Body Maintainance and Much More. Healthy Diet Plan for Weight Gain and Lean is Also provided."
        img={ClassFourBg}
      />
    )}
  </div>
);

const styles = css`
  width: 100%;
  max-width: 60%;
  .test {
    width: 100%;
    height: 400px;
    background: red;
    &.two {
      background: blue;
    }
  }
  @media(max-width: 900px){
    max-width: 590px;
    padding: 30px 0 0 0;
  }
  @media (min-width: 901px) and (max-width: 1226px){
    max-width: 62%;
  }
`;

export default Results;
