import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CityServices from '../../services/feature2api';
import { fetchFeature2Data } from '../../features/features2/feature2Slice';

import './createCity.css'
import { LoginSharp } from '@mui/icons-material';

const CreateCityComponent = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');
  const [rera, setRera] = useState(0);
  const [message, setMessage] = useState('');
  const [priorityOrder, setPriorityOrder] = useState(0);

  const dispatch = useDispatch();

  const handleCreateCity = async () => {
    try {
      const cityData = {
        name,
        slug,
        meta_title: metaTitle,
        meta_description: metaDescription,
        meta_keyword: metaKeyword,
        rera,
        priorityOrder
      };
      const response = await CityServices.createCity(cityData);
      console.log("Response: " ,response);
      setMessage(`City created: ${response.message}`);
      dispatch(fetchFeature2Data()); // To refresh the list of cities after creating a new one
      closeModal();
    } catch (response) {
      setMessage(`Error: ${response.message}`);
    }
  };

  return (
    <div className='create-city-container container mt-4'>
      <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Create City</h4>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter city name"
        className="create-city-input"
      />
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Enter slug"
        className="create-city-input"
      />
      <input
        type="text"
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)}
        placeholder="Enter meta title"
        className="create-city-input"
      />
      <input
        type="text"
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
        placeholder="Enter meta description"
        className="create-city-input"
      />
      <input
        type="text"
        value={metaKeyword}
        onChange={(e) => setMetaKeyword(e.target.value)}
        placeholder="Enter meta keyword"
        className="create-city-input"
      />
      <input
        type="number"
        value={rera}
        onChange={(e) => setRera(e.target.value)}
        placeholder="Enter RERA"
        className="create-city-input"
      />
      <input
        type="number"
        value={priorityOrder}
        onChange={(e) => setPriorityOrder(e.target.value)}
        placeholder="Enter Priority Order"
        className="create-city-input"
      />
      <button onClick={handleCreateCity} className="create-city-button">Create City</button>
      {message && <p className="create-city-success">{message}</p>}
    </div>
  );
};

export default CreateCityComponent;
