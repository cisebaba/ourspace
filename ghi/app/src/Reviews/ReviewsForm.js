import React, { useState } from "react";

function ReviewForm() {
  const [stateReview, setStateReview] = useState({
    id: "",
    company_name: "",
    rating: "",
    salary: "",
    diversity: "",
    balance: "",
    parental_leave: "",
    flexibility: "",
  });

  const [stateReviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviewData = async () => {
      const reviewsResponse = await fetch("http://localhost:8070/api/reviews/");
      const reviewData = await reviewResponse.json();
      setStateReview(reviewData.review);
    };

    getReviewData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = stateReview;
    const new_data = {
      id: "",
      company_name: "",
      rating: "",
      salary: "",
      diversity: "",
      balance: "",
      parental_leave: "",
      flexibility: "",
    };
    console.log(new_data);

    const reviewUrl = "http://localhost:8000/api/reviews/";
    const fetchConfigReview = {
      method: "POST",
      body: JSON.stringify(new_data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(reviewUrl, fetchConfigReview);

    if (response.ok) {
      setStateReview({
        id: "",
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

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Review a Company!</h1>
          <form onSubmit={handleSubmit} id="create-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={stateReview.company_name}
                placeholder="name"
                required
                type="text"
                name="name"
                id="event_name"
                className="form-control"
              />
              <label htmlFor="name"> Company Name</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
