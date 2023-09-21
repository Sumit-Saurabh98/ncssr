import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Box, Spinner } from '@chakra-ui/react'; 
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URI)
      .then((response) => {
        const filterDateTimestamp = 1692338100;
        const endDateTimestamp = filterDateTimestamp + 30 * 24 * 60 * 60;
        const filteredData = response.data
          .slice(0, 100)
          .filter(
            (item) =>
              item.time >= filterDateTimestamp && item.time <= endDateTimestamp
          );
        const formattedData = filteredData.map((item) => ({
          ...item,
          time: formatDate(item.time),
        }));

        setData(formattedData);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div>
      <Header />

      <Box>
        {isLoading ? ( 
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        ) : (
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
        )}
      </Box>
    </div>
  );
}

export default Dashboard;
