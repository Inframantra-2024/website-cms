import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, fetchStates } from '../../features/state/statesSlice';

const UpdateStateComponent = ({ closeModal }) => {
  const dispatch = useDispatch();
  const states1 = useSelector((state) => state.states.data || []); // Ensure states is an array
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [stateData, setStateData] = useState({
    name: '',
    priorityOrder: '',
  });
  
  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  useEffect(() => {
    if (selectedState) {
      setStateData({
        name: selectedState.name || '',
        priorityOrder: selectedState.priorityOrder || '',
      });
    }
  }, [selectedState]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectState = (state) => {
    setSelectedState(state);
    setSearchQuery(''); // Clear the search query to hide the state list
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateData({ ...stateData, [name]: value });
  };

  const handleUpdateState = async () => {
    try {
      if (selectedState) {
        const updatedData = {
          name: stateData.name,
          priorityOrder: stateData.priorityOrder,
        };
        await dispatch(updateState({ id: selectedState._id, stateData: updatedData }));
        dispatch(fetchStates()); // Refetch state data after update
        closeModal();
      } else {
        console.error('Selected state is null or undefined.');
      }
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  const filteredStates = states1.data && states1.data.filter((state) =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("States Form Update", filteredStates);

  return (
    <div className="container mt-4">
      <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Update State</h4>
      <div className="mb-3">
        <label htmlFor="searchQuery" className="form-label">Search State</label>
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
      {selectedState && (
        <form>
          <div className="mb-3">
            <label htmlFor="stateName" className="form-label">State Name</label>
            <input
              type="text"
              className="form-control"
              id="stateName"
              name="name"
              value={stateData.name}
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
              value={stateData.priorityOrder}
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

export default UpdateStateComponent;
