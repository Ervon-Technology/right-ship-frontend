import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobBoard = ({ employeeId }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('applied'); // State to track active tab

  const user = useSelector((state) => state.auth.user);
  const authEmployeeId = user?._id; // Assuming employee ID is stored in the user object

  // Fetch employee details on component mount
  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const requestData = {
        employee_id: authEmployeeId
      };

      const response = await axios.post("{process.env.REACT_APP_API_URL}/employee/get", requestData);
      const employeeData = response.data.data[0]; // Assuming the data is in the first object
     
      const appliedJobIds = extractAppliedJobs(employeeData);
      const savedJobIds = extractSaveJobs(employeeData);

      fetchJobs(appliedJobIds, savedJobIds);
    } catch (error) {
      toast.error("Error fetching employee details: " + error.message);
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
      if (appliedJobIds.length > 0) {
        const appliedJobsResponse = await axios.post(
          "{process.env.REACT_APP_API_URL}/company/application/get",
          {
            application_id: {
              "$in": appliedJobIds,
            },
          }
        );
        setAppliedJobs(appliedJobsResponse.data.applications);
      }

      if (savedJobIds.length > 0) {
        const savedJobsResponse = await axios.post(
          "{process.env.REACT_APP_API_URL}/company/application/get",
          {
            application_id: {
              "$in": savedJobIds,
            },
          }
        );
        setSavedJobs(savedJobsResponse.data.applications);
      }
    } catch (error) {
      toast.error("Error fetching jobs: " + error.message);
    }
  };

  const handleApply = async (job) => {
    try {
      const response = await axios.post("{process.env.REACT_APP_API_URL}/employee/apply_job", {
        employee_id: authEmployeeId,
        application_id: job.application_id,
        company_id: job.company_id,
      });
      if (response.data) {
        toast.success('Successfully applied for the job');
        fetchEmployeeDetails(); // Refresh job lists after applying
      } else {
        toast.error('Failed to apply for the job');
      }
    } catch (error) {
      toast.error("Error applying for job: " + error.message);
    }
  };

  const handleUnapply = async (job) => {
    try {
      const response = await axios.post("{process.env.REACT_APP_API_URL}/employee/unapply", {
        employee_id: authEmployeeId,
        application_id: job.application_id,
        company_id: job.company_id,
      });
      if (response.data) {
        toast.success('Successfully unapplied from the job');
        fetchEmployeeDetails(); // Refresh job lists after unapplying
      } else {
        toast.error('Failed to unapply from the job');
      }
    } catch (error) {
      toast.error("Error unapplying from job: " + error.message);
    }
  };

  const handleSave = async (job) => {
    try {
      const response = await axios.post("{process.env.REACT_APP_API_URL}/employee/save_jobs", {
        employee_id: authEmployeeId,
        application_id: job.application_id,
        company_id: job.company_id,
      });
      if (response.data) {
        toast.success('Successfully saved the job');
        fetchEmployeeDetails(); // Refresh job lists after saving
      } else {
        toast.error('Failed to save the job');
      }
    } catch (error) {
      toast.error("Error saving job: " + error.message);
    }
  };

  const handleUnsave = async (job) => {
    try {
      const response = await axios.post("{process.env.REACT_APP_API_URL}/employee/unsave", {
        employee_id: authEmployeeId,
        application_id: job.application_id,
        company_id: job.company_id,
      });
      if (response.data) {
        toast.success('Successfully unsaved the job');
        fetchEmployeeDetails(); // Refresh job lists after unsaving
      } else {
        toast.error('Failed to unsave the job');
      }
    } catch (error) {
      toast.error("Error unsaving job: " + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">My Jobs</h1>
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-2 rounded-md font-semibold text-lg transition-colors ${
            activeTab === 'applied'
              ? "bg-customBlue text-white shadow-md"
              : "bg-gray-100 border border-customBlue hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab('applied')}
        >
          Applied Jobs ({appliedJobs.length})
        </button>
        <button
          className={`px-6 py-2 rounded-md font-semibold text-lg ml-4 transition-colors ${
            activeTab === 'saved'
              ? "bg-customBlue text-white shadow-md"
              : "bg-gray-100 text-customBlue border border-customBlue hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Jobs ({savedJobs.length})
        </button>
      </div>
      <div className="border-b-2 border-gray-300 mb-10"></div>
      
      <div className="grid gap-6">
        {/* Display applied jobs if the active tab is 'applied' */}
        {activeTab === 'applied' && appliedJobs.map((job) => (
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
                <button onClick={() => handleUnsave(job)} className="w-20" >Unsave</button>
              ) : (
                <button onClick={() => handleSave(job)} className="w-20" >Save</button>
              )}
            </div>
          </div>
        ))}

        {/* Display saved jobs if the active tab is 'saved' */}
        {activeTab === 'saved' && savedJobs.map((job) => (
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
