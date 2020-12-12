import React, { useState } from "react";
import { Link } from "react-scroll";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import logo_everis from "../Static/Img/images/logo-everis.png";
import axios from "axios";
//import cookie from 'react-cookies'

function IndexSection() {
  const [show, setShow] = useState();

  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();
  const [error, setError] = useState(false);

  let history = useHistory();

  const handleChangeUser = (e) => {
    setUserName(e.target.value);
  };
  const handleChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitLogin();
    }
  };

  const submitLogin = () => {
    if (userName && userPassword) {
      const body = new FormData();
      body.append("grant_type", "password");
      body.append("username", userName);
      body.append("password", userPassword);
      // setLoading(true);
      //We call the api
      axios
        .post(`${process.env.REACT_APP_API_ROOT_URL}/oauth/token`, body, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic cG9ydGFsLWNsaTpwYXNzd29yZA==",
            //'Access-Control-Allow-Origin' : '*',
            //'Access-Control-Allow-Headers' : 'Content-Type,X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers',
          },
        })
        .then(function (response) {
          // handle success
          sessionStorage.setItem("user_token", response.data.access_token);
          sessionStorage.setItem("username", userName);
          history.push("/index");
        })
        .catch(function (error) {
          // handle error
          setError(error.message);
        })
        .finally(function () {
          // always executed
        });
      // setLoading(false)
    } else {
      setError("All fields need to be completed");
    }
  };

  return (
    <>
      <div>
        <div class="container">
          <div class="columns">
            <div className="column">
              <div className="is-centered">
                <figure>
                  <img alt="" src={logo_everis} />
                </figure>
              </div>
            </div>
            <div class="column is-third-fours">
              <div className="is-centered">
                <div id="main_index">
                  <h2>Business Development</h2>
                </div>
                <small>
                  <p>
                    internal tool to track and manage business contacts development
                  </p>
                </small>

                <br />

                <center>
                  <div class="field is-grouped">
                    <Link
                      className="button is-link"
                      to="clients_section"
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={1000}
                      delay={200}
                    >
                      CLIENTS DASHBOARD
                    </Link>

                    <button
                      className="button is-dark"
                      onClick={() => setShow(true)}
                    >
                      Admin
                    </button>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>

        {/*****************    Login Modal     ***********************/}

        <div className={show ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-title">Login</div>
            <p>Add your user password to login</p>

            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="user"
                  onChange={(e) => handleChangeUser(e)}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
                <span className="icon is-small is-left">
                  <PersonIcon />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="password"
                  onChange={(e) => handleChangePassword(e)}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
                <span className="icon is-small is-left">
                  <LockIcon />
                </span>
              </p>
              <div className="loginError"> {error} </div>
              <p>
                <button
                  className="button is-white"
                  onClick={() => submitLogin()}
                >
                  submit
                </button>
              </p>
            </div>
          </div>

          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setShow(false)}
          ></button>
        </div>
      </div>
    </>
  );
}

export default IndexSection;
