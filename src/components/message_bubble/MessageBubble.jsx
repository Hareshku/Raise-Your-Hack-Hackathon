import styles from "./MessageBubble.module.css";

const MessageBubble = ({ role, content, timestamp }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`${styles["message-bubble"]} ${
        role === "user" ? styles["user"] : styles["ai"]
      }`}
    >
      <div className={styles["message-content"]}>{content}</div>
      <div
        className={`${styles["message-timestamp"]} ${
          role === "user" ? styles["userTimestamp"] : styles["aiTimestamp"]
        }`}
      >
        {formatTime(timestamp)}
      </div>
    </div>
  );
};

export default MessageBubble;
