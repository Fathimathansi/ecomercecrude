import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetails.css"

function ProductDetails() {

  const {id} = useParams();  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        console.log(response.data);
        console.log("Product ID from URL:", id);
      }
      catch (err) {
        console.log("Error fetching product details", err);
      }
    };

    fetchProduct();
  }, [id]);  
  if (!product) return <div>Loading...</div>;
  return (
    <div className="products">
     
      <img className="product-details-page" src={product.image} alt={product.title} />
      <div>
       <h1 className="product-title">{product.title}</h1>
      <p className="product-title">{product.description}</p>
      <p className="product-title">Price: ${product.price}</p>
      <button className="addcart ">Add to Cart</button>
      <button className="buynow">Buy  Now</button>
      </div>
    </div>
  )
}

export default ProductDetails