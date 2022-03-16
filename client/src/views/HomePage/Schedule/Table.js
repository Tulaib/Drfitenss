/* eslint-disable */

import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import "./Schedule.css"

const Table = ({ day }) => {
  return (
    <table id="table">
      <tbody>
        <tr>
          <td>Fitness Class</td>
          <td>
            <span id="table-span" className={day === "Monday" ? "" : "hidden1"}>
                  
            </span>
          </td>
          <td>
            <span id="table-span" className={day === "Tuesday" ? "" : "hidden1"}>
              2:00PM - 3:30PM
            </span>
          </td>
          <td>William G. Stewart</td>
        </tr>
        <tr>
          <td>Muscle Training</td>
          <td>
            <span id="table-span" className={day === "Friday" ? "" : "hidden1"}>
              10:00AM - 11:30AM
            </span>
          </td>
          <td>
            <span id="table-span" className={day === "Thursday" ? "" : "hidden1"}>
              2:00PM - 3:30PM
            </span>
          </td>
          <td>Boyd C. Harris</td>
        </tr>
        <tr>
          <td>Body Building </td>
          <td>
            <span id="table-span" className={day === "Tuesday" ? "" : "hidden1"}>
              10:00AM - 11:30AM
            </span>
          </td>
          <td>
            <span id="table-span" className={day === "Monday" ? "" : "hidden1"}>
              2:00PM - 3:30PM
            </span>
          </td>
          <td>Boyd C. Harris</td>
        </tr>
        <tr>
          <td>Yoga Training Class </td>
          <td>
            <span id="table-span" className={day === "Wednesday" ? "" : "hidden1"}>
              10:00AM - 11:30AM
            </span>
          </td>
          <td>
            <span id="table-span" className={day === "Friday" ? "" : "hidden1"}>
              2:00PM - 3:30PM
            </span>
          </td>
          <td>Hector T. Daigle</td>
        </tr>
        <tr>
          <td>Advanced Training </td>
          <td>
            <span id="table-span" className={day === "Thursday" ? "" : "hidden1"}>
              10:00AM - 11:30AM
            </span>
          </td>
          <td>
            <span id="table-span" className={day === "Wednesday" ? "" : "hidden1"}>
              2:00PM - 3:30PM
            </span>
          </td>
          <td>Bret D. Bowers</td>
        </tr>
      </tbody>
    </table>
  );
};

const styles = css`
  border-collapse: collapse;
  color: #fff;
  margin: 30px 0 0 0;
  td,
  th {
    border: 1px solid #fff;
    border-collapse: collapse;
  }
  tr {
    td {
      padding: 40px 0;
      width: 200px;
      span {
        opacity: 1;
        transition: opacity 900ms ease-in-out;
      }
    }
  }
  .hidden {
    opacity: 0;
  }
  @media (max-width: 640px) {
    font-size: 12px;
    tr {
      td {
        padding: 40px 0;
        width: 200px;
        span {
          font-size: 11px;
        }
      }
    }
  }
`;

export default Table;
