import styles from "./ResultCard.module.css";

const ResultCard = ({ hotel, onClick }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className={styles["star-filled"]}>
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

  return (
    <div className={styles["result-card"]} onClick={onClick}>
      {hotel.image && (
        <div className={styles["card-image"]}>
          <img src={hotel.image} alt={hotel.name} />
        </div>
      )}

      <div className={styles["card-content"]}>
        <h3 className={styles["hotel-name"]}>{hotel.name}</h3>

        <div className={styles["location"]}>{hotel.location}</div>

        <div className={styles["details"]}>{hotel.details}</div>

        {hotel.rating && (
          <div className={styles["rating"]}>
            <div className={styles["stars"]}>{renderStars(hotel.rating)}</div>
            <span className={styles["rating-number"]}>({hotel.rating})</span>
          </div>
        )}

        <div className={styles["price-row"]}>
          <div className={styles["price"]}>{hotel.price}</div>
          <button className={styles["view-button"]}>View</button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
