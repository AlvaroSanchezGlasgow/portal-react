/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import NavbarComponent from "../Components/NavbarComponent";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

const axios = require("axios");

function ClientListPage() {
  const [result, setResult] = useState([]);
  const [errorMessage, setError] = useState([]);
  let history = useHistory();

  const goToEdit = (value) => {
    history.push("/edit_client?client=" + value[0]);
  };

  const options = {
    filterType: "dropdown",
    rowHover: true,
    onRowsDelete: (rowsDeleted) => {
      const rowsToDelete = rowsDeleted.data.map((d) => result[d.dataIndex]);
      handleDelete(rowsToDelete);
    },
    onRowClick: (event, rowData) => {
      goToEdit(event);
    },
    rowsPerPageOptions: [5, 10],
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "name",
      label: "NAME",
      options: {
        filter: true,
      },
    },
    {
      name: "website",
      label: "WEBSITE",
      options: {
        filter: true,
      },
    },
    {
      name: "clientManager",
      label: "CLIENT MANAGER",
      options: {
        filter: true,
      },
    },
  ];

  const handleDelete = (recordsToDelete) => {
    var result = recordsToDelete
      .map(function (item) {
        return item.id;
      })
      .join(", ");

    axios
      .delete(
        `${process.env.REACT_APP_API_ROOT_URL}/client-management/clients/${result}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("user_token"),
          },
        }
      )
      .then(function (response) {
        fetchData();
      })
      .catch(function (error) {
        console.log("Error : " + error);
        setError(error);
      })
      .finally(function () {
        // always executed
      });
  };

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
      <section>
      <div className="container">
        <NavbarComponent />
        
        <div id="main_index">
          <h2>Clients List</h2>
        </div>
        <div className="columns">
        
          <div className="column is-12">
            {errorMessage.message && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {JSON.stringify(errorMessage.message)}
              </Alert>
            )}
        <button className="button is-primary" onClick={()=>history.push("/new-client")}>New Client</button>
            <MUIDataTable
              title={""}
              data={result}
              columns={columns}
              options={options}
            />
          </div>
          <div className="column"></div>
        </div>
      </div>
      </section>
    </>
  );
}
export default ClientListPage;
