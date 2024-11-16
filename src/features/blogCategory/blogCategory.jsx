import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import './blogCategory.css'
import FaqForm from "../../components/faq/createFaq";
import UpdateFaq from "../../components/faq/updateFaq";
import DeleteFaq from "../../components/faq/deleteFaq";


const BlogCategory = () => {
    const [activeComponent, setActiveComponent] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => {
    setActiveComponent("")
    localStorage.removeItem("activeCityComponent");
  };

  useEffect(() => {
    const savedActiveComponent = localStorage.getItem("activeCityComponent");
    if (savedActiveComponent) setActiveComponent(savedActiveComponent);
  }, []);

  const handleCreateLocality = () => {
    setActiveComponent("create");
    localStorage.setItem("activeLocalityComponent", "create");
  };

  const handleEditLocality = () => {
    setActiveComponent("edit");
    localStorage.setItem("activeLocalityComponent", "edit");
  };

  const handleDeleteLocality = () => {
    setActiveComponent("delete");
    localStorage.setItem("activeLocalityComponent", "delete");
  };

  return (
    <Box>
      <Typography variant="h4" className="testimonials-container container md-4 section-header">Blog Category Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateLocality}
        >
          Create Category
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditLocality}
        >
          Edit Category
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteLocality}>
          Delete Category
        </Button>
      </Box>
      {activeComponent === "create" && (
        <FaqForm closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateFaq
          LocalityId="exampleLocalityId"
          closeModal={closeModal}
        />
      )}
      {activeComponent === "delete" && (
        <DeleteFaq
          LocalityId="exampleLocalityId"
          closeModal={closeModal}
        />
      )}
    </Box>
  );
}

export default BlogCategory;