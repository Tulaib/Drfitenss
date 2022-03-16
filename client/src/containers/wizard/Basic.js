/* eslint-disable */
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import TopNavigation from 'components/wizard/TopNavigation';
import { Select } from '@material-ui/core';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from 'firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { collection, Timestamp } from 'firebase/firestore';
import { InserCollection } from 'redux/store/actions/exerciseInnerAction';
import { firebaseConfig } from 'constants/defaultValues';
import { func } from 'prop-types';

const Basic = ({ intl }) => {
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

  const [validate, setValidate] = useState({ emailState: '' });

  function validateEmail(e) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }
    setValidate(validate);
  }

  const dispatch = useDispatch();
  const feedbackCollection = collection(db, 'user');

  async function Register() {
    await signup(email, password);
  }

  const apidata = {
    name: name,
    email: email,
    password: password,
    age: age,
    height: height,
    weight: weight,
    disease: disease,
    injury: injury,
    gender: gender,
    bmi: bmi,
  };
  const history = useHistory();

  const onSubmit = async (values) => {
    // dispatch(InserCollection('user', values));
    console.log(apidata, 'api');
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name: name,
        email: email,
        password: password,
        age: age,
        height: height,
        weight: weight,
        disease: disease,
        injury: injury,
        gender: gender,
        bmi: bmi,
        createAt: Timestamp.fromDate(new Date()),
        isOnline: true,
        userType: 'user',
      });
      alert('Information Saved Now You Can Log in to Our System');
      history.replace('/app/profile/Profile')
    } catch (error) {
      alert('Data Not Sent',error );
    }
  };

  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
    setcount(count + 1);
    // console.log('cont',count)
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const { messages } = intl;

  const calculate = () => {
    const bmi = +weight / (+height) ** 2;
    setBmi(bmi);
    let bmiResults = '';
    if (bmi <= 18.5) {
      bmiResults = 'Underweight';
    } else if (bmi <= 24.9) {
      bmiResults = 'Normal weight';
    } else if (bmi <= 29.9) {
      bmiResults = 'Overweight';
    } else if (bmi >= 30) {
      bmiResults = 'Obesity';
    } else {
      bmiResults = 'BMI';
    }
  };

  console.log('bmi -- >', bmi);

  return (
    <Card>
      <CardBody className="wizard wizard-default">
        <Wizard>
          <TopNavigation
            className="justify-content-center"
            disableNav={false}
            topNavClick={topNavClick}
          />
          <Steps>
            <Step
              id="step1"
              name={messages['wizard.step-name-1']}
              desc={messages['wizard.step-desc-1']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Ahmed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Ahmed@gmail.com"
                      value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      valid={validate.emailState === 'has-success'}
                      invalid={validate.emailState === 'has-danger'}
                      value={email}
                      onChange={(e) => {
                        validateEmail(e);
                        setEmail(e.target.value) 
                      }}
                    />
                    <FormFeedback>
                      Uh oh! Looks like there is an issue with your email.
                      Please input a correct email. 
                    </FormFeedback>
                    <FormFeedback valid>
                      That's a tasty looking email you've got there.
                    </FormFeedback>
                    <FormText>
                      Your username is most likely your email.
                    </FormText>
                    <Label>password</Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="******"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <h6 style={{ color: 'gray', fontSize: '12px' }}>
                      Min 6 characters
                    </h6>
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step
              id="step2"
              name={messages['wizard.step-name-2']}
              desc={messages['wizard.step-desc-2']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                    <Label>Age</Label>
                    <Input
                      type="number"
                      name="age"
                      placeholder="20"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <Label>height</Label>
                    <Input
                      type="number"
                      name="height"
                      placeholder="Enter a in meter"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <Label>weight</Label>
                    <Input
                      type="number"
                      name="weight"
                      placeholder="Enter a in kgs"
                      value={weight}
                      onChange={(e) => {
                        setWeight(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step
              id="step3"
              name={messages['wizard.step-name-3']}
              desc={messages['wizard.step-desc-3']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                    <Label>Gender</Label>
                    <select
                      name="gender"
                      className="form-control"
                      onChange={(e) => {
                        setGender(e.target.value);
                        calculate();
                      }}
                    >
                      <option value="">Select an option..</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">other</option>
                    </select>

                    <Label>Disease</Label>

                    <select
                      name="disease"
                      className="form-control"
                      onChange={(e) => setchkDisease(e.target.value)}
                    >
                      <option value="">Do you have any disease</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>

                    {chkdisease === 'yes' ? (
                      <>
                        <Label>Please Specify your disease</Label>
                        <Input
                          type="text"
                          name="disease"
                          placeholder="ulcer, cardiac, asthama"
                          value={disease}
                          onChange={(e) => setDisease(e.target.value)}
                        />
                      </>
                    ) : null}
                    {/* <Input
                      type="text"
                      name="disease"
                      placeholder="ulcer, cardiac, asthama"
                      value={disease}
                      onChange={(e) => setDisease(e.target.value)}
                    /> */}
                    <Label>Injury</Label>

                    <select
                      name="injury"
                      className="form-control"
                      onChange={(e) => setchkInjury(e.target.value)}
                    >
                      <option value="">Do you have any Injury</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>

                    {chkinjury === 'yes' ? (
                      <>
                        <Label>Please Specify your Injury</Label>
                        <Input
                          type="text"
                          name="Injury"
                          placeholder="Knee pain, back pain , shoulder disability"
                          value={injury}
                          onChange={(e) => setInjury(e.target.value)}
                        />
                      </>
                    ) : null}
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step id="step4" hideTopNav>
              <div className="wizard-basic-step text-center">
                {/* <h2 className="mb-2">
                  <IntlMessages id="wizard.content-thanks" />
                </h2> */}

                <p>
                  <Weight
                    bmi={bmi}
                    check={chkdisease}
                    disease={disease}
                    chkinjury={chkinjury}
                    injury={injury}
                  />
                  {/* <IntlMessages id="wizard.registered" /> */}
                </p>
                <Button
                  onClick={() => {
                    onSubmit(apidata);
                  }}
                  outline
                >
                  Save My Information
                </Button>
              </div>
            </Step>
          </Steps>
          {/* {count <= 3 ? ( */}
            <BottomNavigation
              onClickNext={onClickNext}
              onClickPrev={onClickPrev}
              className="justify-content-center"
              prevLabel={messages['wizard.prev']}
              nextLabel={messages['wizard.next']}
            />
          {/* ) : (
            ''
          )} */}
        </Wizard>
      </CardBody>
    </Card>
  );
};

function Weight(props) {
  if (props.bmi <= 18.5) {
    return (
      <div>
        <CardTitle className="p-0">BMI {props.bmi}</CardTitle>
        <CardBody className="p-0">
          <p>Your Weight is Too Low, we sugess you to Gain some weight</p>
          {props.check === 'yes' ? (
            <>
              <p>
                You specify this disease
                <span style={{ color: 'green' }}> {props.disease}</span> We
                recommend you to consult doctor before trying any of our
                exercises.
              </p>
            </>
          ) : (
            ''
          )}
          {props.chkinjury === 'yes' ? (
            <>
              <p>
                You specify this Injury
                <span style={{ color: 'green' }}> {props.injury}</span> We
                recommend you to consult doctor/trainer before trying any of our
                exercises.
              </p>
            </>
          ) : (
            ''
          )}
          {props.check === 'yes' || props.chkinjury === 'yes' ? (
            <Link
              to="/app/Consultant/doctors"
              className="btn btn-outline-success"
            >
              See Cosnultant
            </Link>
          ) : (
            <Link
              to="/app/exercise/exerciseGain"
              className="btn btn-outline-success"
            >
              See Gain Diet Plans and Exercises
            </Link>
          )}
        </CardBody>
      </div>
    );
  } else if (props.bmi <= 24.9) {
    return (
      <div>
        <CardTitle className="p-0">BMI {props.bmi}</CardTitle>
        <CardBody className="p-0">
          <p>Your Weight is Normal, we sugesst you to Maintain weight</p>
          {props.check === 'yes' ? (
            <>
              <p>
                You specify this disease
                <span style={{ color: 'green' }}> {props.disease}</span> We
                recommend you to consult doctor before trying any of our
                exercises.
              </p>
            </>
          ) : (
            ''
          )}
          {props.chkinjury === 'yes' ? (
            <>
              <p>
                You specify this Injury
                <span style={{ color: 'green' }}> {props.injury}</span> We
                recommend you to consult doctor/trainer before trying any of our
                exercises.
              </p>
            </>
          ) : (
            ''
          )}
          {props.check === 'yes' || props.chkdisease === 'yes' ? (
            <Link
              to="/app/Consultant/doctors"
              className="btn btn-outline-success"
            >
              See Cosnultant
            </Link>
          ) : (
            <Link
              to="/app/exercise/exerciseGain"
              className="btn btn-outline-success"
            >
              See Gain Diet Plans and Exercises
            </Link>
          )}
        </CardBody>
      </div>
    );
  } else {
    return (
      <div>
        <CardTitle className="p-0">BMI {props.bmi}</CardTitle>
        <CardBody className="p-0">
          <p>Your Weight is Too Much, we sugess you to Lean some weight</p>
          {props.check === 'yes' ? (
            <>
              <p>
                You specify this disease
                <span style={{ color: 'green' }}> {props.disease}</span> We
                recommend you to consult doctor before trying any of our
                exercises.
              </p>
            </>
          ) : (
            ''
          )}
          {props.chkinjury === 'yes' ? (
            <>
              <p>
                You specify this Injury
                <span style={{ color: 'green' }}> {props.injury}</span> We
                recommend you to consult doctor/trainer before trying any of our
                exercises.
              </p>
            </>
          ) : (
            ''
          )}
          {props.check === 'yes' || props.chkdisease === 'yes' ? (
            <Link
              to="/app/exercise/exerciseGain"
              className="btn btn-outline-success"
            >
              See Gain Diet Plans and Exercises
            </Link>
          ) : (
            <Link
              to="/app/Consultant/doctors"
              className="btn btn-outline-success"
            >
              See Cosnultant
            </Link>
          )}
        </CardBody>
      </div>
    );
  }
}

export default injectIntl(Basic);
