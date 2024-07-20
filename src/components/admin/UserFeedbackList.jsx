// src/components/UserFeedbackList.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './UserFeedbackList.css';

const UserFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackCollection = collection(db, 'feedback');
        const feedbackSnapshot = await getDocs(feedbackCollection);
        setFeedbacks(feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setError('Failed to fetch feedbacks');
        console.error('Error fetching feedbacks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) {
    return <p className="loading">Loading feedbacks...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="user-feedback-list">
      <h2>User Feedbacks</h2>
      <ul>
        {feedbacks.map(feedback => (
          <li key={feedback.id} className="feedback-item">
            <p>Name: {feedback.name}</p>
            <p>Email: {feedback.email}</p>
            <p>Message: {feedback.message}</p>
            {feedback.timestamp && feedback.timestamp.seconds && (
              <p>Timestamp: {new Date(feedback.timestamp.seconds * 1000).toLocaleString()}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFeedbackList;
