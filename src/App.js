/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import HomePage from "./HomePage/HomePage";
import IndexPage from "./IndexPage/IndexPage";
import UserAdminPage from "./UserAdmin/UserAdminPage";
import NewUserPage from "./UserAdmin/NewUserPage";
import AddTrackPage from "./TrackerAdmin/AddTrackPage";
import ClientTrackerPage from "./TrackerAdmin/ClientTrackerPage";
import ClientListPage from "./ClientAdmin/ClientListPage";
import styles from "./Static/Scss/styles.scss";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import FooterMenuComponent from "./Components/FooterMenuComponent.js";
import ScrollToTop from "./Components/ScrollToTop";
import NewClientPage from "./ClientAdmin/NewClientPage";
import EditClientPage from "./ClientAdmin/EditClientPage";
import Test from "./ClientAdmin/test";

function App() {
  return (
    <>
  
        <Router>
          <ScrollToTop />
          <Switch>
         
            <Route exact path="/" component={HomePage} />
            <Route exact path="/client_tracker" component={ClientTrackerPage} />
            <Route exact path="/add_track" component={AddTrackPage} />
            <PrivateRoute exact path="/index" component={IndexPage} />
            <PrivateRoute exact path="/admin" component={UserAdminPage} />
            <PrivateRoute exact path="/new-user" component={NewUserPage} />
            <PrivateRoute exact path="/client-mng" component={ClientListPage} />
            <PrivateRoute exact path="/new-client" component={NewClientPage} />
            <PrivateRoute
              exact
              path="/edit_client"
              component={EditClientPage}
            />
            <Redirect to="/" />
            
          </Switch>
        </Router>
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
