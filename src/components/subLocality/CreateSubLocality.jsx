import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import { createSubLocality } from '../../features/subLocality/subLocalitySlice';

const SubLocalityForm = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useMuiSnackbar();

  const [name, setName] = useState('');
  const [priorityOrder, setPriorityOrder] = useState('');
  const [localityId, setLocalityId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stateData = {
      name,
      priorityOrder: Number(priorityOrder),
      localityId,
    };

    try {
      await dispatch(createSubLocality(stateData)).unwrap();
      setMessage('State created successfully');
      showSnackbar('State created successfully', 'success');
      setName('');
      setPriorityOrder('');
    } catch (err) {
      setMessage('Failed to create state: ' + err.message);
      showSnackbar('Failed to create state: ' + err.message);
    }
  };

  return (
    <div className="create-state container mt-4">
      <div className='section-header text-center mb-5 text-uppercase'>
         <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Create Sub Locality</h4>
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
          <label htmlFor="priorityOrder">Locality Name</label>
          <input
            type="text"
            id="localityId"
            value={localityId}
            onChange={(e) => setLocalityId(e.target.value)}
            required
            placeholder='Enter Locality Name'
          />
        </div>
        <button type="submit" className=''>
          Create Sub Locality
        </button>
      </form>
    </div>
  );
};

export default SubLocalityForm;
