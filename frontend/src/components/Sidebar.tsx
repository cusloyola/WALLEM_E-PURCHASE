import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import '../styles/Sidebar.css';
import logo from '../assets/wallemrectangle.png';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  const isActive = (path: string) => location.pathname === path;

  // Update date and time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentDateTime(now.toLocaleDateString('en-US', options));
    };

    updateDateTime(); // Initial call
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <>
      <nav 
        id="sidebar" 
        className={isOpen ? "sidebar-visible" : "sidebar-hidden"}
      >
        <ul>
          <li>
            <span className="logo" onClick={onClose} style={{ cursor: 'pointer' }}>
              <img src={logo} alt="Wallem Square Logo" />
            </span>
          </li>

          <li className={isActive("/dashboard") ? "active" : ""}>
            <Link to="/dashboard" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                {isActive("/dashboard") ? (
                  <path d="M160-120v-480l320-240 320 240v480H520v-240h-80v240H160Z" />
                ) : (
                  <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" />
                )}
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li className={isActive("/new-pr") ? "active" : ""}>
            <Link to="/new-pr" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                {isActive("/new-pr") ? (
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                ) : (
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                )}
              </svg>
              <span>New PR</span>
            </Link>
          </li>
          <li className={isActive("/outstanding-pr") ? "active" : ""}>
            <Link to="/outstanding-pr" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                {isActive("/outstanding-pr") ? (
                  <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                ) : (
                  <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                )}
              </svg>
              <span>Outstanding PR</span>
            </Link>
          </li>
          <li className={isActive("/pending-pr") ? "active" : ""}>
            <Link to="/pending-pr" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                {isActive("/pending-pr") ? (
                  <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Z" />
                ) : (
                  <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80Zm-80 320q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                )}
              </svg>
              <span>Pending PR</span>
            </Link>
          </li>

          <li className="datetime-display">
            <div className="datetime-content">
              <span className="datetime-text">{currentDateTime}</span>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;