import React from "react";
import { Box, Button, Typography } from "@mui/material";

const DeleteBlogComponent = ({ blogId, closeModal }) => {
  const handleDelete = () => {
    // Logic to delete the blog
    closeModal();
  };

  return (
    <Box className="container mt-4">
      <Typography variant="h5" className='text-center bg-primary text-white p-3 text-uppercase'>Delete Blog</Typography>
      <Typography>Are you sure you want to delete this blog?</Typography>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="contained" onClick={closeModal}>
        Cancel
      </Button>
    </Box>
  );
};

export default DeleteBlogComponent;
