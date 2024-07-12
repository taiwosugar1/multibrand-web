import React from 'react';
import { Link } from 'react-router-dom';
import "./ProductList.css"

const primaryProducts = [
  { name: 'book', id: 1 },
  { name: 'cloth', id: 2 },
  { name: 'chair', id: 3 },
  { name: 'shoe', id: 4 },
  { name: 'watch', id: 5 },
];

const ProductsList = () => {
  return (
    <div className='product-list'>
      <h1>Primary Products</h1>
      <ul>
        {primaryProducts.map((product) => (
          <li key={product.id}>
             <h3>{product.name}</h3>
             <img src={product.image} alt="" />
            <Link to={`/products/${product.name}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;