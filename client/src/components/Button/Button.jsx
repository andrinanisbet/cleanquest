import styles from "./Button.module.css"

export default function Button({
    children,
    onClick,
    type = "button",
    className="",
}){
    return (
        <button
            className={`${styles.button} ${className}`}
            type ={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}