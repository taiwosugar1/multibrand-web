import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../AuthContext';
import './AdminDashboard.css'; 
import Popup from './Popup';

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackCollection = collection(db, 'feedback');
        const feedbackSnapshot = await getDocs(feedbackCollection);
        setFeedbacks(feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setShowPopup(true); // Show the popup when feedback is fetched
      } catch (err) {
        setError('Failed to fetch feedbacks');
        console.error('Error fetching feedbacks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!currentUser) {
    return <p className="loading">Loading...</p>;
  }

  if (loading) {
    return <p className="loading">Loading feedbacks...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <ul className="feedback-list">
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
      {showPopup && <Popup message="New feedback received!" onClose={handleClosePopup} />}
    </div>
  );
};

export default AdminDashboard;