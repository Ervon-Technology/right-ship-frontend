import React, { useState, useEffect } from 'react';
import { FaRegEdit, FaEdit, FaShareSquare } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';
import EditModal from './EditModal';
import Select from 'react-select'; // Import Select from react-select

const EmployeeProfile = () => {
  const [profileImage, setProfileImage] = useState("https://i2.pickpik.com/photos/711/14/431/smile-profile-face-male-preview.jpg");
  const [profileData, setProfileData] = useState({ name: '', presentRank: '', appliedRank: '' });
  const [file, setFile] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); 
  const [editValue, setEditValue] = useState({});
  const [sectionData, setSectionData] = useState({
    appliedVessel: '',
    presentVessel: '',
    vesselExperience: '',
    appliedRank: '',
    presentRank: '',
    dateOfAvailability: '',
    contactDetail: {
      email: '',
      mobile_no: '',
      whatsappNumber: '',
      gender: '', // Gender dropdown
      country: '',
      dob: '',
      age: '',
    },
    experience: {
      presentRankExperienceInYear: '',
      presentRankExperienceInMonth: '',
      totalSeaExperienceYear: '',
      totalSeaExperienceMonth: '',
    },
    licenseHolding: {
      cop: '', // COP dropdown
      coc: '', // COC dropdown
      watchkeeping: '', // Watchkeeping dropdown
      sid: '', // SID dropdown
      usVisa: '', // US Visa dropdown
    }
  });

  // State for dropdown options
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
  ]; // Gender dropdown options

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

        setProfileImage(result?.profile || profileImage);
        setProfileData({
          name: result?.firstName + ' ' + result?.lastName || '',
          presentRank: result?.presentRank || '',
          appliedRank: result?.appliedRank || ''
        });

        setSectionData({
          appliedVessel: result?.appliedVessel || '', 
          presentVessel: result?.presentVessel || '',
          appliedRank: result?.appliedRank || '',
          presentRank: result?.presentRank || '',
          dateOfAvailability: result?.availability || '',
          contactDetail: {
            email: result?.email || '',
            mobile_no: result?.mobile_no || '', 
            whatsappNumber: result?.whatsappNumber || '',
            gender: result?.gender || '',
            country: result?.country || '',
            dob: result?.dob || '',
            age: result?.dob ? calculateAge(result?.dob) : '',
          },
          experience: {
            presentRankExperienceInYear: result?.presentRankExperienceInYear || '',
            presentRankExperienceInMonth: result?.presentRankExperienceInMonth || '',
            totalSeaExperienceYear: result?.totalSeaExperienceYear || '',
            totalSeaExperienceMonth: result?.totalSeaExperienceMonth || '',
          },
          licenseHolding: {
            cop: result?.cop || '',
            coc: result?.coc || '',
            watchkeeping: result?.watchkeeping || '',
            sid: result?.sid || '',
            usVisa: result?.usVisa || '',
          }
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

  const [isDropdown, setIsDropdown] = useState(false);
  const [options, setOptions] = useState([]);

  const handleEditClick = (section, value) => {
    let dropdown = false;
    let dropdownOptions = [];

    if (section === 'cop') {
      dropdown = true;
      dropdownOptions = copOptions;
    } else if (section === 'coc') {
      dropdown = true;
      dropdownOptions = cocOptions;
    } else if (section === 'watchkeeping') {
      dropdown = true;
      dropdownOptions = watchKeepingOptions;
    } else if (section === 'presentRank' || section === 'appliedRank') {
      dropdown = true;
      dropdownOptions = rankOptions;
    } else if (section === 'appliedVessel' || section === 'presentVessel') {
      dropdown = true;
      dropdownOptions = shipOptions;
    } else if (section === 'sid') {
      dropdown = true;
      dropdownOptions = sidOptions;
    } else if (section === 'usVisa') {
      dropdown = true;
      dropdownOptions = usVisaOptions;
    } else if (section === 'gender') {
      dropdown = true;
      dropdownOptions = genderOptions;
    }

    setEditSection(section);
    setEditValue(value);
    setIsDropdown(dropdown);
    setOptions(dropdownOptions);
    setModalOpen(true); 
  };

  const handleSaveClick = async () => {
    try {
      if (typeof sectionData[editSection] === 'string') {
        setSectionData({
          ...sectionData,
          [editSection]: editValue,
        });
      } else {
        setSectionData({
          ...sectionData,
          [editSection]: {
            ...editValue,
          },
        });
      }

      const payload = {
        employee_id: employeeId,
        ...sectionData,
      };

      await axios.post('https://api.rightships.com/employee/update', payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      });

      console.log('Data updated successfully');
      setModalOpen(false); 
      setEditSection(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleChange = (e, field) => {
    setEditValue({
      ...editValue,
      [field]: e.target.value,
    });
  };

  const handleDropdownChange = (selectedOption) => {
    setEditValue(selectedOption.value);
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
          <div className='flex align-center'>
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
        {Object.entries({
          appliedVessel: 'Vessel Applied For',
          presentVessel: 'Present Vessel',
          appliedRank: 'Applied Rank',
          presentRank: 'Present Rank',
          dateOfAvailability: 'Date of Availability',
        }).map(([key, title]) => (
          <div key={key} className="bg-white p-8 border shadow-sm relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              {title}
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick(key, sectionData[key])} />
            </h3>
            <div className="mt-2 text-gray-600">
              <p>{sectionData[key]}</p>
            </div>
          </div>
        ))}

        {['contactDetail', 'experience', 'licenseHolding'].map((section) => (
          <div key={section} className="bg-white p-8 border rounded-xl shadow-md relative">
            <h3 className="text-lg font-semibold text-black flex justify-between">
              {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
              <FaEdit className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => handleEditClick(section, sectionData[section])} />
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-600">
              {Object.keys(sectionData[section]).map((key) => (
                <div key={key}>
                  <p className="text-sm font-semibold text-black">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</p>
                  <p className="mt-1 text-gray-600">{sectionData[section][key]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

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
          {!isDropdown && typeof sectionData[editSection] === 'string' && (
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          )}
          {!isDropdown && typeof sectionData[editSection] === 'object' && (
            Object.keys(sectionData[editSection] || {}).map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={editValue[field] || sectionData[editSection][field]}
                  onChange={(e) => handleChange(e, field)}
                />
              </div>
            ))
          )}
        </EditModal>
      </div>
    </div>
  );
};

export default EmployeeProfile;
