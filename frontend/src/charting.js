import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaSun, FaMoon } from 'react-icons/fa';
import './charting.css';

const Charting = () => {
  const [data, setData] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Fetch the cumulative return data from the backend API when the component is mounted
  useEffect(() => {
    axios
      .get('http://localhost:5001/api/total-return')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div className={isDarkTheme ? 'container dark' : 'container light'}>
      {/* Theme toggle switch */}
      <div className="header-controls">
        <div className="theme-switch-wrapper">
          <label className="theme-switch">
            <input type="checkbox" checked={!isDarkTheme} onChange={toggleTheme} />
            <span className="slider">
              {isDarkTheme ? <FaMoon className="icon moon-icon" /> : <FaSun className="icon sun-icon" />}
            </span>
          </label>
        </div>
      </div>

      {/* Responsive container to adapt chart size to different screen widths */}
      <ResponsiveContainer width="100%" height={750}>
        <LineChart
          data={data}
          margin={{
            top: 40,
            right: 60,
            left: 70,
            bottom: 120,
          }}
        >
          {/* Grid lines for better readability */}
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? '#666' : '#ccc'} />

          {/* X-axis showing the date */}
          <XAxis
            dataKey="date"
            tick={{ fill: isDarkTheme ? '#f5f5f5' : '#333', fontSize: 12 }}
            interval="preserveStart"
            angle={-45}
            textAnchor="end"
            label={{
              value: 'Date',
              position: 'insideBottom',
              offset: -15,
              fill: isDarkTheme ? '#f5f5f5' : '#333',
              fontSize: 16,
            }}
            height={80}
          />

          {/* Y-axis showing cumulative return percentage */}
          <YAxis
            tick={{ fill: isDarkTheme ? '#f5f5f5' : '#333', fontSize: 14 }}
            domain={['auto', 'auto']}
            label={{
              value: 'Cumulative Return (%)',
              angle: -90,
              position: 'insideLeft',
              fill: isDarkTheme ? '#f5f5f5' : '#333',
              fontSize: 16,
              dx: -20,
            }}
          />

          {/* Tooltip updated to show only date and cumulative return without additional zero */}
          <Tooltip
            formatter={(value, name) => {
              if (name === 'cumulativeReturn') {
                return [`${value.toFixed(2)}%`];
              }
              return null; // Returning null for other values to prevent display
            }}
            contentStyle={{
              backgroundColor: isDarkTheme ? '#333' : '#f5f5f5',
              borderColor: isDarkTheme ? '#888' : '#ccc',
            }}
            labelStyle={{ color: isDarkTheme ? '#f5f5f5' : '#333' }}
          />

          {/* Main line representing cumulative return */}
          <Line
            type="monotone"
            dataKey="cumulativeReturn"
            stroke="#8884d8"
            dot={{ r: 2 }}
            strokeWidth={2}
            activeDot={{ r: 4 }}
            isAnimationActive={true}
          />

          {/* Subtle horizontal line at y = 0 for reference */}
          <Line
            type="linear"
            dataKey={() => 0}
            stroke="#bbb"
            strokeDasharray="4 4"
            isAnimationActive={false}
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charting;
