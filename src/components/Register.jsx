import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customers, addCustomer } from "../data/Customer";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
  
    const existingUser = customers.find((c) => c.username === username);
    if (existingUser) {
      alert("Username đã tồn tại!");
      return;
    }
    const newCustomer = { id: customers.length + 1, username, password, role: "customer" };
    customers.push(newCustomer); 
  localStorage.setItem("customers", JSON.stringify(customers));
    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
          <form>
            <div className="bg-white my-5 mx-auto" style={{ borderRadius: "1rem", maxWidth: "500px" }}>
              <div className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Register</h2>
                <p className="text-primary-50 mb-3">Tạo tài khoản mới</p>

                <label>Email address</label>
                <input className="mb-4 w-100" type="email" autoComplete="email" 
                  value={username} onChange={(e) => setUsername(e.target.value)} />

                <label>Password</label>
                <input className="mb-4 w-100" type="password" autoComplete="new-password"
                  value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="button" className="btn btn-success text-white" onClick={handleRegister}>
                  Register
                </button>
                <p className="mt-3">Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
