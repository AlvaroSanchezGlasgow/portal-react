import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

const axios = require("axios");

let flag = true;

function EditClientPage() {
  const [clientObject, setClientObject] = useState([]);
  const [tierObject, setTierObject] = useState([]);
  const [sectorObject, setSectorObject] = useState([]);
  const [sending, setSending] = useState(false);
  const [errorMessage, setError] = useState([]);

  let history = useHistory();

  useEffect((props) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const clientUrl = params.get("client");

    //We call the api
    axios
      .get(
        `${process.env.REACT_APP_API_ROOT_URL}/client-management/client/${clientUrl}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("user_token"),
          },
        }
      )
      .then(function (response) {
        setClientObject(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });

    //We call the api
    axios
      .get(`${process.env.REACT_APP_API_ROOT_URL}/sector-manager/sector`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("user_token"),
        },
      })
      .then(function (response) {
        setSectorObject(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });

    //We call the api
    axios
      .get(`${process.env.REACT_APP_API_ROOT_URL}/tier-manager/tier`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("user_token"),
        },
      })
      .then(function (response) {
        setTierObject(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const handleChangeClientObject = (e) => {
    setClientObject({ ...clientObject, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (evt) => {
    setSending(true);
    flag = true;

    if (!clientObject.name) {
      flag = false;
    }
    if (!clientObject.website) {
      flag = false;
    }
    if (!clientObject.clientManager) {
      flag = false;
    }
    if (!clientObject.tier) {
      flag = false;
    }
    if (!clientObject.sector) {
      flag = false;
    }

    if (!clientObject.turnover) {
      flag = false;
    }

    if (!clientObject.number_employees) {
      flag = false;
    }

    var params = new URLSearchParams();
    params.append("id", clientObject.id);
    params.append("name", clientObject.name);
    params.append("website", clientObject.website);
    params.append("clientManager", clientObject.clientManager);
    params.append("tier", clientObject.tier);
    params.append("sector", clientObject.sector);
    params.append("turnover", clientObject.turnover);
    params.append("number_employees", clientObject.number_employees);

    if (flag) {
      axios
        .post(
          `${process.env.REACT_APP_API_ROOT_URL}/client-management/client`,
          params,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("user_token"),
            },
          }
        )
        .then(function (response) {
          history.push("/client-mng");
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
    <NavbarComponent />
      <div class="container">
       
        <div class="card">
              <div class="card-content">
        <div id="main_index">
          <h2>Edit Client</h2>
        </div>
        <div className="columns">
          
          <div className="column is-12">
           
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Id</label>
                      <div class="control">
                        <input
                          class="input"
                          name="id"
                          id="id"
                          value={clientObject.id}
                          type="text"
                          placeholder="name"
                          onChange={(e) => handleChangeClientObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Tier</label>
                      <div class="control">
                        <div class="select is-fullwidth">
                          <select
                            name="tier"
                            id="tier"
                            onChange={(e) => handleChangeClientObject(e)}
                            onKeyPress={(e) => handleKeyPress(e)}
                            value={clientObject.tier}
                            required
                          >
                            <option selected value="">
                              Select
                            </option>
                            {tierObject.map(function (item) {
                              return (
                                <option value={item.id}>
                                  {item.id + " - " + item.tier_title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {sending && !clientObject.tier && (
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
                      <label class="label">Sector</label>
                      <div class="control">
                        <div class="select select is-fullwidth">
                          <select
                            name="sector"
                            id="sector"
                            value={clientObject.sector}
                            onChange={(e) => handleChangeClientObject(e)}
                            onKeyPress={(e) => handleKeyPress(e)}
                            required
                          >
                            <option selected value="">
                              Select
                            </option>
                            {sectorObject.map(function (item) {
                              return (
                                <option value={item.id}>{item.title}</option>
                              );
                            })}
                          </select>
                        </div>
                        {sending && !clientObject.sector && (
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
                      <label class="label">Name</label>
                      <div class="control">
                        <input
                          class="input"
                          name="name"
                          id="name"
                          value={clientObject.name}
                          type="text"
                          placeholder="name"
                          onChange={(e) => handleChangeClientObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !clientObject.name && (
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
                      <label class="label">Turnover</label>
                      <div class="control">
                        <input
                          class="input"
                          name="turnover"
                          id="turnover"
                          value={clientObject.turnover}
                          type="number"
                          placeholder="turnover"
                          onChange={(e) => handleChangeClientObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !clientObject.turnover && (
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
                      <label class="label">Employees</label>
                      <div class="control">
                        <input
                          class="input"
                          name="number_employees"
                          id="number_employees"
                          value={clientObject.number_employees}
                          type="number"
                          placeholder="number employees"
                          onChange={(e) => handleChangeClientObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !clientObject.number_employees && (
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
                      <label class="label">Website</label>
                      <div class="control">
                        <input
                          class="input"
                          name="website"
                          id="website"
                          value={clientObject.website}
                          type="text"
                          placeholder="website"
                          onChange={(e) => handleChangeClientObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !clientObject.website && (
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
                      <label class="label">Client Manager</label>
                      <div class="control">
                        <input
                          class="input"
                          name="clientManager"
                          id="clientManager"
                          value={clientObject.clientManager}
                          type="text"
                          placeholder="name"
                          onChange={(e) => handleChangeClientObject(e)}
                          onKeyPress={(e) => handleKeyPress(e)}
                          maxLength="50"
                          required
                        />
                        {sending && !clientObject.clientManager && (
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
                      {"Error editing the selected client. Please, try again"}
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

export default EditClientPage;
