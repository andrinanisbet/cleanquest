import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css";

export default function NavigationBar() {
    return (
        <nav className={styles.navbar}>
            <NavLink to= "/" className={({ isActive }) => isActive ?
               styles.activeLink: ''}>Home</NavLink>
            <NavLink to="/mapPage" className={({ isActive }) => isActive ?
                styles.activeLink: ''}>Map</NavLink>
            <NavLink to="/leaderboardPage" className={({ isActive }) => isActive ?
                styles.activeLink: ''}>Leaderboard</NavLink>
        </nav>
    );
}