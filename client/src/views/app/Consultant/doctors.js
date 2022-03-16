/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {
  Badge,
  Button,
  ModalFooter,
  ButtonGroup,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  ModalBody,
  ModalHeader,
  Row,
  TabContent,
  TabPane,
  Modal,
  FormGroup,
  Col,
  Label,
  Table,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { LabConsultantsData } from './docANDconsultantData';
import ImageCards from 'containers/ui/ImageCards';
import { Link, NavLink } from 'react-router-dom';
import Rating from 'components/common/Rating';
import { useForm } from 'react-hook-form';
import './Consultant.css';
import imgs from 'Images/tulaibs.PNG';

import CustomSelectInput from 'components/common/CustomSelectInput';
import Select from 'react-select';
import data from 'data/notifications';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { auth, db } from 'firebase';
import { Field } from 'formik';
import { getIdToken } from 'firebase/auth';
import Innerpayment from './innerpayment';
import {
  getCurrentPrice,
  getCurrentUser,
  getTrainerPlan,
} from 'redux/store/actions/exerciseInnerAction';
import { useSelector, useDispatch } from 'react-redux';
toast.configure();

const Doctors = ({ match }) => {

  const dispatch = useDispatch();

  const [selectedRadio, setSelectedRadio] = useState('0');
  const [activeSecondTab, setActiveSecondTab] = useState('1');

  const [modalShow1, setModal1Show] = useState(false);
  const [modalShow2, setModal2Show] = useState(false);

  const [doctors, setDoctors] = useState([]);

  const [docID, setDocid] = useState([]);

  const [curruser, setcurruser] = useState([]);
  const [curruser1, setcurruser1] = useState();

  // const [id,setid] = useState('')

  useEffect(() => {
    onSnapshot(collection(db, 'users'), (snapshot) => {
      setDoctors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  // const citiesRef = collection(db, "users");
  const q = query(
    collection(db, 'users'),
    where('uid', '==', auth?.currentUser?.uid)
  );

  const GetDataofAppointment = async () => {
    const q = query(
      collection(db, 'users'),
      where('uid', '==', auth?.currentUser?.uid)
    );
    const snapshot = await getDocs(q);
    const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setcurruser(result);
  };

  const feees = useSelector((state) => state?.ExercisesReducer?.crrpayinfo);
  const UserInfo = useSelector((state) => state?.ExercisesReducer?.crruser);
  useEffect(() => {
    GetDataofAppointment();
    dispatch(getCurrentPrice(docID));
    dispatch(getCurrentUser(curruser));
    callback()
  }, [docID]);

  // console.log('fees', feees);
  // console.log('user doc se', curruser);
  console.log('docfeee', docID.fee);
  // console.log('fees',docID.fee)

  // console.log('Current firebase wala kaaam => ', curruser);

  curruser.map((user) => {
    // setcurruser1(user)
  });

  const handleid = async (ids) => {
    console.log('dockiID', ids);
    getDoc(doc(db, 'users', ids)).then((docSnap) => {
      if (docSnap.exists) {
        setDocid(docSnap.data());
      }
    });
  };


  const [AppointmentDataAll,setAppointmentDataAll] = useState([])
  const callback = (values) =>{
    setAppointmentDataAll(values)
  }
  console.log("im parent my value ",AppointmentDataAll)


  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Appoint A Consultant" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4 d-flex justify-content-end">
          <div
            style={{
              // width: '40%',
              borderRadius: 10,
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              padding: '20px',
            }}
          >
            <Innerpayment prices={docID.fee} allData={AppointmentDataAll}/>
          </div>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <AddAppointments
            show={modalShow1}
            onHide={() => setModal1Show(false)}
            doc={docID}
            current={curruser}
            callbacks={callback}
            
          />
          <ConsultantDetails
            show={modalShow2}
            doc={docID}
            onHide={() => setModal2Show(false)}
            // doc = {docID}
          />
        </Colxx>
        <Colxx>
          <div className="mb-4 text-center">
            <ButtonGroup>
              <Button
                color="success"
                outline
                onClick={() => setSelectedRadio('0')}
                active={selectedRadio === '0'}
              >
                All
              </Button>
              <Button
                color="success"
                outline
                onClick={() => setSelectedRadio('1')}
                active={selectedRadio === '1'}
              >
                Female
              </Button>
              <Button
                color="success"
                outline
                onClick={() => setSelectedRadio('2')}
                active={selectedRadio === '2'}
              >
                Male{' '}
              </Button>
            </ButtonGroup>
          </div>
          <TabContent activeTab={selectedRadio}>
            <TabPane tabId="0">
              <Row className="flex-direction-row">
                {/* <Colxx sm="12" lg="12"> */}
                {/* <Colxx sm="12" lg="12"> */}
                {doctors &&
                  doctors
                    .filter((user) => user.userType === 'consultant')
                    .filter((user) => user.conType === 'doctor')
                    .filter((user)=> user.loginStatus === 'true'  )
                    .map((user, index) => {
                      return (
                        <UserCards
                          mainTitle={user.name}
                          image={user?.avatar}
                          badge="Dr Fitness Recommended"
                          // day={user.Degree}
                          day={user.Degree}
                          fee={user.fee}
                          rating={user.rating}
                          button={user.btn}
                          butt1={() => {
                            setModal1Show(true), handleid(user.id);
                          }}
                          butt2={() => {
                            setModal2Show(true), handleid(user.id);
                          }}
                          // idbut = {()=>{ handleid(user.id)}}
                          // id={user.id}
                          // status={item.status}
                        />
                      );
                    })}
                {/* </Colxx> */}
              </Row>
            </TabPane>
            <TabPane tabId="1">
              <Row>
                {/* <Colxx sm="12" lg="12"> */}
                {doctors &&
                  doctors
                    .filter((user) => user.userType === 'consultant')
                    .filter((user) => user.conType === 'doctor')
                    .filter((user)=> user.loginStatus === 'true'  )
                    .filter((user) => user.gender === 'female')
                    .map((user, index) => {
                      return (
                        <UserCards
                          mainTitle={user.name}
                          image={user?.avatar}
                          badge="Dr Fitness Recommended"
                          // day={user.Degree}
                          day={user.Degree}
                          fee={user.fee}
                          rating={user.rating}
                          button={user.btn}
                          butt1={() => setModal1Show(true)}
                          butt2={() => setModal2Show(true)}
                          id={user.uid}

                          // status={item.status}
                        />
                      );
                    })}
                {/* </Colxx> */}
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                {/* <Colxx sm="12" lg="12"> */}
                {/* <Colxx sm="12" lg="12"> */}
                {doctors &&
                  doctors
                    .filter((user) => user.userType === 'consultant')
                    .filter((user) => user.conType === 'doctor')
                    .filter((user)=> user.loginStatus === 'true'  )
                    .filter((user) => user.gender === 'male')
                    .map((user, index) => {
                      return (
                        <UserCards
                          mainTitle={user.name}
                          image={user?.avatar}
                          badge="Dr Fitness Recommended"
                          // day={user.Degree}
                          day={user.Degree}
                          fee={user.fee}
                          rating={user.rating}
                          button={user.btn}
                          butt1={() => setModal1Show(true)}
                          butt2={() => setModal2Show(true)}
                          id={user.uid}

                          // status={item.status}
                        />
                      );
                    })}
                {/* </Colxx> */}
              </Row>
            </TabPane>
          </TabContent>
          {/* {LabConsultantsData.map((item) => {
            return (

              <UserCards  mainTitle={item.label} image={item?.imgSrc} badge='Dr Fitness Recommended' 
                details ={item.details} fee ={item.fee} rating={item.star} />
            );
          })} */}
        </Colxx>
      </Row>
    </>
  );
};

export default Doctors;

const UserCards = (props) => {
  return (
    <>
      <Colxx lg="4" md="6" sm="12" className="mb-4">
        <Card className="mb-4">
          <CardBody>
            <div className="text-center">
              <Badge
                color="success"
                pill
                className="position-absolute badge-top-left-2"
              >
                Fee: {props.fee} Rs
              </Badge>

              <CardImg
                top
                src={props.image}
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
                style={{maxWidth:'80px',minWidth:'80px',maxHeight:'80px',minHeight:'80px'}}
              />
              <Link>
                <CardSubtitle className="mb-1">{props.mainTitle}</CardSubtitle>
                <RatingExamples star={props.rating} />
              </Link>
              <CardText className="text-muted text-small ">
                {props.day}
              </CardText>
              <ButtonGroup
                outline
                size="sm"
                color="primary"
                onClick={props.butt}
              >
                <Button
                  outline
                  size="sm"
                  color="secondary"
                  className="mt-1"
                  onClick={props.butt1}
                >
                  Book Appointment
                </Button>
                <Button
                  outline
                  size="sm"
                  color="primary"
                  className="mt-1"
                  onClick={props.butt2}
                >
                  Details
                </Button>
                {/* <Button
                  outline
                  size="sm"
                  color="primary"
                  className="mt-1"
                  onClick={props.idbut}
                >
                  id get
                </Button> */}
              </ButtonGroup>
            </div>
          </CardBody>
        </Card>
      </Colxx>
    </>
  );
};

const RatingExamples = (props) => {
  return (
    <Row className="justify-content-center">
      <Colxx xxs="12" sm="6">
        <Rating total={5} rating={props.star} interactive={false} />
      </Colxx>
    </Row>
  );
};

// import React, { useEffect, useState } from "react";

const ConsultantDetails = (props) => {
  const [curruser, setcurruser] = useState([]);

  var Doctorsget = props.doc;

  useEffect(() => {
    // setTimeout(() => {
    GetDataofAppointment();
    // }, 2000);
  }, []);

  const GetDataofAppointment = async () => {
    const q = query(
      collection(db, 'appointment'),
      where('DocID', '==', `${Doctorsget.uid}`)
    );
    const snapshot = await getDocs(q);
    const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setcurruser(result);
  };

  console.log('appoint dteails ', curruser);
  console.log('appoint dteails ', Doctorsget.uid);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={props.show}
        style={{ boxShadow: 'none' }}
      >
        <ModalHeader closeButton>
          Doctor Other Appoitnments
          <Button
            onClick={props.onHide}
            outline
            style={{ marginLeft: '40px', color: 'red', borderColor: 'red' }}
          >
            Close
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row className="h-100">
            {/* <Col lg={4}> */}
            {/* <FormGroup className="form-group has-float-label">
                <Label>Picture</Label>
                <h3>abc</h3>
              </FormGroup> */}

            <Table hover responsive>
              <thead>
                <tr>
                  <th>Appointment By</th>
                  <th>Appoitment Date</th>
                  <th>Appoitment Time</th>
                </tr>
              </thead>
              {curruser.map((item, k) => {
                return (
                  <>
                    <tbody>
                      <tr>
                        <td>{item.username}</td>
                        <td className="pt-50">{item.selectedDate}</td>
                        <td>
                          {item.selectedDate} {item?.selectedTime}
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </Table>
            {/* </Col> */}
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};
const AddAppointments = (props) => {
  const [singleSelections, setSingleSelections] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('0');
  const [doctor, setDoctor] = useState([]);
  const [slot, setSlot] = useState([]);
  const [reason, setreason] = useState('');

  const [slotTime, setslotTime] = useState('');
  const [selectedDate, setselectedDate] = useState('');
  const [slotselectedTime, setslotselectedTime] = useState('');

  // const changeDoctorHanler = (selected) => {
  //   if (selected.length > 0) {
  //     let today = new Date();
  //     let time = today.getHours() + ':' + today.getMinutes();
  //     const apiData = {
  //       id: selected[0]?.id,
  //       date: date,
  //       time: time,
  //     };
  //   }
  // };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const apiData = {
      date: date,
      description: data.description,
      slot: slot,
    };
    console.log('sub->', apiData);
  };

  const date = watch('date', props.date);

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 0).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  };

  var Doctorsget = props.doc;
  var crr = props.current;

  console.log('user', crr);

  // var usernames =
  var uname, upic;

  crr.map((user) => {
    (uname = user.name), (upic = user.avatar);
  });

  console.log('username', uname, upic);
  // console.log('getted data -aa > ',Doctorsget.name)

  //redux fee
  // const feesFromModal = useSelector((state) => state?.ExercisesReducer?.crrprice);

  // console.log('fee modal' ,feesFromModal)


  const DATA = {
    appointmentType:'consultation',
    uid: auth?.currentUser?.uid,
    userpic: upic,
    username: uname,
    DocID: Doctorsget.uid,
    DocName: Doctorsget.name,
    Docpic: Doctorsget.avatar,
    fee: Doctorsget.fee,
    // Day: Day,
    status: 'pending',
    slotTime: slotselectedTime,
    reason: reason,
    selectedDate: selectedDate,
    createAt: Timestamp.fromDate(new Date()),
  }

  // console.log('data --->',DATA)
 
  const dispatch = useDispatch();

  const datajaiga=()=>{
    // alert(v)
    props.callbacks(DATA)
    // dispatch(getTrainerPlan(plan));
    // console.log('plan hai')
    // console.log('fee andr se ',feees)
  }
  // console.log('fee bhr se ',feees)



  // const currentuid = auth?.currentUser?.uid;
  // const AddSlotsInDB = async () => {
  //   try {
  //     await addDoc(collection(db, 'appointment'), {
  //       appointmentType: 'consultation',
  //       uid: auth?.currentUser?.uid,
  //       userpic: upic,
  //       username: uname,
  //       DocID: Doctorsget.uid,
  //       DocName: Doctorsget.name,
  //       Docpic: Doctorsget.avatar,
  //       fee: Doctorsget.fee,
  //       // Day: Day,
  //       status: 'pending',
  //       slotTime: slotselectedTime,
  //       reason: reason,
  //       selectedDate: selectedDate,
  //       createAt: Timestamp.fromDate(new Date()),
  //     });
  //     alert('Appointment Added');
  //   } catch (error) {
  //     alert('Data Not Sent' + error);
  //   }
  // };
  // console.log('val op', Day);
  // console.log('datepicker', selectedDate);

  //payment ka kaaaaaam



  
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={props.show}
        style={{ boxShadow: 'none' }}
      >
        <TabContent activeTab={selectedRadio}>
          <TabPane tabId="0">
            <ModalHeader closeButton>
              Add Appointment with{' '}
              <span style={{ color: 'green', textTransform: 'capitalize' }}>
                {Doctorsget.name}
              </span>
              <Button
                onClick={props.onHide}
                outline
                style={{ marginLeft: '40px', color: 'red', borderColor: 'red' }}
              >
                Close
              </Button>
            </ModalHeader>
            <ModalBody>
              <div className="row px-3">
                <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                  <div
                    className="row"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <div className="col-lg-6">
                      <span className="label-name-login">Date</span>
                      <input
                        className="input-login-modal"
                        type="date"
                        min={disablePastDate()}
                        // onChange={() => changeDoctorHanler(doctor)}
                        onChange={(e) => setselectedDate(e.target.value)}
                        // {...register('date', {
                        //   required: {
                        //     value: true,
                        //     message: 'this field is required field',
                        //   },
                        // })}
                        value={selectedDate}
                      />
                      {errors?.date?.message ? (
                        <div className="text-error">
                          {errors?.date?.message}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {/* <div>
                      <span className="label-name-login">Select Day</span>
                      <select
                        className="input-login-modal"
                        defaultValue={selectDay[0]}
                        onChange={(e) => setDay(e.target.value)}
                        // custom
                        // {...register('day', {})}
                      >
                        {selectDay?.map((item, index) => (
                          <option value={item?.label} key={index + 1}>
                            {item?.label}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div>
                      <span className="label-name-login">Select Slot</span>
                      <select
                        className="input-login-modal"
                        // defaultValue={selectDay[0]}
                        // custom
                        // {...register('day', {})}
                        onChange={(e) => setslotTime(e.target.value)}
                      >
                        <option value="8am-2pm">Morning</option>
                        <option value="2pm-8pm">Evening</option>
                      </select>
                    </div>
                    <div>
                      <span className="label-name-login">Select Time</span>
                      <select
                        className="input-login-modal"
                        // defaultValue={selectDay[0]}
                        // custom
                        // {...register('day', {})}
                        onChange={(e) => setslotselectedTime(e.target.value)}
                      >
                        {slotTime === '8am-2pm' ? (
                          <>
                            <option value="8am-9am">8am-9am</option>
                            <option value="9am-10am">9am-10am</option>
                            <option value="10am-11am">10am-11am</option>
                            <option value="11am-12pm">11am-12pm</option>
                            <option value="12pm-1pm">12pm-1pm</option>
                            <option value="1pm-2pm">1pm-2pm</option>
                          </>
                        ) : slotTime === '2pm-8pm' ? (
                          <>
                            <option value="2pm-3pm">2pm-3pm</option>
                            <option value="3pm-4pm">3pm-4pm</option>
                            <option value="4pm-5pm">4pm-5pm</option>
                            <option value="5pm-6pm">5pm-6pm</option>
                            <option value="6pm-7pm">6pm-7pm</option>
                            <option value="7pm-8pm">7pm-8pm</option>
                          </>
                        ) : (
                          ''
                        )}
                      </select>
                    </div>
                    {/* <div className="col-lg-12">
                      <span className="label-name-login">Slots</span>
                      <FormGroup>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          options={answerTypes}
                          // value={state.category}
                          onChange={(t) => setSlot(t)}
                        />
                      </FormGroup>
                    </div> */}
                    <div className="col-lg-12">
                      <span className="label-name-login">Reason</span>
                      <textarea
                        className="input-login-modal"
                        style={{ minHeight: '100px' }}
                        type="text"
                        value={reason}
                        onChange={(e) => setreason(e.target.value)}
                        // {...register('description', {
                        //   required: {
                        //     value: false,
                        //     message: 'this field is required field',
                        //   },
                        // })}
                      />
                      {errors?.description?.message ? (
                        <div className="text-error">
                          {errors?.description?.message}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>{' '}
                  </div>
                  <Button
                    onClick={() => {
                      // AddSlotsInDB(),
                      datajaiga();
                      // setSelectedRadio('1');
                      props.onHide();
                      toast.info("Your Appointment Has Been Added To Payment Card Please Proceed To Checkout For Successfull Appointment")
                    
                    }}
                  >
                    Proceed to Pay
                  </Button>
                </form>
              </div>
            </ModalBody>
          </TabPane>
        </TabContent>
      </Modal>
    </>
  );
};

// export default AddAppointments;
