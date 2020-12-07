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
      
          <AreaChart
            width={450}
            height={450}
            data={trackStats}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9aae04" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9aae04" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={false}/>
            <Label value="Type of Contact" offset={0} position="top" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="activities"
              stroke="#9aae04"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        
      </>
    );
}

export default ClientTrackerChart;