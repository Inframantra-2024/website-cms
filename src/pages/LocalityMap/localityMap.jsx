import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './localityMap.css'; // Import the CSS file

const LocalityMapForm = ({ localityMapId }) => {
  const [localityMap, setLocalityMap] = useState({
    name: '',
    distance: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the existing localityMap details if localityMapId is provided
    if (localityMapId) {
      axios.get(`/api/locality-maps/${localityMapId}`)
        .then(response => {
          setLocalityMap(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching locality map:', error);
        });
    }
  }, [localityMapId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalityMap({
      ...localityMap,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = localityMapId ? `/api/locality-maps/${localityMapId}` : '/api/locality-maps';
    const method = localityMapId ? 'put' : 'post';

    axios[method](url, localityMap)
      .then(response => {
        setMessage('Locality map updated successfully!');
      })
      .catch(error => {
        setMessage('Error updating locality map.');
        console.error('Error:', error);
      });
  };

  return (
    <div className="locality-map-form-container">
      <form className="locality-map-form" onSubmit={handleSubmit}>
        <h2>{localityMapId ? 'Update Locality Map' : 'Create Locality Map'}</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={localityMap.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance</label>
          <input
            type="number"
            id="distance"
            name="distance"
            value={localityMap.distance}
            onChange={handleChange}
            required
          />
        </div>
        <button className='locality-button' type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LocalityMapForm;
