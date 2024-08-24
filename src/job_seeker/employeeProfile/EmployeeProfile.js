import React, { useState, useEffect } from 'react';
import { FaRegEdit, FaEdit, FaShareSquare } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';
import EditModal from './EditModal';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const EmployeeProfile = () => {
  const [profileImage, setProfileImage] = useState("https://i2.pickpik.com/photos/711/14/431/smile-profile-face-male-preview.jpg");
  const [profileData, setProfileData] = useState({ name: '', presentRank: '', appliedRank: '' });
  const [file, setFile] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [isDropdown, setIsDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [sectionData, setSectionData] = useState({
    appliedVessel: null,
    presentVessel: null,
    vesselExp: [],
    appliedRank: null,
    presentRank: null,
    dateOfAvailability: null,
    email: null,
    mobile_no: null,
    whatsappNumber: null,
    gender: null,
    country: null,
    dob: null,
    age: null,
    presentRankExperienceInYear: null,
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
        const response = await axios.post('https://api.rightships.com/employee/get', {
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
          dateOfAvailability: result?.dateOfAvailability || null,
          email: result?.email || null,
          mobile_no: result?.mobile_no || null,
          whatsappNumber: result?.whatsappNumber || null,
          gender: result?.gender || null,
          country: result?.country || null,
          dob: result?.dob || null,
          age: age,
          presentRankExperienceInYear: result?.presentRankExperienceInYear || null,
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
        const response = await axios.post('https://api.rightships.com/attributes/get', {}, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          }
        });

        if (response.data && response.data.code === 200) {
          const attributes = response.data.data;

          const copAttribute = attributes.find(attr => attr.name.toLowerCase() === 'cop');
          const cocAttribute = attributes.find(attr => attr.name.toLowerCase() === 'coc');
          const shipAttribute = attributes.find(attr => attr.name.toLowerCase() === 'ships');
          const watchKeepingAttribute = attributes.find(attr => attr.name.toLowerCase() === 'watch keeping');
          const rankAttribute = attributes.find(attr => attr.name.toLowerCase() === 'rank');

          const copData = copAttribute ? copAttribute.values : [];
          const cocData = cocAttribute ? cocAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          const shipData = shipAttribute ? shipAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          const watchKeepingData = watchKeepingAttribute ? watchKeepingAttribute.values : [];
          const rankData = rankAttribute ? rankAttribute.values.sort((a, b) => a.localeCompare(b)) : [];

          setCopOptions(copData.map(option => ({ value: option, label: option })));
          setCocOptions(cocData.map(option => ({ value: option, label: option })));
          setShipOptions(shipData.map(option => ({ value: option, label: option })));
          setWatchKeepingOptions(watchKeepingData.map(option => ({ value: option, label: option })));
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
        const response = await axios.post('https://api.rightships.com/upload', formData, {
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

        await axios.post('https://api.rightships.com/employee/update', updatePayload, {
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
        break;
      default:
        dropdown = false;
        dropdownOptions = [];
    }

    setEditSection(section);
    setEditValue(value);
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
  
      await axios.post('https://api.rightships.com/employee/update', payload, {
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
    if (navigator.share) {
      navigator.share({
        title: 'Employee Profile',
        text: `Check out the profile of ${profileData.name} - ${profileData.presentRank}`,
        url: window.location.href,
      })
        .then(() => console.log('Profile shared successfully'))
        .catch((error) => console.error('Error sharing profile:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <aside className="w-full lg:my-4 lg:ms-8 lg:w-1/3 p-8 bg-white shadow-lg flex flex-col space-y-4">
        <div className="bg-white p-8 flex flex-col items-center text-center">
          <FaShareSquare className="ms-72 -mt-3 cursor-pointer" size={21} onClick={handleShareClick} />
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
          <h2 className="mt-4 text-2xl font-semibold text-black">{profileData.name}</h2>
          <p className="text-gray-400 text-sm">{profileData.presentRank}</p>
          <button className="mt-3 px-6 py-2 bg-customBlue text-white rounded-full shadow-md hover:bg-customBlue-dark">
            {profileData.appliedRank}
          </button>
        </div>

        <div className="bg-white p-8 border rounded-xl shadow-md">
          <div className="flex align-center">
            <label htmlFor="resumeUpload" className="cursor-pointer text-gray-600 mb-2 hover:text-gray-900 me-3">
              <FaRegEdit className="text-2xl" />
            </label>
            <h3 className="text-lg font-semibold text-black mb-4">Upload Resume</h3>
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

      <div className="w-full lg:w-2/3 p-4 space-y-3 overflow-y-auto bg-gray-100 me-4">

        <div className="bg-white p-8 border shadow-sm relative">
          <h3 className='bold text-2xl'>Basic</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Date Of Availability
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('dateOfAvailability', sectionData.dateOfAvailability)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.dateOfAvailability}</p>
            </div>
          </div>
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              SID
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('sid', sectionData.sid)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.sid}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              US Visa
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('usVisa', sectionData.usVisa)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.usVisa}</p>
            </div>
          </div>

          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Nationality
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('nationality', sectionData.nationality)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.nationality}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Age
              <div className="cursor-pointer text-gray-600 hover:text-gray-900" />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.age}</p>
            </div>
          </div>
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Date of Birth
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('dob', sectionData.dob)} />
            </h3>
            <div className="mt-2 text-gray-600">
            <p>{sectionData.dob}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border shadow-sm relative">
          <h3 className='bold text-2xl'>Contact</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Email
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('email', sectionData.email)} />
            </h3>
            <div className="mt-2 text-gray-600">
            <p>{sectionData.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Mobile No
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('mobile_no', sectionData.mobile_no)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.mobile_no}</p>
            </div>
          </div>

          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Whatsapp Number
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('whatsappNumber', sectionData.whatsappNumber)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.whatsappNumber}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border shadow-sm relative">
          <h3 className='bold text-2xl'>Rank</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Applied Rank
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('appliedRank', sectionData.appliedRank)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.appliedRank}</p>
            </div>
          </div>

          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Present Rank
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('presentRank', sectionData.presentRank)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.presentRank}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border shadow-sm relative">
          <h3 className='bold text-2xl'>Vessel</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Vessel Applied For
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('appliedVessel', sectionData.appliedVessel)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.appliedVessel}</p>
            </div>
          </div>

          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Present Vessel
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('presentVessel', sectionData.presentVessel)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.presentVessel}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Experience In Vessel
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900"  />
              {/* <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('vesselExp', sectionData.vesselExp)} /> */}
            </h3>
            <div className="mt-2 text-gray-600">
            <p>{sectionData.vesselExp}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border shadow-sm relative">
          <h3 className='bold text-2xl'>Experience</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Total Sea Exp (Years):
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('totalSeaExperienceYear', sectionData.totalSeaExperienceYear)} />
            </h3>
            <div className="mt-2 text-gray-600">
            <p>{sectionData.totalSeaExperienceYear}</p>
            </div>
          </div>

          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Total Sea Exp (Months):
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('totalSeaExperienceMonth', sectionData.totalSeaExperienceMonth)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.totalSeaExperienceMonth}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Present Rank Exp (Years):
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('presentRankExperienceInYear', sectionData.presentRankExperienceInYear)} />
            </h3>
            <div className="mt-2 text-gray-600">
            <p>{sectionData.presentRankExperienceInYear}</p>
            </div>
          </div>

          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Present Rank Exp (Months):
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('presentRankExperienceInMonth', sectionData.presentRankExperienceInMonth)} />
            </h3>
            <div className="mt-2 text-gray-600">
            <p>{sectionData.presentRankExperienceInMonth}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border shadow-sm relative">
          <h3 className='bold text-2xl'>Certificates</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              COC
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('coc', sectionData.coc)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.coc}</p>
            </div>
          </div>

          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              COP
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('cop', sectionData.cop)} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData.cop}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border shadow-sm relative">
          <h3 className="text-lg font-semibold text-black flex justify-between">
            Watchkeeping
            <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('watchkeeping', sectionData.watchkeeping)} />
          </h3>
          <div className="mt-2 text-gray-600">
            <p>{sectionData.watchkeeping}</p>
          </div>
        </div>

        <div className="bg-white p-8 border shadow-sm relative">
          <h3 className='bold text-2xl'>Other</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Height (cm)
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('height', sectionData.height)} />
            </h3>
            <div className="mt-2 text-gray-600">
            {/* <p>{sectionData.height}</p> */}
            </div>
          </div>

          <div className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              Weight (kg)
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick('weight', sectionData.weight)} />
            </h3>
            <div className="mt-2 text-gray-600">
            {/* <p>{sectionData.weight}</p> */}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border shadow-sm relative">
          <h3 className="text-lg font-semibold text-black flex justify-between">
            BMI
            <div className="cursor-pointer text-gray-600 hover:text-gray-900" />
          </h3>
          <div className="mt-2 text-gray-600">
            <p>{sectionData.bmi}</p>
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
        handleChange={handleDropdownChange}
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
                type={editSection === 'dob' || editSection === 'dateOfAvailability' ? 'date' : 'text'}
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
