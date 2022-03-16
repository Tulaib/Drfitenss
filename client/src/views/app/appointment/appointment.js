/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  CustomInput,
  FormGroup,
  Row,
  TabContent,
  Table,
  TabPane,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import src from '../../../Images/lap-consul/1.JPG';
import src1 from '../../../Images/lap-consul/2.JPG';
import src2 from '../../../Images/lap-consul/3.JPG';
import { Link, NavLink } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from 'firebase';
import moment from 'moment';
import { string } from 'prop-types';

const Appointment = ({ match }) => {
  const [selectedRadio, setSelectedRadio] = useState('1');
  const [activeSecondTab, setActiveSecondTab] = useState('1');

  // const Appointments = [
  //   {
  //     id: 1,
  //     imgSrc: src,
  //     label: 'DR. SHAHEDA ANWAR',
  //     details: '10:00 12:30 1:00 1:30 2:00 2:30 3:00',
  //     fee: 2000,
  //     star: 1,
  //     sex: 'Female',
  //     Day: 'monday',
  //     time: '2:00-2:00pm',
  //     status: 'pending',
  //   },
  //   {
  //     id: 2,
  //     imgSrc: src1,
  //     label: 'DR. ASLAM PATHAN',
  //     details: '10:00 12:30 1:00 1:30 2:00 2:30 3:00',
  //     fee: 10000,
  //     star: 1,
  //     sex: 'Male',
  //     Day: 'monday',
  //     time: '2:00-2:00pm',
  //     status: 'approved',
  //   },
  //   {
  //     id: 3,
  //     imgSrc: src1,
  //     label: 'DR. ASLAM PATHAN',
  //     details: '10:00 12:30 1:00 1:30 2:00 2:30 3:00',
  //     fee: 10000,
  //     star: 1,
  //     sex: 'Male',
  //     Day: 'monday',
  //     time: '2:00-2:00pm',
  //     status: 'approved',
  //   },
  //   {
  //     id: 1,

  //     imgSrc: src1,
  //     label: 'DR. ASLAM PATHAN',
  //     details: '10:00 12:30 1:00 1:30 2:00 2:30 3:00',
  //     fee: 10000,
  //     star: 1,
  //     sex: 'Male',
  //     Day: 'monday',
  //     time: '2:00-2:00pm',
  //     status: 'approved',
  //   },
  //   {
  //     id: 1,

  //     imgSrc: src2,
  //     label: 'DR. Tullu ',
  //     details: '10:00 12:30 1:00 1:30 2:00 2:30 3:00',
  //     fee: 4000,
  //     star: 1,
  //     sex: 'Male',
  //     Day: 'monday',
  //     time: '2:00-2:00pm',
  //     status: 'rejected',
  //   },
  //   {
  //     id: 1,

  //     imgSrc: src2,
  //     label: 'DR. Tullu ',
  //     details: '10:00 12:30 1:00 1:30 2:00 2:30 3:00',
  //     fee: 4000,
  //     star: 1,
  //     sex: 'Male',
  //     Day: 'monday',
  //     time: '2:00-2:00pm',
  //     status: 'rejected',
  //   },
  // ];

  const [Appointments, setAppointments] = useState([]);
  const [userID,setUserID] = useState(auth?.currentUser?.uid)

  useEffect(() => {
    GetDataofAppointment();
    // setUserID(auth?.currentUser?.uid)
  }, []);

  console.log('id ',userID)
  const GetDataofAppointment = async () => {
    const collectionRef = collection(db, 'appointment');
    const q = query(collectionRef, where('uid', '==',`${auth?.currentUser?.uid}` ));
    const snapshot = await getDocs(q);
    const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setAppointments(result);
  };
  console.log('result --- >', Appointments);

  return (
    <>
      {/* <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Appointments" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row> */}
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              {/* <CardTitle>Appointments Status</CardTitle> */}
              <div className="mb-4 text-center">
                <ButtonGroup>
                  <Button
                    color="success"
                    outline
                    onClick={() => setSelectedRadio('1')}
                    active={selectedRadio === '1'}
                  >
                    Pending
                  </Button>
                  <Button
                    color="success"
                    outline
                    onClick={() => setSelectedRadio('2')}
                    active={selectedRadio === '2'}
                  >
                    Approved{' '}
                  </Button>
                  <Button
                    color="success"
                    outline
                    onClick={() => setSelectedRadio('3')}
                    active={selectedRadio === '3'}
                  >
                    Rejected{' '}
                  </Button>
                </ButtonGroup>
                <Button
                    color="success"
                    outline
                    onClick={() => setSelectedRadio('4')}
                    active={selectedRadio === '4'}
                  >
                    See My Subscriptions
                  </Button>
              </div>
              <TabContent activeTab={selectedRadio}>
                <TabPane tabId="1">
                  <Row>
                    <Colxx sm="12" lg="12">
                      <Card className="mb-4">
                        <CardBody>
                          <CardTitle>Pending Appointments</CardTitle>
                          <Table hover responsive>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th></th>
                                <th>Doctor Name</th>
                                <th>Appoitment Date</th>
                                <th>Appoitment Time</th>
                                <th>Created AT</th>
                                <th>Status</th>
                                <th>Fee</th>
                                {/* <th>Action</th> */}
                              </tr>
                            </thead>
                            {Appointments &&
                              Appointments.filter(
                                (item) => item.status === 'pending'
                              ).map((item, index) => {
                                var t = item.createAt
                                t = new Date()
                                var a = String(t)
                                // console.log('im a',a)
                                return (
                                  <>
                                    <tbody>
                                      <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>
                                          <img
                                            src={item?.Docpic}
                                            width="50px"
                                            height="50px"
                                            style={{ borderRadius: '50%' }}
                                          />
                                        </td>
                                        <td className="pt-50">
                                          {item.DocName}
                                        </td>
                                        <td>
                                          {item.selectedDate} {item?.Day}
                                        </td>
                                        <td>{item.slotTime}</td>
                                        <td>{a}</td>
                                        <td>{item.status}</td>
                                        <td>{item.fee}</td>
                                        <td>
                                          {item.status === 'pending' ? (
                                            <></>
                                            // <Button
                                            //   style={{
                                            //     height: '20px',
                                            //     padding: 10,
                                            //     paddingTop: 0,
                                            //   }}
                                            //   outline
                                            // >
                                            //   Cancel
                                            // </Button>
                                          ) : (
                                            <Link to="/app/chatInbox">
                                              <Button
                                                style={{
                                                  height: '20px',
                                                  padding: 10,
                                                  paddingTop: 0,
                                                }}
                                                outline
                                              >
                                                Chat
                                              </Button>
                                            </Link>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </>
                                );
                              })}{' '}
                          </Table>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Colxx sm="12" lg="12">
                      <Card className="mb-4">
                        <CardBody>
                          <CardTitle>Approved By Doctor/Trainer</CardTitle>
                          <Table hover responsive>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th></th>
                                <th>Doctor Name</th>
                                <th>Appoitment Date</th>
                                <th>Appoitment Time</th>
                                <th>Status</th>
                                <th>Fee</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {Appointments &&
                              Appointments.filter(
                                (item) => item.status === 'approved'
                              ).map((item, index) => {
                                return (
                                  <>
                                    <tbody>
                                      <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>
                                          <img
                                            src={item?.Docpic}
                                            width="50px"
                                            height="50px"
                                            style={{ borderRadius: '50%' }}
                                          />
                                        </td>
                                        <td className="pt-50">
                                          {item.DocName}
                                        </td>
                                        <td>
                                          {item.selectedDate} {item?.Day}
                                        </td>
                                        <td>{item.slotTime}</td>
                                        <td>{item.status}</td>
                                        <td>{item.fee}</td>
                                        <td>
                                          {item.status === 'pending' ? (
                                            <Button>Cancel</Button>
                                          ) : (
                                            <Link to="/app/chatInbox">
                                              <Button
                                                style={{
                                                  height: '20px',
                                                  padding: 10,
                                                  paddingTop: 0,
                                                }}
                                                outline
                                              >
                                                Chat
                                              </Button>
                                            </Link>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </>
                                );
                              })}{' '}
                          </Table>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Colxx sm="12" lg="12">
                      <Card className="mb-4">
                        <CardBody>
                          <CardTitle>Rejected By Doctor/Trainer</CardTitle>
                          <Table hover responsive>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th></th>
                                <th>Doctor Name</th>
                                <th>Appoitment Date</th>
                                <th>Appoitment Time</th>
                                <th>Status</th>
                                <th>Fee</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {Appointments &&
                              Appointments.filter(
                                (item) => item.status === 'rejected'
                              ).map((item, index) => {
                                return (
                                  <>
                                    <tbody>
                                      <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>
                                          <img
                                            src={item?.Docpic}
                                            width="50px"
                                            height="50px"
                                            style={{ borderRadius: '50%' }}
                                          />
                                        </td>
                                        <td className="pt-50">
                                          {item.DocName}
                                        </td>
                                        <td>
                                          {item.selectedDate} {item?.Day}
                                        </td>
                                        <td>{item.slotTime}</td>
                                        <td>{item.status}</td>
                                        <td>{item.fee}</td>
                                        <td>
                                          {item.status === 'rejected' ? (
                                            <Link to="/app/chatInbox">
                                            <Button
                                              style={{
                                                height: '20px',
                                                padding: 10,
                                                paddingTop: 0,
                                              }}
                                              outline
                                            >
                                              Reason
                                            </Button>
                                          </Link>
                                          ) : (
                                            <Link to="/app/chatInbox">
                                            <Button
                                              style={{
                                                height: '20px',
                                                padding: 10,
                                                paddingTop: 0,
                                              }}
                                              outline
                                            >
                                              Chat
                                            </Button>
                                          </Link>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </>
                                );
                              })}{' '}
                          </Table>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Colxx sm="12" lg="12">
                      <Card className="mb-4">
                        <CardBody>
                          <CardTitle>Subscriptions with Trainers</CardTitle>
                          <Table hover responsive>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th></th>
                                <th>Trainer Name</th>
                                <th>Subscription plan</th>
                                <th>Paid Fee</th>
                                <th>Month</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {Appointments &&
                              Appointments.filter(
                                (item) => item.appointmentType === 'trainer'
                              ).map((item, index) => {
                                // var epoc= new Date(item.createAt.seconds*1000)
                                return (
                                  <>
                                    <tbody>
                                      <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>
                                          <img
                                            src={item?.Docpic}
                                            width="50px"
                                            height="50px"
                                            style={{ borderRadius: '50%' }}
                                          />
                                        </td>
                                        <td className="pt-50">
                                          {item.DocName}
                                        </td>
                                        <td>
                                          {item.plan} 
                                        </td>
                                        <td>{item.fee}</td>
                                        <td>{item.createAt*1000}</td>
                                        <td>
                                          {item.status === 'pending' ? (
                                            <Button>Cancel</Button>
                                          ) : (
                                            <Link to="/app/chatInbox">
                                              <Button
                                                style={{
                                                  height: '20px',
                                                  padding: 10,
                                                  paddingTop: 0,
                                                }}
                                                outline
                                              >
                                                Chat
                                              </Button>
                                            </Link>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </>
                                );
                              })}{' '}
                          </Table>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Appointment;

const ImageCardList = (props) => {
  return (
    <Row>
      <Colxx xxs="12">
        <Row>
          <Colxx xxs="12">
            <Card className="d-flex flex-row mb-3">
              <NavLink to="#" location={{}} className="d-flex">
                <img
                  alt="Thumbnail"
                  src={props.image}
                  className="list-thumbnail responsive border-0 card-img-left"
                />
              </NavLink>
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <NavLink to="#" location={{}} className="w-40 w-sm-100">
                    <p className="list-item-heading mb-1 truncate">
                      {props.mainTitle}
                    </p>
                  </NavLink>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100 text-uppercase">
                    {props.day}
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    {props.time}
                  </p>
                  <div className="w-15 w-sm-100">
                    <Badge color="danger" pill>
                      {props.status}
                    </Badge>
                  </div>
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <p className="mt-3 text-muted text-small w-300 w-sm-100">
                    {props.fee}.Rs
                  </p>
                </div>
                {props.status === 'pending' ? (
                  <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <Button>Cancel</Button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};
