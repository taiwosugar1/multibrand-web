import React from 'react';
import { Link } from 'react-router-dom';
import "./ProductList.css"
import { FaArrowRight } from "react-icons/fa";

const primaryProducts = [
  { name: 'Books', id: 1, image:"/images/book1.jpg", price:"1000" },
  { name: 'Tshirt_branding', id: 2, image:"/images/cloth1.png", price:"5000"  },
  { name: 'Bags', id: 3, image:"/images/bag1.png", price:"1000"  },
  { name: 'Branding', id: 4 , image:"/images/brand1.png", price:"" },
  { name: 'Letterhead', id: 5, image:"", price:""  },
  { name: 'Custum_Mugs', id: 6, image:"", price:""  },
];

const ProductsList = () => {
  return (
    <div className='product-list'>
      <h1>Our Products</h1>
      <div className='product-container'>
        {primaryProducts.map((product) => (
          <div key={product.id} className='product-box'>
             <img src={product.image} alt="" />
             <h3>{product.name}</h3>
             <h3>As low as ₦{product.price}</h3>
            <Link to={`/products/${product.name}`}><button className='view-More-sec-button'><p><FaArrowRight/></p></button></Link>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;