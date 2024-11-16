import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CityServices from '../../services/feature2api';
import { fetchFeature2Data } from '../../features/features2/feature2Slice';

const UpdateCityComponent = ({ cityId }) => {
  const [cityName, setCityName] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleUpdateCity = async () => {
    try {
      const cityData = { name: cityName };
      const response = await CityServices.updateCity(cityId, cityData);
      setMessage(`City updated: ${response.data.name}`);
      dispatch(fetchFeature2Data()); // To refresh the list of cities after updating a city
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className='container mt-4'>
      <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Update City</h4>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleUpdateCity}>Update City</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateCityComponent;
