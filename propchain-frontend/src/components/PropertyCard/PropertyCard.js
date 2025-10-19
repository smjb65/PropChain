import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function PropertyCard() {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="Property Image"
        height="140"
        image="https://via.placeholder.com/150"
      />
      <CardContent>
        <Typography variant="h6">
          Luxury Apartment in Downtown
        </Typography>
        <Typography variant="body2" color="textSecondary">
          A beautiful 2-bedroom apartment located in the heart of the city.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;
