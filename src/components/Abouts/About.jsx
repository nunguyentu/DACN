import { Link } from "react-router-dom";

export default function About() {
  const aboutPaths = {
    "Lịch sử hình thành và phát triển": "/about/lichsuhinhthanh",
    "Sứ mệnh, tầm nhìn và giá trị cốt lõi": "/about/sumenh",
    "Đội ngũ": "/about/doingu",
    "Thành tựu và chứng nhận": "/about/achievements",
    "Câu chuyện thương hiệu": "/about/story",
  };
  function getPath(title) {
    return aboutPaths[title] || "/about"; // Nếu không có đường dẫn, trả về "/about"
  }
  return (
    <>
      {/* Header cố định */}
      <header className="fixed top-0 left-0 w-full bg-green-500 text-white py-4 shadow-md z-50">
        <nav className="max-w-6xl mx-auto flex justify-between px-6">
          <h1 className="text-xl font-bold">Fruitables</h1>
          <ul className="flex gap-4"></ul>
        </nav>
      </header>
      {/* Nội dung About */}
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto p-6 text-center pt-32">
          <h1 className="gt">Giới Thiệu</h1>
          <div className="marquee-container">
            <p className="marquee-text">
              Chào mừng bạn đến với trang web của chúng tôi! Chúng tôi chuyên
              cung cấp các sản phẩm chất lượng cao với giá cả hợp lý.
            </p>
          </div>
          <div className="table-container">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Tổng Quan Về Doanh Nghiệp</th>
                    <th>Giới thiệu về sản phẩm/dịch vụ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Lịch sử hình thành và phát triển", "Mô tả chi tiết"],
                    [
                      "Sứ mệnh, tầm nhìn và giá trị cốt lõi",
                      "Hình ảnh/video minh họa",
                    ],
                    [
                      "Đội ngũ","Thông tin chi tiết về thành viên"],
                  ].map((row, index) => (
                    <tr key={index}>
                      <td>
                        <Link
                          to={getPath(row[0])}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {row[0]}
                        </Link>
                      </td>
                      <td>{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mt-6">Sứ Mệnh</h2>
          <p className="text-gray-600 leading-relaxed">
            Mang đến trải nghiệm mua sắm tốt nhất với sản phẩm đa dạng và dịch
            vụ tận tâm.
          </p>
          <h2 className="text-2xl font-semibold text-gray-700 mt-6">
            Thông tin liên hệ
          </h2>
          <p className="text-gray-600">Email: contact@example.com</p>
          <p className="text-gray-600">Điện thoại: 0123 456 789</p>
        </div>
      </div>
    </>
  );
}
