/* eslint-disable */

// import {  css } from "@emotion/core";
import { jsx,css } from '@emotion/react'
import React from "react";
import '../Main/overlay.css'

const Overlay = () => <div className="overlay"></div>;

const styles = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(35, 45, 57, 0.8);
`;

export default Overlay;