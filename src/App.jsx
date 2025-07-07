import { useEffect, useState } from "react";
import MainChat from "./pages/MainChat";
import HamburgerMenu from "./components/hamburger_menu/HamburgerMenu";
import { apiFetch } from "./utils/api";
import "./App.css";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (authToken) fetchChats();
  }, [authToken]);

  const fetchChats = async () => {
    try {
      const res = await apiFetch("/chat");
      const data = await res.json();
      setChats(data.chats || []);
      if (data.chats && data.chats.length) {
        setActiveChatId(data.chats[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch chats", err);
    }
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const handleNewChat = async () => {
    try {
      const res = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({}),
      });
      const newChat = await res.json();
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChat.id);
    } catch (err) {
      console.error("Failed to create new chat", err);
    }
  };

  const handleSendMessage = async (message) => {
    const chatIndex = chats.findIndex((c) => c.id === activeChatId);
    if (chatIndex === -1) return;

    const updatedChats = [...chats];
    const chat = updatedChats[chatIndex];
    chat.messages = [...chat.messages, message];
    if (
      chat.messages.filter((m) => m.role === "user").length === 1 &&
      message.role === "user"
    ) {
      chat.name = message.content.slice(0, 30);
    }
    setChats(updatedChats);
    try {
      await apiFetch(`/chat/${activeChatId}/message`, {
        method: "POST",
        body: JSON.stringify({ message }),
      });
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const handleSetMessages = (newMessages) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId ? { ...chat, messages: newMessages } : chat
      )
    );
  };

  const currentChat = true; // chats.find((chat) => chat.id === activeChatId);

  return (
    <div className="App">
      <HamburgerMenu
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        onNewChat={handleNewChat}
      />
      {currentChat && (
        <MainChat
          authToken={authToken}
          messages={currentChat.messages || []}
          setMessages={handleSetMessages}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default App;
