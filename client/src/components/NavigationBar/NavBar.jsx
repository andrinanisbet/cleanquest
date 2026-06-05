import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css";

export default function NavigationBar() {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={({ isActive }) => isActive ?
                'active-link': ''}>Home</NavLink>
            <NavLink to="/Map"className={({ isActive }) => isActive ?
                'active-link': ''}>Map</NavLink>
            <NavLink to="/Leaderboard"className={({ isActive }) => isActive ?
                'active-link': ''}>Leaderboard</NavLink>
        </nav>
    );
}