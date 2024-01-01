import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import React from "react";

import "./styles.css";

const StarRating = ({ score, scoredBy }) => {
  const rating = score / 2;
  let stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="star-icon" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt className="star-icon" key={i} />);
    } else {
      stars.push(<FaRegStar className="star-icon" key={i} />);
    }
  }

  return (
    <div className="d-flex justify-content-start align-items-center">
      {stars}
      <span className="ms-2 scored-by-text">
        (Scored by: {scoredBy === null ? "0" : scoredBy})
      </span>
    </div>
  );
};

export default StarRating;
