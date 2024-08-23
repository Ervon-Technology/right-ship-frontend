import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiX, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
  </div>
);

const CardLoader = () => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-sm animate-pulse"
  >
    <div className="h-6 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-8 bg-gray-200 rounded mt-4"></div>
  </motion.div>
);

const JobTypeFilter = ({ selectedTypes, setSelectedTypes, options, title, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    onFilterChange();
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <input
        type="text"
        placeholder={`Search ${title.toLowerCase()}...`}
        className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-3 max-h-48 overflow-y-auto">
        {filteredOptions.map(option => (
          <label key={option} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              checked={selectedTypes.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <span className="ml-2 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const JobCard = ({ job, onCardClick, currentUserId }) => {
  const [applying, setApplying] = useState(false);
  const [unapplying, setUnapplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [unsaving, setUnsaving] = useState(false);

  // Defensive checks for applied and saved status
  const [isApplied, setIsApplied] = useState(job.applied_by ? job.applied_by.some((application) => application.employee_id === currentUserId) : false);
  const [isSaved, setIsSaved] = useState(job.save_jobs_applications ? job.save_jobs_applications.some((save) => save.employee_id === currentUserId) : false);

  // Function to check if user is logged in
  const checkLoginStatus = () => {
    if (!currentUserId) {
      toast.error('Please log in to continue.');
      return false;
    }
    return true;
  };

  const applyForJob = async (event) => {
    event.stopPropagation();
    if (!checkLoginStatus()) return;

    setApplying(true);
    try {
      const response = await axios.post('https://api.rightships.com/employee/apply_job', {
        employee_id: currentUserId,
        application_id: job.application_id,
        company_id: job.company_id
      });
      if (response && response.data) {
        toast.success('Successfully applied for the job');
        setIsApplied(true);
      } else {
        toast.error('Failed to apply for the job');
      }
    } catch (error) {
      toast.error(`An error occurred while applying: ${error.message}`);
    } finally {
      setApplying(false);
    }
  };

  const unapplyForJob = async (event) => {
    event.stopPropagation();
    if (!checkLoginStatus()) return;

    setUnapplying(true);
    try {
      const response = await axios.post('https://api.rightships.com/employee/unapply', {
        employee_id: currentUserId,
        application_id: job.application_id,
        company_id: job.company_id
      });
      if (response && response.data) {
        toast.success('Successfully unapplied from the job');
        setIsApplied(false);
      } else {
        toast.error('Failed to unapply from the job');
      }
    } catch (error) {
      toast.error(`An error occurred while unapplying: ${error.message}`);
    } finally {
      setUnapplying(false);
    }
  };

  const saveJob = async (event) => {
    event.stopPropagation();
    if (!checkLoginStatus()) return;

    setSaving(true);
    try {
      const response = await axios.post('https://api.rightships.com/employee/save_jobs', {
        employee_id: currentUserId,
        application_id: job.application_id,
        company_id: job.company_id
      });
      if (response && response.data) {
        toast.success('Successfully saved the job');
        setIsSaved(true);
      } else {
        toast.error('Failed to save the job');
      }
    } catch (error) {
      toast.error(`An error occurred while saving: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const unsaveJob = async (event) => {
    event.stopPropagation();
    if (!checkLoginStatus()) return;

    setUnsaving(true);
    try {
      const response = await axios.post('https://api.rightships.com/employee/unsave', {
        employee_id: currentUserId,
        application_id: job.application_id,
        company_id: job.company_id
      });
      if (response && response.data) {
        toast.success('Successfully unsaved the job');
        setIsSaved(false);
      } else {
        toast.error('Failed to unsave the job');
      }
    } catch (error) {
      toast.error(`An error occurred while unsaving: ${error.message}`);
    } finally {
      setUnsaving(false);
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
      onClick={() => onCardClick(job)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-xl font-bold text-gray-800">{job.open_positions.join(', ')}</h3>
      <p className="text-sm text-gray-600 mt-1">{job.company_name} • {new Date(job.created_date).toLocaleDateString()}</p>
      <p className="mt-3 text-gray-700">{job.description || ""}</p>
      <div className="mt-4 flex space-x-3">
        {isApplied ? (
          <button
            className="px-6 py-2 rounded-md font-medium border border-customBlue text-customBlue transition-all hover:bg-customBlue hover:text-white"
            onClick={unapplyForJob}
            disabled={unapplying}
          >
            {unapplying ? 'Unapplying...' : 'Unapply'}
          </button>
        ) : (
          <button
            className="px-6 py-2 rounded-md font-medium bg-customBlue text-white transition-all hover:bg-customBlue2"
            onClick={applyForJob}
            disabled={applying}
          >
            {applying ? 'Applying...' : 'Apply'}
          </button>
        )}
        
        {isSaved ? (
          <button
            className="px-4 py-2 rounded-lg text-black-700 font-medium hover:bg-blue-200 transition duration-200"
            onClick={unsaveJob}
            disabled={unsaving}
          >
            {unsaving ? 'Unsaving...' : 'Unsave'}
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition duration-200"
            onClick={saveJob}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>
      
    </motion.div>
  );
};

const JobDetailsCanvas = ({ job, companyDetails, onClose, currentUserId, onUpdateJobStatus }) => {
  const [saving, setSaving] = useState(false);
  const [unsaving, setUnsaving] = useState(false);
  const [applying, setApplying] = useState(false);
  const [unapplying, setUnapplying] = useState(false);

  console.log("============>", currentUserId);

  const isSaved = job.save_jobs_applications ? job.save_jobs_applications.some(save => save.employee_id === currentUserId) : false;
  const isApplied = job.applied_by ? job.applied_by.some(application => application.employee_id === currentUserId) : false;

  const handleApply = async () => {
    if (!currentUserId) {
      toast.error("Please log in to continue.");
      return;
    }
    setApplying(true);
    try {
      const response = await axios.post('https://api.rightships.com/employee/apply_job', {
        employee_id: currentUserId,
        application_id: job.application_id,
        company_id: job.company_id
      });
      if (response.data.code == 200) {
        toast.success('Successfully applied for the job');
        onUpdateJobStatus({
          ...job,
          applied_by: [...(job.applied_by || []), { employee_id: currentUserId }]
        });
      } else {
        toast.error('Failed to apply for the job');
      }
    } catch (error) {
      toast.error(`An error occurred while applying: ${error.message}`);
    } finally {
      setApplying(false);
    }
  };

  const handleUnapply = async () => {
    if (!currentUserId) {
      toast.error("Please log in to continue.");
      return;
    }
    setUnapplying(true);
    try {
      const response = await axios.post('https://api.rightships.com/employee/unapply', {
        employee_id: currentUserId,
        application_id: job.application_id,
        company_id: job.company_id
      });
      if (response.data.code == 200) {
        toast.success('Successfully unapplied from the job');
        onUpdateJobStatus({
          ...job,
          applied_by: job.applied_by.filter(application => application.employee_id !== currentUserId)
        });
      } else {
        toast.error('Failed to unapply from the job');
      }
    } catch (error) {
      toast.error(`An error occurred while unapplying: ${error.message}`);
    } finally {
      setUnapplying(false);
    }
  };

  const handleSave = async () => {
    if (!currentUserId) {
      toast.error("Please log in to continue.");
      return;
    }
    setSaving(true);
    try {
      const response = await axios.post('https://api.rightships.com/employee/save_jobs', {
        employee_id: currentUserId,
        application_id: job.application_id,
        company_id: job.company_id
      });
      if (response.data.code == 200) {
        toast.success('Successfully saved the job');
        onUpdateJobStatus({
          ...job,
          save_jobs_applications: [...(job.save_jobs_applications || []), { employee_id: currentUserId }]
        });
      } else {
        toast.error('Failed to save the job');
      }
    } catch (error) {
      toast.error(`An error occurred while saving: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleUnsave = async () => {
    if (!currentUserId) {
      toast.error("Please log in to continue.");
      return;
    }
    setUnsaving(true);
    try {
      const response = await axios.post('https://api.rightships.com/employee/unsave', {
        employee_id: currentUserId,
        application_id: job.application_id,
        company_id: job.company_id
      });
      if (response.data.code == 200) {
        toast.success('Successfully unsaved the job');
        onUpdateJobStatus({
          ...job,
          save_jobs_applications: job.save_jobs_applications.filter(save => save.employee_id !== currentUserId)
        });
      } else {
        toast.error('Failed to unsave the job');
      }
    } catch (error) {
      toast.error(`An error occurred while unsaving: ${error.message}`);
    } finally {
      setUnsaving(false);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg overflow-y-auto z-50"
    >
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Job Details</h2>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <FiX className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div className="p-6">
        {companyDetails ? (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Company Details</h3>
              <div className="space-y-2">
                {companyDetails.company_name && (
                  <p className="text-gray-700"><span className="font-medium">Name:</span> {companyDetails.company_name}</p>
                )}
                {companyDetails.license_rpsl && (
                  <p className="text-gray-700"><span className="font-medium">RPSL:</span> {companyDetails.license_rpsl}</p>
                )}
                {companyDetails.mobile_no && (
                  <p className="text-gray-700"><span className="font-medium">Contact:</span> {companyDetails.mobile_no}</p>
                )}
                {companyDetails.email && (
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {companyDetails.email}</p>
                )}
                {typeof companyDetails.verified === 'boolean' && (
                  <p className="text-gray-700 flex items-center">
                    <span className="font-medium mr-2">Verified:</span> 
                    {companyDetails.verified ? 
                      <FiCheckCircle className="text-green-500 w-5 h-5" /> : 
                      <FiXCircle className="text-red-500 w-5 h-5" />
                    }
                  </p>
                )}
                {companyDetails.website_url && (
                  <a 
                    href={companyDetails.website_url} 
                    className="text-blue-600 hover:underline break-all"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {companyDetails.website_url}
                  </a>
                )}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Job Information</h3>
              <div className="space-y-2">
                {job.hiring_for && job.hiring_for.length > 0 && (
                  <p className="text-gray-700"><span className="font-medium">Hiring For:</span> {job.hiring_for.join(', ')}</p>
                )}
                {job.open_positions && job.open_positions.length > 0 && (
                  <p className="text-gray-700"><span className="font-medium">Open Positions:</span> {job.open_positions.join(', ')}</p>
                )}
                {job.description && (
                  <>
                    <p className="text-gray-600 text-sm">Description</p>
                    <p className="text-gray-700">{job.description}</p>
                  </>
                )}
                {job.total_applied !== undefined && (
                  <p className="text-gray-700"><span className="font-medium">Total Applied:</span> {job.total_applied}</p>
                )}
                <div className="flex space-x-4">
                  {isApplied ? (
                    <button
                      className="px-6 py-2 rounded-md font-medium border border-customBlue text-customBlue transition-all hover:bg-customBlue hover:text-white"
                      onClick={handleUnapply}
                      disabled={unapplying}
                    >
                      {unapplying ? 'Unapplying...' : 'Unapply'}
                    </button>
                  ) : (
                    <button
                      className="px-6 py-2 rounded-md font-medium bg-customBlue text-white transition-all hover:bg-customBlue2"
                      onClick={handleApply}
                      disabled={applying}
                    >
                      {applying ? 'Applying...' : 'Apply'}
                    </button>
                  )}
                  {isSaved ? (
                    <button
                      className="px-4 py-2 rounded-lg text-black-700 font-medium hover:bg-blue-200 transition duration-200"
                      onClick={handleUnsave}
                      disabled={unsaving}
                    >
                      {unsaving ? 'Unsaving...' : 'Unsave'}
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition duration-200"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">No details available</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};


const App = () => {
  const [selectedRanks, setSelectedRanks] = useState([]);
  const [selectedVessels, setSelectedVessels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputSearchTerm, setInputSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null); // State for company details

  const [rankOptions, setRankOptions] = useState([]);
  const [shipOptions, setShipOptions] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingJobs, setFetchingJobs] = useState(false);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const user = useSelector(state => state.auth.user);

  // Fetch rank and ship options on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.post('https://api.rightships.com/attributes/get', {});
        if (response.data.code === 200) {
          const attributes = response.data.data;
          const shipAttribute = attributes.find(attr => attr.name.toLowerCase() === 'ships');
          const rankAttribute = attributes.find(attr => attr.name.toLowerCase() === 'rank');

          setShipOptions(shipAttribute ? shipAttribute.values : []);
          setRankOptions(rankAttribute ? rankAttribute.values : []);
        } else {
          setError('Failed to fetch options data.');
        }
      } catch (error) {
        setError('An error occurred while fetching options data.');
      }
    };

    fetchOptions();
  }, []);

  const fetchJobDetails = async (searchTerm) => {
    setFetchingJobs(true);

    const query = {
      "status": "active",
    };

    if (selectedRanks && selectedRanks.length > 0) {
      query.open_positions = { "$exists": true, "$in": selectedRanks };
    }

    if (selectedVessels && selectedVessels.length > 0) {
      query.hiring_for = { '$in': selectedVessels };
    }

    if (searchTerm) {
      query["$or"] = [
        { "open_positions": { "$regex": searchTerm, "$options": "i" } },
        { "hiring_for": { "$regex": searchTerm, "$options": "i" } },
        { "description": { "$regex": searchTerm, "$options": "i" } }
      ];
    }

    query.page = currentPage;
    query.limit = jobsPerPage;

    try {
      const response = await axios.post('https://api.rightships.com/company/application/get', query);
      if (response.data.code === 200) {
        setJobs(response.data.applications);
      } else {
        setError('Failed to fetch job details.');
      }
    } catch (error) {
      setError('An error occurred while fetching job details.');
    } finally {
      setFetchingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobDetails(searchTerm);
    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    fetchJobDetails(searchTerm);
  }, [selectedRanks, selectedVessels]);

  const handleSearchClick = () => {
    fetchJobDetails(inputSearchTerm);
    setSearchTerm(inputSearchTerm);
  };

  const removeSelectedRank = (rank) => {
    setSelectedRanks(prev => prev.filter(item => item !== rank));
  };

  const removeSelectedVessel = (vessel) => {
    setSelectedVessels(prev => prev.filter(item => item !== vessel));
  };

  // Fetch company details when a job card is clicked
  const fetchCompanyDetails = async (job) => {
    try {
      const response = await axios.post('https://api.rightships.com/company/get', {
        company_id: job.company_id
      });
      if (response.data.code === 200) {
        setCompanyDetails(response.data.data[0]);   
      } else {
        setError('Failed to fetch company details.');
      }
    } catch (error) {
      setError('An error occurred while fetching company details.');
    }
  };

  const handleCardClick = async (job) => {
    setSelectedJob(job); // Set the job first to trigger the canvas opening
    await fetchCompanyDetails(job); // Fetch company details and then update the state
  };

  if (loading) {
    return <Loader />;
  }

 const handleUpdateJobStatus = (updatedJob) => {
  setJobs((prevJobs) => prevJobs.map(job => {
    if (job.application_id === updatedJob.application_id) {
      // Make sure you're spreading the correct updated job data here
      return { ...job, ...updatedJob };
    }
    return job;
  }));
};
  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>

              <JobTypeFilter
                selectedTypes={selectedRanks}
                setSelectedTypes={setSelectedRanks}
                options={rankOptions}
                title="Rank"
                onFilterChange={() => fetchJobDetails(searchTerm)}
              />

              <JobTypeFilter
                selectedTypes={selectedVessels}
                setSelectedTypes={setSelectedVessels}
                options={shipOptions}
                title="Vessel Type"
                onFilterChange={() => fetchJobDetails(searchTerm)}
              />
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {/* Show Selected Filters */}
            <div className="mb-4">
              {selectedRanks.map(rank => (
                <span key={rank} className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                  {rank} <button onClick={() => removeSelectedRank(rank)}>x</button>
                </span>
              ))}
              {selectedVessels.map(vessel => (
                <span key={vessel} className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                  {vessel} <button onClick={() => removeSelectedVessel(vessel)}>x</button>
                </span>
              ))}
            </div>

            <div className="flex mb-6">
              <input
                type="text"
                placeholder="Search jobs..."
                className="flex-grow px-4 py-3 rounded-l-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={inputSearchTerm}
                onChange={(e) => setInputSearchTerm(e.target.value)}
              />
              <button
                onClick={handleSearchClick}
                className="px-4 py-3 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition duration-200"
              >
                Search
              </button>
            </div>

            <div className="grid gap-6">
              {fetchingJobs
                ? Array.from({ length: jobsPerPage }).map((_, index) => (
                  <CardLoader key={index} />
                ))
                : jobs.map(job => (
                  <JobCard key={job.application_id} job={job} onCardClick={handleCardClick} currentUserId={user?._id}  onUpdateJobStatus={handleUpdateJobStatus} />
                ))}
            </div>

            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-l-md bg-white text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={jobs.length < jobsPerPage}
                  className="ml-1 px-3 py-2 rounded-r-md bg-white text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedJob && companyDetails && ( // Ensure both selectedJob and companyDetails are present
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
            />
            <JobDetailsCanvas 
            job={selectedJob} 
            companyDetails={companyDetails}
            currentUserId={user?._id} 
            onUpdateJobStatus={handleUpdateJobStatus} 
            onClose={() => setSelectedJob(null)} />
          </>
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default App;



