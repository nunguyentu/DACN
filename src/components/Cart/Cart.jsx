import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../../data/Products";
import getPath from "../utils/getPath";



export default function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCheckout = () => {
    const paymentPath = getPath("Thanh Toán");
    if (paymentPath !== "../Payments/payment.jsx") {
      localStorage.setItem("cart", JSON.stringify(cart));
      navigate(paymentPath);
    } else {
      console.error("Lỗi: Đường dẫn không tồn tại!");
    }
  };
  // Danh sách mã giảm giá
  const coupons = {
    DISCOUNT10: 10,
    SALE20: 20,
    FREESHIP: 15,
  };

  // Xử lý nhập mã giảm giá
  const applyCoupon = () => {
    if (coupons[coupon.toUpperCase()]) {
      setDiscount(coupons[coupon.toUpperCase()]);
      setErrorMessage("");
    } else {
      setErrorMessage("Mã giảm giá không hợp lệ!");
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setErrorMessage("");
      }, 5000);
    }
  };
  // addtoCart
  const addToCart = (product, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: quantity,
              totalPrice: parseFloat((item.price * quantity).toFixed(2)),
            }
          : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Tính toán tổng phụ và phí vận chuyển
  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat((item.price * item.quantity).toFixed(2)),
    0
  );
  const shippingFee = subtotal >= 100 ? 0 : 9.5;
  const finalShippingFee = cart.length === 0 ? 0 : shippingFee;
  const total = cart.length === 0 ? 0 : subtotal + finalShippingFee - discount;

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Sản Phẩm</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Giá</th>
                  <th>Tổng tiền/SP</th>
                  <th>Số lượng</th>
                  <th>Tổng Cộng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const product = products[item.id];
                  if (!product) return null;

                  return (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={product.image}
                          className="img-fluid me-3 rounded-circle"
                          style={{ width: "80px", height: "80px" }}
                          alt={product.name}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price} $</td>
                      <td>{(product.price * item.quantity).toFixed(2)} $</td>
                      <td>
                        <div className="input-group quantity" style={{ width: "100px" }}>
                          <button
                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <span className="form-control form-control-sm text-center border-0">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td>{(product.price * item.quantity).toFixed(2)} $</td>
                      <td>
                        <button className="btn btn-md rounded-circle bg-light border" onClick={() => removeCart(item.id)}>
                          <i className="fa fa-times text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <input
              type="text"
              className="border-0 border-bottom rounded me-5 py-3 mb-4"
              placeholder="Nhập mã giảm giá"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button" onClick={applyCoupon}>
              Áp dụng
            </button>
            {errorMessage && <div className={`error-message ${isAnimating ? "fade-out" : ""}`}>{errorMessage}</div>}
          </div>

          <div className="row g-4 justify-content-end">
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded p-4">
                <h1 className="display-6 mb-4">
                  Tổng <span className="fw-normal">Thanh Toán</span>
                </h1>
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="mb-0 me-4">Tổng phụ:</h5>
                  <p className="mb-0">${subtotal.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="mb-0 me-4">Phí vận chuyển</h5>
                  <p className="mb-0">${finalShippingFee.toFixed(2)}</p>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className="mb-0 ps-4 me-4">Tổng</h5>
                  <p className="mb-0 pe-4">${total.toFixed(2)}</p>
                </div>

                <button onClick={handleCheckout}>Tiến hành thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

