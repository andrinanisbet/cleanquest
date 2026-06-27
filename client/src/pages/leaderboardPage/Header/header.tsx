// Import the CSS module for styling this Header component
import styles from "./Header.module.css";

// Header component displays the main title and subtitle for the leaderboard page
function Header() {
    return (
        // Main header section of the page 
        <header className={styles.Header}>
            <h1 className={styles.title}>CleanQuest Leaderboard 🌍</h1>
            <p className={styles.subtitle}>Track community cleanup efforts & climb the ranks</p>
            
        </header>
        
    );
}

// Export the Header component so it can be used in other files
export default Header;