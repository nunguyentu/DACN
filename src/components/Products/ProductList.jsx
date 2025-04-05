import { useState, useEffect } from "react";
import Products from "../../data/Products"; // Kiểm tra file này có tồn tại chưa
import ProductDetail from "./ProductDetail";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Gán dữ liệu vào state khi component mount
  useEffect(() => {
    setProducts(Products);
  }, []);

  // Lọc sản phẩm theo tên hoặc ID
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toString().includes(searchTerm)
  );

  return (
    <div>
      <div className="position-relative mx-auto my-3">
        <input
          className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {filteredProducts.map((product) => {
            // 🛠 Kiểm tra đường dẫn ảnh trong console
            console.log("image:", product.image);

            return (
              <li key={product.id} style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: "100px", height: "100px", objectFit: "cover" }} 
                  onError={(e) => e.target.src = "/images/default.jpg"} // Nếu lỗi, dùng ảnh mặc định
                />
                <p>{product.name} - {product.price} VND</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  )
}
