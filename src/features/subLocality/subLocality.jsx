import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import './Sublocality.css'
import SubLocalityForm from "../../components/subLocality/CreateSubLocality";
import UpdateSubLocalityComponent from "../../components/subLocality/UpdateSubLocality";
import DeleteSubLocalityComponent from "../../components/subLocality/DeleteSubLocality";

const SubLocality = () => {
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
      <Typography variant="h4" className="Locality-container">Sub Locality Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateLocality}
        >
          Create Sub Locality
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditLocality}
        >
          Edit Sub Locality
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteLocality}>
          Delete Sub Locality
        </Button>
      </Box>
      {activeComponent === "create" && (
        <SubLocalityForm closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateSubLocalityComponent
          LocalityId="exampleLocalityId"
          closeModal={closeModal}
        />
      )}
      {activeComponent === "delete" && (
        <DeleteSubLocalityComponent
          LocalityId="exampleLocalityId"
          closeModal={closeModal}
        />
      )}
    </Box>
  );
}

export default SubLocality;