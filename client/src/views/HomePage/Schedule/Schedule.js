/* eslint-disable */

import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import Icon from "../GlobalComponents/Icon";
import scheduleBg from "../Image/scheduleBg.jpg";
import ScheduleLinks from "./ScheduleLinks";
import Table from "./Table";
import Container from "../GlobalComponents/Container";
import "./Schedule.css"

const Schedule = () => {
  const [hidden1, setHidden] = useState(false);
  const [day, setDay] = useState("Monday");

  return (
    <section className="schedule img-fluid" id="schedule">
      <h2 id="schedule-h2">
        SCHEDULE CONSULTANCY<span style={{color: '#63d471'}}>APPOINTMENTS</span>
      </h2>
      <Icon />
      <p id="schedule-p">
       You can Consult with Doctor, Therapist, General Physician and Fitness Trainers
        <br />
       They will help  you to live your life in a Healthy Way!
      </p>
      <div className="container schedule_cont">
        <ScheduleLinks setDay={setDay} day={day} />
        <Table day={day} />
      </div>
    </section>
  );
};

const styles = css`
  width: 100%;
  padding: 120px 0;
  min-height: 100vh;
  text-align: center;
  background: url('${scheduleBg}') no-repeat center/cover;
  h2 {
    color: #fff;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 1.3px;
    line-height: 1;
    span {
      color: #ed563b;
    }
  }
  p {
    color: #fff;
    font-size: 16px;
    line-height: 1.7;
    margin: 20px 0;
  }
  .container{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  @media(max-width: 640px) {
    p{
      padding: 0 30px;
      br{
        display: none;
      }
    }
    .container{
      max-width: 92%;
    }
  }
`;

export default Schedule;
