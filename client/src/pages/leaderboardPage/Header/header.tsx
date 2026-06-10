import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.Header}>
            <h1 className={styles.title}>CleanQuest Leaderboard 🌍</h1>
            <p className={styles.subtitle}>Track community cleanup efforts and climb the ranks</p>
            
        </header>
        
    );
}

export default Header;