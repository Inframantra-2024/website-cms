import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import CreateBlogComponent from "../../components/blog/CreateBlogComponent";
import UpdateBlogComponent from "../../components/blog/UpdateBlogComponent";
import DeleteBlogComponent from "../../components/blog/DeleteBlogComponent";
import "./blogComponent.css";

const BlogComponent = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => setActiveComponent("");

  const handleCreateBlog = () => {
    setActiveComponent("create");
  };

  const handleEditBlog = () => {
    setActiveComponent("edit");
  };

  const handleDeleteBlog = () => {
    setActiveComponent("delete");
  };

  return (
    <Box>
      <Typography variant="h4" className="blog-container">Blog Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateBlog}
        >
          Create Blog
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditBlog}
        >
          Edit Blog
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteBlog}>
          Delete Blog
        </Button>
      </Box>
      {activeComponent === "create" && (
        <CreateBlogComponent closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateBlogComponent
          blogId="exampleBlogId"
          closeModal={closeModal}
        />
      )}
      {activeComponent === "delete" && (
        <DeleteBlogComponent
          blogId="exampleBlogId"
          closeModal={closeModal}
        />
      )}
    </Box>
  );
};

export default BlogComponent;
