import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import CreateStateComponent from "../../components/State/CreateStateComponent.jsx";
import UpdateStateComponent from "../../components/State/UpdateStateComponent.jsx";
import DeleteStateComponent from "../../components/State/DeleteStateComponent.jsx";
import "./StateComponent.css";

const StateComponent = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const dispatch = useDispatch();

  // Load saved active component from local storage on mount
  useEffect(() => {
    const savedActiveComponent = localStorage.getItem("activeStateComponent");
    if (savedActiveComponent) setActiveComponent(savedActiveComponent);
  }, []);

  const closeModal = () => {
    setActiveComponent("");
    localStorage.removeItem("activeStateComponent"); // Clear saved active component on close
  };

  const handleCreateState = () => {
    setActiveComponent("create");
    localStorage.setItem("activeStateComponent", "create"); // Save active component to local storage
  };

  const handleEditState = () => {
    setActiveComponent("edit");
    localStorage.setItem("activeStateComponent", "edit"); // Save active component to local storage
  };

  const handleDeleteState = () => {
    setActiveComponent("delete");
    localStorage.setItem("activeStateComponent", "delete"); // Save active component to local storage
  };

  return (
    <Box>
      <Typography variant="h4" className="State-container">State Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateState}
        >
          Create State
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditState}
        >
          Edit State
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteState}>
          Delete State
        </Button>
      </Box>
      {activeComponent === "create" && (
        <CreateStateComponent closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateStateComponent
          StateId="exampleStateId"
          closeModal={closeModal}
        />
      )}
      {activeComponent === "delete" && (
        <DeleteStateComponent
          StateId="exampleStateId"
          closeModal={closeModal}
        />
      )}
    </Box>
  );
};

export default StateComponent;
