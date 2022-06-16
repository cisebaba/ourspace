import React, { useState, useEffect } from "react";

function ReviewsForm(props) {
  const token = props.token;
  const [stateReview, setStateReview] = useState({
    company_name: "",
    rating: "",
    salary: "",
    diversity: "",
    balance: "",
    parental_leave: "",
    flexibility: "",
  });

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
  // const [stateReviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviewData = async () => {
      const reviewsResponse = await fetch("http://localhost:8070/api/reviews/");
      console.log(reviewsResponse)
      const reviewsData = await reviewsResponse.json();
      console.log(reviewsData)
      setStateReview(reviewsData);
    };

    getReviewData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = stateReview;
    console.log("data",data)

    const reviewsUrl = "http://localhost:8070/api/reviews/";
    const fetchConfigReview = {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(reviewsUrl, fetchConfigReview);

    if (response.ok) {
      setStateReview({
        company_name: "",
        rating: "",
        salary: "",
        diversity: "",
        balance: "",
        parental_leave: "",
        flexibility: "",
      });
    }
  };

  const handleChange = event => {

    const value = event.target.value ;
    setStateReview({
        ...stateReview,
        [event.target.name]: value,
    });
    
  };
  

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Review a Company!</h1>

          {Star}
              {Star}
          <form onSubmit={handleSubmit} id="create-form">
            <div className="form-floating mb-3">
              <input onChange={handleChange}
              value={stateReview.company_name}
              placeholder="company_name"
              required type="text"
              name="company_name"
              id="company_name"
              className="form-control" />
              <label htmlFor="name"> Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange}
              value={stateReview.rating}
              placeholder="rating"
              required type="text"
              name="rating"
              id="rating"
              className="form-control" />
              <label htmlFor="name"> Rating </label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange}
              value={stateReview.salary}
              placeholder="salary"
              required type="text"
              name="salary"
              id="salary"
              className="form-control" />
              <label htmlFor="name"> Salary</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange}
              value={stateReview.diversity}
              placeholder="diversity"
              required type="text"
              name="diversity"
              id="diversity"
              className="form-control" />
              <label htmlFor="name"> diversity</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange}
              value={stateReview.balance}
              placeholder="balance"
              required type="text"
              name="balance"
              id="balance"
              className="form-control" />
              <label htmlFor="name"> balance</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange}
              value={stateReview.parental_leave}
              placeholder="parental_leave"
              required type="text"
              name="parental_leave"
              id="parental_leave"
              className="form-control" />
              <label htmlFor="name"> parental_leave</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleChange}
              value={stateReview.flexibility}
              placeholder="flexibility"
              required type="text"
              name="flexibility"
              id="flexibility"
              className="form-control" />
              <label htmlFor="name"> flexibility</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}



export default ReviewsForm;
