import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import { createTestimonial } from '../../features/testimoials/testimonialSlice';

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
      image,
    };

    try {
      await dispatch(createTestimonial(stateData)).unwrap();
      setMessage('Faq created successfully');
      showSnackbar('Faq created successfully', 'success');
      setName('');
      setDescription('');
    } catch (err) {
      setMessage('Failed to create faq: ' + err.message);
      showSnackbar('Failed to create faq: ' + err.message);
    }
  };

  return (
    <div className="create-state container mt-4">
      <div className='section-header '>
         <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Create Testimonials</h4>
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
        <div>
          <label htmlFor="priorityOrder">Image</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder='Enter Locality Name'
          />
        </div>
        <button type="submit" className=''>
          Create Faq
        </button>
      </form>
    </div>
  );
};

export default TestimonialsForm;
