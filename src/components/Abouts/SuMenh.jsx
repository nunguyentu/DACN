
const SuMenh = () => {
    return (
        <>
          {/* Header cố định */}
      <header className="fixed top-0 left-0 w-full bg-green-500 text-white py-4 shadow-md z-50">
        <nav className="max-w-6xl mx-auto flex justify-between px-6">
          {/* <h1 className="text-xl font-bold">Fruitables</h1> */}
          <ul className="flex gap-4">
            <li>Giới Thiệu</li>
          </ul>
        </nav>
      </header>
      <div className="container">
      <div className="header-container">
        <h1 className="sumenh">Sứ Mệnh Của Chúng Tôi</h1>
         <p className="camket">
        Chúng tôi cam kết mang đến những sản phẩm chất lượng, thân thiện với môi trường,
        đồng thời tạo ra giá trị bền vững cho khách hàng và cộng đồng.
      </p>
  
        <div className="grid">
          <div className="">
            <h2 className="chatluong">Chất Lượng</h2>
            <p className="text-gray-600 ">
              Sản phẩm được chọn lọc kỹ lưỡng, đảm bảo tiêu chuẩn cao nhất.
            </p>
          </div>
  
          <div className="">
            <h2 className="chatluong">Khách Hàng</h2>
            <p className="text-gray-600">
              Đặt khách hàng làm trung tâm, không ngừng cải thiện trải nghiệm.
            </p>
          </div>
          <div className="">
            <h2 className="chatluong">Bền Vững</h2>
            <p className="text-gray-600">
              Hướng đến phát triển xanh, giảm thiểu tác động đến môi trường.
            </p>
          </div>
        </div>
        
      </div>
      </div>
      </>    
    );
  };
  
  export default SuMenh;
  