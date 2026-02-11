// NavBar.tsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import Sidebar from "../components/Sidebar";
import LogoutModal from "./LogoutModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Menu, ChevronDown, CircleUserRound } from "lucide-react";

const NavBar: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleChangePassword = (currentPassword: string, newPassword: string) => {
    // Add your password change logic here
    console.log("Changing password...", { currentPassword, newPassword });
    try {
      setIsChangePasswordModalOpen(false);
      toast.success("Password changed successfully!");

    } catch (error) {
      console.error("Password change failed:", error);
      toast.error("Failed to change password. Please try again.");
    }
  };

  // Handle clicks outside dropdown to close it
  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isProfileDropdownOpen]);

  // Get the logged-in user's name
  const userName = localStorage.getItem("userName") || "User";

  return (
    <>
      <nav className="navbar" ref={navbarRef}>
        <div className="navbar-container">
          {/* Hamburger Icon */}
          <button
            className="hamburger"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} color="var(--base-clr)" />
          </button>

          <NavLink to="/dashboard" className="navbar-logo">
            E-Purchase
          </NavLink>

          {/* User Profile Dropdown */}
          <div className="navbar-dropdown" ref={dropdownRef}>
            <button
              className="dropdown-toggle"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              aria-expanded={isProfileDropdownOpen}
            >
              <div className="user-info">
                <CircleUserRound size={24} color="var(--header-text)" className="user-icon" />
                <span className="user-name">{userName}</span>
              </div>
              <ChevronDown
                size={16}
                color="var(--header-text)"
                className={`dropdown-arrow ${isProfileDropdownOpen ? 'rotated' : ''}`}
              />
            </button>

            {isProfileDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setIsChangePasswordModalOpen(true);
                    setIsProfileDropdownOpen(false);
                  }}                >
                  Change Password
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setIsLogoutModalOpen(true)}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="sidebar-backdrop visible"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onConfirm={handleChangePassword}
        onCancel={() => setIsChangePasswordModalOpen(false)}
      />
    </>
  );
};

export default NavBar;
