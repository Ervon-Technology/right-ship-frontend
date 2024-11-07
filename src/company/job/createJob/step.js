import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import StepOne from './stepOne';
// import StepTwo from './stepTwo';
import Preview from './preview';

import { useSelector } from 'react-redux';

const CreateJobStepForm = ({job}) => {
  const [step, setStep] = useState(1);
  const initialData = useRef(job ? {
    ships: job.hiring_for,
    ranks: job.open_positions,
    benefits: [],
    jobDescription: job.description,
    startDate: job.start_date,
    endDate: job.end_date
  } : {
    ships: [],
    ranks: [],
    benefits: [],
    jobDescription: '',
    startDate: '',
    endDate: ''
  });
  const [formData, setFormData] = useState(initialData.current);

  const navigate = useNavigate();
  
  const user = useSelector(state => state.auth.user);

  const [shipOptions, setShipOptions] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // New loading state
  const [company, setCompany]  = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/attributes/get`, {});

        if (response.data && response.data.code === 200) {
          const attributes = response.data.data;
          const shipAttribute = attributes.find(attr => attr.name.toLowerCase() === 'ships');
          const rankAttribute = attributes.find(attr => attr.name.toLowerCase() === 'rank');
        

          const shipData = shipAttribute ? shipAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          const rankData = rankAttribute ? rankAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
       

          setShipOptions(shipData);
          setRankOptions(rankData);
     
          setLoading(false); // Set loading to false once data is fetched
        } else {
          console.error('Failed to fetch attributes:', response.data.msg);
          setError('Failed to fetch attributes.');
          setLoading(false); // Set loading to false even if there's an error
        }
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
        setError('An error occurred while fetching data.');
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchAttributes();
  }, []);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/company/get`, {company_id: user.company_id});

        if (response.data && response.data.code === 200) {
     
          setCompany(response.data.data[0]);
          setLoading(false); // Set loading to false once data is fetched
        } else {
          console.error('Failed to fetch attributes:', response.data.msg);
          setError('Failed to fetch attributes.');
          setLoading(false); // Set loading to false even if there's an error
        }
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
        setError('An error occurred while fetching data.');
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchAttributes();
  }, [user.company_id]);

  const handleInputChange = (input) => (value) => {
    setFormData({ ...formData, [input]: value });
  };

  const getChangedFields = (initial, current) => {
    const changes = {};
    Object.keys(current).forEach(key => {
      if (current[key] !== initial[key]) {
        changes[key] = current[key];
      }
    });
    return changes;
  };

  const handlePublish = async () => {
    try {
      // Prepare the data in the format required by the API
      const requestData = {
        company_id: user.company_id,
        rspl_no: company.license_rpsl,
        company_name: company.company_name,
        hiring_for: formData.ships,
        open_positions: formData.ranks,
        description: formData.jobDescription,
        mobile_no: user.mobile_no,
        email: null,
        start_date: formData.startDate,
        end_date: formData.endDate,
        companyLogo: company.companyLogo
      };


      const changedFields = getChangedFields(initialData.current, formData);
      const endpoint = job && Object.keys(changedFields).length > 0
      ? '/company/application/edit'
      : '/company/application/create';
      const response = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        ...requestData,
        ...changedFields,
        ...(job ? { application_id: job.application_id } : {}) 
      });

      // Handle the response
      if (response.status === 200) {
        alert(`Job successfully ${job ? 'updated' : 'created'}!`);
        navigate('/post/job', { state: { message: `Job successfully ${job ? 'updated' : 'created'}!`  } }); 
      } else {
        console.error('Failed to publish job:', response.data);
        alert('Failed to publish job.');
      }
    } catch (error) {
      console.error(`Error while ${job ? 'updating' : 'creating'} job:`, error);
      alert(`An error occurred while ${job ? 'updating' : 'creating'} the job.`);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading form data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  switch (step) {
    case 1:
      return (
        <div className='flex'>
            <div className="w-9/12 p-6">
              <StepOne
                nextStep={nextStep}
                shipDatas={shipOptions}
                rankDatas={rankOptions}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </div> 
          </div>
      );
    case 2:
      return (
        <div className='flex'>
        <div className="w-9/12 p-6">
    <Preview
      formData={formData}
      prevStep={prevStep}
      handlePublish={handlePublish}
    />
    </div> 
      </div>
      );
   
    default:
      return <div>Invalid Step</div>;
  }
};

export default CreateJobStepForm;
