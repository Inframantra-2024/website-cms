import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocality, updateLocality } from '../../features/locality/localitySlice';

const UpdateLocalityComponent = ({ closeModal }) => {
  const dispatch = useDispatch();
  const states1 = useSelector((state) => state.locality.data || []); // Ensure states is an array
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [localityData, setLocalityData] = useState({
    name: '',
    priorityOrder: '',
    cityName: ''
  });
  console.log("locality", localityData, "Selected Locality", selectedLocality);
  useEffect(() => {
    dispatch(fetchLocality());
  }, [dispatch]);

  useEffect(() => {
    if (selectedLocality) {
      setLocalityData({
        name: selectedLocality.name || '',
        priorityOrder: selectedLocality.priorityOrder || '',
        cityName: selectedLocality.city.name || ''
      });
    }
  }, [selectedLocality]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectState = (state) => {
    setSelectedLocality(state);
    setSearchQuery(''); // Clear the search query to hide the state list
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalityData({ ...localityData, [name]: value });
  };

  const handleUpdateState = async () => {
    try {
      if (selectedLocality) {
        const updatedData = {
          name: localityData.name,
          priorityOrder: localityData.priorityOrder,
          cityName: localityData.cityName
        };
        console.log("Updated Data",updatedData);
        // Attempt to update locality
        await dispatch(updateLocality({ id: selectedLocality._id, LocalityData: updatedData }));
        dispatch(fetchLocality()); // Refetch state data after update
        closeModal();
      } else {
        console.error('Selected state is null or undefined.');
      }
    } catch (error) {
      console.error('Error updating state:', error);
      // Handle specific error messages or display to user
    }
  };

  const filteredStates = states1.data && states1.data.filter((state) =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // console.log("States Form Update", filteredStates);

  return (
    <div className="container mt-4">
      <div className='section-header text-center mb-5 text-uppercase'>
         <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Update Locality</h4>
      </div>
      <div className="mb-3">
        <label htmlFor="searchQuery" className="form-label">Search Locality</label>
        <input
          type="text"
          className="form-control"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && filteredStates.length > 0 && (
          <ul className="list-group mt-2">
            {filteredStates.map((state) => (
              <li
                key={state._id}
                className="list-group-item"
                onClick={() => handleSelectState(state)}
                style={{ cursor: 'pointer' }}
              >
                {state.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedLocality && (
        <form>
          <div className="mb-3">
            <label htmlFor="stateName" className="form-label">Locality Name</label>
            <input
              type="text"
              className="form-control"
              id="stateName"
              name="name"
              value={localityData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priorityOrder" className="form-label">Priority Order</label>
            <input
              type="text"
              className="form-control"
              id="priorityOrder"
              name="priorityOrder"
              value={localityData.priorityOrder}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priorityOrder" className="form-label">City Name</label>
            <input
              type="text"
              className="form-control"
              id="cityName"
              name="cityName"
              value={localityData.cityName}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-primary" onClick={handleUpdateState}>Update</button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateLocalityComponent;
