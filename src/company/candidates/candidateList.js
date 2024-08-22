import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CandidatesTable = ({ jobId }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rankFilter, setRankFilter] = useState('');
  const [shipTypeFilter, setShipTypeFilter] = useState('');
  const [sortByDate, setSortByDate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shipOptions, setShipOptions] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);

  const user = useSelector((state) => state.auth.user);

  const fetchEmployeeDetails = useCallback(async (employeeIds, page = 1, limit = 10) => {
    try {
        const requestData = {
            employee_id: { '$in': employeeIds },
            page,
            limit,
        };

        if (rankFilter) {
            requestData.appliedRank = rankFilter;
        }

        if (shipTypeFilter) {
            requestData.applyvessel = shipTypeFilter;
        }

        console.log("Request Data:", requestData);

        const response = await axios.post('https://api.rightships.com/employee/get', requestData);

        console.log("API Response:", response.data);

        if (response.data.code === 200) {
            setCandidates(response.data.data);
            const totalRecords = response.data.total || 0;
            const calculatedTotalPages = Math.ceil(totalRecords / limit);
            setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);

            return response.data.data;
        } else {
            console.error("Failed to fetch employee details:", response.data);
            throw new Error('Failed to fetch employee details');
        }
    } catch (error) {
        if (error.response) {
            console.error("Error fetching employee details:", error.response.data);
        } else {
            console.error("Error fetching employee details:", error.message);
        }
        throw error;
    }
}, [rankFilter, shipTypeFilter]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.post(
        'https://api.rightships.com/company/application/get',
        { company_id: user.company_id }
      );

      if (response.data.code === 200) {
        return extractEmployeeIds(response.data.applications);
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error while fetching posts:', error);
      throw error;
    }
  }, [user.company_id]);

  const extractEmployeeIds = useCallback((data) => {
    return data.flatMap(item =>
      (item.applied_by || []).map(applied => applied.employee_id)
    ).filter(Boolean);
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const employeeIds = await fetchPosts();
        const employees = await fetchEmployeeDetails(employeeIds, currentPage);
        setCandidates(employees);
      } catch (err) {
        setError(err.message);
        setCandidates([]); // Set to empty array if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [fetchPosts, fetchEmployeeDetails, currentPage]);

  const handleSortChange = () => {
    setSortByDate(!sortByDate);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Fetching attributes for ship types and ranks
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.post('https://api.rightships.com/attributes/get', {});
        if (response.data && response.data.code === 200) {
          const attributes = response.data.data;
          const shipAttribute = attributes.find(attr => attr.name.toLowerCase() === 'ships');
          const rankAttribute = attributes.find(attr => attr.name.toLowerCase() === 'rank');
          const shipData = shipAttribute ? shipAttribute.values.sort((a, b) => a.localeCompare(b)) : [];
          const rankData = rankAttribute ? rankAttribute.values.sort((a, b) => a.localeCompare(b)) : [];

          setShipOptions(shipData);
          setRankOptions(rankData);
        } else {
          console.error('Failed to fetch attributes:', response.data.msg);
        }
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
      }
    };

    fetchAttributes();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading candidates...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Candidates</h2>

      <div className="mb-4 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
        <select
          value={rankFilter}
          onChange={e => setRankFilter(e.target.value)}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Filter by Rank</option>
          {rankOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={shipTypeFilter}
          onChange={e => setShipTypeFilter(e.target.value)}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Filter by Ship Type</option>
          {shipOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          onClick={handleSortChange}
          className="p-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Sort by Date {sortByDate ? 'Descending' : 'Ascending'}
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Name</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Applied Rank</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Past Rank</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Apply Vessel</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Exp. Past Vessel</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Date of Availability</th>
            </tr>
          </thead>
          <tbody>
            {candidates && candidates.length > 0 ? (
              candidates.map((candidate) => (
                <tr key={candidate.id} className="border-t">
                  <td className="py-4 px-6 text-gray-700">
                    <Link to={`/job/candidates/detail/${candidate._id}`} className="text-blue-600 hover:underline">
                      <ListView data={[candidate.name, `DOB: ${candidate.dateOfBirth}`, `Gender: ${candidate.gender}`]} />
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{candidate.appliedRank}</td>
                  <td className="py-4 px-6 text-gray-700">{candidate.presentRank}</td>
                  <td className="py-4 px-6 text-gray-700">{candidate.applyvessel}</td>
                  <td className="py-4 px-6 text-gray-700">
                    <ListView data={candidate.pastvesselExp} />
                  </td>
                  <td className="py-4 px-6 text-gray-700">{candidate.availability?.split('T')[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-600">No candidates found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

const ListView = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevPage}
        className="p-2 bg-gray-300 rounded-md mr-2"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="p-2 text-gray-700">
        Page {currentPage} of {totalPages || 1} {/* Fallback to 1 if totalPages is NaN */}
      </span>
      <button
        onClick={handleNextPage}
        className="p-2 bg-gray-300 rounded-md ml-2"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default CandidatesTable;
