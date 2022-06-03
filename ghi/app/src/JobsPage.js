import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";


function ListJobs() {
  const [jobList, setJobList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


//   const loadMoreCommit = () => {
//     setPage(page + 1);
//   };

  useEffect(() => {
    fetch(
      `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.REACT_APP_ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_API_KEY}&what=software&max_days_old=30&sort_by=date`,
    //   {
    //     method: "GET",
    //     // headers: new Headers({
    //     //   Accept: "application/vnd.github.cloak-preview"
    //     // })
    //   }
    )
      .then(response => response.json())
      .then(data => {
        setJobList(data.results);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  });
//   console.log(jobList);


  return (
    <div>
      <h1> Job Opportunities </h1>
      {isLoading && <p>Wait I'm Loading jobs for you</p>}

      {/* {jobList.length !== 0 && (
        <button onClick={loadMoreCommit}>Load More Commits</button>
      )} */}

      {jobList.map((j, index) => (
        <div key={index}>
          {j.results.title && (
            <>
              <div>
                {/* <h2 style={{ textDecoration: "Underline" }}>
                  {c.commit.committer.name}
                </h2> */}
                <p>{j.results.title}</p>
              </div>
              <hr />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<ListJobs />, rootElement);
export default ListJobs;