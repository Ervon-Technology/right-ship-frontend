import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CandidatesTable = ({ jobId }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const user = useSelector((state) => state.auth.user);

  const fetchEmployeeDetails = useCallback(async (employeeIds, page = 1, limit = 10) => {
    try {
      if (!employeeIds.length) {
        // If there are no employee IDs, return early and set empty data.
        setCandidates([]);
        setTotalPages(1);
        return;
      }

      const requestData = {
        employee_id: { '$in': employeeIds },
        page,
        limit,
      };

      console.log("Request Data:", requestData);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee/get`, requestData);

      console.log("API Response:", response.data);

      if (response.data.code === 200 && response.data.data) {
        setCandidates(response.data.data);
        const totalRecords = response.data.total || 0;
        const calculatedTotalPages = Math.ceil(totalRecords / limit);
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
      } else {
        // If no data is returned, set an empty array and reset pagination
        setCandidates([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching employee details:", error.response ? error.response.data : error.message);
      setError('Failed to fetch employee details.');
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/company/application/get`,
        { company_id: user.company_id }
      );

      if (response.data.code === 200) {
        return extractEmployeeIds(response.data.applications);
      } else {
        console.error('Failed to fetch posts:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error while fetching posts:', error);
      return [];
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
      setError(null); // Clear previous errors

      try {
        const employeeIds = await fetchPosts();
        await fetchEmployeeDetails(employeeIds, currentPage);
      } catch (err) {
        setError('Failed to load candidates.');
        setCandidates([]); // Set to empty array if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [fetchPosts, fetchEmployeeDetails, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading candidates...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Candidates</h2>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Name</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Applied Rank</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Last Rank</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Apply Vessel</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Exp. Last Vessel</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Date of Availability</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length > 0 ? (
              candidates.map((candidate) => (
                <tr key={candidate.id} className="border-t">
                  <td className="py-4 px-6 text-gray-700">
                    <Link to={`/job/candidates/detail/${candidate._id}`} className="text-blue-600 hover:underline">
                      <ListView data={[candidate.firstName, `DOB: ${candidate.dob}`, `Gender: ${candidate.gender}`]} />
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{candidate.appliedRank}</td>
                  <td className="py-4 px-6 text-gray-700">{candidate.presentRank}</td>
                  <td className="py-4 px-6 text-gray-700">{candidate.appliedVessel}</td>
                  <td className="py-4 px-6 text-gray-700">
                    <ListView data={candidate.vesselExp} />
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
