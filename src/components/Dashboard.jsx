import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import { Box, Button, Spinner } from '@chakra-ui/react';
import {FaFileDownload} from "react-icons/fa"
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);

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

  const handleDownloadPDF = async () => {
    if (chartContainerRef.current) {
      const chartContainer = chartContainerRef.current;
      const canvas = await html2canvas(chartContainer);

      const pdf = new jsPDF('landscape');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, canvas.width / 10, canvas.height / 10);
      pdf.save('chart.pdf');
    }
  };

  return (
    <div>
      <Header />

      <Box>
        <Button _hover={{cursor:"pointer"}} onClick={handleDownloadPDF}>{<FaFileDownload/>}</Button>
        {isLoading ? (
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        ) : (
          <div>
            <div ref={chartContainerRef}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} ref={chartRef}>
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
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

export default Dashboard;
