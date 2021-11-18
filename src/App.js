/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./assets/scss/styles.scss";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBackComponent from "./components/ErrorFallBack";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import FooterMenuComponent from "./components/FooterMenuComponent.js";
import ScrollToTop from "./components/ScrollToTop";
import SpinnerComponent from "./components/SpinnerComponent";

const HomePage = React.lazy(() => import("./Pages/HomePage/HomePage"));
const UsersPage = React.lazy(() => import("./Pages/UserAdmin/UsersPage"));
const UserAdminPage = React.lazy(() =>
  import("./Pages/UserAdmin/UserAdminPage")
);
const NewUserPage = React.lazy(() => import("./Pages/UserAdmin/NewUserPage"));
const AddTrackPage = React.lazy(() =>
  import("./Pages/TrackerAdmin/AddTrackPage")
);
const ClientTrackerPage = React.lazy(() =>
  import("./Pages/TrackerAdmin/ClientTrackerPage")
);
const ClientListPage = React.lazy(() =>
  import("./Pages/ClientAdmin/ClientListPage")
);
const LoginPage = React.lazy(() => import("./Pages/LoginPage/LoginPage"));
const NewClientPage = React.lazy(() =>
  import("./Pages/ClientAdmin/NewClientPage")
);
const EditClientPage = React.lazy(() =>
  import("./Pages/ClientAdmin/EditClientPage")
);
const MyClientsPage = React.lazy(() =>
  import("./Pages/MyClientsPage/MyClientsPage")
);

function App() {
  return (
    <>
      <React.Suspense
        fallback={
          <div className="container">
            <div className="columns is-centered is-vcentered">
              <div className="column">
                <SpinnerComponent />
              </div>
            </div>
          </div>
        }
      >
        <Router>
          <ScrollToTop />
          <Switch>
            <ErrorBoundary
              FallbackComponent={ErrorFallBackComponent}
              onReset={() => {
                // reset the state of your app so the error doesn't happen again
              }}
            >
              <Route exact path="/" component={LoginPage} />
              <PrivateRoute exact path="/home" component={HomePage} />
              <PrivateRoute
                exact
                path="/client_tracker"
                component={ClientTrackerPage}
              />
              <PrivateRoute exact path="/add_track" component={AddTrackPage} />
              <PrivateRoute exact path="/users" component={UsersPage} />
              <PrivateRoute exact path="/admin" component={UserAdminPage} />
              <PrivateRoute exact path="/new-user" component={NewUserPage} />
              <PrivateRoute
                exact
                path="/client-mng"
                component={ClientListPage}
              />
              <PrivateRoute
                exact
                path="/new-client"
                component={NewClientPage}
              />
              <PrivateRoute
                exact
                path="/edit_client"
                component={EditClientPage}
              />
              <PrivateRoute
                exact
                path="/my-clients"
                component={MyClientsPage}
              />
              <Redirect to="/" />
            </ErrorBoundary>
          </Switch>
        </Router>
      </React.Suspense>

      <br />
      <br />
      <br />
      <br />
      <br />

      <FooterMenuComponent />
    </>
  );
}

export default App;
