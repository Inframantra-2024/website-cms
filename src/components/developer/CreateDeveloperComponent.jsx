import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import { createDeveloper } from '../../features/developer/developerSlice';

const DeveloperForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.developer);
  const { showSnackbar } = useMuiSnackbar();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [totalProperties, setTotalProperties] = useState('');
  const [developerImg, setDeveloperImg] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('totalProperties', totalProperties);
    formData.append('developerImg', developerImg);

    try {
      await dispatch(createDeveloper(formData)).unwrap();
      setMessage('Developer created successfully');
      showSnackbar('Developer created successfully', 'success');
      setName('');
      setDescription('');
      setTotalProperties('');
      setDeveloperImg(null);
    } catch (err) {
      setMessage('Failed to create developer: ' + err.message);
      showSnackbar('Failed to create developer: ' + err.message);
    }
  };

  return (
    <div className="create-developer container mt-4">
      <h2 className='text-center bg-primary text-white p-3 text-uppercase'>Create Developer</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="totalProperties">Total Properties:</label>
          <input 
            type="number" 
            id="totalProperties" 
            value={totalProperties} 
            onChange={(e) => setTotalProperties(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="developerImg">Developer Image:</label>
          <input 
            type="file" 
            id="developerImg" 
            onChange={(e) => setDeveloperImg(e.target.files[0])} 
            required 
          />
        </div>
        <button type="submit" disabled={status === 'loading'}>Create Developer</button>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>{error}</p>}
      </form>
    </div>
  );
};

export default DeveloperForm;
