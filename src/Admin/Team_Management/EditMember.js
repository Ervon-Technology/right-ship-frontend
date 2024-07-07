import React, { useState, useEffect } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';

const EditMember = () => {
//   const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [member, setMember] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
    description: ''
  });

  useEffect(() => {
    if (location.state?.member) {
      setMember(location.state.member);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember(prevMember => ({ ...prevMember, [name]: value }));
  };

  const handleSave = () => {
    // Simulate saving the updated member data
    console.log('Updated member data:', member);
    navigate('/admin_team_management', { state: { updatedMember: member } });
  };

  const handleCancel = () => {
    navigate('/admin_team_management');
  };

  return (
    <div className="flex flex-row p-4 mt-14 ms-14">
      <form className="flex flex-col w-1/2">
        <label className="mb-2 font-bold">Name</label>
        <input
          className="mb-4 p-2 border bg-gray-200"
          type="text"
          name="name"
          value={member.name}
          onChange={handleChange}

        />
        <label className="mb- font-bold">Email</label>
        <input
          className="mb-4 p-2 border bg-gray-200"
          type="email"
          name="email"
          value={member.email}
          onChange={handleChange}
        />
        <label className="mb-2 font-bold">Role</label>
        <input
          className="mb-4 p-2 border bg-gray-200"
          type="text"
          name="role"
          value={member.role}
          onChange={handleChange}
        />
        <label className="mb-2 font-bold">Status</label>
        <input
          className="mb-4 p-2 border bg-gray-200"
          type="text"
          name="status"
          value={member.status}
          onChange={handleChange}
        />
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      <div className="border-l-2 border-gray-300 ml-8 pl-10 ">
        <h2 className="text-xl font-bold">Description</h2>
        <textarea
        
          className="w-96 h-96 mt-2 p-2 border"
          name="description"
          value={member.description}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default EditMember;