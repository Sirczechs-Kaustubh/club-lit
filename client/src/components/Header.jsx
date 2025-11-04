import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUserCircle, FaBookMedical, FaRegEdit, FaBell } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import logocat from "../assets/clublit logo.jpg";
import "../components/Profile/Profile.css";
import api from "../services/api";
import { clearAuthState, notifyAuthChange } from "../utils/authStorage";

const RightNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavIcon = styled(Link)`
  margin-left: 1rem;
  color: #fff;
  transition: color 0.3s ease;
  position : relative;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e94560;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
`;

const LogoutButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #fff;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: #1a237e;
  }
`;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  //const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const shouldShowLink = (path) => location.pathname !== path;
  const [notificationCount, setNotificationCount] = useState(0);
  const [adminNotificationCount, setAdminNotificationCount] = useState(0);

  
  useEffect(() => {
    if (!token) return;

    const fetchNotifications = async () => {
      try {
        const endpoint = isAdmin
          ? "/book-requests/admin/notifications"
          : "/book-requests/notifications";
        const { data } = await api.get(endpoint);

        if (isAdmin) {
          setAdminNotificationCount(data?.newRequestsCount ?? 0);
        } else {
          const count = Array.isArray(data)
            ? data.length
            : data?.length ?? 0;
          setNotificationCount(count);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [token, isAdmin]);

  const handleNotificationClick = async (event) => {
    event.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }

    navigate(isAdmin ? "/admin/requests" : "/user/requests");
  };

  const handleLogout = () => {
    clearAuthState();
    localStorage.removeItem("surveyStep");
    notifyAuthChange();
    navigate("/login", { replace: true });
  };

  const isLanding = location.pathname === "/";
  const dashboardPath = isAdmin ? "/admin" : "/main";
  const clubPath = isAdmin ? "/admin/clubs" : "/club";

  return (
    <div>
    <nav className="navbar">
      <div className="leftNav">
        <div className="logoContainer">
          <img src={logocat} alt="logo" className="logoImage" />
          <div className="logoText">Club Lit</div>
        </div>
      </div>
      <RightNav>
      {!isLanding && <Link to="/" className="navButton">Home</Link>}
      {location.pathname !== dashboardPath && token && (
        <Link to={dashboardPath} className="navButton">
          {isAdmin ? "Dashboard" : "My Hub"}
        </Link>
      )}
      {location.pathname !== clubPath && (
        <Link to={clubPath} className="navButton">Club</Link>
      )}
      {location.pathname !== "/genre" && (
        <Link to="/genre" className="navButton">Genre</Link>
      )}
      {!isAdmin && location.pathname !== "/about" && (
        <Link to="/about" className="navButton">About</Link>
      )}
      {!isAdmin && shouldShowLink("/ranking") && (
        <Link to="/ranking" className="navButton">
          <FaRankingStar size={18} title="Rankings" />
        </Link>
      )}

      {location.pathname !== "/requests" && token && !isAdmin && (
        <NavIcon to="/requests">
          <FaRegEdit size={28} title="Requests" />
          {notificationCount > 0 && <NotificationBadge>{notificationCount}</NotificationBadge>}
        </NavIcon>
      )}

      {shouldShowLink("/admin") && isAdmin && (
        <NavIcon to="/admin" className="nav-icon">
          <FaBookMedical size={28} title="Admin Dashboard" />
        </NavIcon>
      )}

      {token && shouldShowLink("/user/requests") && (
        <NavIcon as="button" 
          onClick={handleNotificationClick} 
          style={{ background: "none", border: "none", cursor: "pointer" }}>
          <FaBell size={28} title="Notifications" />
          {(isAdmin ? adminNotificationCount : notificationCount) > 0 && (
                <NotificationBadge>
                  {isAdmin ? adminNotificationCount : notificationCount}
                </NotificationBadge>
              )}
        </NavIcon>
      )}

      {shouldShowLink("/profile") && NavIcon.pathname !== "/profile" && (
        <NavIcon to="/profile" className="nav-icon">
          <FaUserCircle size={32} title="Profile" />
        </NavIcon>
      )}
      {token && (
        <LogoutButton type="button" onClick={handleLogout}>
          Logout
        </LogoutButton>
      )}
      </RightNav>
    </nav>
    </div>
  );
};

export default Header;
