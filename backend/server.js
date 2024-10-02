const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

let data = [];

fs.createReadStream('../data/rawdata.csv') 
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

  app.get('/api/total-return', (req, res) => {
    let cumulativeReturn = [];
    let runningProduct = 1;
  
    // Adding additional initial dates with cumulative return of 0
    const initialDates = [
      { date: '1/1/1990', cumulativeReturn: 0 },
      { date: '1/2/1990', cumulativeReturn: 0 },
      { date: '1/3/1990', cumulativeReturn: 0 },
    ];
  
    // Processing the original data
    data.forEach((entry, index) => {
      const dailyReturn = parseFloat(entry['DailyReturn']);
  
      // Calculation
      if (!isNaN(dailyReturn)) {
        runningProduct *= 1 + dailyReturn / 100;
        cumulativeReturn.push({
          date: entry['ReferenceDate'],
          cumulativeReturn: (runningProduct - 1) * 100, // Converting to percentage
        });
      }
    });
  
    // Merging the initial dates with the calculated cumulative return data
    res.json([...initialDates, ...cumulativeReturn]);
  });
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
