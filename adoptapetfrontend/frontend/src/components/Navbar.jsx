import React from 'react';
import { FaHome, FaPaw, FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import officiallogo from "../assets/officiallogo.png";
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  // Get user data
  const user = JSON.parse(localStorage.getItem('user'));

  // Log out function
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-light fixed-top p-2" style={{ backgroundColor: '#AC8968' }}>
        <div className="container-fluid px-3">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={officiallogo} alt="Logo" width="24" height="24" className="d-inline-block align-text-top me-2" />
            <span className="font-weight-bold">AdoptAPet</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLightNavbar" aria-controls="offcanvasLightNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-light narrow-sidebar" tabIndex="-1" id="offcanvasLightNavbar" aria-labelledby="offcanvasLightNavbarLabel">
            <div className="offcanvas-header" style={{ backgroundColor: '#ac8968'}}>
              <h5 className="offcanvas-title" id="offcanvasLightNavbarLabel" style={{ fontWeight: 'bold', fontFamily: 'Times New Roman, Times, serif' }}>Menu</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body" style={{ backgroundColor: '#ac8968'}}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active d-flex align-items-center" aria-current="page" to="/dashboard" style={{ fontWeight: 'bold' }}>
                    <FaHome className="me-2" /><span>Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center" to="/pets-category" style={{ fontWeight: 'bold' }}>
                    <FaPaw className="me-2" /><span>All Pets</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center" to="/mail" style={{ fontWeight: 'bold' }}>
                    <FaEnvelope className="me-2" /><span>Mail</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center" to={`/profile`} style={{ fontWeight: 'bold' }}>
                    <FaUser className="me-2" /><span>Profile</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link d-flex align-items-center" to="/" style={{ fontWeight: 'bold' }}>
                    <FaSignOutAlt className="me-2" /><span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;