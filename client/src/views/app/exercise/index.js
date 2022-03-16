/*eslint-disable*/
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Exlean = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './ExerciseLean')
);
const ExGain = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './ExerciseGain')
);
const ExInnerPage = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './ExerciseInnerPage')
);
const ExInnerPage2 = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './ExerciseInnerPage2')
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
        path={`${match.url}/exerciseLean`}
        render={(props) => <Exlean {...props} />}
      />
      <Route
        path={`${match.url}/exerciseGain`}
        render={(props) => <ExGain {...props} />}
      />
      <Route
        path={`${match.url}/exerciseInnerPage`}
        render={(props) => <ExInnerPage {...props} />}
      />
      <Route
        path={`${match.url}/exerciseInnerPage2`}
        render={(props) => <ExInnerPage2 {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default ExerciseMenu;
