// import React, { useState } from 'react';
// import { db } from '../../firebase';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { Link } from 'react-router-dom';
// import './AdminSearch.css';

// const AdminSearch = ({ onSearchResult }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchMessage, setSearchMessage] = useState('');

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     if (searchTerm.trim() === '') {
//       setSearchMessage('Please enter a product name to search.');
//       return;
//     }

//     try {
//       const productCollection = collection(db, 'products');
//       const q = query(productCollection, where('name', '==', searchTerm));
//       const productSnapshot = await getDocs(q);

//       if (productSnapshot.empty) {
//         setSearchMessage('No products found.');
//         setSearchResults([]);
//       } else {
//         const productsList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setSearchResults(productsList);
//         setSearchMessage('');
//       }

//       onSearchResult(productsList);
//     } catch (err) {
//       console.error('Error searching for products:', err);
//       setSearchMessage('Error searching for products. Please try again.');
//     }
//   };

//   return (
//     <div className="search-component">
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search here..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//       {searchMessage && <p>{searchMessage}</p>}
//       <div className="search-results">
//         {searchResults.map(product => (
//           <div key={product.id} className="search-result-item">
//             <Link to={`/product/${product.id}`}>
//               <img src={product.imageUrl} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>₦{product.price}</p>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminSearch;