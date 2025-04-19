import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../data/Users";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  

  const handleLogin = () => {
    
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    
    const user = customers.find((c) => c.username === username && c.password === password);
    if (!user) {
      alert("Sai tài khoản hoặc mật khẩu!");
      return;
    }
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Đăng nhập thành công!");
    navigate("/home"); // Chuyển hướng đến trang chính
  };


  return (
    <div className="login-container">
    <div className="login-box">
      <h2>Đăng nhập</h2>

      <div className="input-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Nhập username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin} className="login-btn">Login</button>

      <p className="register-text">
        Chưa có tài khoản? <a href="/register">Đăng ký</a>
      </p>
    </div>
  </div>
  )
    // <div className="container-fluid">
    //   <div className="d-flex justify-content-center align-items-center h-100">
    //     <div className="col-12">
          {/* <form>
            <div
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <div className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                <p className="text-primary-50 mb-3">
                  Please enter your login and password!
                </p>

                <label>Email address</label>
                <input
                  className="mb-4 w-100"
                  type="email"
                  autoComplete="email"
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                  className="mb-4 w-100"
                  type="password"
                  autoComplete="new-password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                  <label className=" mb-4 form-check-label">
                    Remember password
                  </label>
                </div>
                <button
                  type="button"
                  className="btn btn-primary text-white"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </form> */}

}
