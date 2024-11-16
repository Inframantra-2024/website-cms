import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFaq, fetchFaq } from '../../features/faq/faqSlice';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';

const UpdateFaq = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useMuiSnackbar();
  const states1 = useSelector((state) => state.faq.data || []); // Ensure states is an array
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestimonials, setSelectedTestimonials] = useState(null);
  const [testimonialsData, setTestimonialsData] = useState({
    question: '',
    answer: '',
    categoryId: ''
  });
//   console.log("Testimonials Data::::", states1);
  useEffect(() => {
    dispatch(fetchFaq());
  }, [dispatch]);


  useEffect(() => {
    if (selectedTestimonials) {
      setTestimonialsData({
        question: selectedTestimonials.question || '',
        answer: selectedTestimonials.answer || '',
        categoryId: selectedTestimonials.category._id || ''
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
          question: testimonialsData.question,
          answer: testimonialsData.answer,
          categoryId: testimonialsData.categoryId
        };
        // console.log("Updated data", updatedData);
        // Attempt to update Testimonials
        await dispatch(updateFaq({ id: selectedTestimonials._id, FaqCategoryData: updatedData }));
        showSnackbar('Faq Updated successfully', 'success');
        dispatch(fetchFaq()); // Refetch state data after update
        closeModal();
      } else {
        console.error('Selected state is null or undefined.');
        showSnackbar('Faq is Undefined or null successfully', 'error');
      }
    } catch (error) {
      console.error('Error updating state:', error);
      showSnackbar('Faq not Updated successfully', 'error');
      // Handle specific error messages or display to user
    }
  };

  const filteredStates = states1.data && states1.data.filter((state) =>
    state.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

//   console.log("Filtered Form Update", filteredStates);
    //  console.log("Selected Testimonials Data", states1);

  return (
    <div className="container mt-4">
      <div className='section-header '>
         <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Update Faq</h4>
      </div>
      <div className="mb-3">
        <label htmlFor="searchQuery" className="form-label">Search Faq</label>
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
                {state.question}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedTestimonials && (
        <form>
          <div className="mb-3">
            <label htmlFor="stateName" className="form-label">Faq Name</label>
            <input
              type="text"
              className="form-control"
              id="stateName"
              name="question"
              value={testimonialsData.question}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priorityOrder" className="form-label">Faq Description</label>
            <textarea
              type="text"
              className="form-control"
              id="answer"
              name="answer"
              value={testimonialsData.answer}
              onChange={handleChange}
              rows={5}
              cols={6}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priorityOrder" className="form-label">Faq Id</label>
            <input
              type="text"
              className="form-control"
              id="categoryId"
              name="categoryId"
              value={testimonialsData.categoryId}
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

export default UpdateFaq;
