import React, { useState, useEffect } from 'react';

const Supports = () => {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentTicket, setCurrentTicket] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: '',
    status: ''
  });
  const companyId = localStorage.getItem('company_id');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    getTickets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalOpen = (type, ticket = null) => {
    setModalType(type);
    if (type === 'edit' && ticket) {
      setCurrentTicket(ticket);
      setFormData({
        name: ticket.name,
        email: ticket.email,
        issue: ticket.issue,
        status: ticket.status
      });
    } else {
      setFormData({
        name: '',
        email: '',
        issue: '',
        status: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentTicket(null);
  };

  const handleSubmit = async () => {
    if (modalType === 'create') {
      await createTicket();
    } else {
      await editTicket(currentTicket.support_id);
    }
    handleModalClose();
  };

  const createTicket = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/company/support/create`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: companyId,
          user_id: userId,
          name: formData.name,
          email: formData.email,
          issue: formData.issue,
          status: formData.status,
        }),
      });
      const data = await response.json();
      if (data.code === 200) {
        setTickets([...tickets, data.issue]);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const editTicket = async (supportId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/company/support/update`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issue: formData.issue,
          status: formData.status,
          support_id: supportId,
        }),
      });
      const data = await response.json();
      console.log('edit',data);
      if (data.code === 200) {
        alert('updated');
        getTickets();
      }
    } catch (error) {
      console.error('Error editing ticket:', error);
    }
  };

  const getTickets = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/company/support/get`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: companyId
        }),
      });
      const data = await response.json();
      setTickets(Array.isArray(data.issues) ? data.issues : []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setTickets([]);
    }
  };

  const deleteTicket = async (supportId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/company/support/delete`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          support_id: supportId,
        }),
      });
      setTickets(tickets.filter(ticket => ticket.support_id !== supportId));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(ticket => ticket.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Support Tickets</h1>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => handleModalOpen('create')}
          className="bg-customBlue text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition"
        >
          Create Ticket
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-100 py-2 px-4 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Issue</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Status</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map(ticket => (
                <tr key={ticket.support_id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{ticket.name}</td>
                  <td className="py-3 px-4">{ticket.email}</td>
                  <td className="py-3 px-4">{ticket.issue}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        ticket.status === 'active' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'resolved' ? 'bg-blue-100 text-blue-800' :
                        ticket.status === 'critical' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleModalOpen('edit', ticket)}
                      className="bg-green-600 text-white py-1 px-2 rounded shadow hover:bg-green-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTicket(ticket.support_id)}
                      className="bg-red-600 text-white py-1 px-2 rounded shadow hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center text-gray-600">No tickets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{modalType === 'create' ? 'Create Ticket' : 'Edit Ticket'}</h2>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Issue</label>
              <textarea
                name="issue"
                value={formData.issue}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleModalClose}
                className="bg-gray-600 text-white py-2 px-4 rounded shadow hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition"
              >
                {modalType === 'create' ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supports;
