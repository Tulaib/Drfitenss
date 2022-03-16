/* eslint-disable */

import React from "react";
import Icon from "../GlobalComponents/Icon";
import GymTitle from "./GymTitle";
import GymSubtitle from "./GymSubtitle";
import GymProgramCard from "./GymProgramCard";
import Container from "../GlobalComponents/Container";
import "./GymProgram.css"

const GymProgram = () => (
  <div className="gymProgram img-fluid">
    <GymTitle />
    <Icon />
    <GymSubtitle />
    <br/>
    <div className="container gym-cont">
    <GymProgramCard
        title="30 Days Weight Gain Program"
        desc="Try Out 30 Days Weight Gain Exercises and Gain Some Muscle!"
      />
        <GymProgramCard
        title="Full Body 7x4 Challenge "
        desc="Try Out 30 Days Exercises and Be ready to Get Fit!"
      />
      <GymProgramCard
        title="30 Days Weight Gain Program"
        desc="Try Out 30 Days Weight Lean Exercises and Lean Some Muscle!"
      />
      <GymProgramCard
        title="Yoga Training"
        desc="Try Yoga and Get Fit"
      />
      <GymProgramCard
        title="Basic ,Intermediate and Expert Muscle Course"
        desc="Course for Muscle Gain and Lean For every person!"
      />
      <GymProgramCard
        title="Belly Fat Reduce"
        desc="Reduce your belly Fat and Get a Smart Look Men/Women !"
      />
    </div>
  </div>
);

export default GymProgram;
