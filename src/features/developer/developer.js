import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import CreateDeveloperComponent from "../../components/developer/CreateDeveloperComponent";
import UpdateDeveloperComponent from "../../components/developer/UpdateDeveloperComponent.jsx";
import DeleteDeveloperComponent from "../../components/developer/DeleteDeveloperComponent";
import "./developer.css";

const DeveloperComponent = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const dispatch = useDispatch();

  // Load saved active component from local storage on mount
  useEffect(() => {
    const savedActiveComponent = localStorage.getItem("activeDeveloperComponent");
    if (savedActiveComponent) setActiveComponent(savedActiveComponent);
  }, []);

  const closeModal = () => {
    setActiveComponent("");
    // localStorage.removeItem("activeDeveloperComponent"); // Clear saved active component on close
  };

  const handleCreateDeveloper = () => {
    setActiveComponent("create");
    // localStorage.setItem("activeDeveloperComponent", "create"); // Save active component to local storage
  };

  const handleEditDeveloper = () => {
    setActiveComponent("edit");
    // localStorage.setItem("activeDeveloperComponent", "edit"); // Save active component to local storage
  };

  const handleDeleteDeveloper = () => {
    setActiveComponent("delete");
    // localStorage.setItem("activeDeveloperComponent", "delete"); // Save active component to local storage
  };

  return (
    <Box>
      <Typography variant="h4" className="developer-container">Developer Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateDeveloper}
        >
          Create Developer
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditDeveloper}
        >
          Edit Developer
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteDeveloper}>
          Delete Developer
        </Button>
      </Box>
      {activeComponent === "create" && (
        <CreateDeveloperComponent closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateDeveloperComponent
          developerId="exampleDeveloperId"
          closeModal={closeModal}
        />
      )}
      {activeComponent === "delete" && (
        <DeleteDeveloperComponent
          developerId="exampleDeveloperId"
          closeModal={closeModal}
        />
      )}
    </Box>
  );
};

export default DeveloperComponent;
