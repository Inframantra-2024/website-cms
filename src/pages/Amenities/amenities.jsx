import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './amenities.css'; // Import the CSS file

const AmenityForm = ({ amenityId }) => {
  const [amenity, setAmenity] = useState({
    icon_value: '',
    title: '',
    name: '',
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the existing amenity details if amenityId is provided
    if (amenityId) {
      axios.get(`/api/amenities/${amenityId}`)
        .then(response => {
          setAmenity(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching amenity:', error);
        });
    }

    // Fetch the categories
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [amenityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmenity({
      ...amenity,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = amenityId ? `/api/amenities/${amenityId}` : '/api/amenities';
    const method = amenityId ? 'put' : 'post';

    axios[method](url, amenity)
      .then(response => {
        setMessage('Amenity updated successfully!');
      })
      .catch(error => {
        setMessage('Error updating amenity.');
        console.error('Error:', error);
      });
  };

  return (
    <div className="amenity-form-container">
      <form className="amenity-form" onSubmit={handleSubmit}>
        <h2>{amenityId ? 'Update Amenity' : 'Create Amenity'}</h2>
        <div className="form-group">
          <label htmlFor="icon_value">Icon Value</label>
          <input
            type="text"
            id="icon_value"
            name="icon_value"
            value={amenity.icon_value}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={amenity.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={amenity.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={amenity.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AmenityForm;
