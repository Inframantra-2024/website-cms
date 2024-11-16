import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import CreateProjectComponent from "../../components/project/CreateProjectComponent";
import UpdateProjectComponent from "../../components/project/UpdateProjectComponent";
import DeleteProjectComponent from "../../components/project/DeleteProjectComponent";
import "./ProjectComponent.css";

const ProjectComponent = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const [sparkle, setSparkle] = useState("");
  const dispatch = useDispatch();

  // Load saved active component from local storage on mount
  useEffect(() => {
    const savedActiveComponent = localStorage.getItem("activeProjectComponent");
    if (savedActiveComponent) setActiveComponent(savedActiveComponent);
  }, []);

  const closeModal = () => {
    setActiveComponent("");
    localStorage.removeItem("activeProjectComponent"); // Clear saved active component on close
  };

  const handleCreateProject = () => {
    setActiveComponent("create");
    localStorage.setItem("activeProjectComponent", "create"); // Save active component to local storage
  };

  const handleEditProject = () => {
    setActiveComponent("edit");
    localStorage.setItem("activeProjectComponent", "edit"); // Save active component to local storage
  };

  const handleDeleteProject = () => {
    setActiveComponent("delete");
    localStorage.setItem("activeProjectComponent", "delete"); // Save active component to local storage
  };

  const handleButtonClick = (component) => {
    setActiveComponent(component);
    localStorage.setItem("activeProjectComponent", component); // Save active component to local storage
    setSparkle(component);
    setTimeout(() => setSparkle(""), 600); // Reset sparkle effect after animation
  };
  return (
    <Box className="project-container-main">
      <Typography variant="h4" className="project-container">Project Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
      <Button
          variant="contained"
          color="primary"
          className={`sparkle-button ${sparkle === "create" ? "sparkle" : ""}`}
          onClick={() => handleButtonClick("create")}
        >
          Create Project
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditProject}
        >
          Edit Project
        </Button>
        {/* <Button variant="contained" color="error" onClick={handleDeleteProject}>
          Delete Project
        </Button> */}
      </Box>
      {activeComponent === "create" && (
        <CreateProjectComponent closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateProjectComponent
          projectId="exampleProjectId"
          closeModal={closeModal}
        />
      )}
      {/* {activeComponent === "delete" && (
        <DeleteProjectComponent
          projectId="exampleProjectId"
          closeModal={closeModal}
        />
      )} */}
    </Box>
  );
};

export default ProjectComponent;
