import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip";
import NavbarComponent from "../../components/NavbarComponent";
import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min";
import ErrorIcon from "@material-ui/icons/Error";
const axios = require("axios");

let flag = true;

function AddTrackPage() {
  const [trackObject, setTrackObject] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [clientId, setClientID] = useState();
  const [sending, setSending] = useState(false);

  let history = useHistory();

  useEffect((props) => {
    // Initialize all input of date type.
    // eslint-disable-next-line no-unused-vars
    const calendars = bulmaCalendar.attach('[type="date"]', {
      showFooter: false,
      dateFormat: "YYYY-MM-DD",
      startDate: new Date(),
    });

    //alert(JSON.stringify(value));

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const clientUrl = params.get("client");

    setClientID(clientUrl);

    //We call the api
    axios
      .get(`${process.env.REACT_APP_API_ROOT_URL}/tracker-areas/areas`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("user_token"),
        },
      })
      .then(function (response) {
        setAreaList(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });

    //We call the api
    axios
      .get(
        `${process.env.REACT_APP_API_ROOT_URL}/contact-management/contacts/${clientUrl}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("user_token"),
          },
        }
      )
      .then(function (response) {
        setContactList(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const handleChangeTrackObject = (e) => {
    setTrackObject({ ...trackObject, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (evt) => {
    setSending(true);
    flag = true;
    var params = new URLSearchParams();
    let dateValue = document.querySelector("#dateAction").value;

    if (!trackObject.area_id) {
      flag = false;
    }
    if (!dateValue) {
      flag = false;
    }
    if (!trackObject.contact_id) {
      flag = false;
    }

    if (!trackObject.comment) {
      flag = false;
    }

    if (flag) {
      params.append("client_id", clientId);
      params.append("area_id", trackObject.area_id);
      params.append("dateAction", document.querySelector("#dateAction").value);
      params.append("name", trackObject.name);
      params.append("contact_id", trackObject.contact_id);
      params.append("comment", trackObject.comment.replace(/\r?\n/g, "<br />"));

      axios
        .post(
          `${process.env.REACT_APP_API_ROOT_URL}/client-tracker/tracks`,
          params,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("user_token"),
            },
          }
        )
        .then(function (response) {
          history.push(`/client_tracker?client=${clientId}`);
        })
        .catch(function (error) {
          // handle error
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
                <h2>Add Client Tracker</h2>
              </div>

              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Client ID</label>
                    <div class="control">
                      <input
                        class="input"
                        name="client_id"
                        id="client_id"
                        value={clientId}
                        type="text"
                        maxLength="50"
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label">Area</label>
                    <div class="select">
                      <select
                        name="area_id"
                        id="area_id"
                        onChange={(e) => handleChangeTrackObject(e)}
                        onKeyPress={(e) => handleKeyPress(e)}
                      >
                        <option value="0">Select Option</option>
                        {areaList.map(function (item) {
                          return <option value={item.id}>{item.title}</option>;
                        })}
                      </select>
                      {sending && !trackObject.area_id && (
                        <small>
                          <span className="validation">
                            Mandatory Field
                            <ErrorIcon fontSize="small" />
                          </span>
                        </small>
                      )}
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Date</label>
                    <div class="control">
                      <input
                        class="input"
                        name="dateAction"
                        id="dateAction"
                        type="date"
                        onChange={(e) => handleChangeTrackObject(e)}
                        onKeyPress={(e) => handleKeyPress(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Contact</label>
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select
                          name="contact_id"
                          id="contact_id"
                          onChange={(e) => handleChangeTrackObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                        >
                          <option value="0">Select Option</option>
                          {contactList.map(function (item) {
                            return (
                              <option value={item.id}>
                                {item.name + " " + item.surname}
                              </option>
                            );
                          })}
                        </select>
                        {sending && !trackObject.contact_id && (
                          <p>
                            <small>
                              <span className="validation">
                                Mandatory Field
                                <ErrorIcon fontSize="small" />
                              </span>
                            </small>
                          </p>
                        )}
                      </div>

                      <small>
                        * Remember that contacts should be added in the previous
                        screen
                      </small>
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label">Comment</label>
                    <div class="control">
                      <textarea
                        class="textarea"
                        name="comment"
                        id="comment"
                        rows="3"
                        maxLength="75"
                        onChange={(e) => handleChangeTrackObject(e)}
                        onKeyPress={(e) => handleKeyPress(e)}
                      ></textarea>
                      {sending && !trackObject.comment && (
                        <small>
                          <span className="validation">
                            Mandatory Field
                            <ErrorIcon fontSize="small" />
                          </span>
                        </small>
                      )}
                    </div>
                  </div>
                </div>
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
                          <Tooltip title="back">
                            <ArrowBackIcon />
                          </Tooltip>
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
      </section>
    </>
  );
}

export default AddTrackPage;
