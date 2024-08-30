import { useState } from "react";
import "./ProductDetail.css";
import PropTypes from "prop-types";
import image1 from "./img/products/f1.jpg";
import image2 from "./img/products/f2.jpg";
import image3 from "./img/products/f3.jpg";
import image4 from "./img/products/f4.jpg";
import image5 from "./img/products/f5.jpg";
import image6 from "./img/products/f6.jpg";
import image7 from "./img/products/f7.jpg";
import image8 from "./img/products/f8.jpg";

const QuantitySelector = ({ quantity, setQuantity }) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="quantity-container">
      <p>Quantity ({quantity} in cart)</p>
      <div className="quantity-selector">
        <button className="quantity-btn" onClick={decreaseQuantity}>
          -
        </button>
        <span className="quantity-number">{quantity}</span>
        <button className="quantity-btn" onClick={increaseQuantity}>
          +
        </button>
      </div>
    </div>
  );
};

function ProductDetail({ addToCart }) {
  const [mainImage, setMainImage] = useState(image1);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const changeImage = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const selectSize = (size) => {
    setSelectedSize(size);
  };

  const product = {
    id: 1, // This should match your product's unique identifier
    name: "Premium Quality T-shirt",
    price: 25.0,
    image: mainImage,
    quantity: quantity,
  };

  return (
    <div className="product-detail">
      <main className="main_product_detail">
        <div className="product-section">
          <div className="image-section">
            <div className="thumbnail-vertical">
              <img
                className="thumbnail"
                src={image1}
                alt="Thumbnail 1"
                onClick={() => changeImage(image1)}
              />
              <img
                className="thumbnail"
                src={image2}
                alt="Thumbnail 2"
                onClick={() => changeImage(image2)}
              />
              <img
                className="thumbnail"
                src={image3}
                alt="Thumbnail 3"
                onClick={() => changeImage(image3)}
              />
              <img
                className="thumbnail"
                src={image4}
                alt="Thumbnail 4"
                onClick={() => changeImage(image4)}
              />
            </div>
            <div className="main-image-section">
              <img className="main-image" src={mainImage} alt="T-shirt" />
              <div className="size-selection">
                <p>Select Size:</p>
                <div className="sizes">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className={`size-button ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      onClick={() => selectSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="details-section">
            <h1>Premium Quality T-shirt</h1>
            <p className="product-description">
              This premium quality T-shirt is made from 100% organic cotton. It
              is soft, comfortable, and perfect for any occasion. Available in a
              variety of colors and sizes, this T-shirt will quickly become your
              go-to choice for casual wear.
            </p>
            <p>$25.00</p>

            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

            <button className="add-to-cart-btn"onClick={() => addToCart(product)}>Add to cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
        <div className="more-like-this">
          <h2>More Like This</h2>
          <div className="more-products-grid">
            <div
              className="tshirt-item"
              onClick={() => window.open("tshirt1.html", "_blank")}
            >
              <img
                className="tshirt-img"
                src={image5}
                alt="T-shirt 1"
              />
              <div className="description">Premium Quality T-shirt 1</div>
            </div>
            <div
              className="tshirt-item"
              onClick={() => window.open("tshirt2.html", "_blank")}
            >
              <img
                className="tshirt-img"
                src={image6}
                alt="T-shirt 2"
              />
              <div className="description">Premium Quality T-shirt 2</div>
            </div>
            <div
              className="tshirt-item"
              onClick={() => window.open("tshirt3.html", "_blank")}
            >
              <img
                className="tshirt-img"
                src={image7}
                alt="T-shirt 3"
              />
              <div className="description">Premium Quality T-shirt 3</div>
            </div>
            <div
              className="tshirt-item"
              onClick={() => window.open("tshirt4.html", "_blank")}
            >
              <img
                className="tshirt-img"
                src={image8}
                alt="T-shirt 4"
              />
              <div className="description">Premium Quality T-shirt 4</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
};

ProductDetail.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetail;
