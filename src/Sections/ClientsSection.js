/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";

import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import SpinnerComponent from "../Components/SpinnerComponent";

const axios = require("axios");

function ClientsSection() {
  const [result, setResult] = useState([]);
  let history = useHistory();

  const goToEdit = (value) => {
    history.push("/client_tracker?client=" + value[0]);
  };

  const options = {
    filterType: "dropdown",
    onRowClick: (event, rowData) => {
      goToEdit(event);
    },
    selectableRows: false,
    rowsPerPageOptions: [5, 10],
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
        filter: false,
      },
    },

    {
      name: "name",
      label: "NAME",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return <strong>{value}</strong>;
        },
      },
    },
    {
      name: "clientManager",
      label: "CLIENT MANAGER",
      options: {
        display: false,
        filter: true,
      },
    },
    {
      name: "tierDescription",
      label: "TIER",
      options: {
        filter: true,
      },
    },

    {
      name: "sectorDescription",
      label: "SECTOR",
      options: {
        filter: true,
      },
    },

    {
      name: "lastUpdate",
      label: "LAST UPDATE",
      options: {
        filter: true,
      },
    },

    {
      name: "procurementStatus",
      label: "PROCUREMENT STATUS",
      options: {
        filter: true,

        customBodyRender: (value) => {
          if (value === "OK") {
            return <CheckCircleIcon style={{ color: "#64A205" }} />;
          } else {
            return <CloseIcon style={{ color: "#C71E03" }} />;
          }
        },
      },
    },
    {
      name: "linkedinStatus",
      label: "LINKEDIN STATUS",
      options: {
        filter: true,

        customBodyRender: (value) => {
          if (value === "OK") {
            return <CheckCircleIcon style={{ color: "#64A205" }} />;
          } else {
            return <CloseIcon style={{ color: "#C71E03" }} />;
          }
        },
      },
    },
    {
      name: "contactStatus",
      label: "CONTACT STATUS",
      options: {
        filter: true,

        customBodyRender: (value) => {
          if (value === "OK") {
            return <CheckCircleIcon style={{ color: "#64A205" }} />;
          } else {
            return <CloseIcon style={{ color: "#C71E03" }} />;
          }
        },
      },
    },
    {
      name: "accountIntellyStatus",
      label: "ACCOUNT INTELLIGENCE STATUS",
      options: {
        filter: true,

        customBodyRender: (value) => {
          if (value === "OK") {
            return <CheckCircleIcon style={{ color: "#64A205" }} />;
          } else {
            return <CloseIcon style={{ color: "#C71E03" }} />;
          }
        },
      },
    },

    {
      name: "partnerStatus",
      label: "PARTNER STATUS",
      options: {
        filter: true,

        customBodyRender: (value) => {
          if (value === "OK") {
            return <CheckCircleIcon style={{ color: "#64A205" }} />;
          } else {
            return <CloseIcon style={{ color: "#C71E03" }} />;
          }
        },
      },
    },
    {
      name: "offeringStatus",
      label: "OFFERING STATUS",
      options: {
        filter: true,

        customBodyRender: (value) => {
          if (value === "OK") {
            return <CheckCircleIcon style={{ color: "#64A205" }} />;
          } else {
            return <CloseIcon style={{ color: "#C71E03" }} />;
          }
        },
      },
    },

    /*  {
            name: "isActive",
            label: "ACTIVE",
            options: {
                filter: true,
                customBodyRender: (value) => {
                
                    if(value === "Y"){
                    return (
                        <CheckCircleIcon style={{ color: '#64A205' }}/>
                      );
                    }else{
                        return (
                        <CloseIcon style={{ color: '#C71E03' }}/>
                        );
                    }
                }
                
            }
        },  */
  ];

  const fetchData = async () => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT_URL}/client-management/clients`, {
        headers: {},
      })
      .then(function (response) {
        setResult(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("Error Fetching Data: " + error);
        history.push("/");
      })
      .finally(function () {
        // always executed
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>Clients Dashboard</h2>
      <div id="clients_dashboard">
        <div className="columns is-centered is-mobile">
          <div className="column">
            {!result[0] && <SpinnerComponent />}
            {result[0] && (
              <MUIDataTable
                title={""}
                data={result}
                columns={columns}
                options={options}
              />
            )}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
export default ClientsSection;
