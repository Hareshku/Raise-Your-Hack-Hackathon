import { useEffect, useState } from "react";
import styles from "./HamburgerMenu.module.css";
import LoginModal from "../login_model/LoginModel";
import Cookies from "js-cookie";

const HamburgerMenu = ({ chats, activeChatId, setActiveChatId, onNewChat }) => {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = Cookies.get("userEmail");
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setShowLogin(false);
  };

  return (
    <div className={styles.wrapper}>
      {!open && (
        <button onClick={() => setOpen(true)} className={styles.toggle}>
          ☰
        </button>
      )}

      {open && (
        <aside className={styles.sidebar}>
          <div className={styles.header}>
            <h3>Chat Threads</h3>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}>
              ✕
            </button>
          </div>

          <button
            className={styles.newChat}
            onClick={() => {
              onNewChat();
              setOpen(false);
            }}
          >
            + New Chat
          </button>

          <ul className={styles.chatList}>
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setOpen(false);
                }}
                className={`${styles.chatItem} ${
                  chat.id === activeChatId ? styles.active : ""
                }`}
                title={chat.name}
              >
                {chat.name.length > 25
                  ? chat.name.slice(0, 25) + "..."
                  : chat.name}
              </li>
            ))}
          </ul>

          <div className={styles.loginSection}>
            {userEmail ? (
              <p className={styles.loggedIn}>Logged in as: {userEmail}</p>
            ) : (
              <button
                className={styles.loginButton}
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            )}
          </div>
        </aside>
      )}

      {showLogin && <LoginModal onSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default HamburgerMenu;
