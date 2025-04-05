import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { Link } from "react-router-dom";

export default function ThanhToan() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(
    "Thanh toán khi nhận hàng"
  );
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product, quantity) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cartData.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cartData.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    setCart(cartData); // Cập nhật giỏ hàng để giao diện render lại
  };

  // Xử lý khi người dùng nhập thông tin nhận hàng
  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // Xác nhận thanh toán
  const handleConfirmPayment = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("Vui lòng nhập đầy đủ thông tin nhận hàng!");
      return;
    }

    // Tạo đơn hàng với tổng tiền đã tính toán
    const order = {
      id: new Date().getTime(),
      items: cart,
      total: total,
      paymentMethod,
      setTotal: setTotal,
      date: new Date().toLocaleString(),
      shippingInfo,
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...orders, order]));
    localStorage.removeItem("cart");
    setCart([]);
    alert("Đặt hàng thành công!");
  };
  // Tạo hóa đơn PDF
  const generatePDF = () => {
    const doc = new jsPDF();
   
 
    doc.setFontSize(18);
    doc.text("HÓA ĐƠN THANH TOÁN", 14, 20);
    doc.setFontSize(12);
    doc.text(`Ngày: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Phương thức thanh toán: ${paymentMethod}`, 14, 40);
    // Hiển thị thông tin nhận hàng
    doc.text(`Tên: ${shippingInfo.name}`, 14, 50);
    doc.text(`SĐT: ${shippingInfo.phone}`, 14, 60);
    doc.text(`Địa chỉ: ${shippingInfo.address}`, 14, 70);
    if (shippingInfo.note) {
      doc.text(`Ghi chú: ${shippingInfo.note}`, 14, 80);
    }




      const tableColumn = ["Sản phẩm", "Số lượng", "Đơn giá", "Thành tiền"];
    const tableRows = cart.map((item) => [
        item.name,
        item.quantity,
        Number(item.price).toLocaleString() + "đ",
        (Number(item.price) * item.quantity).toLocaleString() + "đ",
    ]);

    doc.autoTable({
      startY: 90,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
      styles: { font: "Roboto", fontSize: 12 },
  });
    
     // Tổng tiền
     const total = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
     doc.text(`Tổng cộng: ${total.toLocaleString()}đ`, 14, doc.lastAutoTable.finalY + 10);
     doc.save("hoa-don-thanh-toan.pdf");

  };
  return (
    <div className="container py-5">
      <h2>Thanh toán</h2>
      {/* Form nhập thông tin nhận hàng */}
      <div className="mb-4">
        <h3>Thông tin nhận hàng</h3>
        <div className="mb-3">
          <label>Họ và tên</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={shippingInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Ghi chú</label>
          <textarea
            className="form-control"
            name="note"
            value={shippingInfo.note}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      {/* Chọn phương thức thanh toán */}
      <div className="mb-4">
        <h3>Phương thức thanh toán</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="form-control"
        >
          <option>Thanh toán khi nhận hàng</option>
          <option>Chuyển khoản ngân hàng</option>
        </select>
      </div>

      <>
        <ul className="list-unstyled">
          {cart.map((item) => (
            <li key={item.id} className="d-flex align-items-center mb-3">
              <Link
                to={`/product/${item.id}`}
                className="text-decoration-none d-flex align-items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width="50"
                  height="50"
                  className="me-2"
                />
                <span>
                  {item.name} - {Number(item.price).toLocaleString()}đ x{" "}
                  {item.quantity}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <h4>
          Tổng cộng:{" "}
          {cart
            .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
            .toLocaleString()}
          đ
        </h4>
        <button onClick={handleConfirmPayment} className="btn btn-success me-2">
          Xác nhận thanh toán
        </button>
        <button onClick={generatePDF} className="btn btn-primary">
          Tải hóa đơn PDF
        </button>
      </>
    </div>
  );
}
