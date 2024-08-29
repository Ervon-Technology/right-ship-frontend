import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../features/authSlice';
import ProfileImage from '../../images/upload.jpg';
import File from '../../images/File img.png';
import axios from 'axios';
import { motion } from 'framer-motion';
import Select from 'react-select';

const EmployeeRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const employeeId = state.employeeId || '';
  const contactInfo = useSelector((state) => state.contact?.contactInfo || '');
  const dispatch = useDispatch();
  const profileFileInputRef = useRef(null);
  const resumeFileInputRef = useRef(null);
  const [copOptions, setCopOptions] = useState([]);
  const [cocOptions, setCocOptions] = useState([]);
  const [shipOptions, setShipOptions] = useState([]);
  const [watchKeepingOptions, setWatchKeepingOptions] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);
  const [vesselExpOptions, setVesselExpOptions] = useState([]);
  const [nationalityOptions, setNationalityOptions] = useState([]); // Nationality options

  const { loading, error } = useSelector((state) => state.employee);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: contactInfo.includes('@') ? contactInfo : '',
    mobile_no: !contactInfo.includes('@') ? contactInfo : '',
    whatsappNumber: '',
    gender: '',
    nationality: '', // Nationality field in Step 3
    dob: '',
    age: '',
    availability: '',
    sid: '',
    usVisa: '',
    appliedRank: '',
    presentRank: '', // Last Rank field in Step 4
    presentVessel: '',
    appliedVessel: '',
    vesselExp: [],
    presentRankExperienceInMonth: '',
    totalSeaExperienceYear: '',
    totalSeaExperienceMonth: '',
    cop: null,
    coc: null,
    watchkeeping: null,
    profile: null,
    resume: null,
    address: {
      country: '',
      state: '',
      city: '',
      address: ''
    },
  });

  const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleFirstNameChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      firstName: capitalizeFirstLetter(value),
    }));
  };

  const handleLastNameChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      lastName: capitalizeFirstLetter(value),
    }));
  };

  const handleDateOfBirthChange = (value) => {
    const today = new Date();
    const selectedDate = new Date(value);

    if (selectedDate > today) {
      toast.error("Date of birth cannot be in the future.");
      return;
    }

    const age = calculateAge(value);

    if (age < 18) {
      toast.error("Age must be at least 18 years.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      dob: value,
      age: age.toString(),
    }));
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleDateOfAvailabilityChange = (value) => {
    const today = new Date();
    const selectedDate = new Date(value);

    if (selectedDate < today) {
      toast.error("Date of availability cannot be in the past.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      availability: value,
    }));
  };

  const handleSeaExperienceChange = (field, value) => {
    if (value < 0) {
      toast.error("Experience cannot be negative.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/attributes/get`, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
          }
        });

        if (response.data && response.data.code === 200) {
          const attributes = response.data.data;

          const copAttribute = attributes.find(attr => attr.name.toLowerCase() === 'cop');
          const cocAttribute = attributes.find(attr => attr.name.toLowerCase() === 'coc');
          const shipAttribute = attributes.find(attr => attr.name.toLowerCase() === 'ships');
          const watchKeepingAttribute = attributes.find(attr => attr.name.toLowerCase() === 'watch keeping');
          const rankAttribute = attributes.find(attr => attr.name.toLowerCase() === 'rank');
          const nationalityAttribute = attributes.find(attr => attr.name.toLowerCase() === 'nationality');

          const copData = copAttribute ? copAttribute.values : [];
          const cocData = cocAttribute ? cocAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          const shipData = shipAttribute ? shipAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          const watchKeepingData = watchKeepingAttribute ? watchKeepingAttribute.values : [];
          const rankData = rankAttribute ? rankAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          const nationalityData = nationalityAttribute ? nationalityAttribute.values.sort((a, b) => a.localeCompare(b)) : [];

          setCopOptions(copData.map(option => ({ value: option, label: option })));
          setCocOptions(cocData.map(option => ({ value: option, label: option })));
          setShipOptions(shipData.map(option => ({ value: option, label: option })));
          setWatchKeepingOptions(watchKeepingData.map(option => ({ value: option, label: option })));
          setRankOptions(rankData.map(option => ({ value: option, label: option })));
          setVesselExpOptions(shipData.map(option => ({ value: option, label: option })));
          setNationalityOptions(nationalityData.map(option => ({ value: option, label: option }))); // Set nationality options
        } else {
          console.error('Failed to fetch attributes:', response.data.msg);
        }
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
      }
    };

    fetchAttributes();
  }, []);

  const steps = [
    'Personal Details',
    'Contact Details',
    'Basic Information',
    'Rank Details',
    'Vessel Details',
    'Experience',
    'Certificates',
    'Upload Resume & Profile Picture'
  ];

  const handleNext = async () => {
    let requiredFields = [];

    if (currentStep === 1) {
      requiredFields = ['firstName', 'lastName', 'dob'];
    }

    if (currentStep === 2) {
      requiredFields = ['email', 'mobile_no', 'whatsappNumber'];
    }

    if (currentStep === 3) {
      requiredFields = ['nationality', 'availability', 'sid', 'usVisa'];
    }

    if (currentStep === 4) {
      requiredFields = ['presentRank', 'appliedRank'];
    }

    if (currentStep === 5) {
      requiredFields = ['presentVessel', 'appliedVessel'];
    }

    if (currentStep === 6) {
      requiredFields = ['totalSeaExperienceYear', 'totalSeaExperienceMonth', 'presentRankExperienceInMonth'];
    }
    if (currentStep === 7) {
      requiredFields = [];
    }

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/employee/update`, {
        employee_id: employeeId,
        ...formData,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Data updated successfully.');

      if (currentStep < steps.length) {
        if (currentStep === 4) {
          // Clear vessel-related fields when moving from Step 4 to Step 5
          setFormData(prevFormData => ({
            ...prevFormData,
            presentVessel: '', 
            appliedVessel: '',
            vesselExp: []
          }));
        }
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    } catch (err) {
      toast.error('Failed to update data.');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVesselExpChange = (selectedOptions) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      vesselExp: selectedOptions.map(option => option.value)
    }));
  };

  const handleFileChange = async (event, type) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      toast.error('Please select a file.');
      return;
    }

    let validFileTypes = [];
    let apiField = '';
    let errorMessage = '';

    if (type === 'profile') {
      validFileTypes = ['image/jpeg', 'image/png'];
      apiField = 'profile';
      errorMessage = 'Invalid file type. Please upload a JPEG or PNG file.';
    } else if (type === 'resume') {
      validFileTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      apiField = 'resume';
      errorMessage = 'Invalid file type. Please upload a PDF, DOC, DOCX, XLS, or XLSX file.';
    }
    if (!validFileTypes.includes(selectedFile.type)) {
      toast.error(errorMessage);
      return;
    }

    const formDataFile = new FormData();
    formDataFile.append('file', selectedFile);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formDataFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (type === 'profile') setUploadingProfile(progress);
          else setUploadingResume(progress);
        },
      });

      const fileUrl = response.data.file_url;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [apiField]: fileUrl,
      }));

      const updatePayload = {
        employee_id: employeeId,
        [apiField]: fileUrl,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/employee/update`, updatePayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success(`${type === 'profile' ? 'Profile photo' : 'Resume'} updated successfully.`);
    } catch (error) {
      console.error('Upload error:', error.response ? error.response.data : error.message);
      toast.error(`Failed to upload ${type === 'profile' ? 'profile photo' : 'resume'}.`);
    } finally {
      if (type === 'profile') setUploadingProfile(false);
      else setUploadingResume(false);
    }
  };

  const triggerFileUpload = (inputRef) => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch(registerUser({
        employee_id: employeeId,
        _id: employeeId,
        ...formData,
      }));

      if (!loading && !error) {
        toast.success('Registration successful!');
        navigate('/jobs');
      }
    } catch (err) {
      toast.error('Failed to submit registration');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <InputField
              label="First Name"
              value={formData.firstName}
              onChange={handleFirstNameChange}
              required
            />
            <InputField
              label="Last Name"
              value={formData.lastName}
              onChange={handleLastNameChange}
              required
            />
            <InputField
              label="Date of Birth"
              value={formData.dob}
              onChange={(value) => handleDateOfBirthChange(value)}
              required
              type="date"
            />
            <InputField
              label="Age"
              value={formData.age}
              onChange={(value) => setFormData((prevFormData) => ({
                ...prevFormData,
                age: value,
              }))}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <InputField
              label="Email"
              value={formData.email}
              onChange={(value) => setFormData((prevFormData) => ({
                ...prevFormData,
                email: value,
              }))}
              required
              type="email"
            />
            <InputField
              label="Mobile Number"
              value={formData.mobile_no}
              onChange={(value) => setFormData((prevFormData) => ({
                ...prevFormData,
                mobile_no: value,
              }))}
              required
            />
            <InputField
              label="WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={(value) => setFormData((prevFormData) => ({
                ...prevFormData,
                whatsappNumber: value,
              }))}
              required
            />
          </>
        );
      case 3:
        return (
          <>
            <div className='mb-8'>
              <label className="block text-gray-700 text-lg font-medium mb-4">Nationality<span className="text-red-500">*</span></label>
              <Select
                label="Nationality"
                value={nationalityOptions.find(option => option.value === formData.nationality)}
                onChange={(selectedOption) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  nationality: selectedOption ? selectedOption.value : '',
                }))}
                options={nationalityOptions}
                required
              />
            </div>
            <InputField
              label="Date of Availability"
              value={formData.availability}
              onChange={(value) => handleDateOfAvailabilityChange(value)}
              required
              type="date"
            />
            <InputField
              label="SID"
              value={formData.sid}
              onChange={(value) => setFormData((prevFormData) => ({
                ...prevFormData,
                sid: value,
              }))}
              required
              type="select"
              options={["Yes", "No"]}
            />
            <InputField
              label="US Visa"
              value={formData.usVisa}
              onChange={(value) => setFormData((prevFormData) => ({
                ...prevFormData,
                usVisa: value,
              }))}
              required
              type="select"
              options={["Yes", "No"]}
            />
          </>
        );
      case 4:
        return (
          <>
            <div className='mb-8'>
              <label className="block text-gray-700 text-lg font-medium mb-4">Last Rank<span className="text-red-500">*</span></label>
              <Select
                label="Last Rank"
                value={rankOptions.find(option => option.value === formData.presentRank)}
                onChange={(selectedOption) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    presentRank: selectedOption ? selectedOption.value : '',
                  }));
                }}
                options={rankOptions}
                required
              />
            </div>
            <div className='mb-8'>
              <label className="block text-gray-700 text-lg font-medium mb-4">Applied Rank<span className="text-red-500">*</span></label>
              <Select
                label="Applied Rank"
                value={rankOptions.find(option => option.value === formData.appliedRank)}
                onChange={(selectedOption) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  appliedRank: selectedOption ? selectedOption.value : '',
                }))}
                options={rankOptions}
                required
              />
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div className='mb-8'>
              <label className="block text-gray-700 text-lg font-medium mb-4">Past Vessel<span className="text-red-500">*</span></label>
              <Select
                label="Past Vessel"
                value={shipOptions.find(option => option.value === formData.presentVessel) || null}
                onChange={(selectedOption) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  presentVessel: selectedOption ? selectedOption.value : '',
                }))}
                options={shipOptions}
                required
                placeholder="Select Past Vessel"
              />
            </div>

            <div className='mb-8'>
              <label className="block text-gray-700 text-lg font-medium mb-4">Applied Vessel<span className="text-red-500">*</span></label>
              <Select
                label="Applied Vessel"
                value={shipOptions.find(option => option.value === formData.appliedVessel) || null}
                onChange={(selectedOption) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  appliedVessel: selectedOption ? selectedOption.value : '',
                }))}
                options={shipOptions}
                required
                placeholder="Select Applied Vessel"
              />
            </div>

            <div className='mb-8'>
              <label className="block text-gray-700 text-lg font-medium mb-4">Exp. Type of Vessels<span className="text-red-500">*</span></label>
              <Select
                isMulti
                name="vesselExp"
                options={vesselExpOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={vesselExpOptions.filter(option => formData.vesselExp.includes(option.value))}
                onChange={handleVesselExpChange}
                placeholder="Select Experience Type of Vessels"
              />
            </div>
          </>
        );
      case 6:
        return (
          <>
            <InputField
              label="Total Sea Experience (Years)"
              value={formData.totalSeaExperienceYear}
              onChange={(value) => handleSeaExperienceChange('totalSeaExperienceYear', value)}
              required
              type="number"
            />
            <InputField
              label="Total Sea Experience (Months)"
              value={formData.totalSeaExperienceMonth}
              onChange={(value) => handleSeaExperienceChange('totalSeaExperienceMonth', value)}
              required
              type="number"
            />
            <InputField
              label="Last Rank Experience (Months)"
              value={formData.presentRankExperienceInMonth}
              onChange={(value) => handleSeaExperienceChange('presentRankExperienceInMonth', value)}
              required
              type="number"
            />
          </>
        )
      case 7:
        return (
          <>
            <div className='mb-8'>
              <label className="block text-gray-700 text-lg font-medium mb-4">COP</label>
              <Select
                label="COP"
                value={copOptions.find(option => option.value === formData.cop)} 
                onChange={(selectedOption) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  cop: selectedOption ? selectedOption.value : '',
                }))}
                options={copOptions}
              />
            </div>

            <div className='mb-8'>
              <label className="block text-gray-700 text-lg font-medium mb-4">COC</label>
              <Select
                label="COC"
                value={cocOptions.find(option => option.value === formData.coc)} 
                onChange={(selectedOption) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  coc: selectedOption ? selectedOption.value : '',
                }))}
                options={cocOptions}
              />
            </div>
            <div className='mb-8'>
              <label className="block text-gray-700 text-lg font-medium mb-4">Watch keeping</label>
              <Select
                label="Watchkeeping"
                value={watchKeepingOptions.find(option => option.value === formData.watchkeeping)} 
                onChange={(selectedOption) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  watchkeeping: selectedOption ? selectedOption.value : '',
                }))}
                options={watchKeepingOptions}
              />
            </div>

          </>
        )
      case 8:
        return (
          <>
            <div
              className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
              onClick={() => triggerFileUpload(profileFileInputRef)}
            >
              <div className="py-8 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Upload your Photo</h3>
                <p className="text-sm text-gray-500">Receive 2x job offers after uploading</p>
                <img className="mx-auto mt-3" src={ProfileImage} alt="Profile Upload" height={80} width={80} />
                <input
                  type="file"
                  className="hidden"
                  ref={profileFileInputRef}
                  onChange={(e) => handleFileChange(e, 'profile')}
                  accept="image/jpeg, image/png"
                />
                {uploadingProfile && (
                  <p className="text-blue-500">{`Uploading: ${uploadingProfile}%`}</p>
                )}
              </div>
            </div>
            <div
              className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer mt-4"
              onClick={() => triggerFileUpload(resumeFileInputRef)}
            >
              <div className="py-8 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Upload your Resume!</h3>
                <p className="text-sm text-gray-500">Receive 2x job offers after uploading</p>
                <img className="mx-auto" src={File} alt="Resume Upload" height={80} width={80} />
                <input
                  type="file"
                  className="hidden"
                  ref={resumeFileInputRef}
                  onChange={(e) => handleFileChange(e, 'resume')}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
                {uploadingResume && (
                  <p className="text-blue-500">{`Uploading: ${uploadingResume}%`}</p>
                )}
                
              </div>
            </div>
          </>
        )
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-xl"
      >
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 text-white p-8 rounded-t-xl">
          <h2 className="text-3xl font-semibold">{steps[currentStep - 1]}</h2>
          <p className="mt-2 text-sm">{`Step ${currentStep} of ${steps.length}`}</p>
        </div>

        <div className="p-8">
          {renderStep()}

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {currentStep < steps.length ? 'Next' : 'Submit'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, value, onChange, required, type = 'text', options }) => (
  <div className="relative mb-6">
    <label className="block text-gray-700 text-lg font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'select' ? (
      <select
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    )}
  </div>
);

export default EmployeeRegistration;
