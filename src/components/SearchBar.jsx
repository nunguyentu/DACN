import React, { useState } from "react";
import products from "../data/Products"; // Import danh sách sản phẩm

const SearchProduct = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Lọc sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = products.filter((product) => 
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Ô tìm kiếm */}
            <div className="position-relative mx-auto">
                <input
                    className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                    placeholder="Search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{ top: 0, right: "25%" }}>
                    Submit Now
                </button>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <div key={index} className="product-item">
                            <h3 className="product-name">{product.productName}</h3>
                            <p>Price: {product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default SearchProduct;
