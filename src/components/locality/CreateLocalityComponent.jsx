import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import { createLocality } from '../../features/locality/localitySlice.js';

const LocalityForm = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useMuiSnackbar();

  const [name, setName] = useState('');
  const [priorityOrder, setPriorityOrder] = useState('');
  const [cityName, setCityName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stateData = {
      name,
      priorityOrder: Number(priorityOrder),
      cityName,
    };

    try {
      await dispatch(createLocality(stateData)).unwrap();
      setMessage('Locality created successfully');
      showSnackbar('Locality created successfully', 'success');
      setName('');
      setPriorityOrder('');
    } catch (err) {
      setMessage('Failed to create Locality: ' + err.message);
      showSnackbar('Failed to create Locality: ' + err.message, "error");
    }
  };

  return (
    <div className="create-state container mt-4">
      <div className='section-header text-center'>
         <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Create Locality</h4>
      </div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="priorityOrder">Priority Order:</label>
          <input
            type="number"
            id="priorityOrder"
            value={priorityOrder}
            onChange={(e) => setPriorityOrder(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="priorityOrder">Priority Order:</label>
          <input
            type="text"
            id="city"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            required
            placeholder='Enter City Name'
          />
        </div>
        <button type="submit" className=''>
          Create Locality
        </button>
      </form>
    </div>
  );
};

export default LocalityForm;
