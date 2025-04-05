import { Link } from "react-router-dom";
import getPath from "../utils/getPath";

export default  function Navbar({ cart }) {
  const menu = [
    { title: "Trang Chủ", is: true },
    { title: "Sản Phẩm" },
    { title: "Giới Thiệu" },
    {
      title: "Thông Tin",
      children: ["Thanh Toán", "Kiểm Tra Thanh Toán", "Đánh Giá" , "Chính Sách Bảo Mật"],// khai báo ở đây nếu thêm mục 
    },
    { title: "Liên Hệ" },
  ];
  console.log(cart.length);

  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  return (
    <nav className="navbar navbar-light bg-white navbar-expand-xl">
      <a href="../Home/Home.jsx" className="navbar-brand">
        <h1 className="text-primary display-6">Fruitables</h1>
      </a>
      <button
        className="navbar-toggler py-2 px-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="fa fa-bars text-primary"></span>
      </button>
      <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
        <div className="navbar-nav mx-auto">
          {menu.map((i) => (
            <ItemMenu key={i.title} data={i} />
          ))}
        </div>
        <div className="d-flex m-3 me-0">
          {/* search */}
          <button
            className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <i className="fas fa-search text-primary"></i>
          </button>

          <Link to={"cart"} className="position-relative me-4 my-auto">
            <i className="fa fa-shopping-bag fa-2x"></i>
            {cart.length > 0 ? (
              <span
                className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"  // chạy qua file cart 
                style={{
                  top: "-5px",
                  left: "15px",
                  height: "20px",
                  minWidth: "20px",
                }}
              >
                {cart.reduce((total, item) => total + item.quantity, 0)}  {/* Tính tổng số lượng sản phẩm */}
              </span>
            ) : (
              ""
            )}
          </Link>
          <a href="" className="my-auto">
            <i className="fas fa-user fa-2x"></i>
            {isLogin?.username}
          </a>
        </div>
      </div>
    </nav>
  );
}

function ItemMenu({ data }) {
  if (data.children) {
    return (
      <div className="nav-item dropdown">
        <a
          href="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          {data.title}
        </a>
        <div className="dropdown-menu m-0 bg-secondary rounded-0">
          {data.children.map((i) => (
            <ItemMenu key={i} data={{ title: i }} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        to={getPath(data.title)}
        className={`nav-item nav-link ${data.is ? "active" : ""}`}
      >
        {data.title}
      </Link>
    );
  }
}
