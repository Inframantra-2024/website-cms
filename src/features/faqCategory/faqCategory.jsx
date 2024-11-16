import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import './FaqCategory.css'
import CreateFaqCategoryComponent from '../../components/FaqCategory/CreateFaqCategoryComponent.jsx';
import UpdateFaqCategoryComponent from "../../components/FaqCategory/UpdateFaqCategoryComponent.jsx";
import DeleteFaqCategoryComponent from "../../components/FaqCategory/DeleteFaqCategoryComponent.jsx";

const FaqCategory = () => {
    const [activeComponent, setActiveComponent] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => setActiveComponent("");

  const handleCreateFaqCategory = () => {
    setActiveComponent("create");
  };

  const handleEditFaqCategory = () => {
    setActiveComponent("edit");
  };

  
  const handleDeleteFaqCategory = () => {
    setActiveComponent("delete");
  };

  return (
    <Box>
      <Typography variant="h4" className="faqCategory-container section-header">Faq Category Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateFaqCategory}
        >
          Create Faq Category
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditFaqCategory}
        >
          Edit Faq Category
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteFaqCategory}>
          Delete Faq Category
        </Button>
      </Box>
      {activeComponent === "create" && (
        <CreateFaqCategoryComponent closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateFaqCategoryComponent
          FaqCategoryId="exampleFaqCategoryId"
          closeModal={closeModal}
        />
      )}
      {activeComponent === "delete" && (
        <DeleteFaqCategoryComponent
          FaqCategoryId="exampleFaqCategoryId"
          closeModal={closeModal}
        />
      )}
    </Box>
  );
}

export default FaqCategory;