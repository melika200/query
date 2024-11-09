import React, { useState, useEffect } from 'react';
import { useProductApi } from '../../Services/ProductUri';

const Products = () => {
  const { fetchProducts, addProduct, deleteProduct } = useProductApi();
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    if (fetchProducts.data) {
      setLocalProducts(fetchProducts.data);
    }
  }, [fetchProducts.data]);

  if (fetchProducts.isLoading) return <div>Loading...</div>;
  if (fetchProducts.isError) return <div>Error: {fetchProducts.error.message}</div>;

  const handleAddProduct = () => {
    const newProduct = {
      title: "New Product",
      price: 10.99,
      description: "A new product",
      image: "https://i.pravatar.cc",
      category: "electronics",
      id: Math.random().toString(36).substring(7),
    };

    setLocalProducts([...localProducts, newProduct]);

    addProduct.mutate(newProduct, {
      onSuccess: (data) => {
        setLocalProducts(prevProducts => prevProducts.map(prod => prod.id === newProduct.id ? data : prod));
      },
      onError: () => {
        setLocalProducts(prevProducts => prevProducts.filter(prod => prod.id !== newProduct.id));
      }
    });
  };

  const handleDeleteProduct = (productId) => {
    const previousProducts = [...localProducts];
    setLocalProducts(localProducts.filter(product => product.id !== productId));

    deleteProduct.mutate(productId, {
      onError: () => {
        setLocalProducts(previousProducts);
      }
    });
  };

  return (
    <div>
      <h1>Products</h1>
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {localProducts.length > 0 ? (
          localProducts.slice(0,3).map((product) => (
            <div key={product.id} className='my-3'>
              <li>{product.title}</li>
              <li>{product.price}</li>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>
          ))
        ) : (
          <li>No products available</li>
        )}
      </ul>
    </div>
  );
};

export default Products;
