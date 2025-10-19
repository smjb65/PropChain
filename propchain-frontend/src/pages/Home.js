import { Container, Grid, Typography, Button } from '@mui/material';
import PropertyCard from '../components/PropertyCard/PropertyCard';

function Home() {
  return (
    <div>
      <Container>
        <Typography variant="h3" gutterBottom align="center">
          Welcome to PropChain
        </Typography>
        <Typography variant="h6" paragraph align="center">
          Discover and tokenize real estate properties.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {/* مثال برای کارت‌های املاک */}
          <Grid item xs={12} sm={6} md={4}>
            <PropertyCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PropertyCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PropertyCard />
          </Grid>
        </Grid>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary">
            Start Tokenizing
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Home;
