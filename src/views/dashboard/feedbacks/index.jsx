import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TablePagination,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Reject icon
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RehypeHighlight from "rehype-highlight";
import rehypeRaw from 'rehype-raw'; // Add this to handle raw HTML
import VisibilityIcon from '@mui/icons-material/Visibility';
import { gridSpacing } from 'store/constant';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chart from 'react-apexcharts';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

const FeedbackTable = () => {


  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  if(!activeAccount){
    return <Navigate to="/login" replace />;
  }
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [chartData, setChartData] = useState({
   
    options: {
      chart: { type: 'line', toolbar: { show: false } },
      xaxis: { categories: ['Total Feedback', 'Accepted', 'Rejected'] },
      colors: ['#00BFFF'],
      stroke: { curve: 'smooth' },
      dataLabels: { enabled: true },
      grid: { borderColor: '#e0e0e0' },
    },
  });
  const chartSeries = [
    {
      name: 'Quiz Scores',
      data: feedbacks.map(quiz => quiz.accept==true?1:2), // Assume each quiz has a score
    },
  ];
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('https://bu-fos-mastermind.solutions-apps.com/ai/feedbacks');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setFeedbacks(data);

        const totalFeedbacks = data.length;
        const acceptedCount = data.filter(fb => fb.accept === true).length;
        const rejectedCount = data.filter(fb => fb.accept === false).length;

        setChartData(prevData => ({
          ...prevData,
          series: [{ name: 'Feedback Stats', data: [totalFeedbacks, acceptedCount, rejectedCount] }],
        }));
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleOpenModal = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMessage('');
  };

  const handleCheckboxChange = async (feedbackId, acceptUpdate) => {
    try {
      const response = await axios.put(
        `https://bu-fos-mastermind.solutions-apps.com/ai/feedbacks/${feedbackId}`,
        null, // Send `null` for the request body
        {
          params: { accept_update: acceptUpdate } // Set accept_update in query params
        }
      );

      const updatedFeedback = response.data;
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(fb => (fb.id === feedbackId ? updatedFeedback : fb))
      );

      const acceptedCount = feedbacks.filter(fb => fb.accept === true).length;
      const rejectedCount = feedbacks.filter(fb => fb.accept === false).length;
      setChartData(prevData => ({
        ...prevData,
        series: [{ name: 'Feedback Stats', data: [feedbacks.length, acceptedCount, rejectedCount] }],
      }));

      toast.success(`Feedback ${acceptUpdate ? 'accepted' : 'rejected'} successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error(`Error updating feedback:`, error);
      toast.error('Error updating feedback.');
    }
  };

  if (loading) return <SkeletonTotalGrowthBarChart />;

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Card style={{ width: '100%', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Feedback Statistics</Typography>
            <FeedbackChart feedbacks={feedbacks}/>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card style={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Feedback Management</Typography>
            <TableContainer component={Paper} style={{ width: '100%' }}>
              <Table aria-label="feedback management table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell align="center">Accept</TableCell>
                    <TableCell align="center">Reject</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feedbacks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(feedback => (
                    <TableRow key={feedback.id}>
                      <TableCell>{feedback.name}</TableCell>
                      <TableCell>{feedback.username}</TableCell>
                      <TableCell>{feedback.message}</TableCell>
                      <TableCell align="center">
                        <Checkbox
                          checked={feedback.accept === true}
                          onChange={() => handleCheckboxChange(feedback.id, true)}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          checked={feedback.accept === false}
                          onChange={() => handleCheckboxChange(feedback.id, false)}
                          color="secondary"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="show" onClick={() => handleOpenModal(feedback)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={feedbacks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </CardContent>
        </Card>
      </Grid>

      <ToastContainer />

      <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: '16px',
      width: '80%', // Adjust width as needed
      maxHeight: '80vh', // Constrain height to viewport
      overflow: 'auto', // Enable scrolling for overflowing content
    }}
  >
    <Typography id="modal-title" variant="h3" component="h2">Feedback Message</Typography>
    <Box sx={{ maxHeight: '50vh', overflowY: 'auto', mt: 2 }}>
      <Typography id="modal-description" sx={{ mb: 2 }}>{selectedMessage?.message}</Typography>
      <div style={{height:8}}/>

      <Typography id="modal-title" variant="h3" component="h2">Feedback Quiz</Typography>
      <div style={{height:8}}/>
      <Typography id="modal-title" variant="h5" component="h2"> {selectedMessage?.reference}</Typography>
      <div style={{height:20}}/>

      <Typography id="modal-title" variant="h3" component="h2">Feedback Response</Typography>
      <div style={{height:8}}/>

      <ReactMarkdown
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
        rehypePlugins={[
          RehypeKatex,
          [
            RehypeHighlight,
            {
              detect: true,
              ignoreMissing: false,
            },
          ],
          rehypeRaw,
        ]}
      >
        {selectedMessage?.response}
      </ReactMarkdown>
    </Box>

    <IconButton onClick={handleCloseModal} aria-label="close" sx={{ mt: 2, position: 'absolute', top: 8, right: 8 }}>
      <CloseIcon />
    </IconButton>
  </Box>
</Modal>
    </Grid>
  );
};

export default FeedbackTable;




const FeedbackChart = ({ feedbacks }) => {
  const totalFeedbacks = feedbacks.length;
  const acceptedFeedbacks = feedbacks.filter(fb => fb.accept === true).length;
  const rejectedFeedbacks = feedbacks.filter(fb => fb.accept === false).length;

  const [chartData, setChartData] = useState({
    options: {
      chart: { type: 'line', toolbar: { show: false } },
      xaxis: { categories: ['Total Feedback', 'Accepted', 'Rejected'] },
      colors: ['#00BFFF'],
      stroke: { curve: 'smooth' },
      dataLabels: { enabled: true },
      grid: { borderColor: '#e0e0e0' },
    },
  });

  const chartSeries = [
    {
      name: 'Feedback Counts',
      data: [totalFeedbacks, acceptedFeedbacks, rejectedFeedbacks],
    },
  ];

  return <Chart {...chartData} series={chartSeries} height={350} />;
};

