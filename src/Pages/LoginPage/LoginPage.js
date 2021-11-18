import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import logo from "../../assets/img/img/bip_logo.png";
import axios from "axios";
//import cookie from 'react-cookies'

function LoginPage() {
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
          console.log("Response Data-->" + response.data);
          history.push("/home");
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
      <br />
      <br />
      <br />
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div className="column is-half">
            <img alt="" src={logo} />
          </div>
          <div class="column is-half">
            <div className="is-centered">
              <div id="main_index">
                <h3>Business Development App</h3>
              </div>
              <h5>
                The best tool for your organization to track and manage business
                opportunities, business development activities and contacts
              </h5>
              <small>Don't have an account? </small>
              <br />
              <button
                className="button is-text"
                onClick={() => alert("register")}
              >
                register now
              </button>

              <br />

              <center>
                <div class="field">
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
                        className="button is-dark"
                        onClick={() => submitLogin()}
                      >
                        login
                      </button>
                    </p>
                  </div>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
