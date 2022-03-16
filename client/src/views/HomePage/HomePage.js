/* eslint-disable */

import React from 'react'
import GymP from "./GymProgram/GymProgram"
import Member from "./Member/Member"
import OurClasses from "./OurClasses/Classes"
import Schedule from "./Schedule/Schedule"
import Trainer from "./Trainers/Trainers"
import Main from "./Main/Main"
import "./Home.css"
export default function HomePage() {
    return (
        <div>
            <Main />
            <GymP />
            <Member />
            <OurClasses />
            <Schedule />
            <Trainer />
        </div>
    )
}
