// Logic
// get the list of jobs from properties job_applied and save_job from employee detail api 
// Get all the application id and create a array of jobs Id
// do a api call to get all the jobs in array 
// save the response 
// Get two varibale saveJobs and applied Jobs and store into it

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';

const JobBoard = ({ employeeId }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobList, setJoblists] = useState([]);

  const user = useSelector((state) => state.auth.user);

  // Fetch employee details on component mount
  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
        
      const requestData = {
          employee_id: { '$in': [user._id] }
      };

      console.log(requestData);

      const response = await axios.post("https://api.rightships.com/employee/get", requestData );
      
      const employeeData = response.data.data[0]; // Assuming the data is in the first object
     
      // Extract job application IDs from `applied_by` array
      const appliedJobIds = extractAppliedJobs(response.data.data[0])
  
     
      // Extract job application IDs from `save_jobs_applications` array
      const savedJobIds = extractSaveJobs(response.data.data[0])
      

      // Fetch jobs for the extracted IDs
      fetchJobs(appliedJobIds, savedJobIds);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };
  
  const extractSaveJobs = (data) => {
    return (data.save_jobs || [])
      .map(item => item.application_id)
      .filter(Boolean)
      .flat();
  };
  
  const extractAppliedJobs = (data) => {
    return (data.applied_in || [])
      .map(item => item.application_id)
      .filter(Boolean)
      .flat();
  };

  const fetchJobs = async (appliedJobIds, savedJobIds) => {
    try {
      // Fetch applied jobs
      if (appliedJobIds.length > 0) {
        console.log("========> s", appliedJobIds);
        const appliedJobsResponse = await axios.post(
          "https://api.rightships.com/company/application/get",
          {
            application_id: {
              "$in": appliedJobIds,
            },
          }
        );
       
        setAppliedJobs(appliedJobsResponse.data.applications); // Assuming 'jobs' contains the relevant job data
      }

      // Fetch saved jobs
      if (savedJobIds.length > 0) {
        const savedJobsResponse = await axios.post(
          "https://api.rightships.com/company/application/get",
          {
            application_id: {
              "$in": savedJobIds,
            },
          }
        );
        setSavedJobs(savedJobsResponse.data.applications); // Assuming 'jobs' contains the relevant job data
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleApply = async (job) => {
    try {
      await axios.post("https://api.rightships.com/employee/apply_job", {
        employee_id: employeeId,
        application_id: job.application_id,
        company_id: job.company_id,
      });
      fetchEmployeeDetails(); // Refresh job lists after applying
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  const handleUnapply = async (job) => {
    try {
      await axios.post("https://api.rightships.com/employee/unapply", {
        employee_id: employeeId,
        application_id: job.application_id,
        company_id: job.company_id,
      });
      fetchEmployeeDetails(); // Refresh job lists after unapplying
    } catch (error) {
      console.error("Error unapplying from job:", error);
    }
  };

  const handleSave = async (job) => {
    try {
      await axios.post("https://api.rightships.com/employee/save_jobs", {
        employee_id: employeeId,
        application_id: job.application_id,
        company_id: job.company_id,
      });
      fetchEmployeeDetails(); // Refresh job lists after saving
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleUnsave = async (job) => {
    try {
      await axios.post("https://api.rightships.com/employee/unsave", {
        employee_id: employeeId,
        application_id: job.application_id,
        company_id: job.company_id,
      });
      fetchEmployeeDetails(); // Refresh job lists after unsaving
    } catch (error) {
      console.error("Error unsaving job:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">My Jobs</h1>
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-2 rounded-md font-semibold text-lg transition-colors ${
            appliedJobs.length > 0
              ? "bg-customBlue text-white shadow-md"
              : "bg-gray-100 border border-customBlue hover:bg-gray-200"
          }`}
        >
          Applied Jobs ({appliedJobs.length})
        </button>
        <button
          className={`px-6 py-2 rounded-md font-semibold text-lg ml-4 transition-colors ${
            savedJobs.length > 0
              ? "bg-customBlue text-white shadow-md"
              : "bg-gray-100 text-customBlue border border-customBlue hover:bg-gray-200"
          }`}
        >
          Saved Jobs ({savedJobs.length})
        </button>
      </div>
      <div className="border-b-2 border-gray-300 mb-10"></div>
      <div className="grid gap-6">
        {/* Display applied jobs */}
        {appliedJobs.map((job) => (
          <div
            key={job.application_id}
            className="p-6 bg-white rounded-lg shadow-lg flex justify-between items-center transition-transform hover:scale-105"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {job.company_name} | {job.rspl_no}
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Hiring For:</span> {job.hiring_for.join(", ")}
              </p>
              <p className="text-gray-700 mt-1">
                <span className="font-medium">Open Positions:</span> {job.open_positions.join(", ")}
              </p>
            </div>
            <div className="flex space-x-4 items-center">
              <button
                className="w-24 py-2 rounded-md font-medium border border-customBlue text-customBlue transition-all hover:bg-customBlue hover:text-white"
                onClick={() => handleUnapply(job)}
              >
                Unapply
              </button>
              {savedJobs.some((savedJob) => savedJob.application_id === job.application_id) ? (
                <button onClick={() => handleUnsave(job)}>Unsave</button>
              ) : (
                <button onClick={() => handleSave(job)}>Save</button>
              )}
            </div>
          </div>
        ))}

        {/* Display saved jobs */}
        {savedJobs.map((job) => (
          <div
            key={job.application_id}
            className="p-6 bg-white rounded-lg shadow-lg flex justify-between items-center transition-transform hover:scale-105"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {job.company_name} | {job.rspl_no}
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Hiring For:</span> {job.hiring_for.join(", ")}
              </p>
              <p className="text-gray-700 mt-1">
                <span className="font-medium">Open Positions:</span> {job.open_positions.join(", ")}
              </p>
            </div>
            <div className="flex space-x-4 items-center">
              {appliedJobs.some((appliedJob) => appliedJob.application_id === job.application_id) ? (
                <button
                  className="w-24 py-2 rounded-md font-medium border border-customBlue text-customBlue transition-all hover:bg-customBlue hover:text-white"
                  onClick={() => handleUnapply(job)}
                >
                  Unapply
                </button>
              ) : (
                <button
                  className="w-24 py-2 rounded-md font-medium bg-customBlue text-white transition-all hover:bg-customBlue2"
                  onClick={() => handleApply(job)}
                >
                  Apply
                </button>
              )}
              <button onClick={() => handleUnsave(job)}>Unsave</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
