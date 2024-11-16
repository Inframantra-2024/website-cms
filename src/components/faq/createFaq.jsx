import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import { createFaq } from '../../features/faq/faqSlice';

const FaqForm = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useMuiSnackbar();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stateData = {
      question,
      answer,
      categoryId
    };

    try {
      await dispatch(createFaq(stateData)).unwrap();
      setMessage('Faq created successfully');
      showSnackbar('Faq created successfully', 'success');
      setQuestion('');
      setAnswer('');
    } catch (err) {
      setMessage('Failed to create faq: ' + err.message, 'error' );
      showSnackbar('Failed to create faq: ' + err.message);
    }
  };

  return (
    <div className="create-state container mt-4">
      <div className='section-header '>
         <h4 className='text-center bg-primary text-white p-3 text-uppercase'>Create Faq</h4>
      </div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="priorityOrder">Description:</label>
          <textarea
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="priorityOrder">Category Id</label>
          <input
            type="text"
            id="image"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            placeholder='Enter Locality Name'
          />
        </div>
        <button type="submit" className=''>
          Create Sub Locality
        </button>
      </form>
    </div>
  );
};

export default FaqForm;
