import { useState, useEffect } from "react";


const DoiNgu = () => {
  const [mau, setmau] = useState(true);
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-green-500 text-white py-4 shadow-md z-50">
        <nav className="max-w-6xl mx-auto flex justify-between px-6">
          <h1 className="text-xl font-bold">Đội Ngũ</h1>
          <ul className="flex gap-4">
            <li>Giới Thiệu</li>
          </ul>
        </nav>
      </header>
      {/* Hiển thị đội ngũ chỉ khi mau = true */}
      {mau && (
        <div className="team-container">
          <h1 className="doingu-chungtoi">Đội Ngũ Của Chúng Tôi</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {/* Thành viên 1 */}
            <div className="team-card">
              <div className="avatar">
                <img
                  src="/public/images/meo1.jpg"
                  alt="Avatar"
                  className=""
                />
              </div>
              <h3 className="name">Nguyễn Văn A</h3>
              <p className="position">Giám Đốc</p>
            </div>

            {/* Thành viên 2 */}
            <div className="team-card">
              <div className="avatar">
                <img
                  src="/public/images/meo2.jpg"
                  alt="Avatar"
                  className=""
                />
              </div>
              <h3 className="name">Trần Thị B</h3>
              <p className="position">Trưởng Phòng Marketing</p>
            </div>

            {/* Thành viên 3 */}
            <div className="team-card">
              <div className="avatar">
                <img
                  src="/public/images/meo3.jpg"
                  alt="Avatar"
                  className=""
                />
              </div>
              <h3 className="name">Lê Văn C</h3>
              <p className="position">Trưởng Phòng Kinh Doanh</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoiNgu;
