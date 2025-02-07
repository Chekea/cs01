import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const writeDataToFirebase = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/write", {
        // Update the endpoint to /write
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: "your/path/here", data }),
      });

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming the server responds with a confirmation message
      const result = await response.text(); // or response.json() if the response is JSON
      console.log(result);
    } catch (error) {
      console.error("Error writing data to Firebase:", error);
    }
  };

  useEffect(() => {
    writeDataToFirebase({ hola: "que tal" });
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
