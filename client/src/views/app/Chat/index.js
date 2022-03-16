/*eslint-disable*/
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Inbox = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './chatInbox')
);
const ChatMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/chatInbox`}
    />
   
    <Route
      path={`${match.url}/chatInbox`}
      render={(props) => <Inbox {...props} />}
    />
    <Redirect to="/error" />
  </Switch>
</Suspense>
);
export default ChatMenu;
