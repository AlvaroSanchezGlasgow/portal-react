import React, { useState } from "react";
import NavbarComponent from "../Components/NavbarComponent";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
const axios = require("axios");

let flag = true;

function NewUserPage() {
  const [userObject, setUserObject] = useState([]);
  const [sending, setSending] = useState(false);
  const [errorMessage, setError] = useState([]);

  let history = useHistory();

  const handleChangeUserObject = (e) => {
    setUserObject({ ...userObject, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (evt) => {
    setSending(true);
    flag = true;

    if (!userObject.username) {
      flag = false;
    }
    if (!userObject.firstName) {
      flag = false;
    }
    if (!userObject.lastName) {
      flag = false;
    }
    if (!userObject.comment) {
      flag = false;
    }
    if (!userObject.email) {
      flag = false;
    }
    if (!userObject.isActive) {
      flag = false;
    }
    if (!userObject.password) {
      flag = false;
    }
    if (!userObject.confirmPassword) {
      flag = false;
    }

    if (flag) {
      if (userObject.password !== userObject.confirmPassword) {
        flag = false;
      }
    }

    var params = new URLSearchParams();
    params.append("username", userObject.username);
    params.append("firstName", userObject.firstName);
    params.append("lastName", userObject.lastName);
    params.append("comment", userObject.comment);
    params.append("email", userObject.email);
    params.append("isActive", userObject.isActive);
    params.append("password", userObject.password);
    params.append("confirmPassword", userObject.confirmPassword);

    if (flag) {
      axios
        .post(
          `${process.env.REACT_APP_API_ROOT_URL}/users-management/users/save`,
          params,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("user_token"),
            },
          }
        )
        .then(function (response) {
          history.push("/index");
        })
        .catch(function (error) {
          console.log("Error : " + error);
          setError(error);
        })
        .finally(function () {
          // always executed
        });
    }
  };

  return (
    <>
    <section>
      <div class="container">
        <NavbarComponent />
        <div class="card">
              <div class="card-content">
        <div id="main_index">
          <h2>New User</h2>
        </div>
        <div className="columns">
          
          <div className="column is-12">
           
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Active</label>
                      <div class="control">
                        <div class="select is-fullwidth">
                          <select
                            name="isActive"
                            id="isActive"
                            onChange={(e) => handleChangeUserObject(e)}
                            onKeyPress={(e) => handleKeyPress(e)}
                            required
                          >
                            <option selected value="">
                              Select
                            </option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                          </select>
                        </div>
                        {sending && !userObject.isActive && (
                          <>
                            <Alert variant="outlined" severity="error">
                              Mandatory Field
                            </Alert>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Username</label>
                      <div class="control">
                        <input
                          class="input"
                          name="username"
                          id="username"
                          type="text"
                          placeholder="username"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !userObject.username && (
                          <Alert variant="outlined" severity="error">
                            Mandatory Field
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Name</label>
                      <div class="control">
                        <input
                          class="input"
                          name="firstName"
                          id="firstName"
                          type="text"
                          placeholder="name"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !userObject.firstName && (
                          <Alert variant="outlined" severity="error">
                            Mandatory Field
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Surname</label>
                      <div class="control">
                        <input
                          class="input"
                          name="lastName"
                          id="lastName"
                          type="text"
                          placeholder="surname"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !userObject.lastName && (
                          <Alert variant="outlined" severity="error">
                            Mandatory Field
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="column">
                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control">
                        <input
                          class="input"
                          name="email"
                          id="email"
                          type="email"
                          placeholder="email"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !userObject.email && (
                          <Alert variant="outlined" severity="error">
                            Mandatory Field
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Comment</label>
                      <div class="control">
                        <input
                          class="input"
                          name="comment"
                          id="comment"
                          type="text"
                          placeholder="comment"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="100"
                          required
                        />
                        {sending && !userObject.comment && (
                          <Alert variant="outlined" severity="error">
                            Mandatory Field
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Password</label>
                      <div class="control">
                        <input
                          class="input"
                          name="password"
                          id="password"
                          type="password"
                          placeholder="password"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !userObject.password && (
                          <Alert variant="outlined" severity="error">
                            Mandatory Field
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Confirm Password</label>
                      <div class="control">
                        <input
                          class="input"
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          placeholder="confirm password"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !userObject.confirmPassword && (
                          <Alert variant="outlined" severity="error">
                            Mandatory Field
                          </Alert>
                        )}
                        {userObject.password &&
                          userObject.confirmPassword &&
                          userObject.password !==
                            userObject.confirmPassword && (
                            <Alert variant="outlined" severity="error">
                              Password doesn´t match
                            </Alert>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns is-centered">
                  {errorMessage.message && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {"Perhaps the user is already in the system"}
                    </Alert>
                  )}
                </div>
                <div class="columns is-centered">
                  <center>
                    <div class="column">
                      <div class="field is-grouped">
                        <div class="control">
                          <button
                            class="button is-text"
                            onClick={() => history.goBack()}
                          >
                            Cancel
                          </button>
                        </div>
                        <div class="control">
                          <button
                            class="button is-primary"
                            onClick={() => handleSubmit()}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      </section>
    </>
  );
}

export default NewUserPage;
