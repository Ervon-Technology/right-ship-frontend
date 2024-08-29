import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import StepOne from './stepOne';
import StepTwo from './stepTwo';
import Preview from './preview';

import { useSelector, useDispatch } from 'react-redux';

const CreateJobStepForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    ships: [],
    ranks: [],
    benefits: [],
    jobDescription: '',
  });

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
        const response = await axios.post('https://api.rightships.com/attributes/get', {});

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
        const response = await axios.post('https://api.rightships.com/company/get', {company_id: user.company_id});

        if (response.data && response.data.code === 200) {
     
          setCompany(response.data.data[0]);
          console.log("=========>", response);
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
        email: null
      };



      // Make the API request
      const response = await axios.post('https://api.rightships.com/company/application/create', requestData, {
      
      });

      // Handle the response
      if (response.status === 200) {
        console.log('Job successfully published:', response.data);
        alert('Job successfully published!');
        navigate('/post/job', { state: { message: 'Job successfully created!' } }); 
      } else {
        console.error('Failed to publish job:', response.data);
        alert('Failed to publish job.');
      }
    } catch (error) {
      console.error('Error while publishing job:', error);
      alert('An error occurred while publishing the job.');
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
            <div className="w-3/12 bg-white h-100"></div> 
          </div>
      );
    case 2:
      return (
        <div className='flex'>
            <div className="w-9/12 p-6">
        <StepTwo
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          handleInputChange={handleInputChange}
        />
          </div> 
            <div className="w-3/12 bg-white h-100"></div> 
          </div>
      );
    case 3:
      return (
        <div className='flex'>
            <div className="w-9/12 p-6">
        <Preview
          formData={formData}
          prevStep={prevStep}
          handlePublish={handlePublish}
        />
        </div> 
            <div className="w-3/12 bg-white h-100"></div> 
          </div>
      );
    default:
      return <div>Invalid Step</div>;
  }
};

export default CreateJobStepForm;
