import React, { useState, useEffect } from "react";

function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobsData = async () => {
      const jobsResponse = await fetch("http://localhost:8080/api/jobs/list/");
      const jobsData = await jobsResponse.json();
      setJobs(jobsData);
    };

    getJobsData();
  }, []);

  return (
    <div className="col">
      {jobs.map((job) => {
        return (
          <div key={job.id} className="card mb-3 shadow">
            <div className="card-body">
              <h5 className="card-title">{job.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
              <p className="card-text">{job.description}</p>
              <p className="card-text">
                <a href={job.redirect_url} target="_blank">
                  Click to Learn More
                </a>
              </p>
            </div>
            <div className="card-footer">
              Created on:&nbsp;
              {new Date(job.created).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default JobsList;
