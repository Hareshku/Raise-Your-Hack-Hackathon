import ChatWindow from "../components/chat_window/ChatWindow";
import InputBar from "../components/input_bar/InputBar";
import HotelDetailModal from "../components/hotel_details/HotelDetailModal";
import { useState } from "react";
import { hotelData } from "../mock/hotelData";
import styles from "./MainChat.module.css";

const MainChat = ({ authToken, messages, setMessages, onSendMessage }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendMessage = (content) => {
    const userMessage = {
      id: Date.now(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    const updated = [...messages, userMessage];
    // setMessages(updated);
    onSendMessage(userMessage);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(content);
      const updatedWithAI = [...updated, response];
      // setMessages(updatedWithAI);
      setIsTyping(false);

      if (
        content.toLowerCase().includes("tokyo") ||
        content.toLowerCase().includes("travel")
      ) {
        setTimeout(() => {
          const hotelMessage = {
            id: Date.now() + 1,
            role: "assistant",
            type: "universal-response",
            timestamp: new Date(),
            hasCards: true,
            message: "Here are some great hotel options for your Tokyo trip:",
            cards: hotelData.map((hotel) => ({
              title: hotel.name,
              image: hotel.image,
              price: hotel.price,
              rating: hotel.rating,
              location: hotel.location,
              details: hotel.amenities.join(", "),
            })),
          };
          setMessages([...updatedWithAI, hotelMessage]);
        }, 1000);
      }
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const responses = {
      travel: "Sure! Do you have any hotel preferences?",
      hotel:
        "I'd be happy to help you find the perfect hotel. What's your budget range?",
      tokyo:
        "Tokyo is an amazing destination! Let me find some great hotels for you.",
      default: "I understand. Let me help you with that.",
    };

    const input = userInput.toLowerCase();
    const content =
      input.includes("tokyo") || input.includes("travel")
        ? responses.tokyo
        : input.includes("hotel")
        ? responses.hotel
        : responses.default;

    return {
      id: Date.now() + Math.random(),
      role: "assistant",
      content,
      timestamp: new Date(),
    };
  };

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHotel(null);
  };

  return (
    <div className={styles["main-chat"]}>
      <div className={styles["chat-header"]}>
        <h1>ArcCommerce Travel Assistant</h1>
      </div>

      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        onHotelClick={handleHotelClick}
      />
      <InputBar onSendMessage={handleSendMessage} />
      <HotelDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        hotelData={selectedHotel}
      />
    </div>
  );
};

export default MainChat;
