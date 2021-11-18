import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";

import TableComponent from "../../components/TableComponent";
import NavbarComponent from "../../components/NavbarComponent";

const axios = require("axios");

function HomePage() {
  const [result, setResult] = useState([]);
  let history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: "My Clients",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            sortType: "basic",
          },
          {
            Header: "Client Manager",
            accessor: "clientManager",
            sortType: "basic",
          },
          {
            Header: "Tier Description",
            accessor: "tierDescription",
            sortType: "basic",
          },

          {
            Header: "Last Update",
            accesor: "lastUpdate",
            sortType: "basic",
            Cell: ({ cell: { value } }) => value,
          },
          {
            accesor: "procurementStatus",
            Header: "Procurement Status",
            sortType: "basic",
            Cell: ({ cell: { value } }) => {
              if (value === "OK") {
                return <CheckCircleIcon style={{ color: "#64A205" }} />;
              } else {
                return <CloseIcon style={{ color: "#C71E03" }} />;
              }
            },
          },
          {
            accesor: "linkedinStatus",
            Header: "LinkedIn Status",
            sortType: "basic",
            Cell: ({ cell: { value } }) => {
              {
                if (value === "OK") {
                  return <CheckCircleIcon style={{ color: "#64A205" }} />;
                } else {
                  return <CloseIcon style={{ color: "#C71E03" }} />;
                }
              }
            },
          },
          {
            accesor: "contactStatus",
            Header: "Contact Status",
            sortType: "basic",
            Cell: ({ cell: { value } }) => {
              {
                if (value === "OK") {
                  return <CheckCircleIcon style={{ color: "#64A205" }} />;
                } else {
                  return <CloseIcon style={{ color: "#C71E03" }} />;
                }
              }
            },
          },
          {
            accesor: "accountIntellyStatus",
            Header: "Account Intelligence Status",
            sortType: "basic",
            Cell: ({ cell: { value } }) => {
              {
                if (value === "OK") {
                  return <CheckCircleIcon style={{ color: "#64A205" }} />;
                } else {
                  return <CloseIcon style={{ color: "#C71E03" }} />;
                }
              }
            },
          },
          {
            accesor: "partnerStatus",
            Header: "Partment Status",
            sortType: "basic",
            Cell: ({ cell: { value } }) => {
              {
                if (value === "OK") {
                  return <CheckCircleIcon style={{ color: "#64A205" }} />;
                } else {
                  return <CloseIcon style={{ color: "#C71E03" }} />;
                }
              }
            },
          },
          {
            header: "offeringStatus",
            Header: "Offering Status",
            sortType: "basic",
            Cell: ({ cell: { value } }) => {
              {
                if (value === "OK") {
                  return <CheckCircleIcon style={{ color: "#64A205" }} />;
                } else {
                  return <CloseIcon style={{ color: "#C71E03" }} />;
                }
              }
            },
          },
        ],
      },
    ],
    []
  );

  const fetchData = async () => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT_URL}/client-management/client`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("user_token"),
        },
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
      <section>
        <NavbarComponent />
        <div className="container">
          <div id="my_clients_dashboard">
            <div className="columns">
              <div className="column is-half">
                <>
                  {result && <TableComponent columns={columns} data={result} />}
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
