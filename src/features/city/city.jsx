import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import CreateCityComponent from "../../components/city/createCity";
import UpdateCityComponent from "../../components/city/updateCity";
import DeleteCityComponent from "../../components/city/deleteCity.js";
import "./city.css";

const CityComponent = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const savedActiveComponent = localStorage.getItem("activeCityComponent");
    if (savedActiveComponent) setActiveComponent(savedActiveComponent);
  }, []);
  const closeModal = () => {
    setActiveComponent("")
    localStorage.removeItem("activeCityComponent");
  };

  const handleCreateCity = () => {
    
    setActiveComponent("create");
    localStorage.setItem("activeCityComponent", "create");
  };

  const handleEditCity = () => {
    setActiveComponent("edit");
    localStorage.setItem("activeCityComponent", "edit");
  };

  const handleDeleteCity = () => {
    setActiveComponent("delete");
    localStorage.setItem("activeCityComponent", "delete");
  };

  return (
    <Box>
      <Typography variant="h4" className="City-container">City Management</Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCity}
        >
          Create City
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditCity}
        >
          Edit City
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteCity}>
          Delete City
        </Button>
      </Box>
      {activeComponent === "create" && (
        <CreateCityComponent closeModal={closeModal} />
      )}
      {activeComponent === "edit" && (
        <UpdateCityComponent
          CityId="exampleCityId"
          closeModal={closeModal}
        />
      )}
      {activeComponent === "delete" && (
        <DeleteCityComponent
          CityId="exampleCityId"
          closeModal={closeModal}
        />
      )}
    </Box>
  );
};

export default CityComponent;
