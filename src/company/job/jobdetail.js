import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import ShareComponent from '../../component/shareComponent';
import { Helmet } from 'react-helmet';

const JobDetail = () => {

    const { id } = useParams(); // Get the application ID from the URL
    const [job, setJob] = useState(null);
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        const fetchJobDetail = async () => {

            try {

                const requestData = {
                    company_id: user.company_id, // Replace this with dynamic company_id if available
                    application_id: id,
                };

                const response = await axios.post(`${process.env.REACT_APP_API_URL}/company/application/get`, requestData);
                if (response.data.code === 200) {
                    setJob(response.data.applications[0]); // Assuming the response contains a list of applications
                    setLoading(false);
                } else {
                    setError('Failed to fetch job details.');
                    setLoading(false);
                }

            } catch (error) {
                setError('An error occurred while fetching job details.', error);
                setLoading(false);
            }
        };

        fetchJobDetail();
    }, [id]);

    useEffect(() => {
        const fetchCompanyDetail = async () => {

            try {
                const requestData = {
                    company_id: user.company_id,
                };

                const response = await axios.post(`${process.env.REACT_APP_API_URL}/company/get`, requestData);

                if (response.data.code === 200) {
                    setCompany(response.data.data);
                    setLoading(false);
                } else {
                    setError('Failed to fetch job details.');
                    setLoading(false);
                }

                return true;
            } catch (error) {
                setError('An error occurred while fetching job details.', error);
                setLoading(false);
            }
        };

        fetchCompanyDetail();
    }, [user.company_id]);



    if (loading || !job) {
        return <div>Loading job details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const jobDescription = `Apply now for the ${job.hiring_for.join(', ')} position at Right Ships!`;
    const imageUrl = "/public/logo.png"; // Image URL
    const jobUrl = window.location.href;
    return (
        <div>
            <Helmet>
                <meta property="og:title" content={job.hiring_for.join(', ')} />
                <meta property="og:description" content={jobDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={jobUrl} />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={job.hiring_for.join(', ')} />
                <meta name="twitter:description" content={jobDescription} />
                <meta name="twitter:image" content={imageUrl} />
            </Helmet>

            <div className='p-6'>
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <div className='flex flex-row justify-between'>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{job.hiring_for.join(', ')}</h1>
                        <ShareComponent url={jobUrl} title={`${job.open_positions.join(', ')}`} description={jobDescription}/>
                    </div>

                    <div className="text-gray-700">
                        <p className="text-lg font-medium">Company Name: <span className="font-normal">{job.company_name}</span></p>
                        <p className="text-lg font-medium">Mobile No: <span className="font-normal">{job.mobile_no}</span></p>
                        <p className="text-lg font-medium">Open Positions: <span className="font-normal">{job.open_positions.join(', ')}</span></p>
                        <p className="text-lg font-medium">Status: <span className="font-normal">{job.status}</span></p>
                        <p className="text-lg font-medium">Posted On: <span className="font-normal">{new Date(job.created_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
                        {job.description && (
                            <p className="mt-6 text-base text-gray-600">{job.description}</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JobDetail;
