import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("isLogin")));
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("isLogin")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission);
  };
  return { user, hasPermission };
}
