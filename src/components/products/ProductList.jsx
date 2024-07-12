import React from 'react';
import { Link } from 'react-router-dom';
import "./ProductList.css"

const primaryProducts = [
  { name: 'book', id: 1, image:"", price:"" },
  { name: 'cloth', id: 2, image:"", price:""  },
  { name: 'chair', id: 3, image:"", price:""  },
  { name: 'shoe', id: 4 , image:"", price:"" },
  { name: 'watch', id: 5, image:"", price:""  },
];

const ProductsList = () => {
  return (
    <div className='product-list'>
      <h1>Primary Products</h1>
      <div className='product-container'>
        {primaryProducts.map((product) => (
          <div key={product.id} className='product-box'>
             <h3>{product.name}</h3>
             <img src={product.image} alt="" />
            <Link to={`/products/${product.name}`}>{product.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;