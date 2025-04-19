import React from "react";

const LichSuHinhThanh = () => {
  return (
    <>
      {/* Header cố định */}
      <header className="fixed top-0 left-0 w-full bg-green-500 text-white py-4 shadow-md z-50">
        <nav className="max-w-6xl mx-auto flex justify-between px-6">
          <ul className="flex gap-4">
            <li>Giới Thiệu</li>
          </ul>
        </nav>
      </header>

      {/* Phần nội dung chính */}
      <div className="history-container">
        <div className="history-content">
          <h1 className="history-title">Lịch Sử Hình Thành và Phát Triển</h1>
          <p className="history-intro">
            Chào mừng bạn đến với trang lịch sử hình thành và phát triển của chúng tôi.
          </p>
          <div className="history-divider"></div>
          <p className="history-text">
            Chúng tôi bắt đầu từ một ý tưởng nhỏ nhưng đầy tham vọng, với mong muốn
            mang đến những sản phẩm và dịch vụ chất lượng cao cho khách hàng. Trải qua
            nhiều năm phát triển, chúng tôi đã không ngừng đổi mới và mở rộng quy mô,
            xây dựng một thương hiệu uy tín trong ngành.
          </p>
          <p className="history-text">
            Hành trình của chúng tôi không chỉ là câu chuyện về sự tăng trưởng, mà còn
            là cam kết mang đến giá trị bền vững cho khách hàng, đối tác và cộng đồng.
          </p>

          {/* Thêm hình ảnh minh họa */}
          <div className="history-image-container">
            <img
              src="/public/images/no-image-icon.jpg"
              alt="Hình ảnh minh họa"
              className="history-image"
            />
          </div>

          {/* Nút quay lại */}
          <div className="history-button-container">
            <a href="/about" className="history-button">
              Quay lại Giới thiệu
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LichSuHinhThanh;
