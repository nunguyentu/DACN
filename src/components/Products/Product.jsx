import { useState } from "react";
export default function Product({ products, setProducts }) {
  const categories = ["Vegetables", "Fruits", "Bread", "Meat"];
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: null,
    name: "",
    price: "",
    image: "/images/no-image-icon.jpg",
    description: "",
    category: "",
    rating: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số sản phẩm trên mỗi trang
  // Tính toán số trang
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const getPagination = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage > 3) pageNumbers.push(1, "...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 2) pageNumbers.push("...", totalPages);
    }
    return pageNumbers;
  };

  // Chọn hình ảnh để lưu
  const handleFileChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      if (id == "new") {
        setNewProduct({ ...newProduct, image: "/images/" + file.name });
      } else {
        setEditProduct({ ...editProduct, image: "/images/" + file.name });
      }
    }
  };
  const handleImageClick = (productId) => {
    // Kích hoạt input file ẩn
    const inputElement = document.getElementById(`file-input-${productId}`);
    if (inputElement) {
      inputElement.click();
    }
  };
  // Thêm sản phẩm mới
  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({
      id: null,
      name: "",
      price: "",
      image: "/images/no-image-icon.jpg",
      description: "",
      category: "",
      rating: 0,
    });
    // �� Tính số trang mới
    const newTotalPages = Math.ceil(products.length / itemsPerPage);
    // �� Chuyển đến trang cuối ⭐
    setCurrentPage(newTotalPages);

    console.log(products)
  };
  // Xóa sản phẩm
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  // Cập nhật sản phẩm
  const handleUpdate = () => {
    setProducts(
      products.map((p) => (p.id === editProduct.id ? editProduct : p))
    );
    setEditProduct(null);
  };
  return (
    <div className="p-5">
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">description</th>
            <th className="border p-2">category</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">
                {editProduct?.id === product.id ? (
                  <>
                    <input
                      type="file"
                      accept="images/*"
                      style={{ display: "none" }}
                      id={`file-input-${product.id}`}
                      onChange={(e) => handleFileChange("edit", e)}
                    />
                    <img
                      src={newProduct.image}
                      alt="Preview"
                      width="50"
                      onClick={() => handleImageClick(product.id)}
                    />
                  </>
                ) : (
                  <img src={product.image} alt={product.name} width="50px" />
                )}
              </td>
              <td className="border p-2">
                {editProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="border p-2">
                {editProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: e.target.value })
                    }
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td className="border p-2">
                {editProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={editProduct.description}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  product.description
                )}
              </td>
              <td className="border p-2">
                {editProduct?.id === product.id ? (
                  <select
                    value={editProduct.category}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        category: e.target.value,
                      })
                    }
                    className="border p-1 w-full"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                ) : (
                  product.category
                )}
              </td>
              <td className="border p-2">
                {editProduct?.id === product.id ? (
                  <input
                    type="number"
                    max="5"
                    min="0"
                    value={editProduct.rating}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        rating: e.target.value,
                      })
                    }
                  />
                ) : (
                  "⭐".repeat(product.rating)
                )}
              </td>
              <td className="border p-2">
                {editProduct?.id === product.id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-info text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setEditProduct(product)}
                      className="bg-warning text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-danger text-white px-2 py-1 rounded ml-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td className="border p-2">
              <input
                type="file"
                style={{ display: "none" }}
                id={`file-input-${products.id}`}
                onChange={handleFileChange}
              />
              <img
                src={newProduct.image}
                alt="Preview"
                width="50"
                onClick={() => handleImageClick(products.id)}
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </td>
            <td className="border p-2">
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="border p-1 w-full"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </td>
            <td className="border p-2">
              <input
                type="number"
                placeholder="Rating"
                max="5"
                min="0"
                value={newProduct.rating}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, rating: e.target.value })
                }
              />
            </td>
            <td className="border p-2">
              <button
                onClick={handleAddProduct}
                className="bg-primary text-white px-2 py-1 rounded"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Pagination */}
      <nav>
        <ul
          className="pagination justify-content-center"
          style={{ display: "flex" }}
        >
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {getPagination().map((page, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === page ? "active" : ""} ${
                page === "..." ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => page !== "..." && setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
