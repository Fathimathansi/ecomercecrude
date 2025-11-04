import { useState, useEffect } from "react"; // Make sure useState and useEffect are imported
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    
    if (storedUserId) {
      // This is the critical part.
      // If localStorage.getItem('userId') *sometimes* stores something that isn't just a plain ID string,
      // but perhaps a stringified object like '{"id": "123"}', then JSON.parse would be needed.
      // However, if it's ALWAYS just the ID string like '123', then JSON.parse is incorrect.
      // The error "Unexpected non-whitespace character after JSON at position 2" often means
      // it's trying to parse a simple string like "123" which is not valid JSON.
      // Let's assume for now it's just the ID string, as per your previous fix.
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`https://ecomercecrude-app.onrender.com/productid/${id}`)
        .then((response) => {
          console.log("Product fetched:", response.data.data);
          setProduct(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      console.log("User ID not found, cannot add to cart.");
      return;
    }
    if (!product || !product._id) {
        alert("Product details not loaded. Please try again.");
        console.log("Product ID not found, cannot add to cart.");
        return;
    }

    // THIS IS THE LINE WHERE YOUR ERROR REPORT POINTS: ProductDetails.jsx:37:17
    // The previous fix removed JSON.parse here:
    axios.post(`http://localhost:3000/orderid/${userId}`, { ProductId: id })
      .then((res) => {
        alert("Product added to cart!");
        console.log("Add to cart response:", res.data);
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        alert("Failed to add to cart. Please try again.");
      });
  };

  if (!product) {
    return <div className="products">Loading product details...</div>;
  }

  return (
    <div className="products">
      <img
        className="product-details-page"
        src={`http://localhost:3000/upload/${product.image?.filename}`}
        alt={product.productName}
      />
      <div>
        <h1 className="product-title">{product.productName}</h1>
        <p className="product-title">{product.description}</p>
        <p className="product-title">{product.category}</p>
        <p className="product-title">Stock: {product.stockQuantity}</p>
        <p className="product-title">Price: ${product.price}</p>
       <Link to={`/addtocart/${product._id}`}>  <button className="addcart" onClick={handleAddToCart}>Add to Cart</button></Link> 

        <Link to={`/buyone/${product._id}`}>
          <button className="buynow">Buy Now</button>
        </Link>

      </div>
    </div>
  );
}

export default ProductDetails;
