import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import ships from '../Assets/Ship.png';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setDescription, updateJobData } from '../Slice/Empslice'; // Import the necessary actions
import './editjob.css';

Modal.setAppElement('#root');

const EditJobs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.emp); // Get data from Redux store

  const [formData, setFormData] = useState({
    jobTitle: data.title || '',
    shipTypes: data.shipTypes || [],
    rankTypes: data.ranks || [],
    benefits: data.benefits || [],
    description: data.description || 'Contrary to popular belief, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, praesentium officia quibusdam in impedit itaque quod? Ex reprehenderit officia amet vel dolore vero.',
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditCategory, setCurrentEditCategory] = useState(null);

  useEffect(() => {
    setFormData({
      jobTitle: data.title || 'tank career',
      shipTypes: data.shipTypes || [],
      rankTypes: data.ranks || [],
      benefits: data.benefits || [],
      description: data.description || 'Contrary to popular belief, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, praesentium officia quibusdam in impedit itaque quod? Ex reprehenderit officia amet vel dolore vero.',
    });
  }, [data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'jobTitle') {
      dispatch(setTitle(value));
    } else if (name === 'description') {
      dispatch(setDescription(value));
    }
  };

  const handlePreview = () => {
    dispatch(updateJobData(formData));
    setIsPreviewOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsPreviewOpen(false);
      setIsClosing(false);
    }, 300); // Match the animation duration
  };

  const openEditModal = (category) => {
    setCurrentEditCategory(category);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditModalCheckboxChange = (event, category) => {
    const { value, checked } = event.target;
    setFormData((prevData) => {
      const updatedCategory = checked
        ? [...prevData[category], value]
        : prevData[category].filter((item) => item !== value);
      return { ...prevData, [category]: updatedCategory };
    });
  };

  const handlesave = async (status) => {
    const company_id = localStorage.getItem('company_id');
    const payload = {
      Impressions:'0',
      Clicks:'0',
      Standards:'0',
      Applications:'0',
      AwaitingReview:'0',
      Total:'0',
      Views:'0',
      company_id: company_id,
      status: status,
      jobTitle: formData.jobTitle,
      ship_types: formData.shipTypes,
      ranks: formData.rankTypes,
      benefits: formData.benefits,
      description: formData.description,
    };

    try {
      const response = await fetch('https://api.rightships.com/company/application/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        if(data.code === 200){
          console.log('Success:', data);
          alert(data.msg);
          window.location.href = 'employeer-dashboard';
        }
        else{
          alert('got some error plz try again..')
        }
       
      } else {
        console.error('Error:', response.statusText);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const shipTypes = [
    'Bulk carrier', 'Container ship', 'Tanker',
    'Passenger ship', 'Fishing vessel', 'Yacht',
    'Submarine', 'Patrol boat', 'Icebreaker',
    'Ferry', 'Cruise ship'
  ];

  const rankTypes = [
    'Captain', 'Chief Officer', 'Second Officer',
    'Third Officer', 'Chief Engineer', 'Second Engineer',
    'Third Engineer', 'Deck Cadet', 'Engine Cadet'
  ];

  const benefitTypes = [
    'Health Insurance', 'Dental Insurance', 'Vision Insurance',
    'Retirement Plan', 'Paid Time Off', 'Life Insurance',
    'Disability Insurance', 'Flexible Schedule', 'Work From Home',
    'Employee Discount', 'Gym Membership'
  ];

  const categoryTypes = {
    shipTypes: shipTypes,
    rankTypes: rankTypes,
    benefits: benefitTypes
  };

  return (
    <div className="max-w-3xl mx-auto my-6">
      <div className="py-10 mb-16 bg-customSky1 flex justify-around items-center w-full max-w-4xl px-6">
        <h1 className="text-3xl font-bold">Edit Jobs</h1>
        <img src={ships} alt="ship" height={120} width={120} />
      </div>
      <div className="section mb-3">
        <div className="title flex items-center text-lg font-extrabold mb-2">
          Job Title
        </div>
        <hr className="border-t-2 border-gray-200" />
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="mt-2 border p-2 w-full"
        />
      </div>

      {['shipTypes', 'rankTypes', 'benefits'].map((category, idx) => (
        <div className="section mb-3" key={idx}>
          <div className="title text-lg font-extrabold mb-2">{category.charAt(0).toUpperCase() + category.slice(1, -1)}</div>
          <div className="box-group space-y-2">
            {formData[category].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="square-box mr-1">{item}</div>
              </div>
            ))}
          </div>
          <hr className="border-t-2 border-gray-200 mt-4" />
          <FaEdit className="relative left-96 ml-80 -top-12 size-5 cursor-pointer" onClick={() => openEditModal(category)} />
        </div>
      ))}

      <div className="section mb-5">
        <div className="title font-extrabold text-lg mb-2">Description</div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-2 border p-2 w-full"
          rows="5"
        />
        <hr className="border-t-2 border-gray-200 mt-4" />
      </div>

      <div className="section">
        <div className="extra-text mb-4 text-sm font-medium">
          By selecting Confirm, you agree that this job post reflects your requirements and application will be processed following ABC’s <Link to='https://www.google.com' className='text-blue-700'>Terms</Link>, <Link to='https://www.google.com' className='text-blue-700'>Cookie</Link> and <Link to='https://www.google.com' className='text-blue-700'>Privacy</Link> Policies.
        </div>
        <div className="button-group flex justify-between">
          <button className="border-solid border-2 text-blue-700 font-semibold rounded py-2 px-4 w-48" onClick={handlePreview}>Preview</button>
          <button onClick={() => handlesave('saved')} className="bg-customBlue text-white py-2 px-6 hover:bg-customBlue2 rounded w-44">Save</button>
          <button onClick={() => handlesave('public')} className="bg-green-500 text-white py-2 px-6 hover:bg-green-600 rounded w-44 ml-4">Publish</button>
        </div>
      </div>

      <Modal
        isOpen={isPreviewOpen}
        onRequestClose={closeModal}
        contentLabel="Preview Job Modal"
        className={`modal-content ${isClosing ? 'modal-hide' : ''}`}
        overlayClassName={`modal-overlay ${isClosing ? 'modal-overlay-hide' : ''}`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{formData.jobTitle}</h2>
          <p className="mb-4">{formData.description}</p>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Ship Types</h3>
            <ul className="list-disc list-inside">
              {formData.shipTypes.map((ship, idx) => (
                <li key={idx}>{ship}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Ranks</h3>
            <ul className="list-disc list-inside">
              {formData.rankTypes.map((rank, idx) => (
                <li key={idx}>{rank}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Benefits</h3>
            <ul className="list-disc list-inside">
              {formData.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>
          <button onClick={closeModal} className="mt-4 bg-customBlue text-white py-2 px-4 hover:bg-customBlue2 rounded">Close</button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Category Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Edit {currentEditCategory}</h2>
          <div className="grid grid-cols-2 gap-2">
            {currentEditCategory && categoryTypes[currentEditCategory].map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={formData[currentEditCategory].includes(item)}
                  onChange={(e) => handleEditModalCheckboxChange(e, currentEditCategory)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <button onClick={closeEditModal} className="mt-4 bg-customBlue text-white py-2 px-4 hover:bg-customBlue2 rounded">Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default EditJobs;
