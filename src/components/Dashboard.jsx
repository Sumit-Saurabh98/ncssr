import React from 'react';
import Header from './Header';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function Dashboard(props) {

    const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://switcyapi.onrender.com/data2')
      .then((response) => {
        const filterDateTimestamp = 1692338100;
        const endDateTimestamp = filterDateTimestamp + 30 * 24 * 60 * 60;
        const filteredData = response.data.slice(0, 100).filter(
          (item) =>
            item.time >= filterDateTimestamp && item.time <= endDateTimestamp
        );
        const formattedData = filteredData.map((item) => ({
          ...item,
          time: formatDate(item.time),
        }));

        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


    return (
        <div>
            <Header/>
            
            <Box>
                <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="load" name="Load" stroke="#8884d8" />
        <Line type="monotone" dataKey="solar" name="Solar" stroke="#82ca9d" />
        <Line type="monotone" dataKey="grid" name="Grid" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
            </Box>
        </div>
    );
}

export default Dashboard;