/*eslint-disable*/
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Feedbackf = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './feedback')
);


const Feedback = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/feedback`}
      />
     
      <Route
        path={`${match.url}/feedback`}
        render={(props) => <Feedbackf {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Feedback;
