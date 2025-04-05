import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Header({ cart }) {
    return (
        <>
            <div className="container-fluid fixed-top">
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#" className="text-white">123,Cao Lãnh,Đồng Tháp</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i><a href="#" className="text-white">Email@shophoatuoi.com</a></small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="#" className="text-white"><small className="text-white mx-2">Đăng Xuất</small>/</a>
                            <Link to='/register' className="text-white"><small className="text-white ms-2">Đăng Ký</small></Link>
                            <Link to='/login' className="text-white"><small className="text-white ms-2">Đăng Nhập</small></Link>
                            
                        </div>
                    </div>
                </div>
                <div className="container px-0">
                    <Navbar cart={cart} />
                </div>
            </div>

            <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}