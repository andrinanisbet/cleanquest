import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";

export default function NavigationBar() {
    const currentUser = useSelector((state) => state.auth.currentUser)

  return (
    <nav className={styles.navbar}>
      {currentUser ? (
        <NavLink to="/home" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
        Home
      </NavLink>) : null }

      {currentUser ? (
        <NavLink
        to="/map" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
        Map
       </NavLink>) : null }

      {currentUser ? (
        <NavLink
        to="/leaderboard" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
        Leaderboard
      </NavLink>) : null}
            
      {currentUser ? (
        <NavLink to="/profile" className={styles.profileAvatar}> 
                {currentUser.username.charAt(0).toUpperCase()}
        </NavLink>
        ) : (
            <NavLink to="/login"> 
                Login
            </NavLink>
        )  
        } 
    </nav>
  );
}
