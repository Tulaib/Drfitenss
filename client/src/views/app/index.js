/*eslint-disable*/
import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

const Exercise = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './exercise')
);
const Appointment = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './appointment')
);
const Inbox = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Chat')
);
const Diet = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './dietplan')
);
const AngleChecker = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './AngleChecker')
);
const Consult = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Consultant')
);
const Video = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './videoChat')
);
const Feedback = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './feedback')
);
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Profile')
);


const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Route
              path={`${match.url}/angleChecker`}
              render={(props) => <AngleChecker {...props} />}
            />
            <Route
              path={`${match.url}/exercise`}
              render={(props) => <Exercise {...props} />}
            />
            <Route
              path={`${match.url}/appointment`}
              render={(props) => <Appointment {...props} />}
            />
            <Route
              path={`${match.url}/chatInbox`}
              render={(props) => <Inbox {...props} />}
            />
            <Route
              path={`${match.url}/profile`}
              render={(props) => <Profile {...props} />}
            />
            <Route
              path={`${match.url}/dietplan`}
              render={(props) => <Diet {...props} />}
            />
            <Route
              path={`${match.url}/Consultant`}
              render={(props) => <Consult {...props} />}
            />
            <Route
              path={`${match.url}/videoChat`}
              render={(props) => <Video {...props} />}
            />
            <Route
              path={`${match.url}/feedback`}
              render={(props) => <Feedback {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
