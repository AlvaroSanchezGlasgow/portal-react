import React,{useEffect,useState} from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label,
  } from 'recharts';
const axios = require('axios');

function ClientTrackerChart(props) {
    const [trackStats, setTrackStats] = useState([]);
   
    useEffect((props) => {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const clientUrl = params.get('client');
      
        //We call the api
        axios.get(`${process.env.REACT_APP_API_ROOT_URL}/client-tracker/tracks-stats/`+clientUrl, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("user_token"),
          }
        }
        ).then(function (response) {

            setTrackStats(response.data);
        
        }).catch(function (error) {
                // handle error

        }).finally(function () {
                // always executed
        });
        
    }, []);


    return (
      <>

      {JSON.stringify(props.activities)}
      
          <AreaChart
            width={450}
            height={450}
            data={props}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9aae04" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9aae04" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{fontSize: 13}}/>
            <Label value="Type of Contact" offset={1} position="top" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="area_description"
              stroke="#9aae04"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        
      </>
    );
}

export default ClientTrackerChart;