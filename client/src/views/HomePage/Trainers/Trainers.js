/* eslint-disable */

import { jsx, css } from "@emotion/react";
import React from "react";
import Icon from "../GlobalComponents/Icon";
import TrainerCard from "./TrainerCard";
import Container from "../GlobalComponents/Container";
import TrainerOneBg from "../Image/trainerOne.jpg";
import TrainerTwoBg from "../Image/trainerTwo.jpg";
import TrainerThreeBg from "../Image/trainerThree.jpg";
import SHERA from "../Image/SHERA.jpg"
import Mehmaam from "../Image/Mehmaam.jpg"
import Tulaib from "../Image/tulaibs.PNG"
import Shahzaib from "../Image/shahzaibs.PNG"

import "./Trainer.css"

const Trainers = () => (
  <section className="trainers" id="trainers">
    <h2 id="trainer-h2">
      EXPERT<span id="trainer-span">TRAINERS</span>
    </h2>
    <Icon />
    <p id="trainer-p">
      We have Team of Experts for Development of this Application{" "}
      <br />
      Technology NodeJS, Firebase, Machine Learning, Redux and More!
    </p>
    <div className="container trainer-cont">
      <TrainerCard
        title="UI/UX Designer"
        name="Abdul Wahaj Shera"
        desc="We are Self taught Engineer, Developers and Designer."
        img={SHERA}
      />
      <TrainerCard
        title="UI/Back-End Developer"
        name="Shahzaib Qadir"
        desc="We are Self taught Engineer, Developers and Designer."
        img={Shahzaib}
      />
      <TrainerCard
        title="UI/Development"
        name="Tulaib Ahmed"
        desc="We are Self taught Engineer, Developers and Designer."
        img={Tulaib}
      />

    </div>
    <div className="container trainer-cont">
      <TrainerCard
        title="Backend/Machine Learning"
        name="Syed Muhammad Mehmaam"
        desc="We are Self taught Engineer, Developers and Designer. "
        img={Mehmaam}
      />
    </div>
  </section>
);

const styles = css`
  width: 100%;
  padding: 120px 0;
  text-align: center;
  h2 {
    color: #232d39;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 1.3px;
    line-height: 1;
    span {
      color: #ed563b;
    }
  }
  > p {
    color: #7a7a7a;
    font-size: 16px;
    line-height: 1.7;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 0 0 0;
  }
  @media (max-width: 650px) {
    > p {
      padding: 0 30px;
      br {
        display: none;
      }
    }
  }
  @media (max-width: 830px) {
    .container {
      flex-direction: column;
      align-items: center;
    }
  }
  @media (min-width: 831px) and (max-width: 1226px) {
    .container {
      flex-wrap: wrap;
      justify-content: space-between;
      max-width: 780px;
    }
  }
`;

export default Trainers;
