/*eslint-disable*/
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Dlean = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './leanDiet')
);
const Dgain = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './gainDiet')
);

const ExerciseMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/leanDiet`}
      />
     
      <Route
        path={`${match.url}/leanDiet`}
        render={(props) => <Dlean {...props} />}
      />
      <Route
        path={`${match.url}/gainDiet`}
        render={(props) => <Dgain {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default ExerciseMenu;
