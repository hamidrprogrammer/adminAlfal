// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Alfa Laval" width="100" />
     *
     */
    <svg width="50" height="50" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#F0F3FA" d="M0 0h56v56H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M44.97 29.024c.02-.339.03-.68.03-1.024 0-9.389-7.611-17-17-17-7.64 0-14.103 5.04-16.245 11.976 1.858.452 4.09.964 6.502 1.49l1.161-1.154c1.176-1.087 4.807-3.262 9.92-3.262 5.113 0 8.92 2.53 10.186 3.795l5.446 5.179Zm-1.408 5.83-4.894-5.142c-4.512-.665-10.955-1.697-16.875-2.835l-8.625 9.437C16.08 41.498 21.631 45 28 45c6.95 0 12.926-4.17 15.562-10.146Zm-32.233-3.508A17.08 17.08 0 0 1 11 28c0-1.189.122-2.35.354-3.47 1.564.442 3.438.892 5.49 1.339l-5.515 5.477Zm25.696-3.36c-3.943-.559-9.05-1.502-13.956-2.505l.13-.144a7.656 7.656 0 0 1 11.198-.113l2.628 2.762Z" fill="#11377E"/></svg>
  );
};

export default Logo;