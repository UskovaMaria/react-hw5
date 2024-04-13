export const addProduct = async (productData) => {
    try {
      const response = await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error adding product:', error);
    }
  };