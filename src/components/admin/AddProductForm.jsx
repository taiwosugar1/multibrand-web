import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './AddProductForm.css';

const AddProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        description,
        image: imageUrl,
        timestamp: new Date()
      });
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
      onProductAdded();
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='add-product-form'>
      <h2>Add Product</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;