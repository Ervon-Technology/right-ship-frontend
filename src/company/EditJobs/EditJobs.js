import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import ships from '../Assets/Ship.png'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './editjob.css';
// Setting the root element for react-modal
Modal.setAppElement('#root');

const EditJobs = () => {
  const [formData, setFormData] = useState({
    jobTitle: 'tank career',
    shipTypes: [],
    rankTypes: [],
    benefits: [],
    description: 'Contrary to popular belief, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, praesentium officia quibusdam in impedit itaque quod? Ex reprehenderit officia amet vel dolore vero.',
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditCategory, setCurrentEditCategory] = useState(null);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  const handlePreview = () => {
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
        {/* <FaEdit className="relative left-96 ml-80 top-9 size-5" /> */}
      </div>

      {['shipTypes', 'rankTypes', 'benefits'].map((category, idx) => (
        <div className="section mb-3" key={idx}>
          <div className="title text-lg font-extrabold  mb-2">{category.charAt(0).toUpperCase() + category.slice(1, -1)}</div>
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
        <div className="title font-extrabold text-lg mb-0">Description</div>
        <div className="text-sm mt-2 w-2/3 font-medium border p-2">
          {formData.description}
        </div>
        <hr className="border-t-2 border-gray-200 mt-4" />
      </div>

      <div className="section">
        <div className="extra-text mb-4 text-sm font-medium">
          By selecting Confirm, you agree that this job post reflects your requirements and application will be processed following ABC’s <Link to='https://www.google.com' className='text-blue-700'>Terms</Link>, <Link to='https://www.google.com' className='text-blue-700'>Cookie</Link> and <Link to='https://www.google.com' className='text-blue-700'>Privacy</Link> Policies.
        </div>
        <div className="button-group flex justify-between">
          <button className="border-solid border-2 text-blue-700 font-semibold rounded py-2 px-4 w-48" onClick={handlePreview}>Preview</button>
          <button className="bg-customBlue text-white py-2 px-6 hover:bg-customBlue2 rounded w-44">Save</button>
        </div>
      </div>

      <Modal
        isOpen={isPreviewOpen}
        onRequestClose={closeModal}
        contentLabel="Preview Job Modal"
        className={`modal-content ${isClosing ? 'modal-hide' : ''}`}
        overlayClassName={`modal-overlay ${isClosing ? 'modal-hide' : ''}`}
      >
        <div className="preview-job p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Preview Job</h1>
          <div className="section mb-3">
            <div className="title font-bold mb-2">Job Title</div>
            <p>{formData.jobTitle}</p>
          </div>
          <div className="section mb-3">
            <div className="title font-bold mb-2">Ship Type</div>
            <p>{formData.shipTypes.join(', ')}</p>
          </div>
          <div className="section mb-3">
            <div className="title font-bold mb-2">Rank</div>
            <p>{formData.rankTypes.join(', ')}</p>
          </div>
          <div className="section mb-3">
            <div className="title font-bold mb-2">Benefits</div>
            <p>{formData.benefits.join(', ')}</p>
          </div>
          <div className="section mb-3">
            <div className="title font-bold mb-2">Description</div>
            <p>{formData.description}</p>
          </div>
          <div className="button-group mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4" onClick={closeModal}>Close</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Category Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="edit-category p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Edit {currentEditCategory}</h1>
          <div className="checkbox-group space-y-2">
            {categoryTypes[currentEditCategory]?.map((item, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${currentEditCategory}-${index}`}
                  name={currentEditCategory}
                  value={item}
                  checked={formData[currentEditCategory]?.includes(item)}
                  onChange={(e) => handleEditModalCheckboxChange(e, currentEditCategory)}
                  className="mr-1"
                />
                <label htmlFor={`${currentEditCategory}-${index}`} className='text-sm'>{item}</label>
              </div>
            ))}
          </div>
          <div className="button-group mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4" onClick={closeEditModal}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditJobs;