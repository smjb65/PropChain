import React, { useState, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Box,
  InputAdornment,
} from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './PropertyRegistration.css';

const mapContainerStyle = {
  width: '100%',
  height: '300px', // همخوانی با CSS
};

const center = {
  lat: 25.2048, // مختصات پیش‌فرض دبی
  lng: 55.2708,
};

function PropertyRegistration() {
  const [formData, setFormData] = useState({
    propertyName: '',
    description: '',
    location: '',
    price: '',
    registrationType: 'nft',
    tokenCount: '',
    tokenPrice: '',
    tokensForSale: '',
    images: [],
    nftImage: null,
    coordinates: center,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({
      ...formData,
      images: [...formData.images, ...imageUrls],
    });
    if (errors.images) {
      setErrors({ ...errors, images: '' });
    }
  };

  const handleNFTImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        nftImage: imageUrl,
      });
      if (errors.nftImage) {
        setErrors({ ...errors, nftImage: '' });
      }
    }
  };

  const validateLocationInDubai = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        const addressComponents = data.results[0].address_components;
        const isInDubai = addressComponents.some((component) =>
          component.long_name.toLowerCase().includes('dubai')
        );
        return isInDubai;
      }
      return false;
    } catch (error) {
      console.error('Error validating location:', error);
      return false;
    }
  };

  const handleMapClick = useCallback(async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const isInDubai = await validateLocationInDubai(lat, lng);

    if (!isInDubai) {
      setErrors({
        ...errors,
        location: 'Selected location must be in Dubai',
      });
      return;
    }

    setFormData({
      ...formData,
      coordinates: { lat, lng },
      location: `Lat: ${lat}, Lng: ${lng}`,
    });
    setErrors({
      ...errors,
      location: '',
    });
  }, [formData, errors]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.propertyName.trim()) {
      newErrors.propertyName = 'Property name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Property description is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (!formData.location.toLowerCase().includes('dubai') && !formData.coordinates) {
      newErrors.location = 'Property must be located in Dubai';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (formData.registrationType === 'tokenized') {
      if (!formData.tokenCount || formData.tokenCount <= 0) {
        newErrors.tokenCount = 'Number of tokens is required';
      }
      if (!formData.tokenPrice || formData.tokenPrice <= 0) {
        newErrors.tokenPrice = 'Token price is required';
      }
      if (!formData.tokensForSale || formData.tokensForSale <= 0) {
        newErrors.tokensForSale = 'Tokens for sale is required';
      }
      if (formData.tokensForSale > formData.tokenCount) {
        newErrors.tokensForSale = 'Tokens for sale cannot exceed total tokens';
      }
    }

    if (formData.registrationType === 'nft' && !formData.nftImage) {
      newErrors.nftImage = 'NFT image is required';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one property image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        const blockchainAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
        alert(
          `Property successfully registered on blockchain!\nAddress: ${blockchainAddress}\nType: ${formData.registrationType.toUpperCase()}`
        );
        setSubmitted(false);
      }, 2000);
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <div className="header">
          <Typography variant="h3" component="h1" gutterBottom>
            Register New Property
          </Typography>
          <Typography variant="h6">
            Register your property as NFT or tokenized asset on blockchain
          </Typography>
        </div>

        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" className="section-title">
              Property Information
            </Typography>

            {/* <Grid style={{ marginTop: '20px' }} container spacing={5}> */}
              <Grid style={{ marginTop: '20px' }}  item xs={12}>
                <TextField
                  fullWidth
                  label="Property Name"
                  value={formData.propertyName}
                  onChange={handleInputChange('propertyName')}
                  error={!!errors.propertyName}
                  helperText={errors.propertyName}
                  variant="outlined"
                />
              </Grid>

              <Grid style={{ marginTop: '20px' }} item xs={12}>
                <TextField
                  fullWidth
                  label="Property Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  error={!!errors.description}
                  helperText={errors.description || 'Include details like area, rooms, special features'}
                  variant="outlined"
                />
              </Grid>

              <Grid style={{ marginTop: '20px' }} item xs={12}>
                <TextField
                  fullWidth
                  label="Location (Dubai Only)"
                  value={formData.location}
                  onChange={handleInputChange('location')}
                  error={!!errors.location}
                  helperText={errors.location || 'Enter the exact address in Dubai or select on map'}
                  variant="outlined"
                />
              </Grid>

              <Grid style={{ marginTop: '20px' }} item xs={12}>
                <TextField
                  fullWidth
                  label="Property Price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange('price')}
                  error={!!errors.price}
                  helperText={errors.price}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid style={{ marginTop: '20px' }} item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Registration Type</FormLabel>
                  <RadioGroup
                    row
                    value={formData.registrationType}
                    onChange={handleInputChange('registrationType')}
                  >
                    <FormControlLabel value="nft" control={<Radio />} label="NFT" />
                    <FormControlLabel value="tokenized" control={<Radio />} label="Tokenized" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {formData.registrationType === 'tokenized' && (
                <Grid style={{ marginTop: '20px' }} item xs={12} className="conditional-fields">
                  <Typography variant="h6" className="section-title">
                    Tokenization Details
                  </Typography>
                  <Grid style={{ marginTop: '20px' }} container spacing={3}>
                    <Grid style={{ marginTop: '20px' }} item xs={12}>
                      <TextField
                        fullWidth
                        label="Number of Tokens"
                        type="number"
                        value={formData.tokenCount}
                        onChange={handleInputChange('tokenCount')}
                        error={!!errors.tokenCount}
                        helperText={errors.tokenCount}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid style={{ marginTop: '20px' }} item xs={12}>
                      <TextField
                        fullWidth
                        label="Token Price"
                        type="number"
                        value={formData.tokenPrice}
                        onChange={handleInputChange('tokenPrice')}
                        error={!!errors.tokenPrice}
                        helperText={errors.tokenPrice}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid style={{ marginTop: '20px' }} item xs={12}>
                      <TextField
                        fullWidth
                        label="Tokens for Sale"
                        type="number"
                        value={formData.tokensForSale}
                        onChange={handleInputChange('tokensForSale')}
                        error={!!errors.tokensForSale}
                        helperText={errors.tokensForSale}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              <Grid style={{ marginTop: '20px' }} item xs={12}>
                <Typography variant="h6" className="section-title">
                  Upload Property Images
                </Typography>
                <div className="image-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="property-image-upload"
                  />
                  <label htmlFor="property-image-upload">
                    <Typography variant="body1" color="textSecondary">
                      Drag and drop images here or click to upload
                    </Typography>
                  </label>
                </div>
                {formData.images.length > 0 && (
                  <div className="image-preview">
                    {formData.images.map((image, index) => (
                      <Box key={index} position="relative">
                        <img src={image} alt={`Property ${index + 1}`} />
                        <Button
                          size="small"
                          color="error"
                          onClick={() => removeImage(index)}
                          sx={{ position: 'absolute', top: 0, right: 0 }}
                        >
                          X
                        </Button>
                      </Box>
                    ))}
                  </div>
                )}
                {errors.images && (
                  <Typography color="error" variant="caption">
                    {errors.images}
                  </Typography>
                )}
              </Grid>

              {formData.registrationType === 'nft' && (
                <Grid style={{ marginTop: '20px' }} item xs={12}>
                  <Typography variant="h6" className="section-title">
                    Upload NFT Image
                  </Typography>
                  <div className="image-upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleNFTImageUpload}
                      style={{ display: 'none' }}
                      id="nft-image-upload"
                    />
                    <label htmlFor="nft-image-upload">
                      <Typography variant="body1" color="textSecondary">
                        Drag and drop NFT image here or click to upload
                      </Typography>
                    </label>
                  </div>
                  {formData.nftImage && (
                    <div className="image-preview">
                      <Box position="relative">
                        <img src={formData.nftImage} alt="NFT Preview" />
                        <Button
                          size="small"
                          color="error"
                          onClick={() => setFormData({ ...formData, nftImage: null })}
                          sx={{ position: 'absolute', top: 0, right: 0 }}
                        >
                          X
                        </Button>
                      </Box>
                    </div>
                  )}
                  {errors.nftImage && (
                    <Typography color="error" variant="caption">
                      {errors.nftImage}
                    </Typography>
                  )}
                </Grid>
              )}
            {/* </Grid> */}

            <Button
              type="submit"
              variant="contained"
              size="large"
              className="submit-button"
              disabled={submitted}
              sx={{
                background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1976D2 0%, #1BA3D3 100%)',
                },
              }}
            >
              {submitted ? '🔄 Registering on Blockchain...' : '🚀 Register Property'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PropertyRegistration;