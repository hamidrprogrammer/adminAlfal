import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import {
  ChevronRightOutlined as ChevronRightOutlinedIcon,
  MoreHorizOutlined as MoreHorizOutlinedIcon,
  KeyboardArrowUpOutlined as KeyboardArrowUpOutlinedIcon,
  KeyboardArrowDownOutlined as KeyboardArrowDownOutlinedIcon
} from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

const PopularCardFeedBack = ({ isLoading }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    // Fetch data from the /mostquiz endpoint
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/ai/mostfeedback'); // Adjust the URL as necessary
        if(response.ok){
          const data = await response.json();
          setQuizzes(data);

        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizzes();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {loading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Top Performing FeedBack:</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{ color: 'primary.200', cursor: 'pointer' }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem onClick={handleClose}>Today</MenuItem>
                      <MenuItem onClick={handleClose}>This Month</MenuItem>
                      <MenuItem onClick={handleClose}>This Year</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                {quizzes?.map((quiz, index) => (
                  <React.Fragment key={index}>
                    <Grid container direction="column">
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {quiz.message}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                {quiz.repetitions}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '5px',
                                    bgcolor: quiz?.repetitions > 5 ? 'success.light' : 'orange.light',
                                    color: quiz?.repetitions > 5 ? 'success.dark' : 'orange.dark',
                                    ml: 2
                                  }}
                                >
                                  {quiz?.repetitions > 5 ? (
                                    <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                  ) : (
                                    <KeyboardArrowDownOutlinedIcon fontSize="small" />
                                  )}
                                </Avatar>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        {/* <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          {quiz.username} - {quiz.message}
                        </Typography> */}
                      </Grid>   
                    </Grid>
                    <Divider sx={{ my: 1.5 }} />
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          {/* <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions> */}
        </MainCard>
      )}
    </>
  );
};

PopularCardFeedBack.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCardFeedBack;
