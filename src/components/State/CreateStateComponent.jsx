import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import { createState } from '../../features/state/statesSlice';

const StateForm = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useMuiSnackbar();

  const [name, setName] = useState('');
  const [priorityOrder, setPriorityOrder] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stateData = {
      name,
      priorityOrder: Number(priorityOrder),
    };

    try {
      await dispatch(createState(stateData)).unwrap();
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
      <h2 className='text-center bg-primary text-white p-3 text-uppercase md-2'>Create State</h2>
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
        <button type="submit" className=''>
          Create State
        </button>
      </form>
    </div>
  );
};

export default StateForm;
