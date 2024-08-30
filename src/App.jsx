import { useRef, useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Login";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import "./main.css";
import PropTypes from "prop-types"; 
function App() {
  const handleCartClick = () => {
    history.push("./cart");
  };
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">Logo</div>
          <div className="nav">
            <Link to="/login">
              <button className="button">Log In</button>
            </Link>
            <Link to="/cart">
              <button className="button" onClick={handleCartClick}>
                Cart
              </button>
            </Link>
            <button className="button">Help</button>
          </div>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Carousel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
            <Route
              path="/product/:id"
              element={<ProductDetail addToCart={addToCart} />}
            />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-item">Contacts</div>
          <div className="footer-item">About Us</div>
          <div className="footer-item">Facebook</div>
          <div className="footer-item">Insta</div>
        </footer>
      </div>
    </Router>
  );
}

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const slideRef = useRef(null);

  const slides = [
    {
      src: "src/img/products/f1.jpg",
      alt: "T-shirt 1",
      description: "Premium Quality T-shirt 1",
      link: "./ProductDetail.jsx",
    },
    {
      src: "src/img/products/f2.jpg",
      alt: "T-shirt 2",
      description: "Premium Quality T-shirt 2",
      link: "./ProductDetail.jsx",
    },
    {
      src: "src/img/products/f3.jpg",
      alt: "T-shirt 3",
      description: "Premium Quality T-shirt 3",
      link: "./ProductDetail.jsx",
    },
    {
      src: "src/img/products/f4.jpg",
      alt: "T-shirt 3",
      description: "Premium Quality T-shirt 3",
      link: "./ProductDetail.jsx",
    },
    {
      src: "src/img/products/f5.jpg",
      alt: "T-shirt 3",
      description: "Premium Quality T-shirt 3",
      link: "./ProductDetail.jsx",
    },
    {
      src: "src/img/products/f6.jpg",
      alt: "T-shirt 3",
      description: "Premium Quality T-shirt 3",
      link: "./ProductDetail.jsx",
    },
    {
      src: "src/img/products/f7.jpg",
      alt: "T-shirt 3",
      description: "Premium Quality T-shirt 3",
      link: "./ProductDetail.jsx",
    },
    {
      src: "src/img/products/f8.jpg",
      alt: "T-shirt 3",
      description: "Premium Quality T-shirt 3",
      link: "./ProductDetail.jsx",
    },
    {
      src: "src/img/products/n1.jpg",
      alt: "T-shirt 3",
      description: "Premium Quality T-shirt 3",
      link: "./ProductDetail.jsx",
    },
    // Add more T-shirt items as needed
  ];

  // Memoized callback for nextSlide
  const nextSlide = useCallback(() => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= slides.length) {
        return 0; // Start from the first slide again
      }
      return newIndex;
    });
  }, [slides.length]);

  // Memoized callback for prevSlide
  const prevSlide = useCallback(() => {
    setIndex((prevIndex) => {
      return prevIndex === 0 ? slides.length - 1 : prevIndex - 1;
    });
  }, [slides.length]);

  const openProductPage = (id) => {
    window.location.href = `/product/${id}`;
  };

  return (
    <div className="carousel-container">
      <div
        className="tshirt-grid"
        style={{ transform: `translateX(-${index * 100}%)` }}
        ref={slideRef}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="tshirt-item"
            onClick={() => openProductPage(slide.id)}
          >
            <img className="tshirt-img" src={slide.src} alt={slide.alt} />
            <div className="description">{slide.description}</div>
          </div>
        ))}
      </div>
      <button className="carousel-button left" onClick={prevSlide}>
        {"<"}
      </button>
      <button className="carousel-button right" onClick={nextSlide}>
        {">"}
      </button>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default App;
