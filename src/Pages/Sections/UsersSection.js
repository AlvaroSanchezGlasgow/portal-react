import React from 'react';
import { useState, useEffect } from 'react';
const axios = require('axios');



function UsersSection() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [value, setUserName] = useState();
    const [error, setError] = useState(false);

   const handleChange = (e) => {
    setUserName({
            [e.target.name]: e.target.value
        })
    }
   const clickName= () => {
      //alert(JSON.stringify(value));

      if (value){
          setError(false);
            setLoading(true);
            //We call the api
            axios.get(`https://www.foaas.com/asshole/${value.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            )
            .then(function (response) {
                // handle success
                setMessage(response.data.message+response.data.subtitle);
            })
            .catch(function (error) {
            // handle error
                setError(true);
                setMessage(error.message);
            })
            .finally(function () {
                // always executed
            });
            setLoading(false)
        }else{
            setError(true);
        }
    }
    
    return (
        <div>
            <div class='container'>
                <div class='columns'>
                    <div class='column'>
                       
                            <h2>Users</h2>
                       
                            <p>
                                Consectetur cras eu rhoncus netus dignissim hendrerit? Purus aptent scelerisque fusce enim nunc.
                                Fames sagittis magnis proin lectus accumsan nascetur nisl ad.
                               
                            </p>
                       
                    </div>
                </div>
                <div class='columns'>
                    <div class='column'>
                            <div class="field">
                                <label class="label">Search Users by Name</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="User Name" maxLength="50" id="username" name="username" onChange={e => handleChange(e)}/>
                                    </div>
                                    <p class="help">username at this app is the user email address</p>
                                    {error && <span class='error_text'>Ups! Something was wrong. Text input is empty</span>}
                                    <div class="field is-grouped">
                                        <div class="control">
                                            <button className="button is-primary" onClick={() => clickName()}>submit</button>
                                        </div>
                                    </div>
                            </div>
                    </div>
                    <div class='column'>
                        {message}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UsersSection;