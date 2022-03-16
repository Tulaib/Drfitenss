/*eslint-disable*/
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const AngleChecker = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './angleChecker')
);

const ChatMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/angleChecker`}
      /> 
      <Route
        path={`${match.url}/angleChecker`}
        render={(props) => <AngleChecker {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default ChatMenu;
