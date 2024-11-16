import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';

const ImageTestComponent = () => {
    const [imageData, setImageData] = useState({ SVG: [] });
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchImages = async () => {
        try {
            const types = ['SVG'];
            const requests = types.map(type => axios.get(`http://localhost:5000/api/v1/s3/get?type=${type}`));
            const responses = await Promise.all(requests);

            const data = responses.reduce((acc, response, index) => {
                acc[types[index]] = response.data.files;
                return acc;
            }, {});

            setImageData(data);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    if (loading) {
        return <CircularProgress />;
    }

    const renderGallery = () => {
        if (!selectedImage) return null;

        return imageData.SVG.map((image, index) => (
            <img
                key={index}
                src={image.cdnUrl}
                alt={image.name}
                style={{ width: '150px', height: '150px', margin: '5px', cursor: 'pointer' }}
                onClick={() => handleImageClick(image)}
            />
        ));
    };

    return (
        <Box>
            <Typography variant="h4" mb={2}>Image Quality Test</Typography>
            {selectedImage && (
                <Box mt={4}>
                    <Typography variant="h5">Selected Image: {selectedImage.name}</Typography>
                    <img src={selectedImage.cdnUrl} alt={selectedImage.name} style={{ maxWidth: '100%' }} />
                </Box>
            )}
            <Grid container spacing={2}>
                {Object.entries(imageData).map(([type, images]) => (
                    <Grid item xs={4} key={type}>
                        <Typography variant="h5">{type}</Typography>
                        {images.slice(1, 2).map((data, index) => (
                            <Box key={index} mt={2}>
                                <Typography variant="h6">{data.name}</Typography>
                                <Typography variant="body2">Size: {data.size} kb</Typography>
                                <img
                                    src={data.cdnUrl}
                                    alt={data.name}
                                    style={{ maxWidth: '100%' }}
                                    onClick={() => handleImageClick(data)}
                                />
                            </Box>
                        ))}
                    </Grid>
                ))}
            </Grid>
            <Box mt={4}>
                <Typography variant="h5">Gallery</Typography>
                <Box display="flex" flexWrap="wrap">
                    {renderGallery()}
                </Box>
            </Box>
        </Box>
    );
};

export default ImageTestComponent;
