import React, { useState, useEffect } from "react";
import NavbarComponent from "../Components/NavbarComponent";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

const axios = require("axios");

let flag = true;

function UserAdminPage() {
  const [userObject, setUserObject] = useState([]);
  const [sending, setSending] = useState(false);
  const [errorMessage, setError] = useState([]);

  let history = useHistory();

  useEffect((props) => {
    //alert(JSON.stringify(value));

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const userUrl = params.get("user");

    //We call the api
    axios
      .get(
        `${process.env.REACT_APP_API_ROOT_URL}/users-management/users/${userUrl}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("user_token"),
          },
        }
      )
      .then(function (response) {
        setUserObject(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  }, []);

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

    var params = new URLSearchParams();
    params.append("username", userObject.username);
    params.append("firstName", userObject.firstName);
    params.append("lastName", userObject.lastName);
    params.append("comment", userObject.comment);
    params.append("email", userObject.email);
    params.append("isActive", userObject.isActive);
    params.append("id", userObject.id);
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
          <h2>Edit User</h2>
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
                            value={userObject.isActive}
                            onChange={(e) => handleChangeUserObject(e)}
                            onKeyPress={(e) => handleKeyPress(e)}
                            required
                          >
                            <option value="">Select</option>
                            <>
                              <option value="N">No</option>
                              <option value="Y">Yes</option>
                            </>
                          </select>
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
                  </div>

                  <div class="column">
                    <div class="field">
                      <label class="label">Username</label>
                      <div class="control">
                        <input
                          class="input"
                          name="username"
                          id="username"
                          value={userObject.username}
                          type="text"
                          placeholder="username"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                          readOnly
                        />
                        <small>* username is not editable</small>
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
                          value={userObject.firstName}
                          type="text"
                          placeholder="name"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !userObject.firstName && (
                          <>
                            <Alert variant="outlined" severity="error">
                              Mandatory Field
                            </Alert>
                          </>
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
                          value={userObject.lastName}
                          type="text"
                          placeholder="surname"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !userObject.lastName && (
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
                      <label class="label">Email</label>
                      <div class="control">
                        <input
                          class="input"
                          name="email"
                          id="email"
                          value={userObject.email}
                          type="email"
                          placeholder="email"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !userObject.email && (
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
                      <label class="label">Comment</label>
                      <div class="control">
                        <input
                          class="input"
                          name="comment"
                          id="comment"
                          value={userObject.comment}
                          type="text"
                          placeholder="comment"
                          onChange={(e) => handleChangeUserObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="100"
                          required
                        />
                        {sending && !userObject.comment && (
                          <>
                            <Alert variant="outlined" severity="error">
                              Mandatory Field
                            </Alert>
                          </>
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
      </section>
    </>
  );
}

export default UserAdminPage;
