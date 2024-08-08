import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';

const initialJobsData = {
    savedJobs: [],
    appliedJobs: [],
    bookmarkedJobs: [],
};

const JobDashboard = () => {
    const [jobsData, setJobsData] = useState(initialJobsData);
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 12;

    useEffect(() => {
        fetchJobsData();
    }, []);

    const fetchJobsData = async () => {
        try {
            const response = await fetch('https://api.rightships.com/company/application/get', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Add your request body if needed
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Fetched Data:", result); // Log fetched data

                const data = result.applications || [];

                const formattedData = data.map(job => ({
                    id: job.application_id || 'undefined-id', // Log default value if id is missing
                    companyName: job.company_name || '',
                    rpslNo: job.rspl_no || '',
                    hiringFor: job.hiring_for || '',
                    openPositions: job.open_positions || [],
                    src: job.website_url|| '',
                    contact: {
                        number: job.mobile_no || '',
                        email: job.email || '',
                    },
                    benefits: job.benifits || [],
                    description: job.description || '',
                    applied: job.applied || false,
                    bookmarked: job.bookmarked || false,
                    postedDate: job.created_date || '',
                }));

                setJobsData(prevJobsData => ({ ...prevJobsData, savedJobs: formattedData }));
            } else {
                console.error('Failed to fetch job data');
            }
        } catch (error) {
            console.error('Error fetching job data:', error);
        }
    };

    const paginatedJobs = jobsData.savedJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    const toggleApply = (jobId) => {
        setJobsData(prevJobsData => {
            const savedJobs = [...prevJobsData.savedJobs];
            const appliedJobs = [...prevJobsData.appliedJobs];
            const jobIndex = savedJobs.findIndex(job => job.id === jobId);

            if (jobIndex !== -1) {
                const job = savedJobs[jobIndex];
                job.applied = !job.applied;

                if (job.applied) {
                    appliedJobs.push(job);
                } else {
                    const appliedJobIndex = appliedJobs.findIndex(j => j.id === jobId);
                    if (appliedJobIndex !== -1) {
                        appliedJobs.splice(appliedJobIndex, 1);
                    }
                }

                savedJobs[jobIndex] = job;
            }

            return { ...prevJobsData, savedJobs, appliedJobs };
        });
    };

    const toggleBookmark = (jobId) => {
        setJobsData(prevJobsData => {
            const savedJobs = [...prevJobsData.savedJobs];
            const bookmarkedJobs = [...prevJobsData.bookmarkedJobs];
            const jobIndex = savedJobs.findIndex(job => job.id === jobId);

            if (jobIndex !== -1) {
                const job = savedJobs[jobIndex];
                job.bookmarked = !job.bookmarked;

                if (job.bookmarked) {
                    bookmarkedJobs.push(job);
                } else {
                    const bookmarkedJobIndex = bookmarkedJobs.findIndex(j => j.id === jobId);
                    if (bookmarkedJobIndex !== -1) {
                        bookmarkedJobs.splice(bookmarkedJobIndex, 1);
                    }
                }

                savedJobs[jobIndex] = job;
            }

            return { ...prevJobsData, savedJobs, bookmarkedJobs };
        });
    };

    const handleJobClick = (job) => {
        console.log("Clicked Job:", job); // Log full job object
        console.log("Clicked Job ID:", job.id); // Log job id
        setSelectedJob(selectedJob?.id === job.id ? null : job);
    };
    

    const handlePageChange = (direction) => {
        if (direction === 'next') {
            setCurrentPage(prevPage => prevPage + 1);
        } else if (direction === 'prev') {
            setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
        }
    };

    return (
        <div>
            <div className='w-full h-20 bg-white'></div>
            <div className="min-h-screen bg-gray-200 p-3">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:max-w-md pr-3 h-screen overflow-y-scroll" style={{ height: 'calc(186vh - 100px)' }}>
                        {paginatedJobs.map(job => (
                            <div
                                key={job.id}
                                className={`relative p-4 mb-4 border bg-white cursor-pointer ${selectedJob && selectedJob.id === job.id ? 'border-customBlue border' : ''}`}
                                onClick={() => handleJobClick(job)}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p>{job.companyName} | {job.rpslNo}</p>
                                        <p className="font-bold">Hiring For</p>
                                        <p>{job.hiringFor}</p>
                                        <p className="font-bold mt-2">Open Positions</p>
                                        <p>{job.openPositions.join('  ')}</p>
                                    </div>
                                </div>
                                <div className="flex mt-2 md:mt-0 items-center space-x-2">
                                    <button
                                        className={`w-28 mt-2 py-1.5 ${job.applied ? 'border-2 border-customBlue text-customBlue font-bold rounded-md' : 'border-2 border-customBlue text-customBlue font-bold rounded-md'}`}
                                        onClick={(e) => { e.stopPropagation(); toggleApply(job.id); }}
                                    >
                                        {job.applied ? 'Unapply' : 'Apply'}
                                    </button>
                                    <button
                                        className='mt-1'
                                        onClick={(e) => { e.stopPropagation(); toggleBookmark(job.id); }}
                                    >
                                        <Bookmark size={22} className={job.bookmarked ? 'fill-current text-[#1F5882]' : 'stroke-current text-[#1F5882]'} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handlePageChange('prev')}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange('next')}
                                disabled={paginatedJobs.length < jobsPerPage}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:max-w-3xl px-3">
    {selectedJob && (
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <div className="flex flex-col mb-6">
                <div className="flex">
                    <img src={selectedJob.src} alt="Company Profile" className="w-32 h-32 object-cover rounded-md" />
                    <div className="ml-4 flex-grow">
                        <h2 className="text-2xl font-bold text-gray-800">{selectedJob.companyName}</h2>
                        <p className="text-black mt-2">{selectedJob.rpslNo}</p>
                        <p className="text-gray-500 text-xs mt-1">Posted on {selectedJob.postedDate}</p>
                        <div className="flex mt-4 space-x-4">
                            <button
                                className={`px-8 py-2 ${selectedJob.applied ? 'bg-gray-400' : 'bg-customBlue'} text-white font-bold rounded-md`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleApply(selectedJob.id);
                                }}
                            >
                                {selectedJob.applied ? 'Applied' : 'Apply'}
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark(selectedJob.id);
                                }}
                                className={`p-2 rounded-full ${selectedJob.bookmarked ? 'bg-[#1F5882] text-white' : 'bg-white border border-[#1F5882] text-[#1F5882]'}`}
                            >
                                <Bookmark size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 my-6"></div>
            <div className="my-6">
                <p className="font-semibold text-xl">Contact</p>
                <div className="flex flex-col sm:flex-row justify-between mt-2">
                    <p className="text-sm">Company Number:<br />{selectedJob.contact.number}</p>
                    <p className="text-sm mt-2 sm:mt-0">Email:<br />{selectedJob.contact.email}</p>
                </div>
            </div>
            <div className="border-t border-gray-300 my-6"></div>
            <div className="flex flex-col sm:flex-row justify-between my-6">
                <div>
                    <p className="font-semibold text-xl">Hiring For</p>
                    <p className="text-sm mt-2">{selectedJob.hiringFor}</p>
                </div>
                <div className="border-l-2 border-gray-300 my-6 sm:my-0"></div>
                <div>
                    <p className="font-semibold text-xl">Open Positions</p>
                    <div className="grid grid-cols-1 gap-1 mt-2">
                        {selectedJob.openPositions.map((position, index) => (
                            <p key={index} className="text-sm">{position}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 my-6"></div>
            <div className="my-6">
                <p className="font-semibold text-xl">Benefits</p>
                <ul className="list-disc pl-5 mt-2">
                    {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm">{benefit}</li>
                    ))}
                </ul>
            </div>
            <div className="border-t border-gray-300 my-6"></div>
            <div className="my-6">
                <p className="font-semibold text-xl">Description</p>
                <p className="text-sm mt-2">{selectedJob.description}</p>
            </div>
        </div>
    )}
                    </div>
                    <div className="w-full md:max-w-xs bg-white"></div>
                </div>
            </div>
        </div>
    );
};

export default JobDashboard;
