import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const CreateBlogComponent = ({ closeModal }) => {
  const handleCreate = () => {
    // Logic to create a blog
    closeModal();
  };

  return (
    <Box className="container mt-4">
      <Typography variant="h5" className='text-center bg-primary text-white p-3 text-uppercase'>Create Blog</Typography>
      <TextField label="Blog Title" fullWidth margin="normal" />
      <TextField
        label="Blog Content"
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create
      </Button>
      <Button variant="contained" onClick={closeModal}>
        Cancel
      </Button>
    </Box>
  );
};

export default CreateBlogComponent;
