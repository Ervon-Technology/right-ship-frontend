import React, { useState } from 'react';
import './Job_Dashboard.css';
import { Share2, Bookmark, Flag } from 'lucide-react';

const dummyJobs = [
    {
        id: 1,
        title: '2 Engineer',
        company: 'Admiral Marine Services Pvt. Ltd.',
        validTill: '28/05/2026',
        postedDate: 'Today',
        phone: '+91 12345 67890',
        email: 'xyz@gmail.com',
        shipTypes: ['Bulk Carrier', 'Tanker', 'Fishing vessel', 'Passenger Ship'],
        ranks: ['2nd Officer', '2.4Engg'],
        benefits: ['Joining Bonus', 'Family Insurance', 'Medical Insurance'],
        description: `Greetings from "VR MARITIME" RPSL/MUM/199 - (Validity: 19.07.2026)\n\nRequired below rank for our Demolition:\n\n1. 2nd Officer\n2. 2.4Engg\n\nJoining Date: Immediate joining (open till 24/07/2024)\n\nWe Offer:\n* Good Salary\n* Timely Relief\n* Timely Wages\n* Internet Facility 24/7\n* Maintain High Safety Standards On Vessel.\n\nInterested officers please share your CV to what's app 9082934804/8657496804 (Vikas Vishwakarma)`,
    },
    {
        id: 2,
        title: '3 Engineer',
        company: 'Oceanic Services Pvt. Ltd.',
        validTill: '15/04/2025',
        postedDate: 'Yesterday',
        phone: '+91 98765 43210',
        email: 'abc@oceanic.com',
        shipTypes: ['Cargo Ship', 'Tanker'],
        ranks: ['3rd Officer', '2nd Engg'],
        benefits: ['Health Insurance', 'Family Allowance'],
        description: `Looking for experienced 3rd Engineer for our Cargo and Tanker ships. Immediate joining required.\n\nBenefits include Health Insurance and Family Allowance. Competitive salary offered.`,
    },
    {
        id: 3,
        title: 'Chief Officer',
        company: 'Global Maritime Solutions Ltd.',
        validTill: '30/09/2025',
        postedDate: '3 days ago',
        phone: '+1 234 567 8901',
        email: 'info@globalmaritime.com',
        shipTypes: ['Container Ship', 'Ro-Ro Vessel', 'LNG Carrier'],
        ranks: ['Chief Officer', 'Master'],
        benefits: ['Competitive Salary', 'Paid Vacation'],
        description: `Global Maritime Solutions Ltd. is hiring a Chief Officer for Container Ships, Ro-Ro Vessels, and LNG Carriers. Competitive salary and paid vacation benefits. Immediate joining preferred.`,
    },
    {
        id: 4,
        title: 'Electrical Engineer',
        company: 'Neptune Marine Services Inc.',
        validTill: '12/12/2024',
        postedDate: '1 week ago',
        phone: '+61 9876 5432',
        email: 'hr@neptunemarine.com',
        shipTypes: ['Offshore Support Vessel', 'Dredger'],
        ranks: ['Electrical Engineer', 'ETO'],
        benefits: ['Housing Allowance', 'Medical Insurance'],
        description: `Neptune Marine Services Inc. is seeking an Electrical Engineer for Offshore Support Vessels and Dredgers. Housing allowance and medical insurance provided.`,
    },
];

const JobDashboard = () => {
    const [jobs, setJobs] = useState(dummyJobs);
    const [selectedJob, setSelectedJob] = useState(dummyJobs[0]);

    const handleJobClick = (job) => {
        setSelectedJob(job.id === selectedJob?.id ? null : job);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-4">
                    <h1 className="text-sm text-customBlue2 font-semibold">Find the jobs you're looking for</h1>
                </div>
                <div className="flex justify-center mb-4">
                    <div className="flex border rounded-lg overflow-hidden w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company"
                            className="flex-1 px-4 py-2 border-r focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Search by Company name"
                            className="flex-1 px-4 py-2 focus:outline-none"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white">Search</button>
                    </div>
                </div>
                <div className="border-t-2 border-blue-200 mb-4"></div>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 pr-0 md:pr-4 mb-4 md:mb-0">
                        {jobs.map(job => (
                            <div
                                key={job.id}
                                className={`relative p-4 mb-4 border rounded-lg cursor-pointer ${selectedJob && selectedJob.id === job.id ? 'border-customBlue border-2' : ''}`}
                                onClick={() => handleJobClick(job)}
                            >
                                <span className='flex justify-between'><h3 className="font-bold">{job.title}</h3> <Bookmark size={16}/></span>
                                <p>{job.company}</p>
                                <p className="text-sm text-gray-600">Valid till {job.validTill}</p>
                                {selectedJob && selectedJob.id === job.id && (
                                    <div className="triangle-right"></div>
                                )}
                                <div className="border-t border-gray-300 mt-2"></div>
                                <ul className="list-square-left mt-3 text-sm">
                                    {job.shipTypes.map((type, index) => (
                                        <li key={index}>{type}</li>
                                    ))}
                                </ul>
                                <span className='flex justify-between'><p className="text-sm mt-4 text-gray-600">{job.postedDate}</p><Share2 size={16} className='mt-5' /></span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-2/3 p-4 bg-white border border-blue-400 rounded-lg">
                        {selectedJob && (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <div className='py-4 px-2'>
                                        <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
                                        <p className="text-gray-900 font-medium">{selectedJob.company}</p>
                                        <p className="text-sm text-gray-600">Valid till {selectedJob.validTill}</p>
                                    </div>
                                    <div className="md:block ml-24">
                                        <p className='text-sm'>Phone: <span className='font-semibold text-base'>{selectedJob.phone}</span></p>
                                        <p className='text-sm'>Email: <span className='font-semibold text-base'>{selectedJob.email}</span></p>
                                    </div>
                                    <div className='px-12'>
                                        <button className="bg-customBlue hover:bg-customBlue2 text-white font-bold py-3 px-6 rounded-lg">Quick Apply</button>
                                    </div>
                                </div>
                                <div className="block md:hidden mb-4">
                                    <p>Phone: {selectedJob.phone}</p>
                                    <p>Email: {selectedJob.email}</p>
                                </div>
                                <div className="mb-4 py-4 px-2">
                                    <h4 className="font-bold text-customBlue2 text-sm bg-blue-100 w-40 ps-7 py-1.5 rounded mb-2">Job description</h4>
                                    <div className="flex justify-between mb-4">
                                        <div className='my-3 mx-7'>
                                            <h5 className="font-bold">Ship Type</h5>
                                            <ul className="list-square-right text-sm mt-3">
                                                {selectedJob.shipTypes.map((type, index) => (
                                                    <li className='-mt-1.5' key={index}>{type}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className='my-3 mx-7'>
                                            <h5 className="font-bold">Rank</h5>
                                            <ul className="list-square-right text-sm mt-3 ">
                                                {selectedJob.ranks.map((rank, index) => (
                                                    <li className='-mt-1.5' key={index}>{rank}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className='my-3'>
                                            <h5 className="font-bold">Benefits</h5>
                                            <ul className='flex flex-wrap w-80 text-sm mt-2'>
                                                {selectedJob.benefits.map((benefit, index) => (
                                                    <li className='bg-gray-300 font-semibold px-2 py-0.5 me-2 mb-1.5' key={index}>{benefit}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <pre className="whitespace-pre-wrap font-poppins text-sm font-semibold my-3 mx-7 leading-loose" >{selectedJob.description}</pre>
                                </div>
                                <div className="border-t-2 border-slate-100 mt-10 mb-4"></div>
                                <div className="flex justify-between items-center ">
                                    <p className='text-sm text-slate-400 my-3 mx-9'>Job ID: 81659885</p>
                                    <div className='flex'>
                                        <button className="mr-2 bg-white border border-customBlue hover:bg-customBlue2 hover:text-white w-32 text-customBlue font-semibold py-2 px-4 rounded-md flex justify-evenly"><Bookmark size={20} className='mt-1'/>Save</button>
                                        <button className="bg-white border border-customBlue hover:bg-customBlue2 hover:text-white w-32 text-customBlue font-semibold py-2 px-4 rounded-md flex justify-evenly"><Flag size={20} className='mt-1'/>Report</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="mr-2 px-4 py-2 bg-gray-200 rounded">&lt;</button>
                    <span className="px-4 py-2">Page 1 of 25</span>
                    <button className="ml-2 px-4 py-2 bg-gray-200 rounded">&gt;</button>
                </div>
            </div>
        </div>
    );
}

export default JobDashboard;
