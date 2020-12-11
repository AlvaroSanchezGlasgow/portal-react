import React, { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import Tooltip from "@material-ui/core/Tooltip";
const axios = require("axios");
let flag = true;

function AddContactForm(props) {
  const [contactsObject, setContactsObject] = useState([]);
  const [auxContactsObject, setAuxContactsObject] = useState([]);
  const [sending, setSending] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleChangeContactObject = (e) => {
    setAuxContactsObject({
      ...auxContactsObject,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const clientUrl = params.get("client");

    axios
      .get(`${process.env.REACT_APP_API_ROOT_URL}/contact-management/contacts/${clientUrl}`, {
        headers: {},
      })
      .then(function (response) {
        setContactsObject(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect((props) => {
    fetchData();
  }, []);

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSubmit();
    }
  }
  
  const handleSubmit = (evt) => {
    setSending(true);

    flag = true;
    var params = new URLSearchParams();

    if (!auxContactsObject.name) {
      flag = false;
    }
    if (!auxContactsObject.surname) {
      flag = false;
    }
    if (!auxContactsObject.role) {
      flag = false;
    }
    if (!auxContactsObject.comment) {
      flag = false;
    }
    if (!props.clientId) {
      flag = false;
    }

    if (flag) {
      params.append("client_id", props.clientId);

      params.append("surname", auxContactsObject.surname);
      params.append("name", auxContactsObject.name);
      params.append("role", auxContactsObject.role);
      params.append("comment", auxContactsObject.comment);

      axios
        .post(`${process.env.REACT_APP_API_ROOT_URL}/contact-management/contacts`, params, {
          headers: {},
        })
        .then(function (response) {
          fetchData();
        })
        .catch(function (error) {
          // handle error
        })
        .finally(function () {
          // always executed
        });
    }
  };
  const handleDeleteContacts = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_ROOT_URL}/contact-management/contacts/${id}`, {
        headers: {},
      })
      .then(function (response) {
        fetchData();
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
        Contacts{" "}
        
          {showContactForm ? (
              <Tooltip placement="right" title="Hide New Contact Form">
           <Fab color="primary" aria-label="add" onClick={() =>
            showContactForm
              ? setShowContactForm(false)
              : setShowContactForm(true)
          }> <RemoveIcon style={{ color: 'white' }}/></Fab>
          </Tooltip>
          ) : (
            <Tooltip placement="right" title="Show New Contact Form">
            <Fab color="primary" aria-label="add" onClick={() =>
              showContactForm
                ? setShowContactForm(false)
                : setShowContactForm(true)
            }> <AddIcon style={{ color: 'white' }}/></Fab>
            </Tooltip>
          )}
       
      </div>
      {showContactForm ? (
        <>
          <div className="columns">
            <div className="column">
              <input
                class="input"
                name="name"
                id="name"
                placeholder="name"
                type="text"
                onChange={(e) => handleChangeContactObject(e)}
                onKeyPress={e => handleKeyPress(e)}
                maxLength="20"
              />

              {sending && !auxContactsObject.name && (
                <>
                  <Alert variant="outlined" severity="error">
                    Mandatory Field
                  </Alert>
                </>
              )}
            </div>
            <div className="column">
              <input
                class="input"
                name="surname"
                id="surname"
                placeholder="surname"
                type="text"
                onChange={(e) => handleChangeContactObject(e)}
                onKeyPress={e => handleKeyPress(e)}
                maxLength="20"
              />

              {sending && !auxContactsObject.surname && (
                <>
                  <Alert variant="outlined" severity="error">
                    Mandatory Field
                  </Alert>
                </>
              )}
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <input
                class="input"
                name="role"
                id="role"
                placeholder="role"
                type="text"
                onChange={(e) => handleChangeContactObject(e)}
                onKeyPress={e => handleKeyPress(e)}
                maxLength="20"
              />

              {sending && !auxContactsObject.role && (
                <>
                  <Alert variant="outlined" severity="error">
                    Mandatory Field
                  </Alert>
                </>
              )}
            </div>
            <div className="column">
              <input
                class="input"
                name="comment"
                id="comment"
                placeholder="comment"
                type="text"
                onChange={(e) => handleChangeContactObject(e)}
                onKeyPress={e => handleKeyPress(e)}
                maxLength="30"
              />

              {sending && !auxContactsObject.comment && (
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
              Add Contact
            </button>
          </center>
        </>
      ) : (
        <></>
      )}
   
        <table className="table is-hoverable">
          <thead>
            <td></td>
            <td>Name</td>
            <td>Surname</td>
            <td>Role</td>
            <td>Comment</td>
          </thead>
          <tbody>
            {contactsObject.map(function (item) {
              return (
                <tr>
                  <td>
                    <button
                      class="button is-text"
                      onClick={() => handleDeleteContacts(item.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>

                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.role}</td>
                  <td>{item.comment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
     
    </>
  );
}

export default AddContactForm;
