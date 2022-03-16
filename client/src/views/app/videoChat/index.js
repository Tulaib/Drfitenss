/*eslint-disable*/
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Vchat = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './videoChat')
);


const ExerciseMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/videoChat`}
      />
     
      <Route
        path={`${match.url}/videoChat`}
        render={(props) => <Vchat {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default ExerciseMenu;
