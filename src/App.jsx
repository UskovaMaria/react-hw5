import React, { useEffect, useState } from "react";
import { getProducts, addProduct } from "./API";
import { getSumm } from "./utils/functions";

const App = () => {
  const [products, setProducts] = useState([]);
  const [select, setSelect] = useState(1);
  const [selectData, setSelectData] = useState([
    { "id": 1, "title": "cat1" },
    { "id": 2, "title": "cat2" },
  ]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    category: 1 
  });
  const [totalSum, setTotalSum] = useState(0); 
  
  const selectHandler = (e) => {
    setSelect(Number(e.target.value));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  }

  const addNewProduct = async () => {
    try {
      const addedProduct = await addProduct({
        title: newProduct.title,
        price: Number(newProduct.price),
        category: select, 
      });
      setProducts([...products, addedProduct]);
      setNewProduct({
        title: "",
        price: 0,
        category: 1 
      });
      setTotalSum(0); 
      
      setTotalSum(prevTotalSum => prevTotalSum +  Number(addedProduct.price));

    } catch(error) {
      console.log('Error adding product:', error);
    }
  }

  useEffect(() => {
    console.log('Updated products:', products);
  }, [products]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        
        setTotalSum(getSumm(data));
      } catch(error) {
        console.log('Fetch error !!!');
      }
    })();
  }, []);

  return (
    <div className="container">
      {
        products.map(product => 
          <p key={product.id}>
            {product.title}:&nbsp;
            {product.price}
          </p>
        )
      }
      <p>Total: {totalSum}</p> 

      <select onChange={selectHandler} value={select} name="category">
        {selectData.map(item =>
          <option
            value={item.id}
            key={item.id}
          >
            {item.title}
          </option>
        )}
      </select>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={newProduct.title}
        onChange={handleInputChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <button onClick={addNewProduct}>Add Product</button>
    </div>
  );
}

export default App;