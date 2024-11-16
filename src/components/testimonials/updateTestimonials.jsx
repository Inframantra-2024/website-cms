import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTestimonial, fetchTestimonials } from '../../features/testimoials/testimonialSlice';

const UpdateTestimonials = ({ closeModal }) => {
  const dispatch = useDispatch();
  const states1 = useSelector((state) => state.testimonial.data || []); // Ensure states is an array
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestimonials, setSelectedTestimonials] = useState(null);
  const [testimonialsData, setTestimonialsData] = useState({
    name: '',
    description: '',
    image: ''
  });
//   console.log("Testimonials Data::::", states1);
  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);


  useEffect(() => {
    if (selectedTestimonials) {
      setTestimonialsData({
        name: selectedTestimonials.name || '',
        description: selectedTestimonials.description || '',
        image: selectedTestimonials.image || ''
      });
    }
  }, [selectedTestimonials]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectState = (state) => {
    setSelectedTestimonials(state);
    setSearchQuery(''); // Clear the search query to hide the state list
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonialsData({ ...testimonialsData, [name]: value });
  };

  const handleUpdateState = async () => {
    try {
      if (selectedTestimonials) {
        const updatedData = {
          name: testimonialsData.name,
          description: testimonialsData.description,
          image: testimonialsData.image
        };
        // console.log("Updated data", updatedData);
        // Attempt to update Testimonials
        await dispatch(updateTestimonial({ id: selectedTestimonials._id, testimonialsData: updatedData }));
        dispatch(fetchTestimonials()); // Refetch state data after update
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

//   console.log("Filtered Form Update", filteredStates);
    //  console.log("Selected Testimonials Data", states1);

  return (
    <div className="container mt-4">
      <div className='section-header'>
         <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Update Testimonials</h4>
      </div>
      <div className="mb-3">
        <label htmlFor="searchQuery" className="form-label">Search Testimonials</label>
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
      {selectedTestimonials && (
        <form>
          <div className="mb-3">
            <label htmlFor="stateName" className="form-label">Testimonials Name</label>
            <input
              type="text"
              className="form-control"
              id="stateName"
              name="name"
              value={testimonialsData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priorityOrder" className="form-label">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={testimonialsData.description}
              onChange={handleChange}
              rows={5}
              cols={6}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priorityOrder" className="form-label">Customer Image:</label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={testimonialsData.image}
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

export default UpdateTestimonials;
