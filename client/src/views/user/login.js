/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button, Input,Form, FormFeedback, FormText } from 'reactstrap';
import { NavLink,Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateDoc ,doc, getDoc} from 'firebase/firestore';
import { auth, db } from 'firebase';

// import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { loginUser } from 'redux/actions';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 5) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};



const Login = ({  loading, error, loginUserAction }) => {
  // const [email] = useState('');
  // const [password] = useState('');

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  
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

  const apidata = {
    email: email,
    password: password
  }

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  // console.log(p)

  const onUserLogin = async (values) => {
    
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        // loginUserAction(values, history);
        console.log(apidata, 'api');
        try {
          const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          await getDoc(doc(db, 'users', result.user.uid)).then((docSnap) => {
            var abc = docSnap.data().userType;
            if(abc === 'user'){
              history.replace('/app/profile/Profile')
            }
            else{
              alert("You're Not registered as a user! or Login as Consultant")
            }
          });
          await updateDoc(doc(db, 'users', result.user.uid), {
            isOnline: true,
          });
          // history.replace('/app/profile/Profile')
        } catch (error) {
          alert('no user or email pass / or incorrect , '+error);
        }
      }
    }

    // console.log('val',email," ",password, ' ')
  };



  const initialValues = { email, password };
  let passVali=0;

  passVali = password.length;

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">FITNESS IS NOT JUST A GOAL, IT'S A LIFESTYLE</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>
            <Form>
                  <FormGroup>
                    {/* <Label>Name</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Ahmed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    /> */}
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
                      Email pattern verified!
                    </FormFeedback>
                    <FormText>
                      Your username is most likely your email.
                    </FormText>
                    <Label>password</Label>
                    <Input
                      type="password"
                      name="password"
                      validate={validatePassword}
                      placeholder="*****"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />{}
                     {/* {errors.password && touched.password && (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        )} */}
               
                    {
                      passVali <= 5 ?
                      <Button
                      disabled
                      style={{marginTop:'10px'}}
                      onClick={()=>onUserLogin(apidata)}>
                        Login
                      </Button>
                       :
                      <Button
                      style={{marginTop:'10px'}}
                      onClick={()=>onUserLogin(apidata)}>
                        Login
                      </Button>
                    }
                  </FormGroup>
                </Form>
            {/* <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Link to='app/profile/Profile'>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                      </Link>
                  </div>
                </Form>
              )}
            </Formik> */}
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
