import React, { useState } from "react";
import './Project.css';

const ProjectStatus = ["Under Construction", "Ready to Move", "Upcoming", "Sold Out"];
const CityOptions = ["City 1", "City 2", "City 3", "City 4"];
const LocalityOptions = ["Locality 1", "Locality 2", "Locality 3", "Locality 4"];
const SubLocalityOptions = ["Sub Locality 1", "Sub Locality 2", "Sub Locality 3", "Sub Locality 4"];
const ProjectStates = ["Haryana", "Uttar Pradesh", "Maharashtra", "Delhi"];

const Project = () => {
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    description: "",
    descriptionPointers: [],
    state: "",
    city: "",
    locality: "",
    subLocality: "",
    price: "",
    configuration: "",
    rera: "",
    area: "",
    status: "",
    perSquarePrice: "",
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionPointerAdd = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      descriptionPointers: [...formData.descriptionPointers, ""],
    });
  };

  const handleDescriptionPointerDelete = (index) => {
    const newDescriptionPointers = [...formData.descriptionPointers];
    newDescriptionPointers.splice(index, 1);
    setFormData({ ...formData, descriptionPointers: newDescriptionPointers });
  };

  const handleDescriptionPointerChange = (index, e) => {
    const newDescriptionPointers = [...formData.descriptionPointers];
    newDescriptionPointers[index] = e.target.value;
    setFormData({ ...formData, descriptionPointers: newDescriptionPointers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., update project in backend)
    console.log(formData); // For testing purposes, log form data to console
  };

  return (
    <div className="form-project"> 
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        {formData.descriptionPointers.map((pointer, index) => (
          <div key={index}>
            <label htmlFor={`descriptionPointer-${index}`}>Description Pointer {index + 1}</label>
            <input
              type="text"
              id={`descriptionPointer-${index}`}
              name={`descriptionPointer-${index}`}
              value={pointer}
              onChange={(e) => handleDescriptionPointerChange(index, e)}
            />
            <button type="button" onClick={() => handleDescriptionPointerDelete(index)}>Delete</button>
          </div>
        ))}
        <div>
          <button type="button" onClick={handleDescriptionPointerAdd}>
            Add Description Pointer
          </button>
        </div>
        <div>
          <label htmlFor="state">State</label>
          <select id="state" name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            {ProjectStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <select id="city" name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select City</option>
            {CityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="locality">Locality</label>
          <select id="locality" name="locality" value={formData.locality} onChange={handleChange}>
            <option value="">Select Locality</option>
            {LocalityOptions.map((locality) => (
              <option key={locality} value={locality}>
                {locality}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subLocality">Sub Locality</label>
          <select id="subLocality" name="subLocality" value={formData.subLocality} onChange={handleChange}>
            <option value="">Select Sub Locality</option>
            {SubLocalityOptions.map((subLocality) => (
              <option key={subLocality} value={subLocality}>
                {subLocality}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="configuration">Configuration</label>
          <input
            type="text"
            id="configuration"
            name="configuration"
            value={formData.configuration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rera">RERA</label>
          <input
            type="text"
            id="rera"
            name="rera"
            value={formData.rera}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="state">Status</label>
          <select id="state" name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select Status</option>
            {ProjectStatus.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="perSquarePrice">Per Square Price</label>
          <input
            type="text"
            id="perSquarePrice"
            name="perSquarePrice"
            value={formData.perSquarePrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Update Project</button>
        </div>
      </form>
    </div>
  );
};

export default Project;
