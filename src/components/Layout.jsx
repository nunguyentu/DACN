import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
export default function Layout({ cart }) {
    const location = useLocation();
    const [hideLayout, setHideLayout] = useState(false);
    useEffect(() => {
        const hiddenRoutes = ["/login", "/register"];
        const isDashboard = location.pathname
            .toLowerCase()
            .startsWith("/dashboard");
        setHideLayout(hiddenRoutes.includes(location.pathname.toLowerCase()) ||
            isDashboard);
    }, [location.pathname]);
    return (
        <>
            {!hideLayout && <Header cart={cart} />}
            <Outlet />
            {!hideLayout && <Footer />}
        </>
    );
}