
import { createPortal } from 'react-dom';
import { useState } from 'react';
import {  Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Import the new Category component

const Home2 = () => {
  const [swalShown, setSwalShown] = useState(false);

  const showSwal = () => {
    Swal.fire({
      didOpen: () => setSwalShown(true),
      didClose: () => setSwalShown(false),
    });
  };

  return (
    <div className='category-showSwal'>
      <button onClick={showSwal}>Show SweetAlert2 modal</button>
      {swalShown &&
        createPortal(
        
             <Link to="/"><p>Home</p></Link>,
             <Link to="/about"><p>About</p></Link>,
             <Link to="/category/Books"><p>Books</p></Link>,
             <Link to="/category/Tshirt_branding">T-Shirt Branding</Link>,
             <Link to="/category/Custum_Mugs"><p>Mugs</p></Link>,
             <Link to="/category/Branding"><p>Branding</p></Link> ,
             <Link to="/category/Bags"><p>Bags</p></Link> 
           
          )}
        

    </div>
  );
};


  
 

    export default Home2
  