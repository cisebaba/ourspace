import React, { useEffect, useState } from "react";
import ReviewsForm from "./ReviewsForm"
//import { AiFillStar } from 'react-icons/fa';

const StarRating = (props) => {
  return (
    
    <div className="star-rating"> 
      {[...Array(props.number)].map((star) => {
        //index += 1;
        return (
            <span className="star">&#9733;</span>
        );
      })}
    </div>
  );
};

function ReviewsList() {
  const [reviews, setReviews] = useState([]);



  useEffect(() => {
    const getReviewsData = async () => {
      const reviewsResponse = await fetch(`${process.env.REACT_APP_REVIEWS_HOST}/api/reviews/`);
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
      <ReviewsForm />
      {reviews.map((review) => {
        return (
          <div key={review.id} className="card mb-3 shadow">
            <div>
              <h2></h2>
              <h1>{review.company_name}</h1>
            </div>
            <div className="card-body">
              <h5 className="card-title"></h5>
              <h6 className="card-subtitle mb-2 text-muted"></h6>
              {/* figure out the logic for rating!! */}
              {/* <h5 className="card-text">Overall Average Rating: {review.rating}{Star}</h5> */}
              <div></div>
              <h5 className="card-text">Average Salary: {review.salary_average}
              </h5>
              <div></div>
              <p className="card-text">Diversity: {review.diversity_average} <StarRating number = {review.diversity_average}/></p>
              <div></div>
              <p className="card-text">Balance: {review.balance_average}<StarRating number = {review.balance_average}/></p>
              <div></div>
              <p className="card-text">Parental Leave: {review.parental_leave_average}<StarRating number = {review.parental_leave_average}/></p>
              <div></div>
              <p className="card-text">Flexibility: {review.flexibility_average}<StarRating number = {review.flexibility_average}/></p>
            </div>
            <div className="card-footer"></div>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewsList;
