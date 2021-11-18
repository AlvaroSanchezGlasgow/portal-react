import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AsideDrawerComponent from "../components/AsideDrawerComponent";

import { useHistory } from "react-router-dom";
const axios = require("axios");

export const NavbarComponent = () => {
  let history = useHistory();

  return (
    <>
      <nav
        class="navbar is-transparent has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <div class="navbar-item">
            <AsideDrawerComponent />
          </div>
          <div class="navbar-item">
            <h3>Business Development App</h3>
          </div>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start"></div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="#">
              <PersonIcon /> {sessionStorage.getItem("username").toUpperCase()}
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="#">
                <button
                  className="button is-text"
                  onClick={() =>
                    axios
                      .get(
                        `${
                          process.env.REACT_APP_API_ROOT_URL
                        }/oauth/revoke-token/${sessionStorage.getItem(
                          "username"
                        )}`,
                        {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization:
                              "Bearer " + sessionStorage.getItem("user_token"),
                          },
                        }
                      )
                      .then(function (response) {
                        // handle success
                      })
                      .catch(function (error) {
                        // handle error
                      })
                      .finally(function () {
                        // always executed
                        sessionStorage.removeItem("user_token");
                        history.push("/");
                      })
                  }
                >
                  <ExitToAppIcon /> Logout
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <br />
    </>
  );
};

export default NavbarComponent;
