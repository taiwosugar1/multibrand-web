import React, { useState } from 'react';
import { db, storage } from '../../firebase'; // Ensure this is correctly imported
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AddProductForm.css';

const AddProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [quantity, setQuantity] = useState('');

  const categories = [
    'Books',
    'Bags',
    'Letterhead',
    'Branding',
    'Clothes',
    'Fliers',
    'Company Branding',
    'Business Cards',
    'Caps',
    'Custum Mugs',
    'Calendar',
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload an image.');
      return;
    }

    try {
      console.log('Uploading file...');
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      console.log('File uploaded successfully, URL:', imageUrl);

      console.log('Adding document to Firestore...');
      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
        categoryName,
        quantity: parseInt(quantity, 10),
        timestamp: new Date(),
      });
      console.log('Product added successfully');

      setName('');
      setPrice('');
      setDescription('');
      setFile(null);
      setCategoryName('');
      setQuantity('');

      onProductAdded();
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Failed to add product. Please try again.');
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
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      </div>
      <div className='select-category-button'>
        <label>Category:</label>
        <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required>
          <option value="" disabled>Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;