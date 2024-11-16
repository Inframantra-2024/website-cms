import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import { createCategory } from '../../features/faqCategory/faqCategorySlice';

const TestimonialsForm = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useMuiSnackbar();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stateData = {
      name,
      description,
    };

    try {
      await dispatch(createCategory(stateData)).unwrap();
      setMessage('State created successfully');
      showSnackbar('State created successfully', 'success');
      setName('');
      setDescription('');
    } catch (err) {
      setMessage('Failed to create state: ' + err.message);
      showSnackbar('Failed to create state: ' + err.message);
    }
  };

  return (
    <div className="create-state container mt-4">
      <div className='section-header'>
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
          <label htmlFor="priorityOrder">Description:</label>
          <textarea
            type="number"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            cols={6}
          />
        </div>
        <button type="submit" className=''>
          Create Faq Category
        </button>
      </form>
    </div>
  );
};

export default TestimonialsForm;
