import { useState } from "react";

import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showMessage, setShowMessage] = useState(false);
 // Xử lý khi người dùng nhập vào ô input
 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Giả lập gửi tin nhắn
    console.log("Tin nhắn đã gửi:", formData);

    // Hiển thị thông báo & reset form
    setShowMessage(true);
    setFormData({ name: "", email: "", message: "" });

    // Ẩn thông báo sau 3 giây
    setTimeout(() => setShowMessage(false), 3000);
  };
    return (
        <>
            {/* Header cố định */}
      <header className="fixed top-0 left-0 w-full bg-green-500 text-white py-4 shadow-md z-50">
        <nav className="max-w-6xl mx-auto flex justify-between px-6">
          <h1 className="text-xl font-bold">Fruitables</h1>
          <ul className="flex gap-4"> 
          </ul>
        </nav>
      </header>

   <div className="container">
  {/* Form liên hệ */}
  <div className="form-lienhe card shadow p-4">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Tên của bạn</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nhập tên của bạn"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Nội dung tin nhắn</label>
            <textarea
              className="form-control"
              name="message"
              placeholder="Nhập nội dung tin nhắn"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Gửi tin nhắn
          </button>
        </form>
      </div>
  
</div>

      {/* Thông báo thành công */}
      {showMessage && <div className="success-message animate">Tin nhắn đã gửi thành công!</div>}

        </>
      );
  }
  