import React, { useState, useEffect } from "react";
import StarRating from "./StarRatingForm";

function ReviewsForm(props) {
  const token = props.token;
  // const [rating, setRating] = useState(0);
  const [review, setReview] = useState({
    review: false
  })
  const [overall_rating, setOverallRating] = useState(0);
  const [company_name, setCompanyName] = useState();
  const [salary, setSalary] = useState();
  const [diversity, setDiversity] = useState(0);
  const [balance, setBalance] = useState(0);
  const [parental_leave, setParentalLeave] = useState(0);
  const [flexibility, setFlexibility] = useState(0);




  useEffect(() => {
    const getReviewData = async () => {
      const reviewsResponse = await fetch("http://localhost:8070/api/reviews/");
      console.log(reviewsResponse)
      const reviewsData = await reviewsResponse.json();
      console.log(reviewsData)
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
    console.log(new_data)

    const reviewsUrl = "http://localhost:8070/api/reviews/";
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
    console.log(response)
    
    if (response.ok) {
      setReview({
        review: true
      })
    }

    // if (response.ok) {
    //   setCompanyName({
    //     company_name: "",
    //   });
    //   setSalary({
    //     salary: "",
    //   });
    //   setOverallRating({
    //     overall_rating: setOverallRating,
    //   });
    //   setDiversity({
    //     diversity: dataDiversity,
    //   });
    //   setBalance({
    //     balance: dataBalance,
    //   });
    //   setParentalLeave({
    //     parental_leave: dataParentalLeave,
    //   });
    //   setFlexibility({
    //     flexibility: dataFlexibility,
    //   });


    // }
  };

  //
 
  // const handleRating = event => {

  //   const value = event.target.value ;
  //   setRating({
  //       ...rating,
  //       [event.target.name]: value,
  //   });
    
  // };

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (setReview == true) {
      messageClasses = 'alert alert-success mb-0';
      formClasses = 'd-none';
    }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Review a Company!</h1>
          

          <form className={formClasses} onSubmit={handleSubmit} id="create-form">
            <div className="form-floating mb-3">
              <input onChange={(e) => setCompanyName(e.target.value)}
              value={company_name}
              placeholder="company_name"
              required type="text"
              name="company_name"
              id="company_name"
              className="form-control" />
              <label htmlFor="name"> Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={(e) => setSalary(e.target.value)}
              value={salary}
              placeholder="salary"
              required type="text"
              name="salary"
              id="salary"
              className="form-control" />
              <label htmlFor="name"> Salary</label>
            </div>
              <label htmlFor="name"> Rating </label>
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
              <label htmlFor="name"> diversity</label>
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
              <label htmlFor="name"> balance</label>
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
              <label htmlFor="name"> parental_leave</label>
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
              <label htmlFor="name"> flexibility</label>
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
          </form>
          <div className={messageClasses} id="success-message">
          Congratulations! You're all signed up!

          </div>
        </div>
      </div>
    </div>
  );
}


export default ReviewsForm;
