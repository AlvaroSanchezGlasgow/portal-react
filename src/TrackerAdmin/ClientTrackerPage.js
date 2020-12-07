import React, { useState, useEffect } from "react";
import TrackerComponent from "./TrackerComponent";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import SpinnerComponent from "../Components/SpinnerComponent";
import AddContactForm from "./AddContactForm";
import AddIcon from "@material-ui/icons/Add";
import StatusTable from "./StatusTable";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";
import ReactHtmlParser from 'react-html-parser';
const axios = require("axios");

function ClientTrackerPage() {
  const [clientObject, setClientObject] = useState([]);

  let history = useHistory();

  useEffect((props) => {
    //alert(JSON.stringify(value));

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const clientUrl = params.get("client");

    //We call the api
    axios
      .get(
        `${process.env.REACT_APP_API_ROOT_URL}/client-management/clients/${clientUrl}`,
        {
          headers: {},
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
  }, []);

  return (
    <>
      <div class="container">
        <br />

        <div class="columns">
          <div class="column is-6">
            {!clientObject.id && <SpinnerComponent />}
            {clientObject.id && (
              <div id="main_index">
                <h2>
                  {clientObject.name}{" "}
                  <Tooltip
                    title={"Open Client Website (" + clientObject.website + ")"}
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
                    label={ReactHtmlParser("<strong>CLIENT MANAGER</strong> - " + clientObject.clientManager)}
                    variant="outlined"
                  />

                  <Chip
                    label={ReactHtmlParser("<strong>TIER " +clientObject.tier +"</strong> - " +clientObject.tierDescription)}
                    variant="outlined"
                  />
                </div>
                <br />
                <div class="field">
                  <AddContactForm clientId={clientObject.id} />
                </div>
              </div>
            )}
          </div>
          <div class="column">
            <div class="box">
              <StatusTable sector={clientObject.sector} />
            </div>
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

        <div class="columns is-vcentered">
          <div class="column">
            <TrackerComponent />
          </div>
        </div>
        <br />

        <Tooltip title="Back to the Previous Page">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => history.push("/")}
          >
            <ArrowBackIcon style={{ color: "white" }} />
          </Fab>
        </Tooltip>
        <br />
        <br />
      </div>
    </>
  );
}

export default ClientTrackerPage;
