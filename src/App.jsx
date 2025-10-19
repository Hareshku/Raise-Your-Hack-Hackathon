// import { useEffect, useState } from "react";
// import MainChat from "./pages/MainChat";
// import HamburgerMenu from "./components/hamburger_menu/HamburgerMenu";
// import { apiFetch } from "./utils/api";
// import "./App.css";

// function App() {
//   const [authToken, setAuthToken] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [activeChatId, setActiveChatId] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       setAuthToken(token);
//     }
//   }, []);

//   useEffect(() => {
//     if (authToken) fetchChats();
//   }, [authToken]);

//   const fetchChats = async () => {
//     try {
//       const res = await apiFetch("/chat");
//       const data = await res.json();
//       setChats(data.chats || []);
//       if (data.chats && data.chats.length) {
//         setActiveChatId(data.chats[0].id);
//       }
//     } catch (err) {
//       console.error("Failed to fetch chats", err);
//     }
//   };

//   console.log("this is activated chat", activeChatId);

//   const handleLoginSuccess = (token) => {
//     localStorage.setItem("authToken", token);
//     setAuthToken(token);
//   };

//   const handleNewChat = async () => {
//     const token = localStorage.getItem("authToken");

//     try {
//       const res = await fetch(
//         "https://arccorpbackendprosustrack-production.up.railway.app/api/users/new_chat",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       if (res.ok && data.chatId) {
//         const newChat = {
//           id: data.chatId, // use backend chatId as ID
//           name: "New Chat",
//           messages: [
//             {
//               id: Date.now(),
//               role: "assistant",
//               content:
//                 "Hello! I'm your travel assistant. How can I help you plan your trip today?",
//               timestamp: new Date(),
//             },
//           ],
//         };
//         setChats((prev) => [...prev, newChat]);
//         setActiveChatId(data.chatId);
//       } else {
//         console.error("Failed to create new chat:", data);
//       }
//     } catch (err) {
//       console.error("Error creating chat:", err);
//     }
//   };

//   const handleSendMessage = async (message) => {
//     const chatIndex = chats.findIndex((c) => c.id === activeChatId);
//     if (chatIndex === -1) return;

//     const updatedChats = [...chats];
//     const chat = updatedChats[chatIndex];
//     chat.messages = [...chat.messages, message];
//     if (
//       chat.messages.filter((m) => m.role === "user").length === 1 &&
//       message.role === "user"
//     ) {
//       chat.name = message.content.slice(0, 30);
//     }
//     setChats(updatedChats);
//     try {
//       await apiFetch(`/chat/${activeChatId}/message`, {
//         method: "POST",
//         body: JSON.stringify({ message }),
//       });
//     } catch (err) {
//       console.error("Failed to send message", err);
//     }
//   };

//   const handleSetMessages = (newMessages) => {
//     setChats((prev) =>
//       prev.map((chat) =>
//         chat.id === activeChatId ? { ...chat, messages: newMessages } : chat
//       )
//     );
//   };

//   console.log("this is current chat:", chats);

//   const currentChat = chats.find((chat) => chat.id === activeChatId); // chats.find((chat) => chat.id === activeChatId);
//   console.log("this is current chat:", currentChat);
//   return (
//     <div className="App">
//       <HamburgerMenu
//         chats={chats}
//         activeChatId={activeChatId}
//         setActiveChatId={setActiveChatId}
//         onNewChat={handleNewChat}
//       />
//       {currentChat && (
//         <MainChat
//           authToken={authToken}
//           messages={currentChat.messages || []} // Provide empty array as fallback
//           setMessages={handleSetMessages}
//           onSendMessage={handleSendMessage}
//           activeChatId={activeChatId}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import MainChat from "./pages/MainChat";
// import HamburgerMenu from "./components/hamburger_menu/HamburgerMenu";
// import { apiFetch } from "./utils/api";
// import "./App.css";

// function App() {
//   const [authToken, setAuthToken] = useState(null);
//   // Initialize with dummy data
//   const [chats, setChats] = useState([
//     {
//       id: "default-chat-1",
//       name: "Welcome Chat",
//       messages: [
//         {
//           id: 1,
//           role: "assistant",
//           content:
//             "Hello! I'm your travel assistant. How can I help you today?",
//           timestamp: new Date(),
//         },
//       ],
//     },
//   ]);
//   // Initialize with default chat ID
//   const [activeChatId, setActiveChatId] = useState("default-chat-1");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       setAuthToken(token);
//     }
//   }, []);

//   useEffect(() => {
//     if (authToken) {
//       fetchChats();
//     }
//   }, [authToken]);

//   const fetchChats = async () => {
//     setIsLoading(true);
//     try {
//       const res = await apiFetch("/chat");
//       const data = await res.json();
//       console.log("API Response:", data); // Debug log

//       // Only update if we get valid data from API
//       if (data?.chats?.length) {
//         setChats(data.chats);
//         setActiveChatId(data.chats[0].id);
//       }
//     } catch (err) {
//       console.error("Failed to fetch chats", err);
//       // Keep the dummy data if API fails
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLoginSuccess = (token) => {
//     localStorage.setItem("authToken", token);
//     setAuthToken(token);
//   };

//   const handleNewChat = async () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) return;

//     try {
//       const res = await fetch(
//         "https://arccorpbackendprosustrack-production.up.railway.app/api/users/new_chat",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       if (res.ok && data.chatId) {
//         const newChat = {
//           id: data.chatId,
//           name: "New Chat",
//           messages: [
//             {
//               id: Date.now(),
//               role: "assistant",
//               content:
//                 "Hello! I'm your travel assistant. How can I help you plan your trip today?",
//               timestamp: new Date(),
//             },
//           ],
//         };
//         setChats((prev) => [...prev, newChat]);
//         setActiveChatId(data.chatId);
//       } else {
//         console.error("Failed to create new chat:", data);
//         // Fallback: Create local chat if API fails
//         const fallbackChat = {
//           id: `local-chat-${Date.now()}`,
//           name: "New Chat",
//           messages: [
//             {
//               id: Date.now(),
//               role: "assistant",
//               content: "Hello! I'm your travel assistant (offline mode).",
//               timestamp: new Date(),
//             },
//           ],
//         };
//         setChats((prev) => [...prev, fallbackChat]);
//         setActiveChatId(fallbackChat.id);
//       }
//     } catch (err) {
//       console.error("Error creating chat:", err);
//       // Same fallback as above
//       const fallbackChat = {
//         id: `local-chat-${Date.now()}`,
//         name: "New Chat",
//         messages: [
//           {
//             id: Date.now(),
//             role: "assistant",
//             content: "Hello! I'm your travel assistant (offline mode).",
//             timestamp: new Date(),
//           },
//         ],
//       };
//       setChats((prev) => [...prev, fallbackChat]);
//       setActiveChatId(fallbackChat.id);
//     }
//   };

//   const handleSendMessage = async (message) => {
//     if (!activeChatId) return;

//     const chatIndex = chats.findIndex((c) => c.id === activeChatId);
//     if (chatIndex === -1) return;

//     const updatedChats = [...chats];
//     const chat = updatedChats[chatIndex];

//     // Ensure messages array exists
//     if (!chat.messages) chat.messages = [];

//     chat.messages = [...chat.messages, message];

//     if (
//       chat.messages.filter((m) => m.role === "user").length === 1 &&
//       message.role === "user"
//     ) {
//       chat.name = message.content.slice(0, 30);
//     }

//     setChats(updatedChats);

//     try {
//       await apiFetch(`/chat/${activeChatId}/message`, {
//         method: "POST",
//         body: JSON.stringify({ message }),
//       });
//     } catch (err) {
//       console.error("Failed to send message", err);
//     }
//   };

//   const handleSetMessages = (newMessages) => {
//     setChats((prev) =>
//       prev.map((chat) =>
//         chat.id === activeChatId
//           ? { ...chat, messages: newMessages || [] }
//           : chat
//       )
//     );
//   };

//   const currentChat = chats.find((chat) => chat.id === activeChatId);

//   return (
//     <div className="App">
//       <HamburgerMenu
//         chats={chats}
//         activeChatId={activeChatId}
//         setActiveChatId={setActiveChatId}
//         onNewChat={handleNewChat}
//       />

//       {isLoading ? (
//         <div className="loading-indicator">Loading chats...</div>
//       ) : currentChat ? (
//         <MainChat
//           authToken={authToken}
//           messages={currentChat.messages || []}
//           setMessages={handleSetMessages}
//           onSendMessage={handleSendMessage}
//           activeChatId={activeChatId}
//         />
//       ) : (
//         <div className="no-chat-selected">
//           <p>No chat selected. Please create a new chat.</p>
//           <button onClick={handleNewChat}>Create New Chat</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import MainChat from "./pages/MainChat";
import HamburgerMenu from "./components/hamburger_menu/HamburgerMenu";
import { apiFetch } from "./utils/api";
import "./App.css";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [chats, setChats] = useState(() => {
    // Initialize with a default chat if no chats exist
    const savedChats = localStorage.getItem("chatHistory");
    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            id: `default-chat-${Date.now()}`,
            name: "New Chat",
            messages: [
              {
                id: Date.now(),
                role: "assistant",
                content: "Hello! How can I assist you today?",
                timestamp: new Date(),
              },
            ],
          },
        ];
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    // Set active chat to the first one if available
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      return parsedChats[0]?.id || null;
    }
    return `default-chat-${Date.now()}`;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Persist chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      fetchChats(token);
    }
  }, []);

  const fetchChats = async (token) => {
    setIsLoading(true);
    try {
      const res = await apiFetch("/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data?.chats?.length) {
        setChats(data.chats);
        setActiveChatId(data.chats[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch chats", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    const token = localStorage.getItem("authToken");

    try {
      let newChatId;
      if (token) {
        // Try to create chat on backend first
        const res = await fetch(
          "https://arccorpbackendprosustrack-production.up.railway.app/api/users/new_chat",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok && data.chatId) {
          newChatId = data.chatId;
        }
      }

      // Fallback to local ID if backend fails or no token
      if (!newChatId) {
        newChatId = `local-chat-${Date.now()}`;
      }

      const newChat = {
        id: newChatId,
        name: "New Chat",
        messages: [
          {
            id: Date.now(),
            role: "assistant",
            content:
              "Hello! I'm your travel assistant. How can I help you today?",
            timestamp: new Date(),
          },
        ],
      };

      // Add new chat while preserving existing ones
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChatId);
    } catch (err) {
      console.error("Error creating chat:", err);
      // Fallback to local chat creation
      const fallbackId = `local-chat-${Date.now()}`;
      setChats((prev) => [
        {
          id: fallbackId,
          name: "New Chat",
          messages: [
            {
              id: Date.now(),
              role: "assistant",
              content: "Hello! (Offline Mode)",
              timestamp: new Date(),
            },
          ],
        },
        ...prev,
      ]);
      setActiveChatId(fallbackId);
    }
  };

  const handleSendMessage = async (message) => {
    if (!activeChatId) return;

    // Update local state immediately
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...(chat.messages || []), message],
              // Update chat name based on first user message
              name: chat.messages.some((m) => m.role === "user")
                ? chat.name
                : message.role === "user"
                ? message.content.slice(0, 30) +
                  (message.content.length > 30 ? "..." : "")
                : chat.name,
            }
          : chat
      )
    );

    // Sync with backend if authenticated
    if (authToken) {
      try {
        await apiFetch(`/chat/${activeChatId}/message`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ message }),
        });
      } catch (err) {
        console.error("Failed to sync message:", err);
      }
    }
  };

  const handleSetMessages = (newMessages) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: newMessages || [] }
          : chat
      )
    );
  };

  const currentChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <div className="App">
      <HamburgerMenu
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        onNewChat={handleNewChat}
      />

      {isLoading ? (
        <div className="loading-indicator">Loading...</div>
      ) : currentChat ? (
        <MainChat
          authToken={authToken}
          messages={currentChat.messages || []}
          setMessages={handleSetMessages}
          onSendMessage={handleSendMessage}
          activeChatId={activeChatId}
        />
      ) : (
        <div className="no-chat-selected">
          <button onClick={handleNewChat}>Start New Chat</button>
        </div>
      )}
    </div>
  );
}

export default App;
