import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './NavBar.css';

const NavBar = () => {
  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 24px' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: '0.5px',
            color: '#fff',
          }}
        >
          PropChain
        </Typography>
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <Button
            color="inherit"
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
              },
            }}
          >
            Explore
          </Button>
          <Button
            color="inherit"
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              padding: '8px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;