/* eslint-disable */

import React, { useState } from "react";
import Icon from "../GlobalComponents/Icon";
import LinksContainer from "./LinksContainer";
import Results from "./Results";
import Container from "../GlobalComponents/Container";
import "./ourClasses.css"

const Classes = ({ text }) => {
  const [training, setTraining] = useState("FirstClass");

  return (
    <section className="ourClasses" id="ourClasses">
      <h2 id="ourClasses-h2">
        OUR <span id="Class-span">FEATURES</span>
      </h2>
      <Icon />
      <p id="ourClasses-p">
        Enjoy Features In Our Application 
        <br />
        Easy to Use and Understand
      </p>
      <div className="container container_custome">
        <LinksContainer setTraining={setTraining} training={training} />
        <Results training={training} />
      </div>
      
    </section>
  );
};


// const styles = css`
//   width: 100%;
//   padding: 100px 0;
//   text-align: center;
//   h2 {
//     color: #232d39;
//     font-size: 26px;
//     font-weight: 900;
//     line-height: 1;
//     span {
//       color: #ed563b;
//     }
//   }
//   p {
//     color: #7a7a7a;
//     font-size: 15px;
//     line-height: 1.7;
//   }
//   .container {
//     display: flex;
//     justify-content: space-between;
//     padding: 80px 0 0 0;
//   }
//   @media (max-width: 900px) {
//     .container {
//       flex-direction: column;
//       align-items: center;
//     }
//   }
//   @media (max-width: 580px) {
//     p {
//       padding: 0 20px;
//       br {
//         display: none;
//       }
//     }
//   }
//   @media (min-width: 901px) and (max-width: 1226px) {
//     .container{
//       justify-content: space-between;
//       max-width: 90%;
//     }
//   }
// `;

export default Classes;
