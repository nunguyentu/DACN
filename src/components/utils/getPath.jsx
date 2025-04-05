export default function getPath(title) {
    const paths = {
      "Trang Chủ": "/",
      "Sản Phẩm": "/products",
      "Giới Thiệu": "/about",
      "Thanh Toán": "/payment",
      "Kiểm Tra Thanh Toán": "/check-payment",  
      "Đánh Giá": "/review",
      "Chính Sách Bảo Mật": "/privacy-policy",
      "Liên Hệ": "/contact",
    };
    return paths[title] || "#";
  }
  