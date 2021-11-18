import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import AddOpportunityForm from "./AddOpportunityForm";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import SpinnerComponent from "../../components/SpinnerComponent";
import AddContactForm from "./AddContactForm";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";
import ReactHtmlParser from "react-html-parser";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import NavbarComponent from "../../components/NavbarComponent";

const axios = require("axios");

function ClientTrackerPage() {
  const [clientObject, setClientObject] = useState([]);
  const [result, setResult] = useState([]);
  let history = useHistory();

  const handleDeleteTrack = (activityId) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const clientUrl = params.get("client");

    /*  var result = recordsToDelete.map(function (item) {
            return item.id;
        }).join(', ');
        */

    axios
      .delete(
        `${process.env.REACT_APP_API_ROOT_URL}/client-tracker/tracks/${activityId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("user_token"),
          },
        }
      )
      .then(function (response) {
        // history.push("/");
        //   history.push("/client_tracker?client="+clientUrl);
        fetchClient();
        fetchTracksData();
      })
      .catch(function (error) {
        console.log("Error Fetching Data: " + error);
      })
      .finally(function () {
        // always executed
      });
  };

  const fetchTracksData = async () => {
    //alert(JSON.stringify(value));

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const clientUrl = params.get("client");

    //We call the api
    axios
      .get(
        `${process.env.REACT_APP_API_ROOT_URL}/client-tracker/tracks/${clientUrl}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("user_token"),
          },
        }
      )
      .then(function (response) {
        setResult(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  };

  const fetchClient = async (props) => {
    //alert(JSON.stringify(value));

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
  };

  useEffect(() => {
    fetchClient();
    fetchTracksData();
  }, []);

  return (
    <>
      <section>
        <div class="container">
          <NavbarComponent />

          <div class="columns">
            <div class="column">
              {!clientObject.id && <SpinnerComponent />}
              {clientObject.id && (
                <>
                  <h2>
                    {clientObject.name}{" "}
                    <Tooltip
                      title={
                        "Open Client Website (" + clientObject.website + ")"
                      }
                    >
                      <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => {
                          window.open(clientObject.website, "_blank");
                        }}
                      >
                        <OpenInNewIcon style={{ color: "white" }} />
                      </Fab>
                    </Tooltip>
                  </h2>
                  <div>
                    <Chip
                      label={ReactHtmlParser(
                        "<strong>CLIENT MANAGER</strong> - " +
                          clientObject.clientManager
                      )}
                      variant="outlined"
                    />

                    <Chip
                      label={ReactHtmlParser(
                        "<strong>TIER " +
                          clientObject.tier +
                          "</strong> - " +
                          clientObject.tierDescription
                      )}
                      variant="outlined"
                    />
                      <Chip
                      label={ReactHtmlParser(
                        "<strong>Turnover " +
                          "</strong> - " +
                          new Intl.NumberFormat("en-GB").format(clientObject.turnover)
                      )}
                      variant="outlined"
                    />
                      <Chip
                      label={ReactHtmlParser(
                        "<strong>Employees " +
                          "</strong> - " +
                          new Intl.NumberFormat("en-GB").format(clientObject.number_employees)
                      )}
                      variant="outlined"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
         
          <div class="columns is-vcentered is-centered">
            <div class="column">
              <strong>PROCUREMENT STATUS</strong>
            </div>
            <div class="column">
              <strong>LINKEDIN STATUS</strong>
            </div>
            <div class="column">
              <strong>CONTACT STATUS</strong>
            </div>
          </div>
          <div class="columns is-vcentered is-centered">
            <div class="column">
              {clientObject.procurementStatus === "OK" ? (
                <CheckCircleIcon style={{ color: "#64A205" }} />
              ) : (
                <CloseIcon style={{ color: "#C71E03" }} />
              )}
            </div>
            <div class="column">
              {clientObject.linkedinStatus === "OK" ? (
                <CheckCircleIcon style={{ color: "#64A205" }} />
              ) : (
                <CloseIcon style={{ color: "#C71E03" }} />
              )}
            </div>

            <div class="column">
              {clientObject.contactStatus === "OK" ? (
                <CheckCircleIcon style={{ color: "#64A205" }} />
              ) : (
                <CloseIcon style={{ color: "#C71E03" }} />
              )}
            </div>
          </div>
          <div class="columns is-vcentered is-centered">
            <div class="column">
              <strong>ACCOUNT INTELLIGENT STATUS</strong>
            </div>
            <div class="column">
              <strong>PARTNERSHIP STATUS</strong>
            </div>
            <div class="column">
              <strong>OFFERING STATUS</strong>
            </div>
          </div>
          <div class="columns is-vcentered is-centered">
            <div class="column">
              {clientObject.accountIntellyStatus === "OK" ? (
                <CheckCircleIcon style={{ color: "#64A205" }} />
              ) : (
                <CloseIcon style={{ color: "#C71E03" }} />
              )}
            </div>
            <div class="column">
              {clientObject.partnerStatus === "OK" ? (
                <CheckCircleIcon style={{ color: "#64A205" }} />
              ) : (
                <CloseIcon style={{ color: "#C71E03" }} />
              )}
            </div>
            <div class="column">
              {clientObject.offeringStatus === "OK" ? (
                <CheckCircleIcon style={{ color: "#64A205" }} />
              ) : (
                <CloseIcon style={{ color: "#C71E03" }} />
              )}
            </div>
          </div>
         
          <div class="columns">
            <div class="column">
              <AddContactForm clientId={clientObject.id} />
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <AddOpportunityForm clientId={clientObject.id} />
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field is-grouped">
                <div class="control">
                  <Tooltip placement="bottom" title="Add New Activity">
                    <Fab
                      variant="extended"
                      color="primary"
                      aria-label="add"
                      onClick={() =>
                        history.push(`/add_track?client=${clientObject.id}`)
                      }
                    >
                      <AddIcon style={{ color: "white" }} />
                      <span style={{ color: "white" }}>New Activity</span>
                    </Fab>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          <div class="columns is-centered">
            <div className="column">
              <center>
                <table className="table is-hoverable">
                  <thead>
                    <td></td>
                    <td>Area</td>
                    <td>Date</td>
                    <td>Name</td>
                    <td>Role</td>
                    <td>Comment</td>
                  </thead>
                  <tbody>
                    {result.length > 0 ? (
                      result.map(function (item) {
                        return (
                          <tr>
                            <td>
                              <button
                                class="button is-text"
                                onClick={() => handleDeleteTrack(item.id)}
                              >
                                <DeleteIcon />
                              </button>
                            </td>

                            <td>{item.area_description}</td>
                            <td>{item.dateAction}</td>
                            <td>{item.name}</td>
                            <td>{item.role}</td>
                            <td>{item.comment}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <td colspan="6">
                        <center>No results found</center>
                      </td>
                    )}
                  </tbody>
                </table>
              </center>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientTrackerPage;
