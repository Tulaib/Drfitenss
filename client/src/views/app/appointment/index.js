/*eslint-disable*/
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Appointment = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './appointment')
);
const appointmentMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/appointment`}
      />
     
      <Route
        path={`${match.url}/appointment`}
        render={(props) => <Appointment {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default appointmentMenu;
