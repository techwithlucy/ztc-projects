import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

function AddQuestion() {

  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const courseId = location.pathname.split("/")[2];
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    courseId: courseId, 
  });

  const [formErrors, setFormErrors] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = '';
    if (name === 'question' && value === '') {
      error = 'question is required';
    } else if (name === 'option1' && value === '') {
      error = 'option1 is required';
    } else if (name === 'option2' && value === '') {
      error = 'option2 is required';
    } else if (name === 'option3' && value === '') {
      error = 'option3 is required';
    } else if (name === 'option4' && value === '') {
      error = 'option4 is required';
    } else if (name === 'p_link' && value === '') {
      error = 'answer is required';
    }
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formKeys = Object.keys(formData);
    let isFormValid = true;
    const newFieldErrors = { ...formErrors };

    for (const key of formKeys) {
      if (!formData[key]) {
        newFieldErrors[key] = 'This field should not be empty!';
        isFormValid = false;
      }
    }
    
    if (!isFormValid) {
      setFormErrors(newFieldErrors);
      return
    }
    

    try {
      const response = await fetch('http://localhost:8080/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Question Added successfully!');
        toast.success('Question Added successfully', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
        setFormData({
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
            courseId: courseId,
          });
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Question add error:', error);
    }
  };

  return (
    <div className="add">
      <div className="container1">
        <h2>Add Question</h2>
        <form onSubmit={handleSubmit} className="addQuestion-form" noValidate>
          <label>Question: </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.question && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.question}
            </span>
          )}</div>

          <label>Option 1: </label>
          <input
            type="text"
            name="option1"
            value={formData.option1}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.option1 && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.option1}
            </span>
          )}</div>

          <label>Option 2: </label>
          <input
            type="text"
            name="option2"
            value={formData.option2}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.option2 && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.option2}
            </span>
          )}</div>

          <label>Option 3: </label>
          <input
            type="text"
            name="option3"
            value={formData.option3}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.option3 && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.option3}
            </span>
          )}</div>

          <label>Option 4: </label>
          <input
            type="text"
            name="option4"
            value={formData.option4}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.option4 && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.option4}
            </span>
          )}
          </div>

          <label>Answer: </label>
          <input
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.answer && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.answer}
            </span>
          )}</div>

          {error && <span className="error-msg">{error}</span>}
          <div className="btn1">
            <button type="submit">Add Question</button>
          </div>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default AddQuestion;