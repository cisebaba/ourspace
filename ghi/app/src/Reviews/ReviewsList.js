import React, { useEffect, useState } from "react";
import ReviewsForm from "./ReviewsForm"
import { NavLink } from "react-router-dom";


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

function ReviewsList(props) {
  const token = props.token;
  const [reviews, setReviews] = useState([]);



  useEffect(() => {
    const getReviewsData = async () => {
      const reviewsResponse = await fetch(`${process.env.REACT_APP_REVIEWS_HOST}/api/reviews/`,
      {headers: {
        authorization:`Bearer ${token}`,
    }});
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);
    };
    getReviewsData();
  }, []);




  return (
  <>
    { token ? <ReviewsForm token={props.token} /> : null}
    <div className="container" align="center">
      {reviews.map((review) => {
        return (
          <div key={review.company_name} className="container mb-3 shadow">
            <div className={!token ? "text-block" : null}>
            <h2 align="center ">
            { !token ?
            <NavLink to={"/signup"}>Sign up</NavLink> 
            : null }
            { !token ? <span> to see company reviews! </span> : null }
            </h2>
            </div>
            <div>
            <div className={!token ? "overlay" : null} >
            </div>
            <div className="card-body">
              <h1 className="card-title">{review.company_name}</h1>
              <br></br>
              <h5 className="card-text">Average Salary: ${review.salary_average}</h5>
              <br></br>
              <h6 className="card-text">Diversity: {review.diversity_average}<StarRating number = {review.diversity_average}/></h6>
              <h6 className="card-text">Balance: {review.balance_average}<StarRating number = {review.balance_average}/></h6>
              <h6 className="card-text">Parental Leave: {review.parental_leave_average}<StarRating number = {review.parental_leave_average}/></h6>
              <h6 className="card-text">Flexibility: {review.flexibility_average}<StarRating number = {review.flexibility_average}/></h6>
            </div>
            <h6 className="card-footer"> Overall Rating: {review.average_rating}<StarRating number = {review.average_rating}/></h6>
            </div>
            </div>
        );
      })}
    </div>
    </>
  );
}

export default ReviewsList;
