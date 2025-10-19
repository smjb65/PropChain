import { Box, Typography, Link, Grid } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer" sx={{ bgcolor: '#3f51b5', padding: { xs: '24px 16px', md: '40px 24px' } }}>
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
              maxWidth: '300px',
            }}
          >
            We are a leading platform for real estate tokenization, empowering users to buy, sell, and invest in properties using blockchain technology.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            Quick Links
          </Typography>
          <ul className="footer-links">
            <li>
              <Link
                href="/"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  '&:hover': { color: '#fff', textDecoration: 'underline' },
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  '&:hover': { color: '#fff', textDecoration: 'underline' },
                }}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  '&:hover': { color: '#fff', textDecoration: 'underline' },
                }}
              >
                Register Property
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
            }}
          >
            Email: <Link href="mailto:support@propchain.com" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              smjghafarikia@gmail.com
            </Link>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
            }}
          >
            Phone: <Link href="tel:+18001234567" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              +98 936 312 2064
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.85rem',
          }}
        >
          &copy; {new Date().getFullYear()} PropChain. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;