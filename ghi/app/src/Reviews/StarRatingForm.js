import React, { useState } from "react";


const StarRating = (props) => {
    const value = props.value;

    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || value) ? "on" : "off"}
              onClick={() => props.setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(value)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };



export default StarRating;