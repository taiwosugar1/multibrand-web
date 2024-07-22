import { db } from './src/firebase'; // adjust the import path as necessary
import { collection, addDoc } from 'firebase/firestore';

const addCategoriesToFirestore = async () => {
  const categories = ['Books', 'Bags', 'Letterhead', 'Branding', 'Clothes', 'Fliers', 'Company Branding'];

  try {
    for (const category of categories) {
      await addDoc(collection(db, 'categories'), { name: category });
    }
    console.log('Categories added successfully!');
  } catch (error) {
    console.error('Error adding categories: ', error);
  }
};

addCategoriesToFirestore();