import React, { useState, useEffect } from 'react';
import { FaRegEdit, FaEdit, FaShareSquare } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';
import EditModal from './EditModal';

const EmployeeProfile = () => {
  const [profileImage, setProfileImage] = useState("https://i2.pickpik.com/photos/711/14/431/smile-profile-face-male-preview.jpg");
  const [profileData, setProfileData] = useState({ name: '', presentRank: '', appliedRank: '' });
  const [file, setFile] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValue, setEditValue] = useState(''); // Initialize as an empty string
  const [isDropdown, setIsDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [sectionData, setSectionData] = useState({
    appliedVessel: null,
    presentVessel: null,
    vesselExp: [],
    appliedRank: null,
    presentRank: null,
    email: null,
    mobile_no: null,
    whatsappNumber: null,
    gender: null,
    country: null,
    dob: null,
    age: null,
    presentRankExperienceInMonth: null,
    totalSeaExperienceYear: null,
    totalSeaExperienceMonth: null,
    cop: null,
    coc: null,
    watchkeeping: null,
    sid: null,
    usVisa: null,
    availability: null,
    nationality: null,
    height: null,
    weight: null,
    bmi: null
  });

  const [copOptions, setCopOptions] = useState([]);
  const [cocOptions, setCocOptions] = useState([]);
  const [shipOptions, setShipOptions] = useState([]);
  const [watchKeepingOptions, setWatchKeepingOptions] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);
  const [vesselExpOptions, setVesselExpOptions] = useState([]);
  const sidOptions = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }];
  const usVisaOptions = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }];
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const authState = useSelector((state) => state.auth);
  const employeeId = authState?.user?._id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee/get`, {
          employee_id: employeeId,
          page: 1,
          limit: 10
        });

        const result = response.data.data[0];

        const calculateAge = (dob) => {
          const birthDate = new Date(dob);
          const ageDifMs = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDifMs);
          return Math.abs(ageDate.getUTCFullYear() - 1970);
        };

        const calculateBMI = (height, weight) => {
          if (height && weight) {
            return (weight / (height * height)).toFixed(2);
          }
          return null;
        };

        const age = result?.dob ? calculateAge(result.dob) : null;
        const bmi = calculateBMI(result?.height, result?.weight);

        setProfileImage(result?.profile || profileImage);
        setProfileData({
          name: result?.firstName + ' ' + result?.lastName || '',
          presentRank: result?.presentRank || '',
          appliedRank: result?.appliedRank || ''
        });

        setSectionData({
          appliedVessel: result?.appliedVessel || null,
          presentVessel: result?.presentVessel || null,
          vesselExp: result?.vesselExp || [],
          appliedRank: result?.appliedRank || null,
          presentRank: result?.presentRank || null,
          email: result?.email || null,
          mobile_no: result?.mobile_no || null,
          whatsappNumber: result?.whatsappNumber || null,
          gender: result?.gender || null,
          country: result?.country || null,
          dob: result?.dob || null,
          age: age,
          presentRankExperienceInMonth: result?.presentRankExperienceInMonth || null,
          totalSeaExperienceYear: result?.totalSeaExperienceYear || null,
          totalSeaExperienceMonth: result?.totalSeaExperienceMonth || null,
          cop: result?.cop || null,
          coc: result?.coc || null,
          watchkeeping: result?.watchkeeping || null,
          sid: result?.sid || null,
          usVisa: result?.usVisa || null,
          availability: result?.availability || null,
          nationality: result?.nationality || null,
          height: result?.height || null,
          weight: result?.weight || null,
          bmi: bmi
        });

        if (result?.resume) {
          setFile({ name: "Resume", url: result.resume });
        }

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchAttributes = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/attributes/get`, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          }
        });
    
        if (response.data && response.data.code === 200) {
          const attributes = response.data.data;
    
          // Fetching attributes based on the names
          const copAttribute = attributes.find(attr => attr.name.toLowerCase().trim() === 'cop');
          const cocAttribute = attributes.find(attr => attr.name.toLowerCase().trim() === 'coc');
          const shipAttribute = attributes.find(attr => attr.name.toLowerCase().trim() === 'ships');
          const watchKeepingAttribute = attributes.find(attr => attr.name.toLowerCase().trim() === 'watch keeping');
          const rankAttribute = attributes.find(attr => attr.name.toLowerCase().trim() === 'rank');
          
          // Extracting values from attributes
          const copData = copAttribute ? copAttribute.values : [];
          const cocData = cocAttribute ? cocAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          const shipData = shipAttribute ? shipAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          const watchKeepingData = watchKeepingAttribute ? watchKeepingAttribute.values : [];
          const rankData = rankAttribute ? rankAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          
          // Setting the options in your state with both API and existing data
          setCopOptions(copData.concat(sectionData.cop).map(option => ({ value: option, label: option })));
          setCocOptions(cocData.concat(sectionData.coc).map(option => ({ value: option, label: option })));
          setShipOptions(shipData.map(option => ({ value: option, label: option })));
          setWatchKeepingOptions(watchKeepingData.concat(sectionData.watchkeeping).map(option => ({ value: option, label: option })));
          setRankOptions(rankData.map(option => ({ value: option, label: option })));
          setVesselExpOptions(shipData.map(option => ({ value: option, label: option })));
        } else {
          console.error('Failed to fetch attributes:', response.data.msg);
        }
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
      }
    };
    
    if (employeeId) {
      fetchProfileData();
      fetchAttributes();
    }
  }, [employeeId]);

  const handleFileChange = async (event, type) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const validProfileImageTypes = ['image/jpeg', 'image/png'];
      const validResumeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      if (type === 'profile' && !validProfileImageTypes.includes(selectedFile.type)) {
        alert('Invalid profile picture file type. Please upload a JPEG or PNG file.');
        return;
      }

      if (type === 'resume' && !validResumeTypes.includes(selectedFile.type)) {
        alert('Invalid resume file type. Please upload a PDF, DOC, or DOCX file.');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const fileUrl = response.data.file_url;
        setFile({ name: selectedFile.name, url: fileUrl });

        const updatePayload = {
          employee_id: employeeId,
        };

        if (type === 'resume') {
          updatePayload.resume = fileUrl;
        } else if (type === 'profile') {
          updatePayload.profile = fileUrl;
          setProfileImage(fileUrl);
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/employee/update`, updatePayload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(`${type} updated successfully`);
      } catch (error) {
        console.error(`Error uploading ${type}:`, error.response?.data || error.message);
      }
    }
  };

  const handleEditClick = (section, value) => {
    let dropdown = false;
    let dropdownOptions = [];

    switch (section) {
      case 'cop':
        dropdown = true;
        dropdownOptions = copOptions;
        break;
      case 'coc':
        dropdown = true;
        dropdownOptions = cocOptions;
        break;
      case 'watchkeeping':
        dropdown = true;
        dropdownOptions = watchKeepingOptions;
        break;
      case 'presentRank':
      case 'appliedRank':
        dropdown = true;
        dropdownOptions = rankOptions;
        break;
      case 'appliedVessel':
      case 'presentVessel':
        dropdown = true;
        dropdownOptions = shipOptions;
        break;
      case 'sid':
        dropdown = true;
        dropdownOptions = sidOptions;
        break;
      case 'usVisa':
        dropdown = true;
        dropdownOptions = usVisaOptions;
        break;
      case 'gender':
        dropdown = true;
        dropdownOptions = genderOptions;
        break;
      case 'vesselExp':
        dropdown = true;
        dropdownOptions = vesselExpOptions;
        setEditValue(Array.isArray(value) ? value : []);
        break;
      default:
        setEditValue(value || ''); // Initialize editValue with an empty string if undefined
    }

    setEditSection(section);
    setIsDropdown(dropdown);
    setOptions(dropdownOptions);
    setModalOpen(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedSectionData = { ...sectionData };

      if (editSection === 'dob') {
        updatedSectionData.age = new Date().getFullYear() - new Date(editValue).getFullYear();
      }

      if (editSection === 'height' || editSection === 'weight') {
        const height = editSection === 'height' ? parseFloat(editValue) : updatedSectionData.height;
        const weight = editSection === 'weight' ? parseFloat(editValue) : updatedSectionData.weight;
        updatedSectionData.bmi = (weight / ((height / 100) ** 2)).toFixed(2);
      }

      if (editSection === 'vesselExp') {
        updatedSectionData[editSection] = editValue; // editValue is already an array for vesselExp
      } else if (editSection === 'height' || editSection === 'weight') {
        updatedSectionData[editSection] = parseFloat(editValue);
      } else {
        updatedSectionData[editSection] = editValue;
      }

      const payload = {
        employee_id: employeeId,
        ...updatedSectionData,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/employee/update`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      });

      setSectionData(updatedSectionData);
      console.log('Data updated successfully');
      setModalOpen(false);
      setEditSection(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDropdownChange = (selectedOption) => {
    setEditValue(selectedOption.value);
  };

  const handleVesselExpChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setEditValue(selectedValues);
  };

  const handleShareClick = () => {
    const profileUrl = `${window.location.origin}/public-profile/${employeeId}`;
    if (navigator.share) {
      navigator.share({
        title: `Employee Profile of ${profileData.name}`,
        text: `Check out the profile of ${profileData.name} - ${profileData.presentRank}`,
        url: profileUrl,
      })
        .then(() => console.log('Profile shared successfully'))
        .catch((error) => console.error('Error sharing profile:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <aside className="w-full lg:w-1/3 p-6 my-8 lg:ms-8 lg:p-8 bg-white shadow-lg flex flex-col space-y-6">
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md flex flex-col items-center text-center relative">
          <FaShareSquare 
            className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-gray-900" 
            size={21} 
            onClick={handleShareClick} 
          />
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover shadow-md"
            />
            <div
              className="absolute bottom-0 right-0 w-10 h-10 bg-customBlue rounded-full flex items-center justify-center cursor-pointer shadow"
              onClick={() => document.getElementById('profileUpload').click()}
            >
              <FaRegEdit className="text-white" />
            </div>
            <input
              type="file"
              id="profileUpload"
              className="hidden"
              accept="image/jpeg, image/png"
              onChange={(e) => handleFileChange(e, 'profile')}
            />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">{profileData.name}</h2>
          <p className="text-gray-500 text-sm">{profileData.presentRank}</p>
          <button className="mt-3 px-6 py-2 bg-customBlue text-white rounded-full shadow-md hover:bg-customBlue-dark">
            {profileData.appliedRank}
          </button>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <label htmlFor="resumeUpload" className="cursor-pointer text-gray-600 hover:text-gray-900">
              <FaRegEdit className="text-2xl" />
            </label>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Upload Resume</h3>
          </div>
          <div className="flex items-center">
            {file && (
              <span className="text-gray-600">
                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
              </span>
            )}
            <input
              type="file"
              id="resumeUpload"
              className="hidden"
              accept=".pdf, .doc, .docx"
              onChange={(e) => handleFileChange(e, 'resume')}
            />
          </div>
        </div>
      </aside>

      <div className="w-full lg:w-2/3 p-6 lg:p-8 space-y-6 overflow-y-auto bg-gray-100">

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Date Of Availability
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('availability', sectionData.availability)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.availability}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                SID
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('sid', sectionData.sid)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.sid}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                US Visa
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('usVisa', sectionData.usVisa)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.usVisa}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Nationality
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('nationality', sectionData.nationality)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.nationality}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700">
                Age
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.age}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Date of Birth
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('dob', sectionData.dob)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.dob}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Email
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('email', sectionData.email)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Mobile No
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('mobile_no', sectionData.mobile_no)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.mobile_no}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
            <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
              WhatsApp Number
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('whatsappNumber', sectionData.whatsappNumber)} />
            </h4>
            <p className="mt-2 text-gray-600">{sectionData.whatsappNumber}</p>
          </div>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Rank Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Applied Rank
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('appliedRank', sectionData.appliedRank)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.appliedRank}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Last Rank
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('presentRank', sectionData.presentRank)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.presentRank}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Vessel Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Vessel Applied For
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('appliedVessel', sectionData.appliedVessel)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.appliedVessel}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Last Vessel
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('presentVessel', sectionData.presentVessel)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.presentVessel}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
            <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
              Experience In Vessel
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('vesselExp', sectionData.vesselExp)} />
            </h4>
            <p className="mt-2 text-gray-600">{sectionData.vesselExp.join(', ')}</p>
          </div>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Experience Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Total Sea Exp (Years)
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('totalSeaExperienceYear', sectionData.totalSeaExperienceYear)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.totalSeaExperienceYear}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Total Sea Exp (Months)
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('totalSeaExperienceMonth', sectionData.totalSeaExperienceMonth)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.totalSeaExperienceMonth}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Last Rank Exp (Months)
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('presentRankExperienceInMonth', sectionData.presentRankExperienceInMonth)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.presentRankExperienceInMonth}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Certificates</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                COC
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('coc', sectionData.coc)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.coc}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                COP
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('cop', sectionData.cop)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.cop}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
            <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
              Watchkeeping
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('watchkeeping', sectionData.watchkeeping)} />
            </h4>
            <p className="mt-2 text-gray-600">{sectionData.watchkeeping}</p>
          </div>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Other Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Gender
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('gender', sectionData.gender)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.gender}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Height (cm)
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('height', sectionData.height)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.height}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
                Weight (kg)
                <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('weight', sectionData.weight)} />
              </h4>
              <p className="mt-2 text-gray-600">{sectionData.weight}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
            <h4 className="text-lg font-semibold text-gray-700 flex justify-between">
              BMI
            </h4>
            <p className="mt-2 text-gray-600">{sectionData.bmi}</p>
          </div>
        </div>

      </div>

      <EditModal
        isOpen={modalOpen}
        title={`Edit ${editSection}`}
        onSave={handleSaveClick}
        onClose={() => setModalOpen(false)}
        isDropdown={isDropdown}
        options={options}
        editValue={editValue}
        handleChange={isDropdown ? (editSection === 'vesselExp' ? handleVesselExpChange : handleDropdownChange) : (e) => setEditValue(e.target.value)}
      >
        {!isDropdown && (
          <>
            {editSection === 'height' || editSection === 'weight' ? (
              <input
                type="number"
                min="0"
                className="w-full border p-2 rounded"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <input
                type={editSection === 'dob' || editSection === 'availability' ? 'date' : 'text'}
                className="w-full border p-2 rounded"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            )}
          </>
        )}
      </EditModal>

    </div>
  );
};

export default EmployeeProfile;
