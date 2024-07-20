import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'feedback'), {
        name,
        email,
        message,
        timestamp: new Date()
      });
      setName('');
      setEmail('');
      setMessage('');
      toast.success('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback: ', error);
      toast.error('Failed to submit feedback. Please try again later.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className='feedback-form'>
        <h2>Feedback Form</h2>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;