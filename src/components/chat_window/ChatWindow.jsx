import { useEffect, useRef } from "react";
import MessageBubble from "../message_bubble/MessageBubble";
import ResultCard from "../result_card/ResultCard";
import TypingIndicator from "../typing_indicator/TypingIndicator";
import styles from "./ChatWindow.module.css";

const ChatWindow = ({ messages = [], isTyping, onHotelClick }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className={styles["chat-window"]}>
      <div className={styles["messages-container"]}>
        {messages.map((message) => (
          <div key={message.id} className={styles["message-wrapper"]}>
            {message.content && (
              <MessageBubble
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
              />
            )}

            {message.type === "universal-response" &&
              message.hasCards &&
              message.cards && (
                <div className={styles["results-container"]}>
                  {message.cards.map((card, index) => (
                    <ResultCard
                      key={index}
                      hotel={{
                        name: card.title,
                        image: card.image,
                        price: card.price,
                        rating: card.rating,
                        location: card.location,
                        amenities: card.details.split(", "),
                        description: card.details,
                      }}
                      onClick={() =>
                        onHotelClick({
                          name: card.title,
                          image: card.image,
                          price: card.price,
                          rating: card.rating,
                          location: card.location,
                          amenities: card.details.split(", "),
                          description: card.details,
                        })
                      }
                    />
                  ))}
                </div>
              )}
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
