import { useState } from "react";
export default function customer({ customers, setCustomers }) {
  const categories = ["Vegetables", "Fruits", "Bread", "Meat"];
  const [editCustomer, seteditCustomer] = useState(null);
  const [newCustomer, setnewCustomer] = useState({
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
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentcustomers = customers.slice(startIndex, startIndex + itemsPerPage);
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
        setnewCustomer({ ...newCustomer, image: "/images/" + file.name });
      } else {
        seteditCustomer({ ...editCustomer, image: "/images/" + file.name });
      }
    }
  };
  const handleImageClick = (customerId) => {
    // Kích hoạt input file ẩn
    const inputElement = document.getElementById(`file-input-${customerId}`);
    if (inputElement) {
      inputElement.click();
    }
  };
  // Thêm sản phẩm mới
  const handleAddcustomer = () => {
    setCustomers([...customers, { ...newCustomer, id: Date.now() }]);
    setnewCustomer({
      id: null,
      name: "",
      price: "",
      image: "/images/no-image-icon.jpg",
      description: "",
      category: "",
      rating: 0,
    });
    // �� Tính số trang mới
    const newTotalPages = Math.ceil(customers.length / itemsPerPage);
    // �� Chuyển đến trang cuối ⭐
    setCurrentPage(newTotalPages);

    console.log(customers)
  };
  // Xóa sản phẩm
  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };
  // Cập nhật sản phẩm
  const handleUpdate = () => {
    setCustomers(
      customers.map((p) => (p.id === editCustomer.id ? editCustomer : p))
    );
    seteditCustomer(null);
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
          {currentcustomers.map((customer) => (
            <tr key={customer.id}>
              <td className="border p-2">
                {editCustomer?.id === customer.id ? (
                  <>
                    <input
                      type="file"
                      accept="images/*"
                      style={{ display: "none" }}
                      id={`file-input-${customer.id}`}
                      onChange={(e) => handleFileChange("edit", e)}
                    />
                    <img
                      src={newCustomer.image}
                      alt="Preview"
                      width="50"
                      onClick={() => handleImageClick(customer.id)}
                    />
                  </>
                ) : (
                  <img src={customer.image} alt={customer.name} width="50px" />
                )}
              </td>
              <td className="border p-2">
                {editCustomer?.id === customer.id ? (
                  <input
                    type="text"
                    value={editCustomer.name}
                    onChange={(e) =>
                      seteditCustomer({ ...editCustomer, name: e.target.value })
                    }
                  />
                ) : (
                  customer.name
                )}
              </td>
              <td className="border p-2">
                {editCustomer?.id === customer.id ? (
                  <input
                    type="text"
                    value={editCustomer.price}
                    onChange={(e) =>
                      seteditCustomer({ ...editCustomer, price: e.target.value })
                    }
                  />
                ) : (
                  `$${customer.price}`
                )}
              </td>
              <td className="border p-2">
                {editCustomer?.id === customer.id ? (
                  <input
                    type="text"
                    value={editCustomer.description}
                    onChange={(e) =>
                      seteditCustomer({
                        ...editCustomer,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.description
                )}
              </td>
              <td className="border p-2">
                {editCustomer?.id === customer.id ? (
                  <select
                    value={editCustomer.category}
                    onChange={(e) =>
                      seteditCustomer({
                        ...editCustomer,
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
                  customer.category
                )}
              </td>
              <td className="border p-2">
                {editCustomer?.id === customer.id ? (
                  <input
                    type="number"
                    max="5"
                    min="0"
                    value={editCustomer.rating}
                    onChange={(e) =>
                      seteditCustomer({
                        ...editCustomer,
                        rating: e.target.value,
                      })
                    }
                  />
                ) : (
                  "⭐".repeat(customer.rating)
                )}
              </td>
              <td className="border p-2">
                {editCustomer?.id === customer.id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-info text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => seteditCustomer(customer)}
                      className="bg-warning text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id)}
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
                id={`file-input-${customers.id}`}
                onChange={handleFileChange}
              />
              <img
                src={newCustomer.image}
                alt="Preview"
                width="50"
                onClick={() => handleImageClick(customers.id)}
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                placeholder="customer Name"
                value={newCustomer.name}
                onChange={(e) =>
                  setnewCustomer({ ...newCustomer, name: e.target.value })
                }
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                placeholder="Price"
                value={newCustomer.price}
                onChange={(e) =>
                  setnewCustomer({ ...newCustomer, price: e.target.value })
                }
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                placeholder="Description"
                value={newCustomer.description}
                onChange={(e) =>
                  setnewCustomer({ ...newCustomer, description: e.target.value })
                }
              />
            </td>
            <td className="border p-2">
              <select
                value={newCustomer.category}
                onChange={(e) =>
                  setnewCustomer({ ...newCustomer, category: e.target.value })
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
                value={newCus.rating}
                onChange={(e) =>
                  setnewCustomer({ ...newCustomer, rating: e.target.value })
                }
              />
            </td>
            <td className="border p-2">
              <button
                onClick={handleAddcustomer}
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
