import { useState, useEffect } from "react";

const CheckPayment = () => {
  const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Thêm state cho thông báo

  useEffect(() => {
    const savedPayment = JSON.parse(localStorage.getItem("paymentStatus")) || null;
    setPaymentStatus(savedPayment);
  }, []);

  useEffect(() => {
    localStorage.setItem("paymentStatus", JSON.stringify(paymentStatus));
  }, [paymentStatus]);

  // Hàm xử lý kiểm tra thanh toán
  const handleCheckPayment = async (e) => {
    e.preventDefault();
    if (paymentId) {
      setLoading(true);
      setMessage(""); // Reset thông báo mỗi khi gửi yêu cầu mới
      try {
        // Giả lập API kiểm tra thanh toán
        const response = await fetch(`/api/check-payment?id=${paymentId}`);
        const data = await response.json();

        if (data && data.status) {
          setPaymentStatus(data);
          setMessage("Kiểm tra thanh toán thành công!"); // Thông báo thành công
        } else {
          setMessage("Không tìm thấy thông tin thanh toán."); // Thông báo thất bại
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra thanh toán:", error);
        setPaymentStatus(null);
        setMessage("Đã xảy ra lỗi khi kiểm tra thanh toán."); // Thông báo lỗi
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Vui lòng nhập mã thanh toán."); // Thông báo khi không nhập mã thanh toán
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-blue-500 text-white py-4 shadow-md z-50">
        <nav className="max-w-6xl mx-auto flex justify-between px-6">
          <h1 className="text-xl font-bold">Payment Checker</h1>
        </nav>
      </header>

      <div className="container mx-auto mt-20 p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Kiểm tra Thanh Toán</h1>

        <div className="bg-white p-6 rounded shadow-md">
          <form onSubmit={handleCheckPayment} className="space-y-4">
            <input
              type="text"
              placeholder="Nhập mã thanh toán"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Đang Kiểm Tra..." : "Kiểm tra"}
            </button>
          </form>

          {/* Hiển thị thông báo */}
          {message && (
            <div className="mt-4 p-4 bg-yellow-200 text-center rounded">
              {message}
            </div>
          )}

          {paymentStatus && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <p><strong>Trạng thái:</strong> {paymentStatus.status}</p>
              <p><strong>Số tiền:</strong> {paymentStatus.amount} VND</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckPayment;
