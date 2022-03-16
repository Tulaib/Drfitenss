/*eslint-disable*/
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Doc = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './doctors')
);
const Trainer = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './gymTrainers')
);

const ExerciseMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/exerciseLean`}
      />
     
      <Route
        path={`${match.url}/doctors`}
        render={(props) => <Doc {...props} />}
      />
      <Route
        path={`${match.url}/gymTrainers`}
        render={(props) => <Trainer {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default ExerciseMenu;
