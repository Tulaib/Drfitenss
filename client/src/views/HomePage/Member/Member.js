/* eslint-disable */

import React from "react";
import Button from "../GlobalComponents/Button";
import GymOverlayBg from "../Image/gymOverlayBg.jpg";
import "./Member.css"

const Member = ({ text }) => (
  <section className="member">
    <h2 id="member-h2">
      GET<span id="member-span">FIT </span>OR STAY<span id="member-span">SICK</span>!
    </h2>
    <p id="member-p">
      Perfect app for starting your Fitness journey <br /> or taking your
      fitness to the next level!
    </p>
    <Button text="BECOME A MEMBER" />
  </section>
);


// const styles = css`
//   width: 100%;
//   padding: 120px 0;
//   text-align: center;
//   background: url('${GymOverlayBg}') no-repeat center/cover;
//   h2 {
//     color: #fff;
//     font-weight: 900;
//     font-size: 36px;
//     letter-spacing: 1.3px;
//     line-height: 1;
//     span {
//       color: #ed563b;
//     }
//   }
//   p {
//     color: #fff;
//     font-size: 16px;
//     line-height: 1.7;
//     margin: 20px 0;
//   }
//   @media(max-width: 850px) {
//     h2{
//       font-size: 30px;
//     }
//     p{
//       padding: 0 20px;
//       br{
//         display: none;
//       }
//     }
//   }
// `;

export default Member;
