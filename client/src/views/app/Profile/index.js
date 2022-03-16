/*eslint-disable*/
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Profiles = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './profile')
);


const Profile = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/Profile`}
      />
     
      <Route
        path={`${match.url}/profile`}
        render={(props) => <Profiles {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Profile;
