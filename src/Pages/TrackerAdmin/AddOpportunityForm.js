import React, { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
const axios = require("axios");
let flag = true;

function AddOpportunityForm(props) {
  const [opportunitiesObject, setOpportunitiesObject] = useState([]);
  const [auxOpportunityObject, setAuxOpportunityObject] = useState([]);
  const [sending, setSending] = useState(false);
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);

  const handleChangeOpportunityObject = (e) => {
    setAuxOpportunityObject({
      ...auxOpportunityObject,
      [e.target.name]: e.target.value,
    });
  };

  const fetchDataOpportunities = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const clientUrl = params.get("client");

    axios
      .get(
        `${process.env.REACT_APP_API_ROOT_URL}/opportunity-management/opportunities/${clientUrl}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("user_token"),
          },
        }
      )
      .then(function (response) {
        setOpportunitiesObject(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect((props) => {
    fetchDataOpportunities();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (evt) => {
    setSending(true);

    flag = true;
    var params = new URLSearchParams();

    if (!auxOpportunityObject.title) {
      flag = false;
    }
    if (!auxOpportunityObject.status) {
      flag = false;
    }
    if (!auxOpportunityObject.description) {
      flag = false;
    }

    if (!props.clientId) {
      flag = false;
    }

    if (flag) {
      params.append("client_id", props.clientId);

      params.append("title", auxOpportunityObject.title);
      params.append("status", auxOpportunityObject.status);
      params.append("description", auxOpportunityObject.description);

      axios
        .post(
          `${process.env.REACT_APP_API_ROOT_URL}/opportunity-management/opportunities`,
          params,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("user_token"),
            },
          }
        )
        .then(function (response) {
          fetchDataOpportunities();
        })
        .catch(function (error) {
          // handle error
        })
        .finally(function () {
          // always executed
        });
    }
  };
  const handleDeleteOpportunities = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_ROOT_URL}/opportunity-management/opportunities/${id}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("user_token"),
          },
        }
      )
      .then(function (response) {
        fetchDataOpportunities();
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <>
      <div class="label">
        Opportunities{" "}
        {showOpportunityForm ? (
          <Tooltip placement="right" title="Hide New Opportunity Form">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() =>
                showOpportunityForm
                  ? setShowOpportunityForm(false)
                  : setShowOpportunityForm(true)
              }
            >
              {" "}
              <RemoveIcon style={{ color: "white" }} />
            </Fab>
          </Tooltip>
        ) : (
          <Tooltip placement="right" title="Show New Opportunity Form">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() =>
                showOpportunityForm
                  ? setShowOpportunityForm(false)
                  : setShowOpportunityForm(true)
              }
            >
              {" "}
              <AddIcon style={{ color: "white" }} />
            </Fab>
          </Tooltip>
        )}
      </div>
      {showOpportunityForm ? (
        <>
          <div className="columns">
            <div className="column">
              <label className="label">Title</label>
              <input
                className="input"
                name="title"
                id="title"
                placeholder="title"
                type="text"
                onChange={(e) => handleChangeOpportunityObject(e)}
                onKeyPress={(e) => handleKeyPress(e)}
                maxLength="20"
              />

              {sending && !auxOpportunityObject.title && (
                <>
                  <Alert variant="outlined" severity="error">
                    Mandatory Field
                  </Alert>
                </>
              )}
            </div>

            <div className="column">
              <label className="label">Status</label>
              <div class="select is-fullwidth">
                <select
                  name="status"
                  id="status"
                  onChange={(e) => handleChangeOpportunityObject(e)}
                  onKeyPress={(e) => handleKeyPress(e)}
                >
                  <option value="">Select Option</option>
                  <option value="OPEN">Open</option>
                  <option value="AWARDED">Awarded</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              {sending && !auxOpportunityObject.status && (
                <>
                  <Alert variant="outlined" severity="error">
                    Mandatory Field
                  </Alert>
                </>
              )}
            </div>
            <div className="column">
              <label className="label">Description</label>

              <textarea
                class="textarea"
                name="description"
                id="description"
                rows="3"
                maxLength="75"
                onChange={(e) => handleChangeOpportunityObject(e)}
                onKeyPress={(e) => handleKeyPress(e)}
              ></textarea>

              {sending && !auxOpportunityObject.description && (
                <>
                  <Alert variant="outlined" severity="error">
                    Mandatory Field
                  </Alert>
                </>
              )}
            </div>
          </div>

          <center>
            <button class="button is-black" onClick={() => handleSubmit()}>
              Add Opportunity
            </button>
          </center>
        </>
      ) : (
        <></>
      )}

      <center>
        <div class="columns">
          <div class="column">
            <table className="table is-hoverable">
              <thead>
                <td></td>
                <td>Title</td>
                <td>Status</td>
                <td>Description</td>
              </thead>
              <tbody>
                {opportunitiesObject.length > 0 ? (
                  opportunitiesObject.map(function (item) {
                    return (
                      <tr>
                        <td>
                          <button
                            class="button is-text"
                            onClick={() => handleDeleteOpportunities(item.id)}
                          >
                            <DeleteIcon />
                          </button>
                        </td>

                        <td>{item.title}</td>
                       { item.status === "AWARDED" && (<td><CheckCircleIcon style={{ color: "#64A205" }} /> {item.status}</td>)  }
                       { item.status === "CLOSED" && (<td><CloseIcon style={{ color: "#C71E03" }} /> {item.status}</td>) }
                       { item.status === "OPEN" && (<td><FolderOpenIcon style={{ color: "#FFB833" }} /> {item.status}</td>) }
                       
                       
                        <td>{item.description}</td>
                      </tr>
                    );
                  })
                ) : (
                  <td colspan="7">
                    <center>No results found</center>
                  </td>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </center>
    </>
  );
}

export default AddOpportunityForm;
