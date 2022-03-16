/*eslint-disable */
import React from 'react';
import { ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Collapse, Button, FormGroup, CustomInput } from 'reactstrap';
import { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { CardHeader, Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// import { useSelector, useDispatch} from 'redux';
import classnames from 'classnames';
import {
  Day1,
  Day2,
  Day3,
  Day4,
  Day5,
  Day6,
  Day7,
  Day8,
  Day9,
  Day10,
  Day11,
  Day12,
  Day13,
  Day14,
  Day15,
  Day16,
  Day17,
  Day18,
  Day19,
  Day20,
  Day21,
  Day22,
  Day23,
  Day24,
  Day25,
  Day26,
  Day27,
  Day28,
} from './exerciseDATA';
import {Beginner,Intermediate,Expert} from '../exercise/ExerciseDATA/ABS' 
import {Beginner1,Intermediate1,Expert1} from '../exercise/ExerciseDATA/ARM'
import {Beginner2,Intermediate2,Expert2} from '../exercise/ExerciseDATA/CHEST'
import {Beginner3,Intermediate3,Expert3} from '../exercise/ExerciseDATA/LEG'
import {Beginner4,Intermediate4,Expert4} from '../exercise/ExerciseDATA/SHOULDER'
import play from'../../../Images/sound/start.mp3';
import secleft from '../../../Images/sound/5_sec.mp3';
import useSound from 'use-sound';
import { Modal } from 'reactstrap';
import { Avatar } from '@material-ui/core';
import Timer from './Timer';
import { useDispatch, useSelector } from 'react-redux';
import { getExerPlan } from 'redux/store/actions/exerciseInnerAction';

const ExerciseInnerPage = (props) => {

  
  

  const match = props?.match;
  const showweekdays = props?.location?.data?.showweeknday;
  const heading1s = props?.location?.data?.heading1;
  const heading = props?.location?.data?.heading;
  const type = props?.location?.data?.type;

  console.log(heading, 'Testing Show true');

  const Week1Gain = [Day1, Day2, Day3, Day4, Day5, Day6, Day7];
  const Week2Gain = [Day8, Day9, Day10, Day11, Day12, Day13, Day14];
  const Week3Gain = [Day15, Day16, Day17, Day18, Day19, Day20, Day21];
  const Week4Gain = [Day22, Day23, Day24, Day25, Day26, Day27, Day28];
  const ABS = [Beginner,Intermediate,Expert]
  const ARM = [Beginner1,Intermediate1,Expert1]
  const CHEST = [Beginner2,Intermediate2,Expert2]
  const LEG = [Beginner3,Intermediate3,Expert3]
  const SHOULDER = [Beginner4,Intermediate4,Expert4]

  const [collapse, setCollapse] = useState(true);
  const [collapseD, setCollapseD] = useState(false);
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [activeSecondTab, setActiveSecondTab] = useState('1');
  const [letsPlay] = useSound(play);

  const LinksBan = [
    {
      subLinkName: 'Exercises',
      subDash: '/',
      subLink: '/diets',
    },
  ];

  


  const [modalShow, setModalShow] = useState(false);

  const [DayName, setDayName] = useState('Day1');
  const [DayObj, setDayObj] = useState(Day1);

  useEffect(()=>{
    if(heading === 'ABS' && type === 'beginner'){
      setDayObj(ABS[0])
    }
    else if (heading === 'ABS' && type === 'Intermediate'){
      setDayObj(ABS[1])
    }
    else if (heading === 'ABS' && type === 'Advance'){
      setDayObj(ABS[2])
    }
    else if(heading === 'ARM' && type === 'beginner'){
      setDayObj(ARM[0])
    }
    else if (heading === 'ARM' && type === 'Intermediate'){
      setDayObj(ARM[1])
    }
    else if (heading === 'ARM' && type === 'Advance'){
      setDayObj(ARM[2])
    }
    else if(heading === 'CHEST' && type === 'beginner'){
      setDayObj(CHEST[0])
    }
    else if (heading === 'CHEST' && type === 'Intermediate'){
      setDayObj(CHEST[1])
    }
    else if (heading === 'CHEST' && type === 'Advance'){
      setDayObj(CHEST[2])
    }
    else if(heading === 'LEG' && type === 'beginner'){
      setDayObj(LEG[0])
    }
    else if (heading === 'LEG' && type === 'Intermediate'){
      setDayObj(LEG[1])
    }
    else if (heading === 'LEG' && type === 'Advance'){
      setDayObj(LEG[2])
    }
    else if(heading === 'SHOULDER AND BACK' && type === 'beginner'){
      setDayObj(SHOULDER[0])
    }
    else if (heading === 'SHOULDER AND BACK' && type === 'Intermediate'){
      setDayObj(SHOULDER[1])
    }
    else if (heading === 'SHOULDER AND BACK' && type === 'Advance'){
      setDayObj(SHOULDER[2])
    }
  },[])

  const [Days, setDays] = useState(0);
  const [D, setD] = useState(1);

  const handleCallback = (childData) => {
    setDays(childData);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Lets Start Exercise" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <MyVerticallyCenteredModals
            show={modalShow}
            onHide={() => setModalShow(false)}
            day={DayName}
            dayObj={DayObj}
            parentCallback={handleCallback}
            Dn={D}
          />
          <Collapse isOpen={collapse}>
            <div className="p-4 border mt-4">
              <Colxx xxs="12" xs="6" lg="12">
                <Card className="mb-4 ">
                  {showweekdays ? (
                    <>
                      <div className="mt-2 container">
                        <CardTitle style={{ fontWeight: 'bolder' }}>
                          {heading1s}
                        </CardTitle>

                        {DayObj.map((exer, id) => {
                          return (
                            <>
                              <ImageCardList
                                FoodTime={exer.exerciseName}
                                img={exer.gifImage}
                                Description={exer.description}
                                Reps={exer.Reps}
                              />
                            </>
                          );
                        })}
                        <div className="text-center ">
                          <Button
                            onClick={() => {
                              letsPlay();
                              setModalShow(true);
                            }}
                            className="mb-4"
                            color="outline-primary"
                          >
                            Start Exercise
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <CardHeader className="pl-0 pr-0">
                      <Nav tabs className=" card-header-tabs  ml-0 mr-0">
                        <NavItem className="w-20 text-center">
                          <NavLink
                            to="#"
                            location={{}}
                            className={classnames({
                              active: activeSecondTab === '1',
                              'nav-link': true,
                            })}
                            onClick={() => {
                              setActiveSecondTab('1');
                            }}
                          >
                            Week 1
                          </NavLink>
                        </NavItem>
                        <NavItem className=" w-20 text-center">
                          <NavLink
                            to="#"
                            location={{}}
                            className={classnames({
                              active: activeSecondTab === '2',
                              'nav-link': true,
                            })}
                            onClick={() => {
                              setActiveSecondTab('2');
                            }}
                          >
                            Week 2
                          </NavLink>
                        </NavItem>
                        <NavItem className=" w-20 text-center">
                          <NavLink
                            to="#"
                            location={{}}
                            className={classnames({
                              active: activeSecondTab === '3',
                              'nav-link': true,
                            })}
                            onClick={() => {
                              setActiveSecondTab('3');
                            }}
                          >
                            Week 3
                          </NavLink>
                        </NavItem>
                        <NavItem className="w-20  text-center">
                          <NavLink
                            to="#"
                            location={{}}
                            className={classnames({
                              active: activeSecondTab === '4',
                              'nav-link': true,
                            })}
                            onClick={() => {
                              setActiveSecondTab('4');
                            }}
                          >
                            Week 4
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </CardHeader>
                  )}

                  <TabContent activeTab={activeSecondTab}>
                    <TabPane tabId={activeSecondTab}>
                      <Row>
                        <Colxx sm="12" lg="12">
                          <CardBody>
                            {/* <CardTitle className="mb-4">
                          Homemade Cheesecake with Fresh Berries and Mint
                        </CardTitle> */}
                            {showweekdays ? (
                              ''
                            ) : (
                              <>
                                <div
                                  className="mb-4 "
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    overflow: 'auto',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {/* <div
                                    className="mb-2"
                                    style={{
                                      display: 'flex',
                                      // width: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      flexWrap: 'wrap',
                                      // backgroundColor: 'lightpink',
                                    }}
                                  > */}
                                  <Button
                                    className="default mb-2 mr-2"
                                    color="outline-primary "
                                    style={{
                                      width: '8%',
                                      height: '80px',
                                      borderRadius: '50%',
                                      minWidth: '70px',
                                      minHeight: '70px',
                                    }}
                                    onClick={() => {
                                      setCollapseD(!collapseD);
                                      setDayName('Day1');
                                        setDayObj(
                                          activeSecondTab === '1'
                                          ? Week1Gain[0]
                                          : activeSecondTab === '2'
                                          ? Week2Gain[0]
                                          : activeSecondTab === '3'
                                          ? Week3Gain[0]
                                          : activeSecondTab === '4'
                                          ? Week4Gain[0]
                                          : ''
                                          );
                                        
                                    }}
                                  >
                                    Day1
                                  </Button>
                                  <Button
                                    style={{
                                      width: '8%',
                                      height: '80px',
                                      borderRadius: '50%',
                                      minWidth: '70px',
                                      minHeight: '70px',
                                    }}
                                    className="default mb-2 mr-2"
                                    disabled={Days >= 7 ? false : true}
                                    color="outline-primary"
                                    onClick={() => {
                                      setCollapseD(!collapseD);
                                      setDayName('Day2');
                                      setDayObj(
                                        activeSecondTab === '1'
                                          ? Week1Gain[1]
                                          : activeSecondTab === '2'
                                          ? Week2Gain[1]
                                          : activeSecondTab === '3'
                                          ? Week3Gain[1]
                                          : activeSecondTab === '4'
                                          ? Week4Gain[1]
                                          : ''
                                      );
                                      setD(0);
                                    }}
                                  >
                                    Day2
                                  </Button>
                                  <Button
                                    style={{
                                      width: '8%',
                                      height: '80px',
                                      borderRadius: '50%',
                                      minWidth: '70px',
                                      minHeight: '70px',
                                    }}
                                    className="default mb-2 mr-2"
                                    color="outline-primary"
                                    disabled={Days >= 12 ? false : true}
                                    onClick={() => {
                                      setCollapseD(!collapseD);
                                      setDayName('Day3');
                                      setDayObj(
                                        activeSecondTab === '1'
                                          ? Week1Gain[2]
                                          : activeSecondTab === '2'
                                          ? Week2Gain[2]
                                          : activeSecondTab === '3'
                                          ? Week3Gain[2]
                                          : activeSecondTab === '4'
                                          ? Week4Gain[2]
                                          : ''
                                      );
                                      setD(0);
                                    }}
                                  >
                                    Day3
                                  </Button>
                                  <Button
                                    style={{
                                      width: '8%',
                                      height: '80px',
                                      borderRadius: '50%',
                                      minWidth: '70px',
                                      minHeight: '70px',
                                    }}
                                    className="default mb-2 mr-2"
                                    color="outline-primary"
                                    disabled={Days >= 18 ? false : true}
                                    onClick={() => {
                                      setCollapseD(!collapseD);
                                      setDayName('Day4');
                                      setDayObj(
                                        activeSecondTab === '1'
                                          ? Week1Gain[3]
                                          : activeSecondTab === '2'
                                          ? Week2Gain[3]
                                          : activeSecondTab === '3'
                                          ? Week3Gain[3]
                                          : activeSecondTab === '4'
                                          ? Week4Gain[3]
                                          : ''
                                      );
                                      setD(0);
                                    }}
                                  >
                                    Day4
                                  </Button>
                                  <Button
                                    style={{
                                      width: '8%',
                                      height: '80px',
                                      borderRadius: '50%',
                                      minWidth: '70px',
                                      minHeight: '70px',
                                    }}
                                    className="default mb-2 mr-2"
                                    color="outline-primary"
                                    disabled={Days >= 25 ? false : true}
                                    onClick={() => {
                                      setCollapseD(!collapseD);
                                      setDayName('Day5');
                                      setDayObj(
                                        activeSecondTab === '1'
                                          ? Week1Gain[4]
                                          : activeSecondTab === '2'
                                          ? Week2Gain[4]
                                          : activeSecondTab === '3'
                                          ? Week3Gain[4]
                                          : activeSecondTab === '4'
                                          ? Week4Gain[4]
                                          : ''
                                      );
                                      setD(0);
                                    }}
                                  >
                                    Day5
                                  </Button>
                                  <Button
                                    style={{
                                      width: '8%',
                                      height: '80px',
                                      borderRadius: '50%',
                                      minWidth: '70px',
                                      minHeight: '70px',
                                    }}
                                    className="default mb-2 mr-2"
                                    disabled={Days >= 32 ? false : true}
                                    color="outline-primary"
                                    onClick={() => {
                                      setCollapseD(!collapseD);
                                      setDayName('Day6');
                                      setDayObj(
                                        activeSecondTab === '1'
                                          ? Week1Gain[5]
                                          : activeSecondTab === '2'
                                          ? Week2Gain[5]
                                          : activeSecondTab === '3'
                                          ? Week3Gain[5]
                                          : activeSecondTab === '4'
                                          ? Week4Gain[5]
                                          : ''
                                      );
                                      setD(0);
                                    }}
                                  >
                                    Day6
                                  </Button>
                                  <Button
                                    style={{
                                      width: '8%',
                                      height: '80px',
                                      borderRadius: '50%',
                                      minWidth: '70px',
                                      minHeight: '70px',
                                    }}
                                    disabled={Days >= 39 ? false : true}
                                    className="default mb-2 mr-2"
                                    color="outline-primary"
                                    onClick={() => {
                                      setCollapseD(!collapseD);
                                      setDayName('Day7');
                                      setDayObj(
                                        activeSecondTab === '1'
                                          ? Week1Gain[6]
                                          : activeSecondTab === '2'
                                          ? Week2Gain[6]
                                          : activeSecondTab === '3'
                                          ? Week3Gain[6]
                                          : activeSecondTab === '4'
                                          ? Week4Gain[6]
                                          : ''
                                      );
                                      setD(0);
                                    }}
                                  >
                                    Day7
                                  </Button>
                                </div>
                                {/* </div> */}
                              </>
                            )}
                          </CardBody>
                        </Colxx>
                        <Colxx>
                          <div className="mt-0 container">
                            <CardTitle>{heading1s}</CardTitle>
                            <Collapse isOpen={collapseD}>
                              {DayObj.map((exer, id) => {
                                return (
                                  <>
                                    <ImageCardList
                                      FoodTime={exer.exerciseName}
                                      img={exer.gifImage}
                                      Description={exer.description}
                                      Reps={exer.Reps}
                                    />
                                  </>
                                );
                              })}
                              <div className="text-center ">
                                <Button
                                  onClick={() => {
                                    letsPlay();
                                    setModalShow(true);
                                  }}
                                  className="mb-4"
                                  color="outline-primary"
                                >
                                  Start Exercise
                                </Button>
                              </div>
                            </Collapse>
                          </div>
                        </Colxx>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Card>
              </Colxx>
            </div>
          </Collapse>
        </Colxx>
      </Row>
    </>
  );
};

export default ExerciseInnerPage;

const ImageCardList = (props) => {
  return (
    <Row>
      <Colxx xxs="12">
        <CardTitle className="mb-4"></CardTitle>
        <Row>
          <Colxx xxs="12">
            <Card className="d-flex flex-column  mb-3">
              <NavLink
                to="#"
                location={{}}
                className="d-flex justify-content-center "
              >
                <img
                  alt="Thumbnail"
                  src={props.img}
                  // className="list-thumbnail responsive border-0 card-img-left"
                style={{maxWidth:'80px',minWidth:'80px',maxHeight:'100px',minHeight:'100px'}}
                  className='img-thumbnail border-0   mt-2 mb-2 list-thumbnail'
                  style={{ objectFit: 'cover' }}
                />
              </NavLink>
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center ">
                  <p className="mb-1 text-small w-15 w-sm-100 list-item-heading">
                    {props.FoodTime}
                  </p>
                  <NavLink to="#" location={{}} className="w-100 w-sm-100">
                    <p className="mb-1 text-muted ">{props.Description}</p>
                  </NavLink>
                </div>
              </div>
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <FormGroup className="mb-0">
                  <p className="list-item-heading mb-1 ">
                    No of Reps {props.Reps}
                  </p>
                </FormGroup>
              </div>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};

function MyVerticallyCenteredModals(props) {
  const [question, setQuestion] = useState(null);
  // const [questionNumber, setQuestionNumber] = useStickyState(1,'questionNumber');
  // const [questionNumber, setQuestionNumber] = useState(1);

  const [timeOut, setTimeOut] = useState(false);
  const [seclefts] = useSound(secleft);
  const [count, setCounter] = useState();
  const [daysCount, setdaysCount] = useState(1);

  // const exerciseNumber = useSelector((state) => state?.Exer?.reset);

  // const dispatch = useDispatch();

  // let exerciseNumber = useSelector((state) => state?.Exer?.reset);
  const [questionNumber, setQuestionNumber] = useState(1);

  // useEffect(() => {
  //   dispatch(getResetValue(questionNumber));
  // },[dispatch,questionNumber,exerciseNumber])

  // console.log("redux",exerciseNumber)

  // console.log(exerciseNumber,"redux wawla")
  props.parentCallback(daysCount);

  useEffect(() => {
    setQuestion(props.dayObj[questionNumber - 1]);
  }, [props.dayObj, questionNumber]);

  useEffect(() => {
    // console.log("counter --- >",count)
    if (count === 6) {
      seclefts();
      return;
    }
    // if (daysCount + 1 === props.dayObj.length + 1) {
    //   setQuestionNumber(1);
    //   // console.log("len -",props.dayObj.length)
    // } 
    else {
      return;
    }
  }, [count, seclefts, questionNumber]);

  const abc = (Value) => {
    setCounter(Value);
  };
  console.log('dayscount->', daysCount);

  const handleClick = () => {
    setQuestionNumber((prev) => prev + 1);
    if (daysCount === props.dayObj.length) {
      setTimeout(() => {
        setQuestionNumber(1);
        console.log('if chal gya bhai')
      }, 5000);
    }
    setdaysCount(daysCount + 1);
  };
  const handleClickLast = () => {
    setdaysCount(1);
  };

  let totalLen = props.dayObj.length;

  console.log('questionNumer', questionNumber);
  console.log('Totalen len', totalLen);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={props.show}
      style={{ boxShadow: 'none' }}
    >
      <ModalHeader closeButton></ModalHeader>
      <ModalBody>
        {questionNumber >= totalLen + 1 ? (
          <div
            className="appoinmentCards d-flex justify-content-center"
            style={{ flexDirection: 'column ' }}
          >
            <div className="container">
              <h3 style={{ color: 'green' }}>
                Congratulations! You have Completed Todays Exercises
              </h3>
              <h4>
                Total No of Exercises:
                <span style={{ fontWeight: 'bold', color: 'green' }}>
                  {totalLen}
                </span>
              </h4>
              <h4>
                Total Time Spend:
                <span style={{ fontWeight: 'bold', color: 'green' }}>
                  {totalLen * 30}
                </span>{' '}
                sec
              </h4>
            </div>
          </div>
        ) : (
          <div>
            <>
              <div id="contained-modal-title-vcenter">
                {props.day}
                <h6> Exercise No {questionNumber}</h6>
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ flexDirection: 'column ' }}
              >
                <div>
                  <Avatar
                    alt=""
                    src={question?.gifImage}
                    style={{
                      width: '300px',
                      height: '300px',
                      textAlign: 'left',
                    }}
                  />
                </div>
                <div style={{ textAlign: 'left', textTransform: 'capitalize' }}>
                  <h4
                    style={{
                      fontFamily: 'fantasy',
                      fontWeight: 'bold',
                    }}
                  >
                    {question?.exerciseName}
                  </h4>
                </div>
                <h5>
                  No of Reps
                  <span style={{ color: 'green' }}>{question?.Reps}</span>
                </h5>
                <h6
                  style={{
                    fontweight: 'bold',
                    textAlign: 'center',
                    backgroundColor: '#f8f8f8',
                    padding: 10,
                    borderRadius: '10px',
                    color: 'gray',
                  }}
                >
                  {question?.description}
                </h6>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    minHeight: '50px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'end',
                      backgroundColor: '',
                    }}
                  >
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                      counterValue={abc}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      margin: 2,
                      width: '30%',
                    }}
                  >
                    <Button variant="primary" outline style={{ width: '100%' }}>
                      Skip
                    </Button>

                    <Button
                      variant="success"
                      style={{ width: '100%', marginTop: 2 }}
                      onClick={() => {
                        handleClick();
                        // daycounter();
                      }}
                    >
                      Next Exercise
                    </Button>
                  </div>
                </div>
              </div>
            </>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.onHide}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
