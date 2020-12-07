import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';


const axios = require('axios');

function TrackerComponent() {
    const [result, setResult] = useState([]);
    let history = useHistory();

   

    const options = {
        filterType: 'dropdown',
        onRowsDelete: (rowsDeleted) => {
            const rowsToDelete = rowsDeleted.data.map((d) => result[d.dataIndex]);
            handleDelete(rowsToDelete);
        },
        download:false,
        filter:false,
        search:false,
        print:false,
        rowsPerPageOptions: [5,10]
    };

    const columns = [

        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                searchable:false,
                display:false,
                view:false
               
            }
        },
        {
            name: "area_description",
            label: "AREA",
            options: {
                filter: true
            }
        },
        {
            name: "dateAction",
            label: "DATE",
            options: {
                filter: true
      
            }
        },
        {
            name: "name",
            label: "NAME",
            options: {
                filter: true,
           
            }
        },{
            name: "role",
            label: "ROLE",
            options: {
                filter: true,
           
            }
        },{
            name: "comment",
            label: "COMMENT",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                   ReactHtmlParser(value)
                    );
                },
                
            }
        }
  
];

useEffect(() => { fetchData() }, []);

        const fetchData = async () => {
        //alert(JSON.stringify(value));
        
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const clientUrl = params.get('client');
       
        //We call the api
        axios.get(`${process.env.REACT_APP_API_ROOT_URL}/client-tracker/tracks/${clientUrl}`, {
            headers: {
              
            }
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

    }

    const handleDelete = (recordsToDelete) => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const clientUrl = params.get('client');
       

        var result = recordsToDelete.map(function (item) {
            return item.id;
        }).join(', ');

        axios.delete(`${process.env.REACT_APP_API_ROOT_URL}/client-tracker/tracks/${result}`, {
            headers: {
              
            }
        }).then(function (response) {
            history.push("/");
                history.push("/client_tracker?client="+clientUrl);
           

        }).catch(function (error) {
                
                console.log("Error Fetching Data: "+error);
               

            })
            .finally(function () {
                // always executed
            });

    }
   
    return (
        <>
           <div className="columns is-centered">
        
           <MUIDataTable
               title={"Actities Tracker"}
               data={result}
               columns={columns}
               options={options}
           />
         
</div>
        </>
    );
}

export default TrackerComponent;