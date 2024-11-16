import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFaqCategory, fetchFaqCategory } from '../../features/faqCategory/faqCategorySlice';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';

const UpdateDeveloperComponent = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useMuiSnackbar();
  const developers = useSelector((state) => state.faqCategory.data || []); // Ensure developers is an array
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [developerData, setDeveloperData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchFaqCategory());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDeveloper) {
      setDeveloperData({
        name: selectedDeveloper.name || '',
        description: selectedDeveloper.description || '',
      });
    }
  }, [selectedDeveloper]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectDeveloper = (developer) => {
    setSelectedDeveloper(developer);
    setSearchQuery(''); // Clear the search query to hide the developer list
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'developerImg' && files.length > 0) {
      // If it's a file input and files are selected
      setDeveloperData({ ...developerData, [name]: files[0] }); // Update state with the File object
    } else {
      // For other inputs
      setDeveloperData({ ...developerData, [name]: value });
    }
  };
  
  const handleUpdateDeveloper = async () => {
    try {
      if (selectedDeveloper) {
        const updatedData = {
          name: developerData.name,
          description: developerData.description,
        };
        await dispatch(updateFaqCategory({ id: selectedDeveloper._id, developerData: updatedData }));
        showSnackbar('Faq Updated successfully', 'success');
        dispatch(fetchFaqCategory()); // Refetch developer data after update
        closeModal();
      } else {
        console.error('Selected Faq is null or undefined.');
        showSnackbar('Faq is null or undefined successfully', 'error');
      }
    } catch (error) {
      console.error('Error updating developer:', error);
      showSnackbar('Faq Deleted successfully', 'error');
    }
  };

  const filteredDevelopers = developers.data && developers.data.filter((developer) =>
    developer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Update Faq Category</h4>
      <div className="mb-3">
        <label htmlFor="searchQuery" className="form-label">Search Faq Category</label>
        <input
          type="text"
          className="form-control"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && filteredDevelopers.length > 0 && (
          <ul className="list-group mt-2">
            {filteredDevelopers.map((developer) => (
              <li
                key={developer._id}
                className="list-group-item"
                onClick={() => handleSelectDeveloper(developer)}
                style={{ cursor: 'pointer' }}
              >
                {developer.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedDeveloper && (
        <form>
          <div className="mb-3">
            <label htmlFor="developerName" className="form-label">Faq Category Name</label>
            <input
              type="text"
              className="form-control"
              id="developerName"
              name="name"
              value={developerData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="developerDescription" className="form-label">Faq Category Description</label>
            <input
              type="text"
              className="form-control"
              id="developerDescription"
              name="description"
              value={developerData.description}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-primary" onClick={handleUpdateDeveloper}>Update</button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateDeveloperComponent;
