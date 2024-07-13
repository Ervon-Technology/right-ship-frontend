import React, { useState, useEffect } from 'react';
import AddMemberModal from './AddMemberModal';
import EditMemberModal from './EditMemberModal';
import DeleteMemberModal from './DeleteMemberModal';
import SuspendMemberModal from './SuspendMemberModal';
import axios from 'axios';

const AdminTeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [activeMembers, setActiveMembers] = useState(0);
  const [suspendedMembers, setSuspendedMembers] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);

  // Fetch team members from the API
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.post('http://65.0.167.98/team/get', {});
      console.log('API Response:', response.data); // Log the response data
      const members = await response.data.data || [];
      setTeamMembers(members);

      // Calculate counts
      const total = members.length;
      const active = members.filter(member => member.status === 'Active').length;
      const suspended = members.filter(member => member.status === 'Suspended').length;

      setTotalMembers(total);
      setActiveMembers(active);
      setSuspendedMembers(suspended);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

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

  const handleSaveNewMember = async (newMember) => {
    try {
      await axios.post('http://65.0.167.98/team/create', newMember);
      fetchTeamMembers(); // Fetch updated team members after adding a new member
      setShowAddModal(false);
    } catch (error) {
      console.error('Error saving new member:', error);
    }
  };

  const handleSaveEditedMember = async (updatedMember) => {
    try {
      await axios.post('http://65.0.167.98/team/update', updatedMember);
      fetchTeamMembers(); // Fetch updated team members after editing a member
      setShowEditModal(false);
    } catch (error) {
      console.error('Error saving edited member:', error);
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      await axios.post(`http://65.0.167.98/team/delete`, { id });
      fetchTeamMembers(); // Fetch updated team members after deleting a member
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleSuspendMember = async (id) => {
    try {
      await axios.post(`http://65.0.167.98/team/suspend`, { id });
      fetchTeamMembers(); // Fetch updated team members after suspending a member
      setShowSuspendModal(false);
    } catch (error) {
      console.error('Error suspending member:', error);
    }
  };

  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = teamMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(teamMembers.length / membersPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
        <div className="w-full sm:w-80 p-2 bg-blue-100 text-blue-700 h-20 rounded-lg"><span className='font-bold'> Total Team Members</span><br/><span className='text-xl'> {totalMembers}</span></div>
        <div className="w-full sm:w-80 p-2 bg-green-100 text-green-700 h-20 rounded-lg "> <span className='font-bold'>Active Members</span><br/> <span className='text-xl'>{activeMembers}</span></div>
        <div className="w-full sm:w-80 p-2 bg-red-100 text-red-700 h-20 rounded-lg"> <span className='font-bold'>Suspended Members</span><br/><span className='text-xl'>{suspendedMembers}</span></div>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: '450px' }}>
        <table className="min-w-full bg-white border">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-6 border text-start">#</th>
              <th className="py-2 px-6 border text-start">Name</th>
              <th className="py-2 px-6 border text-start">Role</th>
              <th className="py-2 px-6 border text-start">Status</th>
              <th className="py-2 px-6 border text-start">Joined Date</th>
              <th className="py-2 px-6 border text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member, index) => (
              <tr key={member.id}>
                <td className="py-2 px-6 border">{indexOfFirstMember + index + 1}</td>
                <td className="py-2 px-6 border">{member.name}</td>
                <td className="py-2 px-6 border text-start">{member.role}</td>
                <td className="py-2 px-6 border text-start">{member.status}</td>
                <td className="py-2 px-6 border text-start">{member.joinedDate}</td>
                <td className="py-2 px-6 border text-start">
                  <button 
                    className="bg-green-500 text-white px-3 py-1 rounded mr-3"
                    onClick={() => handleEdit(member)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 text-white px-3 py-1 rounded mr-3"
                    onClick={() => handleDelete(member)}
                  >
                    Delete
                  </button>
                  <button 
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
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
      <div className="flex justify-center items-center mt-4">
        <button 
          className="bg-sky-200 text-black font-bold px-4 py-2 rounded"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <div className="mx-2 px-4 py-2 bg-sky-200 text-black font-bold rounded">
          Page {currentPage} of {totalPages}
        </div>
        <button 
          className="bg-sky-200 text-black font-bold px-4 py-2 rounded"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
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
          onDelete={() => handleConfirmDelete(currentMember.id)}
        />
      )}
      {showSuspendModal && (
        <SuspendMemberModal
          member={currentMember}
          onClose={() => setShowSuspendModal(false)}
          onSuspend={() => handleSuspendMember(currentMember.id)}
        />
      )}
    </div>
  );
};

export default AdminTeamManagement;
