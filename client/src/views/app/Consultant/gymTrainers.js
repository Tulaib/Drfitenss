/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import {Trainer} from './docANDconsultantData'
import ImageCards from 'containers/ui/ImageCards';
import { Link, NavLink } from 'react-router-dom';
import Rating from 'components/common/Rating';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from 'firebase';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPrice, getCurrentUser, getTrainerPlan } from 'redux/store/actions/exerciseInnerAction';
import Innerpayment from './innerpayment';
import { toast } from 'react-toastify';

const Trainers = ({ match }) => {

 
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
    callbacks()
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

  const callbacks = (values) =>{
    setAppointmentDataAll(values)
  }

  console.log("im parent my values : ",AppointmentDataAll?.fee)
  
  // var FeeOrig,FeeDoc ;
  // AppointmentDataAll.map((item)=> {FeeOrig = item.fee, FeeDoc = item.feeDoc})
  // console.log('Doctor ki Fee= ',FeeDoc,'Fee Original = ',FeeOrig)

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Appoint A Trainer" match={match} />
          <Separator className="mb-5" />
        </Colxx>
        <Colxx xxs="12" className="mb-4 d-flex justify-content-end">
          <div
            style={{
              width: '40%',
              borderRadius: 10,
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              padding: '20px',
            }}
          >
            <Innerpayment prices={AppointmentDataAll?.fee} allData={AppointmentDataAll}/>
          </div>
        </Colxx>
      </Row>
      <Row>
        <Colxx>
          <AddAppointments
            show={modalShow1}
            onHide={() => setModal1Show(false)}
            doc={docID}
            current={curruser}
            callbacks={callbacks}

          />
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
              <Row>
                {/* <Colxx sm="12" lg="12 "> */}
                {doctors &&
                  doctors
                    .filter((user) => user.userType === 'consultant')
                    .filter((user) => user.conType === 'trainer')
                    .map((user, index) => {
                      console.log('TT', user);
                      return (
                        <UserCards
                          mainTitle={user.name}
                          image={user?.avatar}
                          badge="Dr Fitness Recommended"
                          // day={user.Degree}
                          day={user.designation}
                          weekly={user.weekly}
                          monthly={user.Monthly}
                          yearly={user.Yearly}
                          rating={user.rating}
                          butt1={() => {
                            setModal1Show(true), handleid(user.uid);
                          }}
                          butt2={() => {
                            setModal2Show(true), handleid(user.id);
                          }}
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
                    .filter((user) => user.conType === 'trainer')
                    .filter((user) => user.gender === 'male')
                    .map((user, index) => {
                      return (
                        <UserCards
                          mainTitle={user.name}
                          image={user?.avatar}
                          badge="Dr Fitness Recommended"
                          // day={user.Degree}
                          day={user.designation}
                          weekly={user.weekly}
                          monthly={user.Monthly}
                          yearly={user.Yearly}
                          rating={user.rating}
                          butt1={() => {
                            setModal1Show(true), handleid(user.id);
                          }} // status={item.status}
                        />
                      );
                    })}
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                {/* <Colxx sm="12" lg="12"> */}
                {doctors &&
                  doctors
                    .filter((user) => user.userType === 'consultant')
                    .filter((user) => user.conType === 'trainer')
                    .filter((user) => user.gender === 'female')
                    .map((user, index) => {
                      return (
                        <UserCards
                          mainTitle={user.name}
                          image={user?.avatar}
                          badge="Dr Fitness Recommended"
                          // day={user.Degree}
                          day={user.designation}
                          weekly={user.weekly}
                          monthly={user.Monthly}
                          yearly={user.Yearly}
                          rating={user.rating}
                          butt1={() => {
                            setModal1Show(true), handleid(user.id);
                          }}
                          // status={item.status}
                        />
                      );
                    })}{' '}
                {/* </Colxx> */}
              </Row>
            </TabPane>
          </TabContent>
          {/* {Trainer.map((item) => {
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

export default Trainers;

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
                className="position-absolute badge-top-left"
              >
                Weekly: {props.weekly} Rs
              </Badge>
              <Badge
                color="info"
                pill
                className="position-absolute badge-top-left-2"
              >
                Monthly: {props.monthly} Rs
              </Badge>
              <Badge
                color="primary"
                pill
                className="position-absolute badge-top-left-3"
              >
                Yearly: {props.yearly} Rs
              </Badge>

              <CardImg
                top
                src={props.image}
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
              />
              <Link>
                <CardSubtitle className="mb-1">{props.mainTitle}</CardSubtitle>
                <RatingExamples star={props.rating} />
              </Link>
              <CardText className="text-muted text-small mb-4">
                {props.details}
              </CardText>
              <Button outline size="sm" color="primary" onClick={props.butt1}>
                see Plans
              </Button>
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

const AddAppointments = (props) => {


  const [Price, setPrice] = useState(0);
  const [plan, setPlan] = useState('Weekly');



  // const [singleSelections, setSingleSelections] = useState([]);
  // const [selectedRadio, setSelectedRadio] = useState('0');
  // const [doctor, setDoctor] = useState([]);
  // const [slot, setSlot] = useState([]);
  // const [reason, setreason] = useState('');

  // const selectDay = [
  //   { label: 'monday', value: 'monday', key: 1 },
  //   { label: 'tuesday', value: 'tuesday', key: 2 },
  //   { label: 'wednesday', value: 'wednesday', key: 3 },
  //   { label: 'thursday', value: 'thursday', key: 4 },
  //   { label: 'friday', value: 'friday', key: 5 },
  //   { label: 'saturday', value: 'saturday', key: 6 },
  //   { label: 'sunday', value: 'sunday', key: 7 },
  // ];
  // const [Day, setDay] = useState('');

  // const [selectedDate, setselectedDate] = useState('');
  // const [slotselectedTime, setslotselectedTime] = useState('');

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = async (data) => {
  //   const apiData = {
  //     date: date,
  //     description: data.description,
  //     slot: slot,
  //   };
  //   console.log('sub->', apiData);
  // };

  // const date = watch('date', props.date);

  // const disablePastDate = () => {
  //   const today = new Date();
  //   const dd = String(today.getDate() + 0).padStart(2, '0');
  //   const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   const yyyy = today.getFullYear();
  //   return yyyy + '-' + mm + '-' + dd;
  // };

  // var Doctorsget = props.doc;
  // var crr = props.current;

  // console.log('user', crr);
  // console.log('docotooror', Doctorsget);
  // var uname, upic;

  // crr.map((user) => {
  //   (uname = user.name), (upic = user.avatar);
  // });

  // console.log('username', uname, upic);
  // // console.log('getted data -aa > ',Doctorsget.name)

  // const AddSlotsInDB = async (values) => {
  //   try {
  //     await addDoc(collection(db, 'appointment'), {
  //       appointmentType: 'trainer',
  //       uid: auth?.currentUser?.uid,
  //       userpic: upic,
  //       username: uname,
  //       DocID: Doctorsget.uid,
  //       DocName: Doctorsget.name,
  //       Docpic: Doctorsget.avatar,
  //       // fee: Doctorsget.fee,
  //       plan:plan,
  //       price:Price,
  //       // status: 'pending',
  //       // slotTime: slotselectedTime,
  //       reason: reason,
  //       // selectedDate: selectedDate,
  //       createAt: Timestamp.fromDate(new Date()),
  //     });
  //     alert('Appointment Added');
  //   } catch (error) {
  //     alert('Data Not Sent' + error);
  //   }
  // };
  // console.log('val op', Day);
  // console.log('datepicker', selectedDate);


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

  // const sendFees = async (id,fee) => {

  //   await updateDoc(doc (db, 'appointment', id), {
  //    fee: Price,
  //  });
  // // console.log('idddddd====',id)
  // }

  const DATA = {
    appointmentType:'trainer',
    uid: auth?.currentUser?.uid,
    userpic: upic,
    username: uname,
    DocID: Doctorsget.uid,
    DocName: Doctorsget.name,
    Docpic: Doctorsget.avatar,
    fee: Price,
    feeDoc: Price*80/100,
    // Day: Day,
    plan:plan,
    // status: 'pending',
    slotTime: slotselectedTime,
    reason: reason,
    selectedDate: selectedDate,
    createAt: Timestamp.fromDate(new Date()),
  }

  const dispatch = useDispatch();

  // console.log('data --->',DATA)
  const feees = useSelector((state) => state?.ExercisesReducer?.crrprlan);

  const datajaiga=()=>{
      // alert(v)
      props.callbacks(DATA)
      dispatch(getTrainerPlan(plan));
      // console.log('plan hai')
      console.log('fee andr se ',feees)
    }
    console.log('fee bhr se ',feees)





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
                      <span className="label-name-login">Select Plan</span>
                      <select
                        className="input-login-modal"
                        onChange={(e) => setPlan(e.target.value)}
                        onClick={(e) => 
                          e.target.value === 'Weekly' ? setPrice(Doctorsget.weekly):
                          e.target.value === 'Monthly' ? setPrice(Doctorsget.Monthly):
                          e.target.value === 'Yearly' ? setPrice(Doctorsget.Yearly):
                          setPrice(0)
                        }>
                        <option value="Weekly">
                          Weekly
                        </option>
                        <option value="Monthly" >Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                      {/* <input
                        className="input-login-modal"
                        type="date"
                        min={disablePastDate()}
                        onChange={(e) => setselectedDate(e.target.value)}
                        value={selectedDate}
                      /> */}
                      {/* {errors?.date?.message ? (
                        <div className="text-error">
                          {errors?.date?.message}
                        </div>
                      ) : (
                        ''
                      )} */}
                    </div>
                    <div>
                      <span className="label-name-login">
                        Price : &nbsp;
                        <span
                          style={{ fontWeight: 'bold', color: 'darkgreen' }}
                        >
                          { Price }{' '}
                        </span>
                        rs
                      </span>
                    </div>
                    {/* <div>
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
                    </div> */}
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
                      datajaiga();
                      // AddSlotsInDB(), setSelectedRadio('1');
                      // sendFees(Doctorsget?.uid)
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
          <TabPane tabId="1">
            <ModalHeader closeButton>
              Payment Info
              <Button
                onClick={() => {
                  setSelectedRadio('0');
                }}
                outline
                style={{ marginLeft: '40px', color: 'red', borderColor: 'red' }}
              >
                Back
              </Button>
            </ModalHeader>
            <ModalBody>
              <div className="container">
                <div className="row">
                  <div className="col-md-7 col-lg-8">
                    <div className="card">
                      <div className="card-body">
                        <form action="/patient/booking-success">
                          <div className="info-widget">
                            <h4 className="card-title">Personal Information</h4>
                            <div className="row">
                              <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                  <label>First Name</label>
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                  <label>Last Name</label>
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                  <label>Email</label>
                                  <input
                                    className="form-control"
                                    type="email"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                  <label>Phone</label>
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="exist-customer">
                              Existing Customer?
                              <a
                                href="/template/patient/checkout"
                                style={{ color: 'skyblue' }}
                              >
                                Click here to login
                              </a>
                            </div>
                          </div>
                          <div className="payment-widget">
                            <h4 className="card-title">Payment Method</h4>
                            <div className="payment-list">
                              <label className="payment-radio credit-card-option">
                                <input type="radio" name="radio" checked="" />
                                <span className="checkmark"></span>Credit card
                              </label>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group card-label">
                                    <label for="card_name">Name on Card</label>
                                    <input
                                      className="form-control"
                                      id="card_name"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group card-label">
                                    <label for="card_number">Card Number</label>
                                    <input
                                      className="form-control"
                                      id="card_number"
                                      placeholder="1234  5678  9876  5432"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group card-label">
                                    <label for="expiry_month">
                                      Expiry Month
                                    </label>
                                    <input
                                      className="form-control"
                                      id="expiry_month"
                                      placeholder="MM"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group card-label">
                                    <label for="expiry_year">Expiry Year</label>
                                    <input
                                      className="form-control"
                                      id="expiry_year"
                                      placeholder="YY"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group card-label">
                                    <label for="cvv">CVV</label>
                                    <input
                                      className="form-control"
                                      id="cvv"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="payment-list">
                              <label className="payment-radio paypal-option">
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>Paypal
                              </label>
                            </div>
                            <div className="terms-accept">
                              <div className="custom-checkbox">
                                <input type="checkbox" id="terms_accept" />
                                <label for="terms_accept">
                                  I have read and accept{' '}
                                  <a href="#0" style={{ color: 'skyblue' }}>
                                    Terms Conditions
                                  </a>
                                </label>
                              </div>
                            </div>
                            <div className="submit-section mt-4">
                              <Button
                                // type="submit"
                                // className="btn btn-primary submit-btn"
                                onClick={() => {
                                  setSelectedRadio('2');
                                }}
                              >
                                Confirm and Pay
                              </Button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 col-lg-4 theiaStickySidebar">
                    <div className="card booking-card mb-0">
                      <div className="card-header m-2">
                        <h4 className="card-title mb-0">Booking Summary</h4>
                        <hr className="mb-0"></hr>
                      </div>
                      <div className="card-body">
                        <div style={{ display: '-webkit-box' }}>
                          <a
                            style={{ width: '80px', marginRight: 15 }}
                            href="/template/patient/doctor-profile"
                          >
                            {/* <img src={imgs} width="80px" alt="User" /> */}
                          </a>
                          <br />
                          <div className="booking-info">
                            <h4>
                              <a href="/template/patient/doctor-profile">
                                Dr. Darren
                              </a>
                            </h4>
                            <div className="rating">
                              <Rating
                                total={4}
                                rating={3}
                                interactive={false}
                              />
                            </div>
                            <div className="clinic-details">
                              <p className="doc-location">
                                <i className="fas fa-map-marker-alt"></i>{' '}
                                Newyork, USA
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="booking-summary">
                          <div className="booking-item-wrap">
                            <ul
                              style={{
                                padding: 0,
                                listStyle: 'none',
                                margin: 0,
                              }}
                            >
                              <li>
                                Date{' '}
                                <span
                                  style={{
                                    color: 'skyblue',
                                    fontSize: '16px',
                                    float: 'right',
                                  }}
                                >
                                  16 Nov 2019
                                </span>
                              </li>
                              <li>
                                Time{' '}
                                <span
                                  style={{
                                    color: 'lightgray',
                                    fontSize: '16px',
                                  }}
                                >
                                  10:00 AM
                                </span>
                              </li>
                            </ul>
                            <ul
                              style={{
                                padding: 0,
                                listStyle: 'none',
                                margin: 0,
                              }}
                            >
                              <li>
                                Consulting Fee{' '}
                                <span
                                  style={{
                                    color: 'lightgray',
                                    fontSize: '16px',
                                  }}
                                >
                                  $100
                                </span>
                              </li>
                              <li>
                                Booking Fee{' '}
                                <span
                                  style={{
                                    color: 'lightgray',
                                    fontSize: '16px',
                                  }}
                                >
                                  $10
                                </span>
                              </li>
                              <li>
                                Video Call{' '}
                                <span
                                  style={{
                                    color: 'lightgray',
                                    fontSize: '16px',
                                  }}
                                >
                                  $50
                                </span>
                              </li>
                            </ul>
                            <div
                              style={{
                                padding: 0,
                                listStyle: 'none',
                                margin: 0,
                              }}
                            >
                              <ul
                                style={{
                                  padding: 0,
                                  listStyle: 'none',
                                  margin: 0,
                                }}
                              >
                                <li>
                                  <span>Total</span>
                                  <span
                                    style={{
                                      color: 'skyblue',
                                      fontSize: '16px',
                                      float: 'right',
                                    }}
                                  >
                                    $160
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </TabPane>
          <TabPane tabId="2">
            <ModalHeader>
              <h3>Appointment booked Successfully!</h3>
              <Button
                onClick={props.onHide}
                outline
                style={{ marginLeft: '40px', color: 'red', borderColor: 'red' }}
              >
                Close
              </Button>
            </ModalHeader>
            <ModalBody>
              <div class="success-cont">
                <i class="fas fa-check"></i>
                <p>
                  Appointment booked with <strong>Dr. Darren Elder</strong>
                  <br /> on <strong>12 Nov 2019 5:00PM to 6:00PM</strong>
                </p>
                <a
                  class="btn btn-primary view-inv-btn"
                  href="/template/pages/invoice-view"
                >
                  View Invoice
                </a>
              </div>
            </ModalBody>
          </TabPane>
        </TabContent>
      </Modal>
    </>
  );
};
