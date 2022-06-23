import React, { useState, useEffect } from "react";

// function JobColumn(props) {
//   return (
//     <div className="col">
//       {props.list.map(data => {
//         const conference = data.conference;
//         return (
//           <div key={conference.href} className="card mb-3 shadow">
//             <img src={conference.location.picture_url} className="card-img-top" />
//             <div className="card-body">
//               <h5 className="card-title">{conference.name}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">
//                 {conference.location.name}
//               </h6>
//               <p className="card-text">
//                 {conference.description}
//               </p>
//             </div>
//             <div className="card-footer">
//               {new Date(conference.starts).toLocaleDateString()}
//               -
//               {new Date(conference.ends).toLocaleDateString()}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


function JobsList() {
  const [jobs, setJobs] = useState([]) ;

  useEffect(() => {
      const getJobsData = async () => {
          const jobsResponse = await fetch(
              "http://localhost:8080/api/jobs/list/"
          );
          const jobsData = await jobsResponse.json();
          setJobs(jobsData)
      };

      getJobsData();
  }, []) ;
  
  return (
    <div className="col job-card">
      {jobs.map(job => {
        return (
          <div key={job.id} className="card mb-3 shadow">
            {/* <img src={conference.location.picture_url} className="card-img-top" /> */}
            <div className="card-body">
              <h5 className="card-title text-center">{job.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted text-center">
                {job.company}
              </h6>
              <p className="card-text">
                {job.description}
              </p>
              <p className="card-text text-center">
                <a href={job.redirect_url} target="_blank">Click to Learn More</a>
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




  // return (
  //     <>
  //     <h1>Jobs</h1>
  //     <table className='table table-striped'>
  //       <thead>
  //         <tr>
  //           <th>Title</th>
  //           <th>Company</th>
  //           <th>Created</th>
  //           <th>City</th>
  //           <th>State</th>
  //           <th>Description</th>
  //           <th>URL</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {jobs.map(job => {
  //           return (
  //             <tr key={job.id}>
  //               <td>{job.title}</td>
  //               <td>{job.company}</td>
  //               <td>{job.created}</td>
  //               <td>{job.city}</td>
  //               <td>{job.state}</td>
  //               <td>{job.description}</td>
  //               <td>{job.redirect_url}</td>
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </>
  // );