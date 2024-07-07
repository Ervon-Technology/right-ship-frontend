import React, { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Company = () => {
  const initialCompanies = [
    { id: 1, name: 'Company 1', jobs: '10 jobs', location: 'India/Orissa', status: 'Active', plan: 'Standard Plan' },
    { id: 2, name: 'Company 2', jobs: '2 jobs', location: 'USA/California', status: 'Non Active', plan: '-' },
    { id: 3, name: 'Company 3', jobs: '30 jobs', location: 'UK/London', status: 'Available', plan: 'Standard Plan' },
    { id: 4, name: 'Company 4', jobs: '5 jobs', location: 'Canada/Ontario', status: 'Active', plan: '-' },
    { id: 5, name: 'Company 5', jobs: '7 jobs', location: 'Germany/Berlin', status: 'Non Active', plan: 'Standard Plan' },
    { id: 6, name: 'Company 6', jobs: '1 job', location: 'France/Paris', status: 'Available', plan: '-' },
    { id: 7, name: 'Company 7', jobs: '8 jobs', location: 'Australia/Sydney', status: 'Active', plan: 'Standard Plan' },
    { id: 8, name: 'Company 8', jobs: '0 jobs', location: 'Japan/Tokyo', status: 'Non Active', plan: '-' },
    { id: 9, name: 'Company 9', jobs: '15 jobs', location: 'India/Delhi', status: 'Available', plan: 'Standard Plan' },
    { id: 10, name: 'Company 10', jobs: '20 jobs', location: 'Brazil/Sao Paulo', status: 'Active', plan: '-' },
    { id: 11, name: 'Company 11', jobs: '12 jobs', location: 'Russia/Moscow', status: 'Non Active', plan: 'Standard Plan' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredCompanies(initialCompanies);
    } else {
      setFilteredCompanies(initialCompanies.filter(company => 
        company.name.toLowerCase().includes(term)
      ));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Company List</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Export</button>
      </div>
      <hr className="mb-4" />
      <div className="flex mb-4">
        <div className="flex flex-col mr-4">
          <h2 className="mb-2">Search</h2>
          <input 
            type="text" 
            className="border p-2 rounded" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={handleSearch}
            size={25}
          />
        </div>
        <div className="flex flex-col mr-4">
          <h2 className="mb-2">Ship Type</h2>
          <select className="border p-2 rounded w-60">
            <option>All Types</option>
            <option>Type 1</option>
            <option>Type 2</option>
          </select>
        </div>
        <div className="flex flex-col">
          <h2 className="mb-2">Sort By</h2>
          <select className="border p-2 rounded w-60">
            <option>Name</option>
            <option>Status</option>
            <option>Jobs</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Company Name</th>
            <th className="border px-4 py-2">Active Jobs</th>
            <th className="border px-4 py-2">Country/State</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Plans</th>
            <th className="border px-4 py-2">Full Details</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <tr key={company.id}>
                <td className="border px-4 py-2">{company.id}</td>
                <td className="border px-4 py-2">{company.name}</td>
                <td className="border px-4 py-2">{company.jobs}</td>
                <td className="border px-4 py-2">{company.location}</td>
                <td className="border px-4 py-2">{company.status}</td>
                <td className="border px-4 py-2">{company.plan}</td>
                <td className="border px-4 py-2">
                  <Link to="" className=''><button className="text-blue-500">View Profile</button></Link>
                </td>
                <td className="border px-4 py-2">
                  <FiEye />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 text-center" colSpan="8">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex  items-center mt-10 ms-80">
        <button className="p-2 bg-blue-300 rounded ms-44"><IoIosArrowBack /></button>
        <span className='bg-blue-300 ms-5 p-1 px-7 rounded-md font-bold'>pages 1 of 1</span>
        <button className="p-2 bg-blue-300 rounded ms-5"><IoIosArrowForward /></button>
      </div>
    </div>
  );
};

export default Company;