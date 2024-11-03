import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Google from './images.png';
import { loginRequest } from '../../../../authConfig';
import { useMsal } from '@azure/msal-react';
import { Navigate } from 'react-router';

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleRedirect = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.log(e);
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            onClick={handleRedirect}
            size="large"
            variant="outlined"
            sx={{
              color: 'grey.700',
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100]
            }}
          >
            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
              <img src={Google} alt="Microsoft" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
            </Box>
            Sign in with Microsoft
          </Button>
        </AnimateButton>
      </Grid>
    </Grid>
  );
};

export default AuthLogin;
