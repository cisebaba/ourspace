import React, { useState, useEffect } from "react";
import StarRating from "./StarRatingForm";
import ReviewsSuccessMessage from "./SuccessMessage";

function ReviewsForm(props) {
  const token = props.token;
  const setLoadList = props.setLoadList;
  const [successMessage, setSuccessMessage] = useState(false);
  const [overall_rating, setOverallRating] = useState(0);
  const [company_name, setCompanyName] = useState();
  const [salary, setSalary] = useState();
  const [diversity, setDiversity] = useState(0);
  const [balance, setBalance] = useState(0);
  const [parental_leave, setParentalLeave] = useState(0);
  const [flexibility, setFlexibility] = useState(0);

  useEffect(() => {
    const getReviewData = async () => {
      const reviewsResponse = await fetch(`${process.env.REACT_APP_REVIEWS_HOST}/api/reviews/`);
      const reviewsData = await reviewsResponse.json();
      setCompanyName(reviewsData.company_name);
      setOverallRating(reviewsData.rating);
      setSalary(reviewsData.salary);
      setDiversity(reviewsData.diversity);
      setBalance(reviewsData.balance);
      setParentalLeave(reviewsData.parental_leave);
      setFlexibility(reviewsData.flexibility);
    };

    getReviewData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataCompanyName = company_name;
    const dataRating = overall_rating;
    const dataSalary = salary;
    const dataDiversity = diversity;
    const dataBalance = balance;
    const dataParentalLeave = parental_leave;
    const dataFlexibility = flexibility;

    const new_data = {
      company_name: dataCompanyName,
      rating: dataRating,
      salary: dataSalary,
      diversity: dataDiversity,
      balance: dataBalance,
      parental_leave: dataParentalLeave,
      flexibility: dataFlexibility,
    };

    const reviewsUrl = `${process.env.REACT_APP_REVIEWS_HOST}/api/reviews/`;
    const fetchConfigReview = {
      method: "POST",
      body: JSON.stringify(new_data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(reviewsUrl, fetchConfigReview);

    if (response.ok) {
      const record = await response.json();
      setLoadList(record.id);
      setOverallRating();
      setCompanyName("");
      setBalance();
      setDiversity();
      setFlexibility();
      setParentalLeave();
      setSalary("");
      setSuccessMessage(true);

    }
  };


  return (
    <div className="row" align="center">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Review a Company!</h1>
          <form onSubmit={handleSubmit} id="create-form">
            <div className="form-floating mb-3">
              <input onChange={(e) => setCompanyName(e.target.value)}
              value={company_name || ""}
              placeholder="company_name"
              required type="text"
              name="company_name"
              id="company_name"
              className="form-control" />
              <label htmlFor="name"> Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={(e) => setSalary(e.target.value)}
              value={salary || ""}
              placeholder="salary"
              required type="text"
              name="salary"
              id="salary"
              className="form-control" />
              <label htmlFor="name">Salary</label>
            </div>
              <label htmlFor="name"> Average Rating </label>
            <div className="form-floating mb-3">
              <StarRating
              value={overall_rating}
              setRating={setOverallRating}
              placeholder="rating"
              required type="text"
              name="rating"
              id="rating"
              className="form-control" />
            </div>
              <label htmlFor="name"> Diversity</label>
            <div className="form-floating mb-3">
              <StarRating
              value={diversity}
              setRating={setDiversity}
              placeholder="diversity"
              required type="text"
              name="diversity"
              id="diversity"
              className="form-control" />
            </div>
              <label htmlFor="name"> Balance</label>
            <div className="form-floating mb-3">
              <StarRating
              value={balance}
              setRating={setBalance}
              placeholder="balance"
              required type="text"
              name="balance"
              id="balance"
              className="form-control" />
            </div>
              <label htmlFor="name"> Parental Leave</label>
            <div className="form-floating mb-3">
              <StarRating
              value={parental_leave}
              setRating={setParentalLeave}
              placeholder="parental_leave"
              required type="text"
              name="parental_leave"
              id="parental_leave"
              className="form-control" />
            </div>
              <label htmlFor="name"> Flexibility</label>
            <div className="form-floating mb-3">
              <StarRating
              value={flexibility}
              setRating={setFlexibility}
              placeholder="flexibility"
              required type="text"
              name="flexibility"
              id="flexibility"
              className="form-control" />
            </div>
            <button className="btn btn-primary">Add</button>
            {(successMessage === true) ? <ReviewsSuccessMessage /> : <></>}
          </form>
          </div>
        </div>
      </div>
  );
}


export default ReviewsForm;
