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

  // Fetch team members from the API
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.post('http://65.0.167.98/team/get', {});
      console.log('API Response:', response.data); // Log the response data
      const members = await response.data.data || [];
    //  await console.log('Data',response.data.data)
      setTeamMembers(members)

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
      // Make a POST request to update the member
      await axios.post(
        'http://65.0.167.98/team/edit',
        {
          user_id: updatedMember.user_id,
          name: updatedMember.name,
          role: updatedMember.role,
          status: updatedMember.status,
        },
        {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Optionally, you can fetch updated team members after editing
      fetchTeamMembers(); // Assuming this function fetches and updates team members
  
      setShowEditModal(false); // Close the edit modal after successful update
    } catch (error) {
      console.error('Error saving edited member:', error);
      // Handle error state or display a notification to the user
    }
  };
  
  

  

  





  const handleConfirmDelete = async (userId) => {
    try {
      // Make a POST request to delete the member
      const response = await axios.post(
        'http://65.0.167.98/team/delete',
        { "user_id": userId },
        {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Assuming fetchTeamMembers() fetches and updates team members list
      await fetchTeamMembers(); // Fetch updated team members
  
      // Assuming setShowDeleteModal(false) closes the delete modal
      setShowDeleteModal(false);
  
      console.log('Response:', response.data.data); // Optional: Log response data
  
    } catch (error) {
      console.error('Error deleting member:', error);
      // Handle error state or display a notification to the user
    }
  };
  
  
  const handleSuspendMember = async (updatedMember) => {
    try {
      // Update member status to "suspended" if not already
      const updatedStatusMember = {
        ...updatedMember,
        status: 'Suspended',
      };
  
      // Make a POST request to update the member with the new status
      await axios.post(
        'http://65.0.167.98/team/edit',
        {
          user_id: updatedStatusMember.user_id,
          name: updatedStatusMember.name,
          role: updatedStatusMember.role,
          status: updatedStatusMember.status,
        },
        {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Get suspension duration from updated member data
      const suspensionDuration = updatedStatusMember.suspensionDuration;
  
      // Schedule notification after suspension duration (in milliseconds)
      setTimeout(() => {
        console.log(`Notification: ${updatedStatusMember.name} has been suspended for ${suspensionDuration} milliseconds.`);
      }, suspensionDuration);
  
      // Refresh the list after suspending
      fetchTeamMembers();
      setShowSuspendModal(false); // Close suspension modal
    } catch (error) {
      console.error('Error suspending member:', error);
    }
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
        <div className="w-full sm:w-80 p-2 bg-blue-100 text-blue-700 h-20 rounded-lg">
          <span className='font-bold'>Total Team Members</span>
          <br/>
          <span className='text-xl'>{totalMembers}</span>
        </div>
        <div className="w-full sm:w-80 p-2 bg-green-100 text-green-700 h-20 rounded-lg">
          <span className='font-bold'>Active Members</span>
          <br/>
          <span className='text-xl'>{activeMembers}</span>
        </div>
        <div className="w-full sm:w-80 p-2 bg-red-100 text-red-700 h-20 rounded-lg">
          <span className='font-bold'>Suspended Members</span>
          <br/>
          <span className='text-xl'>{suspendedMembers}</span>
        </div>
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
            {teamMembers.map((member, index) => (
              <tr key={member.id}>
                <td className="py-2 px-4 border">{index + 1}</td>
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
          onDelete={() => handleConfirmDelete(currentMember.id)}
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