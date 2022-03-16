/* eslint-disable */

import {  css } from "@emotion/react";
import React from "react";
import '../GlobalComponents/container.css'

const Button = ({ text }) => (
  <a css={styles} href="#/" className="global-btn btn">
    {text}
  </a>
);

const styles = css`
  text-decoration: none;
  display: inline-block;
  background: #ed563b;
  color: #fff;
  font-size: 14px;
  padding: 12px 14px;
  transition: background 500ms ease-in-out;
  &:hover {
    background: #f9735b;
  }
`;

export default Button;
