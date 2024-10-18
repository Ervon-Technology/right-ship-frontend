import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Updated import for navigation
import Pagination from '../../component/pagination';
import Select from 'react-select';  // Importing react-select
import CandidateContext from '../../context/candidateCont';
import '../../App.css'
const AllCandidatesTable = ({ jobId }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shipOptions, setShipOptions] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);
  const [cocOptions, setCocOptions] = useState([]);
  const [copOptions, setCopOptions] = useState([]);
  const [watchKeepingOptions, setWatchKeepingOptions] = useState([]);
  const { filterRank,
    setFilterRank,
    shipTypeFilter,
    setShipTypeFilter,
    cocFilter,
    setCocFilter,
    copFilter,
    setCopFilter,
    watchKeepingFilter,
    setWatchKeepingFilter } = useContext(CandidateContext)
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchEmployeeDetails = async (page, limit = 20) => {
    setLoading(true)
    try {
      const requestData = {
        page,
        limit,
        availability: { "$exists": true, "$ne": "" },
        appliedRank: { "$exists": true, "$ne": "" },
      };

      // Add filters if they are selected
      if (filterRank && filterRank.value) {
        requestData.appliedRank = filterRank.value;
      }
      if (shipTypeFilter && shipTypeFilter.value) {
        requestData.appliedVessel = shipTypeFilter.value;
      }
      if (cocFilter && cocFilter.value) {
        requestData.coc = cocFilter.value;
      }
      if (copFilter && copFilter.value) {
        requestData.cop = copFilter.value;
      }
      if (watchKeepingFilter && watchKeepingFilter.value) {
        requestData.watchkeeping = watchKeepingFilter.value;
      }
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee/get`, requestData);
      if (response.data.code === 200) {
        setCandidates(response.data.data);
        const totalRecords = response.data.total_documents || 0;
        setTotalPages(Math.ceil(totalRecords / limit) || 1);
      } else {
        setCandidates([]);
        throw new Error('Failed to fetch employee details');
      }
    } catch (error) {
      console.error("Error fetching employee details:", error.message);
      setError('Error fetching employee details.');
    } finally {
      setLoading(false);
    }
  }

  // Fetch candidates on initial render and when filters or pagination change
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchEmployeeDetails(window.location.search.split('page=')[1]);
      } catch (err) {
        setError(err.message);
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(searchParams.get('page'), 10);
    if (pageFromUrl) {
      setCurrentPage(pageFromUrl);
    }

    fetchInitialData();
  }, [location.search]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', newPage); // Update the 'page' parameter in the URL
      navigate({ search: searchParams.toString() });
    }
  };

  const handleParams = (val, option) => {
    let queryString = window.location.search;

    let decodedQueryString = decodeURIComponent(queryString);
    const searchParams = new URLSearchParams(decodedQueryString);
    searchParams.set(val, JSON.stringify(option.value));
    if (!option.value.length) {
      searchParams.delete(val)
    }

    navigate({ search: searchParams.toString() });

  }

  const handleSearchParam = (option) => {
    handleParams("rank", option)
    setFilterRank(option)
  }
  const handleShipTypeFilterSearch = (option) => {
    handleParams("shiptype", option)
    setShipTypeFilter(option)
  }
  const handleCocFilterSearch = (option) => {
    handleParams("coc", option)
    setCocFilter(option)
  }
  const handleCopFilterSearch = (option) => {
    handleParams("cop", option)
    setCopFilter(option)
  }
  const handleWatchFilterSearch = (option) => {
    handleParams("watchkeeping", option)
    setWatchKeepingFilter(option)
  }

  const handleClearFilter = async () => {
    const requestData = {
      page: window.location.search.split('page=')[1],
      limit: 20,
      availability: { "$exists": true, "$ne": "" },
      appliedRank: { "$exists": true, "$ne": "" },
    };
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee/get`, requestData);
    if (response.data.code === 200) {
      setCandidates(response.data.data);
      setFilterRank(null)
      setCocFilter(null)
      setCopFilter(null)
      setShipTypeFilter(null)
      setWatchKeepingFilter(null)
      const totalRecords = response.data.total_documents || 0;
      setTotalPages(Math.ceil(totalRecords / 20) || 1);
    } else {
      setCandidates([]);
      throw new Error('Failed to fetch employee details');
    }

    navigate({
      pathname: location.pathname,
      search: "",
    });

  }
  // Fetching options for filters
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/attributes/get`, {});
        if (response.data.code === 200) {
          const attributes = response.data.data;

          // Populate Ship Options
          const shipAttribute = attributes.find(attr => attr.name.toLowerCase() === 'ships');
          const shipData = shipAttribute ? shipAttribute.values.map(value => ({ label: value, value })).sort((a, b) => a.label.localeCompare(b.label)) : [];
          setShipOptions([{ label: "All Ship Types", value: "" }, ...shipData]);

          // Populate Rank Options
          const rankAttribute = attributes.find(attr => attr.name.toLowerCase() === 'rank');
          const rankData = rankAttribute ? rankAttribute.values.map(value => ({ label: value, value })).sort((a, b) => a.label.localeCompare(b.label)) : [];
          setRankOptions([{ label: "All Ranks", value: "" }, ...rankData]);

          // Populate COC Options
          const cocAttribute = attributes.find(attr => attr.name.toLowerCase() === 'coc');
          const cocData = cocAttribute ? cocAttribute.values.map(value => ({ label: value, value })).sort((a, b) => a.label.localeCompare(b.label)) : [];
          setCocOptions([{ label: "All", value: "" }, ...cocData]);

          // Populate COP Options
          const copAttribute = attributes.find(attr => attr.name.toLowerCase() === 'cop');
          const copData = copAttribute ? copAttribute.values.map(value => ({ label: value, value })).sort((a, b) => a.label.localeCompare(b.label)) : [];
          setCopOptions([{ label: "All", value: "" }, ...copData]);

          // Populate Watchkeeping Options
          const watchKeepingAttribute = attributes.find(attr => attr.name.toLowerCase() === 'watch keeping');
          const watchKeepingData = watchKeepingAttribute ? watchKeepingAttribute.values.map(value => ({ label: value, value })).sort((a, b) => a.label.localeCompare(b.label)) : [];
          setWatchKeepingOptions([{ label: "All", value: "" }, ...watchKeepingData]);
        } else {
          throw new Error('Failed to fetch attributes');
        }
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
        setError('Failed to fetch attributes');
      }
    };

    fetchAttributes();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading candidates...</p>;
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className='flex flex-row justify-between'>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Candidates</h2>
        <button className="border-2 border-gray-800 text-sm px-2 py-2 rounded h-10 w-30" onClick={handleClearFilter}>clear filter</button>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rank Filter */}
        <Select
          value={filterRank}
          onChange={handleSearchParam}
          options={rankOptions}
          placeholder="Filter by Rank Applied"
          className="w-full"
        />

        {/* Ship Type Filter */}
        <Select
          value={shipTypeFilter}
          onChange={handleShipTypeFilterSearch}
          options={shipOptions}
          placeholder="Filter by Ship Type Applied"
          className="w-full"
        />

        {/* COC Filter */}
        <Select
          value={cocFilter}
          onChange={handleCocFilterSearch}
          options={cocOptions}
          placeholder="Filter by COC"
          className="w-full"
        />

        {/* COP Filter */}
        <Select
          value={copFilter}
          onChange={handleCopFilterSearch}
          options={copOptions}
          placeholder="Filter by COP"
          className="w-full"
        />

        {/* Watchkeeping Filter */}
        <Select
          value={watchKeepingFilter}
          onChange={handleWatchFilterSearch}
          options={watchKeepingOptions}
          placeholder="Filter by Watchkeeping"
          className="w-full"
        />

      </div>

      {/* Candidates Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Name</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Rank</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Certificate</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Applied Vessel</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Exp. Last Vessel</th>
              <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm text-left">Date of Availability</th>
            </tr>
          </thead>
          <tbody>
            {candidates && candidates.length > 0 ? (
              candidates.map((candidate) => (
                <tr key={candidate._id} className="border-t">
                  <td className="py-4 px-6 text-gray-700">
                    <Link to={`/job/candidates/detail/${candidate._id}`} className="text-blue-600 hover:underline candidate-link">
                      <ListView data={[candidate.firstName, `DOB: ${candidate.dob}`, `Gender: ${candidate.gender}`]} />
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-gray-700 text-sm">
                    <ListView data={[`Applied Rank : ${candidate.appliedRank}`, `Present Rank : ${candidate.presentRank}`]} />
                  </td>
                  <td className="py-4 px-6 text-gray-700 text-sm">
                    <ListView data={[
                      `Coc : ${candidate.coc ? candidate.coc : "N/A"}`,
                      `Cop : ${candidate.cop ? candidate.cop : "N/A"}`,
                      `Watch Keeping : ${candidate.watchkeeping ? candidate.watchkeeping : "N/A"}`
                    ]} />
                  </td>
                  <td className="py-4 px-6 text-gray-700">{candidate.appliedVessel}</td>
                  <td className="py-4 px-6 text-gray-700 text-sm">
                    <ListView data={candidate.vesselExp} />
                  </td>
                  <td className="py-4 px-6 text-gray-700 text-sm">{candidate.availability?.split('T')[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-600 ">No candidates found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      {/* Error Message */}
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

export default AllCandidatesTable;
