import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import Chart from 'react-apexcharts';
import { gridSpacing } from 'store/constant';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';

// ==============================|| USER TABLE WITH LINE CHART ||============================== //
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

const UserTable = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  if(!activeAccount){
    return <Navigate to="/login" replace  />;
  }
  const [users, setUsers] = useState([]);
  const [userCountsByMonth, setUserCountsByMonth] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    familyName: '',
    email: ''
  });
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://bu-fos-mastermind.solutions-apps.com/ai/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        calculateUserCounts(data);
      } else {
        console.error('Failed to fetch users:', response.status);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    

    fetchUsers();
  }, []);

  const calculateUserCounts = (users) => {
    const userCounts = {};
    users.forEach(user => {
      const date = new Date(user.createdAt);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const monthYear = `${year}-${date.getMonth() + 1}`;

      userCounts[monthYear] = (userCounts[monthYear] || 0) + 1;
    });

    const formattedCounts = Object.entries(userCounts).map(([monthYear, count]) => ({
      monthYear,
      count
    })).sort((a, b) => new Date(a.monthYear) - new Date(b.monthYear));

    setUserCountsByMonth(formattedCounts);
  };

  const chartData = {
    series: [{
      name: 'Users Added',
      data: userCountsByMonth.map(item => item.count)
    }],
    options: {
      chart: {
        type: 'line',
        zoom: { enabled: false },
        toolbar: { show: true }
      },
      xaxis: {
        categories: userCountsByMonth.map(item => {
          const [year, month] = item.monthYear.split('-');
          return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
        }),
        title: { text: 'Months' },
      },
      title: {
        text: 'Users Added Per Month',
        align: 'left'
      },
      colors: ['#00E396'],
      markers: { size: 4 },
      tooltip: {
        shared: true,
        intersect: false,
        x: { formatter: (val) => val },
        y: { formatter: (val) => `${val} users` }
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddUser = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    
    setNewUser({
      name: '',
      familyName: '',
      email: '',

    });
    fetchUsers();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const [isUser, setIsUser] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUser(true)
    try {
        const response = await axios.post('https://bu-fos-mastermind.solutions-apps.com/ai/invite', {
            email: newUser.email,
            display_name: newUser.name + " " +newUser.familyName,
        });

        if (response.status === 200) {
            
            // Clear form fields
            toast.error('User invited successfully!');
        }
        handleCloseModal();
    } catch (err) {
        toast.error('An error occurred while inviting the user.');
        console.error('Error inviting user:', err);
    }
    setIsUser(false)

  
};
  if (isLoading) {
    return (
      <SkeletonTotalGrowthBarChart />
    );
  }
  const validateEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address.');
    } else {
        setEmailError('');
    }
};
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Card style={{ width: '100%' }}>
          <CardContent>
            {/* <Typography variant="h6" gutterBottom>
              User Addition Trend
            </Typography>
            <Chart {...chartData} type="line" height={350} /> */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
              User List
            </Typography>
            <TableContainer component={Paper} style={{ width: '100%' }}>
              <Table aria-label="user table">
                <TableHead>
                  <TableRow>
                    <TableCell>Profile</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="primary" onClick={handleAddUser}>
                        Add User
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                    <TableRow key={user?.email}>
                      <TableCell>
                        <Avatar alt={user.displayName}  src={user?.userPrincipalName}/>
                      </TableCell>
                      <TableCell>{user?.displayName}</TableCell>
                      <TableCell>{user?.mail}</TableCell>
                      <TableCell align="right">
                        {/* Optional: You can add action buttons here for editing/deleting users */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Add User Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new user, please enter their details below.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Family Name"
              type="text"
              fullWidth
              name="familyName"
              value={newUser.familyName}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
              {isUser ==true ?<CircularProgress/>:
              <Button type="submit" color="primary" >
                Add User
              </Button>
              }
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default UserTable;
