# Investure - S&P Returns Graph

<img width="1360" alt="Screenshot 2024-10-02 at 4 50 07 PM" src="https://github.com/user-attachments/assets/d7e08438-76de-4518-8e54-d78bfc19a47c">

This project visualizes the cumulative return of the S&P 500 using data from the raw dataset provided. The application is built using a JavaScript front-end framework (React) and a REST API back-end (Express). The frontend is deployed on GitHub Pages for easy access.

## Live Demo

Check out the live demo of the project: [Investure - S&P Returns Graph](https://sohampatil17.github.io/investure-submission/)


## Overview

This project aims to display the cumulative returns of the S&P 500 over time using historical data. The backend calculates the cumulative returns, while the frontend provides an interactive visualization of this data.

### Features
- Ingests data from a CSV containing daily S&P 500 returns.
- Calculates cumulative return for each data point.
- Provides an interactive graph for visualizing the cumulative return.
- Toggle between dark and light themes for better user experience.

## Technologies Used

- **Frontend**: React, Recharts, Axios, GitHub Pages for deployment.
- **Backend**: Node.js, Express, CSV Parser.
- **Charting Library**: Recharts for the cumulative returns graph.

## How It Works

1. **Backend**:
   - Parses CSV data from the `rawdata` tab.
   - Calculates cumulative return up to each specific data point in time.
   - Provides the data via a REST API endpoint (`/api/total-return`).

2. **Frontend**:
   - Fetches the calculated cumulative return data from the backend.
   - Uses Recharts to plot the data interactively.
   - Includes a dark/light theme toggle for better UI experience.

## Installation

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies:

   ```bash
   npm install
3. Start the server
   ```bash
   node server.js

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:

   ```bash
   npm install
3. Start the server
   ```bash
   npm start
4. For deployment
   ```bash
   npm run deploy

