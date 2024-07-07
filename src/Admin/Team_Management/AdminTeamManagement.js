import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminTeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Manager', status: 'Active', joinedDate: '1 May,2024', description: 'Team member description' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Employee', status: 'Active', joinedDate: '2 May,2024', description: 'Team member description' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Employee', status: 'Active', joinedDate: '3 May,2024', description: 'Team member description' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'Employee', status: 'Active', joinedDate: '4 May,2024', description: 'Team member description' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Employee', status: 'Active', joinedDate: '5 May,2024', description: 'Team member description' },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle member updates
  React.useEffect(() => {
    if (location.state?.updatedMember) {
      setTeamMembers(prevMembers =>
        prevMembers.map(member =>
          member.id === location.state.updatedMember.id ? location.state.updatedMember : member
        )
      );
    }
  }, [location.state]);

  const handleEdit = (id) => {
    const memberToEdit = teamMembers.find(member => member.id === id);
    navigate(`/editmember`, { state: { member: memberToEdit } });
  };

  const handleDelete = (id) => {
    setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== id));
    navigate(`/deleteMember`)
  };

  const handleSuspend = (id) => {
    setTeamMembers(
      teamMembers.map(member => 
        member.id === id ? { ...member, status: 'Suspended' } : member
      )
    );
    navigate(`/suspendmember`)
  };

  const handleAddMember = () => {
    // Implement add member functionality here
  };

  return (
    <div className="flex flex-col p-4">
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
      <div className="flex mb-4 gap-3">
        <div className="w-80 p-2 bg-blue-100 text-blue-700 h-20 rounded-lg"><span className='font-bold'> Total Team Members</span><br/><span className='text-xl'> 150</span></div>
        <div className="w-80 p-2 bg-green-100 text-green-700 h-20 rounded-lg "> <span className='font-bold'>Active Members</span><br/> <span className='text-xl'>145</span></div>
        <div className="w-80 p-2 bg-red-100 text-red-700 h-20 rounded-lg"> <span className='font-bold'>Suspended Members</span><br/><span className='text-xl'>5</span></div>
      </div>
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
                  className="bg-green-500 text-white px-2 py-1 m-1 rounded" 
                  onClick={() => handleEdit(member.id)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 m-1 rounded" 
                  onClick={() => handleDelete(member.id)}
                >
                  Delete
                </button>
                <button 
                  className="bg-yellow-500 text-white px-2 py-1 m-1 rounded" 
                  onClick={() => handleSuspend(member.id)}
                >
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button className="px-3 py-1 border">Previous</button>
        <button className="px-3 py-1 border">1</button>
        <button className="px-3 py-1 border">2</button>
        <button className="px-3 py-1 border">Next</button>
      </div>
    </div>
  );
};

export default AdminTeamManagement;