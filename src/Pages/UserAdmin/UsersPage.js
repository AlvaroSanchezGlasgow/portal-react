/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";

const axios = require("axios");

function UsersPage() {
  const [result, setResult] = useState([]);
  let history = useHistory();

  const goToEdit = (value) => {
    history.push("/admin?user=" + value[1]);
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
      name: "username",
      label: "USERNAME",
      options: {
        filter: true,
      },
    },
    {
      name: "firstName",
      label: "NAME",
      options: {
        filter: true,
      },
    },
    {
      name: "lastName",
      label: "SURNAME",
      options: {
        filter: true,
      },
    },
    {
      name: "email",
      label: "EMAIL",
      options: {
        filter: true,
      },
    },
    {
      name: "comment",
      label: "COMMENT",
      options: {
        filter: true,
      },
    },
    {
      name: "isActive",
      label: "ACTIVE",
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === "Y") {
            return <CheckCircleIcon style={{ color: "#64A205" }} />;
          } else {
            return <CloseIcon style={{ color: "#C71E03" }} />;
          }
        },
        //CheckCircleIcon
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
        `${process.env.REACT_APP_API_ROOT_URL}/users-management/users/${result}`,
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
        console.log("Error Fetching Data: " + error);
        history.push("/");
      })
      .finally(function () {
        // always executed
      });
  };

  const fetchData = async () => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT_URL}/users-management/users`, {
        headers: {
          "Content-Type": "application/json",
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
          <div className="columns">
            <div className="column">
              <div id="main_index">
                <h2>App Users</h2>
              </div>
            </div>
          </div>
          <button
            className="button is-primary"
            onClick={() => history.push("/new-user")}
          >
            New User
          </button>
          <div className="columns">
            <div className="column is-12">
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
export default UsersPage;
