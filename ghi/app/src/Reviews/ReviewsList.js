import React, { useEffect, useState } from "react";

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };
  const Star = StarRating();

  useEffect(() => {
    const getReviewsData = async () => {
      const reviewsResponse = await fetch("http://localhost:8070/api/reviews/");
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);
    };
    getReviewsData();
  }, []);

  // FIGURING OUT THE LOGIC FOR RATINGS
  // rating variable needs to == average of
  // diversity, balance, parental_leave, flexibility

  // get the numbers of diversity, balance,
  // parental_leave, flexibility for EACH REVIEW
  // calculate the average of those numbers
  // those numbers will equal rating variable

  // also need to get average of all reviews(avg rating)
  // for EACH COMPANY

  return (
    <div className="col">
      {reviews.map((review) => {
        return (
          <div key={review.id} className="card mb-3 shadow">
            <div>
              <h2>{Star}</h2>
              <h1>{review.company_name}</h1>
            </div>
            <div className="card-body">
              <h5 className="card-title"></h5>
              <h6 className="card-subtitle mb-2 text-muted"></h6>
              {/* figure out the logic for rating!! */}
              {/* <h5 className="card-text">Overall Average Rating: {review.rating}{Star}</h5> */}
              <div></div>
              <h5 className="card-text">Average Salary: {review.salary_average}</h5>
              <div></div>
<<<<<<< HEAD
              <p className="card-text">Diversity: {review.diversity_average}{Star}</p>
              <div></div>
              <p className="card-text">Balance: {review.balance_average}{Star}</p>
              <div></div>
              <p className="card-text">Parental Leave: {review.parental_leave_average}{Star}</p>
              <div></div>
              <p className="card-text">Flexibility: {review.flexibility_average}{Star}</p>
=======
              <p className="card-text">
                Diversity: {review.diversity}
                {Star}
              </p>
              <div></div>
              <p className="card-text">
                Balance: {review.balance}
                {Star}
              </p>
              <div></div>
              <p className="card-text">
                Parental Leave: {review.parental_leave}
                {Star}
              </p>
              <div></div>
              <p className="card-text">
                Flexibility: {review.flexibility}
                {Star}
              </p>
>>>>>>> main
            </div>
            <div className="card-footer"></div>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewsList;
