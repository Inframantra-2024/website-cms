import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const UpdateBlogComponent = ({ blogId, closeModal }) => {
  const handleUpdate = () => {
    // Logic to update the blog
    closeModal();
  };

  return (
    <Box className="container mt-4">
      <Typography variant="h5" className='text-center bg-primary text-white p-3 text-uppercase'>Update Blog</Typography>
      <TextField label="Blog Title" fullWidth margin="normal" />
      <TextField
        label="Blog Content"
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" color="secondary" onClick={handleUpdate}>
        Update
      </Button>
      <Button variant="contained" onClick={closeModal}>
        Cancel
      </Button>
    </Box>
  );
};

export default UpdateBlogComponent;
