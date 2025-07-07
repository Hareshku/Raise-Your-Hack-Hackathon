import styles from "./TypingIndicator.module.css";

const TypingIndicator = () => {
  return (
    <div className={styles["typing-indicator"]}>
      <div className={styles["typing-bubble"]}>
        <div className={styles["typing-dots"]}>
          <span className={styles["dot"]}></span>
          <span className={styles["dot"]}></span>
          <span className={styles["dot"]}></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
