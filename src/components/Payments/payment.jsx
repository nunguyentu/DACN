import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const popularBanks = [
  { name: "Vietcombank", logo: "/images/vietcombank.png" },
  { name: "BIDV", logo: "/images/bidv.png" },
  { name: "Techcombank", logo: "/images/teachcombank.png" },
  { name: "ACB", logo: "/images/acb.jpg" },
  { name: "VietinBank", logo: "/images/vietinbank.png" },
  { name: "MB Bank", logo: "/images/mb.png" },
  { name: "TPBank", logo: "/images/tpbank.png" },
  { name: "VPBank", logo: "/images/vpbank.png" },
];

function PaymentFeature() {
  const [cart, setCart] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notificationModalContent, setNotificationModalContent] = useState({
    title: "Thông Báo",
    message: "Đặt hàng thành công!",
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("Thanh toán khi nhận hàng");
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankLogo: "",
  });

  // Handle modal close
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseNotificationModal = () => setShowNotificationModal(false);

  // Load cart from local storage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Calculate total amount of the order
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Format total as currency (VND) or set to 0 if the cart is empty
  const formattedTotal = total > 0 
    ? total.toLocaleString('vi-VN') 
    : "0";

  // Handle changes in shipping info
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle bank selection
  const handleBankSelect = (bank) => {
    setBankInfo({
      bankName: bank.name,
      bankLogo: bank.logo,
    });
    setIsDropdownOpen(false);
  };

  // Handle payment confirmation
  const handleConfirmPayment = () => {
    // Xóa giỏ hàng và cập nhật lại trạng thái
    localStorage.removeItem("cart"); // Xóa giỏ hàng trong localStorage
    setCart([]); // Xóa giỏ hàng trong state

    setNotificationModalContent({
      title: "Thông Báo",
      message: "Đặt hàng thành công!",
    });
    setShowNotificationModal(true);
    handleCloseModal();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowModal} className="m-5">
        Thanh Toán Ngay
      </Button>

      {/* Payment Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Thanh Toán và Đặt Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Shipping Information Form */}
          <div className="mb-4">
            <h5>Thông tin nhận hàng</h5>
            <div className="mb-3">
              <label className="form-label">
                Họ và tên <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={shippingInfo.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Số điện thoại <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Địa chỉ <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ghi chú</label>
              <textarea
                className="form-control"
                name="note"
                rows={2}
                value={shippingInfo.note}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <h5>Phương thức thanh toán</h5>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-select"
            >
              <option value="Thanh toán khi nhận hàng">
                Thanh toán khi nhận hàng (COD)
              </option>
              <option value="Chuyển khoản ngân hàng">
                Chuyển khoản ngân hàng
              </option>
            </select>
          </div>

          {/* Bank Information if selected */}
          {paymentMethod === "Chuyển khoản ngân hàng" && (
            <div className="mb-4">
              <h6>Thông tin chuyển khoản</h6>
              <div className="position-relative mb-3">
                <label className="form-label d-block mb-2 fw-medium">
                  Ngân hàng <span className="text-danger">*</span>
                </label>
                <button
                  type="button"
                  className="form-select text-start w-100 d-flex align-items-center justify-content-between"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                >
                  {bankInfo.bankName ? (
                    <div className="d-flex align-items-center">
                      <img
                        src={bankInfo.bankLogo}
                        alt={bankInfo.bankName}
                        style={{
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                          marginRight: "8px",
                        }}
                      />
                      <span>{bankInfo.bankName}</span>
                    </div>
                  ) : (
                    <span>-- Chọn ngân hàng --</span>
                  )}
                  <span
                    className={`ms-2 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    &#9660;
                  </span>
                </button>
                {isDropdownOpen && (
                  <ul
                    className="list-unstyled position-absolute bg-white border rounded mt-1 w-100 overflow-y-auto shadow-sm py-1"
                    style={{ maxHeight: "200px", zIndex: 1050 }}
                  >
                    {popularBanks.map((bank) => (
                      <li key={bank.name}>
                        <button
                          type="button"
                          className="dropdown-item d-flex align-items-center w-100"
                          onClick={() => handleBankSelect(bank)}
                        >
                          <img
                            src={bank.logo}
                            alt={bank.name}
                            style={{
                              width: "24px",
                              height: "24px",
                              objectFit: "contain",
                              marginRight: "10px",
                            }}
                          />
                          {bank.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Total Price */}
          <div className="mt-4 border-top pt-3">
            <h5>Tổng cộng</h5>
            <p className="fs-5 fw-bold text-danger">
              {formattedTotal} đ {/* Hiển thị tổng tiền theo đơn vị VND */}
            </p>
          </div>

          {/* Buttons to Close Modal and Confirm Payment */}
          <div className="d-flex justify-content-end mt-4 pt-3 border-top">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleCloseModal}
              type="button"
            >
              Đóng
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmPayment}
              type="button"
            >
              Xác nhận Đặt Hàng
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Notification Modal */}
      <Modal
        show={showNotificationModal}
        onHide={handleCloseNotificationModal}
        size="lg"
        centered
        aria-labelledby="notification-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="notification-modal-title">
            {notificationModalContent.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notificationModalContent.message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNotificationModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCloseNotificationModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PaymentFeature;
