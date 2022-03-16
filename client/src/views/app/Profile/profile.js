// /*eslint-disable */
// import React from 'react';
// import { Row } from 'reactstrap';
// import { Colxx, Separator } from 'components/common/CustomBootstrap';
// import Breadcrumb from 'containers/navs/Breadcrumb';
// import imgss from '../../../Images/lap-consul/1.JPG'

// const Profile = ({ match }) => {

//   const ProfileData = [
//     {
//       imgsrc:imgss,
//       Name:'tulaib'
//     }
//   ]

//   return (
//     <>
//       <Row>
//         <Colxx xxs="12">
//           <Breadcrumb heading="Profile" match={match} />
//           <Separator className="mb-5" />
//         </Colxx>
//       </Row>
//       <Row>
//         <Colxx xxs="12" className="mb-4">
//           <div style={{width:'200px',heiht:'200px'}}>
//           <img src={ProfileData.imgsrc} width="100%" heigth="100%"/>
//           </div>
//           <div>
//             <h2>{ProfileData.Name}</h2>
//           </div>
//         </Colxx>
//       </Row>
//     </>
//   );
// };

// export default Profile;

/* eslint-disable */
// import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  ButtonGroup,
  CardBody,
  Col,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  Row,
  Table,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
// import Loader from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import logo from '../../../Images/abcd.jpeg';
import { Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import IconCards from 'containers/ui/IconCards';
import { Colxx } from 'components/common/CustomBootstrap';
import Appoint from '../appointment/appointment';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from 'firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

export default function Profile({ match }) {
  // const [user, setUser] = useStadte();
  const [img, setImg] = useState('');
  const [counter, setcounter] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [chkdisease, setchkDisease] = useState('no');
  const [disease, setDisease] = useState('');
  const [injury, setInjury] = useState('');
  const [chkinjury, setchkInjury] = useState('no');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState(0);
  const [count, setcount] = useState(1);
  useEffect(() => {
    GetDataofAppointment();
    GetDataofAppointmentGet();
    // setUserID(auth?.currentUser?.uid)
  }, []);

  //user
  const [Appointments, setAppointments] = useState([]);
const [AppointmentsGet, setAppointmentsGet] = useState([]);

const GetDataofAppointment = async () => {
  const collectionRef = collection(db, 'appointment');
  const q = query(
    collectionRef,
    where('uid', '==', `${auth?.currentUser?.uid}`)
  );
  const snapshot = await getDocs(q);
  const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  setAppointments(result);
};
// console.log(Appointments.length,'apttt')
const GetDataofAppointmentGet = async () => {
  const collectionRef = collection(db, 'appointment');
  const q = query(
    collectionRef,
    where('uid', '==', `${auth?.currentUser?.uid}`)
  );
  const snapshot = await getDocs(q);
  const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  setAppointmentsGet(result);
};

let sum = AppointmentsGet.reduce(function(prev, current) {
  return prev + +current.fee
}, 0);

console.log('sum',sum)
const [users, setUsers] = useState([]);

var user = users[0]

const GetDataofCurrent = async () => {
  const collectionRef = collection(db, 'users');
  const q = query(
    collectionRef,
    where('uid', '==', `${auth?.currentUser?.uid}`)
  );
  const snapshot = await getDocs(q);
  const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  setUsers(result);
};

var round = user?.bmi
 //endUSer
  // useEffect(()=>{

  // },[])

  useEffect(() => {
    GetDataofCurrent()

    setcounter(counter + 1);
    // console.log('user == >', user);
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img?.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          console.log('url -> ', url);
          setImg('');
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
    //  onAuthStateChanged(auth,(user)=>{
    //   setUser(user)
    //  })
  }, [img]);

  // console.log(user, ' <--user');
  // console.log('img== ', img);

  const CurrentProduct = '';

  const [act, setact] = useState(false);
  let [buttonName, setButtonName] = useState();
  const [thisView, setThisView] = useState(true);

  let [suspendloader, setsuspendloader] = useState(false);

  const editProfile = (e) => {
    e.preventDefault();
    setThisView(!thisView);
  };

  const deleteImage = async () => {
    try {
      const confirm = window.confirm('Delete avatar?');
      if (confirm) {
        await deleteObject(ref(storage, user?.avatarPath));

        await updateDoc(doc(db, 'users', auth?.currentUser?.uid), {
          avatar: '',
          avatarPath: '',
        });
        history.replace('/');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="My Profile" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Card>
        <CardBody>
          <div style={{ marginBottom: '30px' }}></div>
          <Formik>
            <Form>
              <Row className="h-100">
                <Col lg={12} className="mb-3">
                  <div className="d-flex p-3">
                    {/* <img
                  src={  
                    user?.display_picture === '' ? logo : user?.display_picture
                  }
                  alt=""
                  className="img-fluid"
                /> */}
                    <img
                      src={user?.avatar || logo}
                      alt="avatar"
                      width="200px"
                      height="200px"
                      style={{
                        objectFit: 'contain',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                  <Label>Change Profile Picture</Label>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      Upload
                    </InputGroupAddon>
                    <input
                      type="file"
                      id="exampleCustomFileBrowser1"
                      name="customFile"
                      accept="image/*"
                      id="photo"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </InputGroup>
                  {/* <button onClick={deleteImage}>X</button> */}
                </Col>

                {thisView ? (
                  <>
                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Name</Label>
                        <Field
                          className="form-control"
                          name="name"
                          value={user?.name}
                          disabled
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Email</Label>
                        <Field
                          className="form-control"
                          name="email"
                          value={user?.email}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Password</Label>
                        <Field
                          className="form-control"
                          name="password"
                          value={user?.password}
                          
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Age</Label>
                        <Field
                          className="form-control"
                          name="age"
                          value={user?.age}
                          disabled
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Height</Label>
                        <Field
                          className="form-control"
                          name="feet"
                          value={user?.height}
                          disabled
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Weight</Label>
                        <Field
                          className="form-control"
                          name="weight"
                          value={user?.weight}
                          disabled
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Gender</Label>
                        <Field
                          className="form-control"
                          name="Gender"
                          value={user?.gender}
                          disabled
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>BMI</Label>
                        <Field
                          className="form-control"
                          name="bmi"
                          value={user?.bmi}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </>
                ) : (
                  <>
                        <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Name</Label>
                        <Field
                          className="form-control"
                          name="name"
                          value={user?.name}
                          onChange={(e)=>setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Email</Label>
                        <Field
                          className="form-control"
                          name="email"
                          value={user?.email}
                          
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Password</Label>
                        <Field
                          className="form-control"
                          name="password"
                          value={user?.password}
                          
                          
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Age</Label>
                        <Field
                          className="form-control"
                          name="age"
                          value={user?.age}
                          
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Height</Label>
                        <Field
                          className="form-control"
                          name="feet"
                          value={user?.height}
                          
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Weight</Label>
                        <Field
                          className="form-control"
                          name="weight"
                          value={user?.weight}
                          
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>Gender</Label>
                        <Field
                          className="form-control"
                          name="Gender"
                          value={user?.gender}
                          
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4}>
                      <FormGroup className="form-group has-float-label">
                        <Label>BMI</Label>
                        <Field
                          className="form-control"
                          name="bmi"
                          value={user?.bmi}
                          
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Label>
                          <IntlMessages id="Save info" />
                        </Label>

                        <ButtonGroup>
                          <Button
                            required
                            className="form-control"
                            name="barcode"
                            // value={product?.barcode}
                            // onChange={(e) =>
                            //   setProduct({ ...product, barcode: e.target.value })
                            // }
                          >
                            Submit
                          </Button>
                          <Button
                            style={{ backgroundColor: '#0066b3' }}
                            className="mr-3"
                            onClick={editProfile}
                          >
                            Back
                          </Button>
                        </ButtonGroup>
                      </FormGroup>
                    </Col>

                    {/* <Col lg={6}>
                    <div className="form-row">
                      <div className="form-group col-md-9">
                        <label className="">Select File :</label>
                        <input
                          type="file"
                          className="form-control"
                          name="upload_file"
                          // onChange={async (e) => {
                          //   await setFile(e.target.files);
                          // }}
                        />
                      </div>
                      <div
                        className="form-group col-md-3"
                        style={{ marginTop: '25px' }}
                      >
                        <Button
                          className={`btn-shadow btn-multiple-state ${
                            loadingFileUpload ? 'show-spinner' : ''
                          }`}
                          size="sm"
                          // onClick={uploadFile}
                          variant="outlined"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </Col> */}
                  </>
                )}
              </Row>

              {thisView ? (
                <Button
                  style={{ backgroundColor: '#0066b3' }}
                  className="mr-3"
                  onClick={editProfile}
                >
                  Edit Profile
                </Button>
              ) : (
                ''
                // <Button style={{ backgroundColor: '#0066b3' }} onClick={editData}>
                //   {loading ? (
                //     <div className="d-flex justify-content-center">
                //       <Loader height={18} width={18} type="Oval" color="#fff" />
                //       &nbsp; Updating
                //     </div>
                //   ) : (
                //     'Save'
                //   )}
                // </Button>
              )}
            </Form>
          </Formik>

          <Row className="icon-cards-row my-4 justify-content-center">
            <Colxx xxs="6" sm="4" md="3" lg="2">
              <IconCard
                title="Total Appointments"
                icon="iconsminds-testimonal"
                value={Appointments.length}
                className="mb-4"
              />
            </Colxx>
            <Colxx xxs="6" sm="4" md="3" lg="2">
              <IconCard
                title="Total Fees Paid in Rupees"
                icon="iconsminds-dollar"
                value={sum }
                className="mb-4"
              />
            </Colxx>
            <Colxx xxs="6" sm="4" md="3" lg="2">
              <IconCard
                title="BMI  "
                icon="iconsminds-jump-rope"
                value={Math.floor(round * 10)/10}
                className="mb-4"
              />
            </Colxx>
          </Row>
          {/* <Row className='w-100'> */}
          <Appoint />
          {/* </Row> */}
        </CardBody>
      </Card>
    </>
  );
}

const IconCard = ({ className = 'mb-4', icon, title, value }) => {
  return (
    <div className={`icon-row-item ${className}`}>
      <Card>
        <CardBody className="text-center">
          <i className={icon} />
          <p className="card-text font-weight-semibold mb-0">
            <IntlMessages id={title} />
          </p>
          <p className="lead text-center">{value}</p>
        </CardBody>
      </Card>
    </div>
  );
};
