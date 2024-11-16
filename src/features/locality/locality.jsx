import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import './locality.css'
import CreateLocalityComponent from '../../components/locality/CreateLocalityComponent';
import UpdateLocalityComponent from "../../components/locality/UpdateLocalityComponent";
import DeleteLocalityComponent from "../../components/locality/DeleteLocalityComponent";

const Locality = () => {
    const [activeComponent, setActiveComponent] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => setActiveComponent("");

  const handleCreateLocality = () => {
    setActiveComponent("create");
  };

  const handleEditLocality = () => {
    setActiveComponent("edit");
  };

  
  const handleDeleteLocality = () => {
    setActiveComponent("delete");
  };

  return (
    <Box>
      <Typography variant="h4" className="Locality-container section-header">Locality Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateLocality}
        >
          Create Locality
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditLocality}
        >
          Edit Locality
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteLocality}>
          Delete Locality
        </Button>
      </Box>
      {activeComponent === "create" && (
        <CreateLocalityComponent closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateLocalityComponent
          LocalityId="exampleLocalityId"
          closeModal={closeModal}
        />
      )}
      {activeComponent === "delete" && (
        <DeleteLocalityComponent
          LocalityId="exampleLocalityId"
          closeModal={closeModal}
        />
      )}
    </Box>
  );
}

export default Locality;