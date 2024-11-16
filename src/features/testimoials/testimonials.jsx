import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import './testimonials.css'
import TestimonialsForm from "../../components/testimonials/createTestimonials";
import UpdateTestimonials from "../../components/testimonials/updateTestimonials";
import DeleteTestimonials from "../../components/testimonials/deleteTestimonials";


const Testimonial = () => {
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
      <Typography variant="h4" className="testimonials-container container md-4 section-header">Testimonials Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateLocality}
        >
          Create Testimonials
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditLocality}
        >
          Edit Testimonials
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteLocality}>
          Delete Testimonials
        </Button>
      </Box>
      {activeComponent === "create" && (
        <TestimonialsForm closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateTestimonials
          LocalityId="exampleLocalityId"
          closeModal={closeModal}
        />
      )}
      {activeComponent === "delete" && (
        <DeleteTestimonials
          LocalityId="exampleLocalityId"
          closeModal={closeModal}
        />
      )}
    </Box>
  );
}

export default Testimonial;