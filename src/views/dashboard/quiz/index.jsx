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
  Slide,
  TablePagination,
} from '@mui/material';
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RehypeHighlight from "rehype-highlight";
import rehypeRaw from 'rehype-raw'; // Add this to handle raw HTML
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Show response icon
import { gridSpacing } from 'store/constant';
import Chart from 'react-apexcharts';
import Json from './text.json';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { Navigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

const QuizManagementTable = () => {

  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  if(!activeAccount){
    return <Navigate to="/login" replace />;
  }
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const json=Json;
  // Line chart data
  const chartOptions = {
    chart: {
      id: 'quiz-performance',
      toolbar: { show: false },
      background: 'transparent',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: quizzes.map(quiz => quiz.messages), // Use quiz names as categories
    },
    colors: ['#007bff', '#ff7f0e'], // Customize colors
    tooltip: {
      theme: 'dark',
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  };

  const chartSeries = [
    {
      name: 'Quiz Scores',
      data: quizzes.map(quiz => Math.floor(Math.random() * 2) || 0), // Assume each quiz has a score
    },
  ];

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('https://bu-fos-mastermind.solutions-apps.com/ai/quizzes'); // Adjust the URL as necessary
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuizzes(data); // Set the quizzes state with fetched data
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchQuizzes();
  }, []);

  const handleOpenModal = (quiz) => {
    setSelectedQuiz(quiz);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedQuiz(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 on rows per page change
  };
// Define your chart components directly
const QuestionResponseFlowMap = () => {
  const series = [{ name: 'Correct', data: [45, 20, 15, 20] }, { name: 'Ambiguous', data: [20, 10, 15, 5] }, { name: 'Unanswered', data: [10, 5, 10, 5] }];
  const options = { chart: { type: 'bar', height: 350 }, xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] } };
  return <Chart options={options} series={series} type="bar" height={350} />;
};

const SentimentAnalysis = () => {
  const series = [{ name: 'Sentiment', data: [70, 20, 10] }];
  const options = { chart: { type: 'bar', height: 350 }, xaxis: { categories: ['Positive', 'Negative', 'Neutral'] } };
  return <Chart options={options} series={series} type="bar" height={350} />;
};

const TopicClusters = () => {
  const series = [{ name: 'Topics', data: [35, 30, 25, 20] }];
  const options = { chart: { type: 'bubble', height: 350 }, xaxis: { categories: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] } };
  return <Chart options={options} series={series} type="bubble" height={350} />;
};

const QuestionsTrendAnalysis = () => {
  const series = [{ name: 'Questions', data: [20, 30, 50, 40, 60] }];
  const options = { chart: { type: 'line', height: 350 }, xaxis: { categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'] } };
  return <Chart options={options} series={series} type="line" height={350} />;
};

const ComplexityResponseTime = () => {
  const series = [{ name: 'Complexity', data: [5, 10, 15, 20] }];
  const options = { chart: { type: 'scatter', height: 350 }, xaxis: { categories: ['Low', 'Medium', 'High'] } };
  return <Chart options={options} series={series} type="scatter" height={350} />;
};
const charts = {
  chartOne: QuestionResponseFlowMap,
  chartTwo: SentimentAnalysis,
  chartThree: TopicClusters,
  chartFour: QuestionsTrendAnalysis,
  chartFive: ComplexityResponseTime,
};


  if (loading) {
    return   <SkeletonTotalGrowthBarChart />; // You can add a spinner here if desired
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Card style={{ width: '100%', marginBottom: '20px' }}>
        
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quiz Performance
            </Typography>
            <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card style={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quiz Management
            </Typography>
            <TableContainer component={Paper} style={{ width: '100%' }}>
              <Table aria-label="quiz management table">
                <TableHead>
                  <TableRow>
                    <TableCell>Quiz Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Quiz Time</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizzes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell>{quiz.messages}</TableCell>
                      <TableCell>{quiz.username}</TableCell>
                      <TableCell>{quiz.quizTime}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="show response"
                          onClick={() => handleOpenModal(quiz)} // Open modal with quiz data
                        >
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
              count={quizzes.length} // Total number of quizzes
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Modal for showing quiz details */}
    
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
    <Typography id="modal-title" variant="h3" component="h2"> Message</Typography>
    <Box sx={{ maxHeight: '50vh', overflowY: 'auto', mt: 2 }}>
    <Typography variant="body1">
                  <strong>Quiz Name:</strong> {selectedQuiz?.messages}
                </Typography>
                <Typography variant="body1">
                  <strong>Username:</strong> {selectedQuiz?.username}
                </Typography>
                <Typography variant="body1">
                  <strong>Quiz Time:</strong> {selectedQuiz?.quizTime}
                </Typography>
      <div style={{height:20}}/>

      <Typography id="modal-title" variant="h3" component="h2">Response</Typography>
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
        {selectedQuiz?.response}
      </ReactMarkdown>
    </Box>

    <IconButton onClick={handleCloseModal} aria-label="close" sx={{ mt: 2, position: 'absolute', top: 8, right: 8 }}>
      <VisibilityIcon />
    </IconButton>
  </Box>
</Modal>
    </Grid>
  );
};

export default QuizManagementTable;
