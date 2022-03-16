/*eslint-disable*/
import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from "../context/auth";
import { Redirect, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //   const { user } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
