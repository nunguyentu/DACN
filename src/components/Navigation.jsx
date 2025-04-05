
import { NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
export default function Navigation() {
  return (
    <div>
      <h3 className="my-3 text-white">Company name</h3>
      <div className="pt-3">
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link">All Products</NavLink>
            <ul className="mt-1">
              <li className="nav-item">
                <NavLink to={"/dashboard/product"} className="nav-link">
                  Product
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link">Users</NavLink>
            <ul className="mt-1">
              <li className="nav-item">
                <NavLink to={"/dashboard/customer"} className="nav-link">
                Customer
                </NavLink>
              </li>
            </ul>
          </li>
         
          <li className="nav-item">
            <NavLink className="nav-link">Logout</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
