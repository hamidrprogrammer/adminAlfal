import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Material UI components
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Third-party libraries
import axios from 'axios';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// Project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Chart data
import chartData from './chart-data/total-growth-bar-chart';

const status = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'month',
    label: 'This Month',
  },
  {
    value: 'year',
    label: 'This Year',
  },
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState('today');
  const [chartDataTwo, setChartDataTwo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const { primary } = theme.palette.text;
  const divider = theme.palette.divider;
  const grey500 = theme.palette.grey[500];
  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  // Fetching chart data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bu-fos-mastermind.solutions-apps.com/ai/socer'); // Update the base URL as needed
        setChartDataTwo(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update chart options when theme colors change
  

  // Check for loading, error, or missing chart data
  if (loading) {
    return <SkeletonTotalGrowthBarChart />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!chartDataTwo) {
    return <div>No data available</div>;
  }

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle2">Total</Typography>
                </Grid>
           
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                id="standard-select-currency"
                select
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            '& .apexcharts-menu.apexcharts-menu-open': {
              bgcolor: 'background.paper',
            },
          }}
        >
          <Chart {...chartDataTwo} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalGrowthBarChart;
