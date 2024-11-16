import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import { fetchFaqCategory, deleteFaqCategory } from '../../features/faqCategory/faqCategorySlice';


const DeleteDeveloperComponent = ({ stateId, closeModal }) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useMuiSnackbar();
  const states1 = useSelector(state => state.faqCategory.data); // Adjust based on your state slice structure
  console.log(states1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);
   
  useEffect(() => {
    dispatch(fetchFaqCategory());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectState = (state) => {
    setSelectedState(state);
    setSearchQuery(''); // Clear search query after selecting state
  };

  const handleDeleteState = async () => {
    try {
      await dispatch(deleteFaqCategory(selectedState._id));
      showSnackbar('Developer Deleted successfully', 'success');
       // Adjust the id field based on your backend
      closeModal();
    } catch (error) {
      console.error('Error deleting Locality:', error);
      showSnackbar('Developer deleting into an error', 'error');
    }
  };

  // Filter states based on search query
  const filteredStates = states1.data &&  states1.data.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Find the selected state based on stateId if not already selected
  if (!selectedState && stateId) {
    const foundState = states1.find(state => state._id === stateId);
    if (foundState) setSelectedState(foundState);
  }

  return (
    <div className="container mt-4">
      <div className='section-header '>
         <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Delete Faq Category</h4>
      </div>
      <div className="mb-3 ">
        <label htmlFor="searchQuery" className="form-label text-center">Search Faq Category</label>
        <input
          type="text"
          className="form-control"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div>
        {searchQuery && filteredStates.length > 0 && (
          <ul className="list-group mt-2">
            {filteredStates.map(state => (
              <li
                key={state._id}
                className={`list-group-item ${selectedState && selectedState._id === state._id ? 'active' : ''}`}
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
        <div>
          <div className="mb-3">
            <label htmlFor="selectedStateName" className="form-label">Selected Faq Category</label>
            <input
              type="text"
              className="form-control"
              id="selectedStateName"
              value={selectedState.name}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectedStateId" className="form-label">Selected Faq Category ID</label>
            <input
              type="text"
              className="form-control"
              id="selectedStateId"
              value={selectedState._id}
              readOnly
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteState}
          disabled={!selectedState}
        >
          Yes
        </button>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>
          No
        </button>
      </div>
        </div>
      )}
    </div>
  );
};

export default DeleteDeveloperComponent;
