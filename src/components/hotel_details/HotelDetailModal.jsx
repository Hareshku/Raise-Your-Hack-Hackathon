import { useEffect } from "react";
import styles from "./HotelDetailModal.module.css";

const HotelDetailModal = ({ isOpen, onClose, hotelData }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !hotelData) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className={styles["star-filled"]}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className={styles["star-half"]}>
          ★
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className={styles["star-empty"]}>
          ★
        </span>
      );
    }

    return stars;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleBackdropClick}>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-header"]}>
          <h2>{hotelData.name}</h2>
          <button className={styles["close-button"]} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles["modal-body"]}>
          <div className={styles["hotel-image"]}>
            <img src={hotelData.image} alt={hotelData.name} />
          </div>

          <div className={styles["hotel-info"]}>
            <div className={styles["location-rating"]}>
              <div className={styles["location"]}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>{hotelData.location}</span>
              </div>

              <div className={styles["rating"]}>
                <div className={styles["stars"]}>
                  {renderStars(hotelData.rating)}
                </div>
                <span className={styles["rating-text"]}>
                  ({hotelData.rating})
                </span>
              </div>
            </div>

            <div className={styles["price-section"]}>
              <div className={styles["price"]}>{hotelData.price}</div>
              <div className={styles["price-note"]}>per night</div>
            </div>

            <div className={styles["amenities-section"]}>
              <h3>Amenities</h3>
              <div className={styles["amenities-grid"]}>
                {hotelData.amenities.map((amenity, index) => (
                  <div key={index} className={styles["amenity-item"]}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles["description-section"]}>
              <h3>About this hotel</h3>
              <p>{hotelData.description}</p>
            </div>
          </div>
        </div>

        <div className={styles["modal-footer"]}>
          <button className={styles["book-button"]}>Simulate Booking</button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailModal;
