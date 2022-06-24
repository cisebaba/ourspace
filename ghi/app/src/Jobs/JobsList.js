import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


function JobsList(props) {
  const token = props.token;
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobsData = async () => {
      const jobsResponse = await fetch(`${process.env.REACT_APP_JOBS_HOST}/api/jobs/list/`);
      const jobsData = await jobsResponse.json();
      setJobs(jobsData);
    };

    getJobsData();
  }, []);

  return (
    <>
    <h1 align="center"><u>Jobs</u></h1>
    <div className="col job-card">
      {jobs.map((job) => {
        return (
          <div key={job.id} className="card mb-3 shadow">
          <div className={!token ? "jobs-text-block" : null}>
            <h2 align="center ">
            { !token ?
            <NavLink to={"/signup"}>Sign up /</NavLink> 
            : null }
            { !token ?
            <NavLink to={"/login"}> Login</NavLink> 
            : null }
            { !token ? <span> to see job postings! </span> : null }
            </h2>
            </div>
            <div>
            <div className={!token ? "reviews-overlay" : null} >
            </div>
            <div className="card-body">
              <h5 className="card-title text-center">{job.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted text-center">
                {job.company}
              </h6>
              <p className="card-text">{job.description}</p>
              <p className="card-text text-center">
                <a href={job.redirect_url} target="_blank" rel="noreferrer">
                  Click to Learn More
                </a>
              </p>
            </div>
            <div className="card-footer job-card-footer">
              Created on:&nbsp;
              {new Date(job.created).toLocaleDateString()}
            </div>
          </div>
          </div>
        );
      })}
    </div>
      </>
  );
}
export default JobsList;
