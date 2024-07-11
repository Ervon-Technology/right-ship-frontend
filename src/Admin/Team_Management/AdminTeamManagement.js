import React, { useState, useEffect } from 'react';
import AddMemberModal from './AddMemberModal';
import EditMemberModal from './EditMemberModal';
import DeleteMemberModal from './DeleteMemberModal';
import SuspendMemberModal from './SuspendMemberModal';

const AdminTeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Manager', status: 'Active', joinedDate: '1 May, 2024', description: 'Team member description' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Employee', status: 'Active', joinedDate: '2 May, 2024', description: 'Team member description' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Employee', status: 'Active', joinedDate: '3 May, 2024', description: 'Team member description' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'Employee', status: 'Active', joinedDate: '4 May, 2024', description: 'Team member description' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Employee', status: 'Active', joinedDate: '5 May, 2024', description: 'Team member description' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  const handleAddMember = () => {
    setShowAddModal(true);
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setShowEditModal(true);
  };

  const handleDelete = (member) => {
    setCurrentMember(member);
    setShowDeleteModal(true);
  };

  const handleSuspend = (member) => {
    setCurrentMember(member);
    setShowSuspendModal(true);
  };

  const handleSaveNewMember = (newMember) => {
    setTeamMembers((prevMembers) => [...prevMembers, { ...newMember, id: prevMembers.length + 1 }]);
    setShowAddModal(false);
  };

  const handleSaveEditedMember = (updatedMember) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) => (member.id === updatedMember.id ? updatedMember : member))
    );
    setShowEditModal(false);
  };

  const handleConfirmDelete = (id) => {
    setTeamMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
    setShowDeleteModal(false);
  };

  const handleSuspendMember = (updatedMember) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) => (member.id === updatedMember.id ? updatedMember : member))
    );
    setShowSuspendModal(false);
  };

  return (
    <div className="flex flex-col p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddMember}
        >
          Add Member
        </button>
      </div>
      <hr className="border-black w-full mb-4" />
      <div className="flex mb-4 gap-3 flex-wrap">
        <div className="w-full sm:w-80 p-2 bg-blue-100 text-blue-700 h-20 rounded-lg"><span className='font-bold'> Total Team Members</span><br/><span className='text-xl'> 150</span></div>
        <div className="w-full sm:w-80 p-2 bg-green-100 text-green-700 h-20 rounded-lg "> <span className='font-bold'>Active Members</span><br/> <span className='text-xl'>145</span></div>
        <div className="w-full sm:w-80 p-2 bg-red-100 text-red-700 h-20 rounded-lg"> <span className='font-bold'>Suspended Members</span><br/><span className='text-xl'>5</span></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Joined Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id}>
                <td className="py-2 px-4 border">{member.id}</td>
                <td className="py-2 px-4 border">{member.name}</td>
                <td className="py-2 px-4 border">{member.role}</td>
                <td className="py-2 px-4 border">{member.status}</td>
                <td className="py-2 px-4 border">{member.joinedDate}</td>
                <td className="py-2 px-4 border">
                  <button 
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(member)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleDelete(member)}
                  >
                    Delete
                  </button>
                  <button 
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleSuspend(member)}
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveNewMember}
        />
      )}
      {showEditModal && (
        <EditMemberModal
          member={currentMember}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEditedMember}
        />
      )}
      {showDeleteModal && (
        <DeleteMemberModal
          member={currentMember}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleConfirmDelete}
        />
      )}
      {showSuspendModal && (
        <SuspendMemberModal
          member={currentMember}
          onClose={() => setShowSuspendModal(false)}
          onSuspend={handleSuspendMember}
        />
      )}
    </div>
  );
};

export default AdminTeamManagement;
