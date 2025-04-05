import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Giả lập danh sách user (thay bằng API nếu có backend)
    const users = [
      { name: "Admin", password: "admin123", role: "admin" },
      { name: "Huynh Nhu", password: "user123", role: "user" },
    ];

    const user = users.find((u) => u.name === name && u.password === password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate(user.role === "admin" ? "/admin" : "/user");
    } else {
      alert("Sai tên hoặc mật khẩu!");
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Tên" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
