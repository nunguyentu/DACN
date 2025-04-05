import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "../../data/Products";

export default function ProductSP() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  useEffect(() => {
    setProducts(Products);
  }, []);

  const categories = ["All Products", ...new Set(products.map((p) => p.category))];

  const addToCart = (product, quantity) => {
    console.log("Thêm vào giỏ hàng:", product, "Số lượng:", quantity);
  };

  return (
    <>
      {/* Header cố định */}
      <header className="fixed top-0 left-0 w-full bg-green-500 text-white py-4 shadow-md z-50">
        <nav className="max-w-6xl mx-auto flex justify-between px-6">
          <h1 className="text-xl font-bold">Fruitables</h1>
          <ul className="flex gap-4">
            <li>Giới Thiệu</li>
          </ul>
        </nav>
      </header>

      {/* Nội dung sản phẩm */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-className text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>Our Organic Products</h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  {categories.map((item, index) => (
                    <li className="nav-item" key={index}>
                      <button
                        className={`d-flex m-2 py-2 bg-light rounded-pill ${
                          selectedCategory === item ? "active" : ""
                        }`}
                        onClick={() => setSelectedCategory(item)}
                      >
                        <span className="text-dark" style={{ width: "130px" }}>
                          {item}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="tab-content">
              <div className="row g-4">
                {products
                  .filter((product) =>
                    selectedCategory === "All Products"
                      ? true
                      : product.category === selectedCategory
                  )
                  .map((item) => (
                    <div className="col-md-6 col-lg-4 col-xl-3" key={item.id}>
                      <div className="rounded position-relative fruite-item">
                        <div className="fruite-img">
                          <img
                            src={item.image}
                            className="img-fluid rounded-top"
                            style={{ height: "200px", width: "100%" }}
                            alt={item.name}
                          />
                        </div>
                        <div
                          className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                          style={{ top: "10px", left: "10px" }}
                        >
                          {item.category}
                        </div>
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                          <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-0">
                              {item.price}/kg
                            </p>
                            <Link
                              to={`/product/${item.id}`}
                              className="btn border border-secondary rounded-pill px-3 text-primary"
                              onClick={() => addToCart(item, 1)}
                            >
                              <i className="fa fa-shopping-bag me-2 text-primary"></i>
                              Add to cart
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* -----end tab */}
          </div>
        </div>
      </div>
    </>
  );
}
