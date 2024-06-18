import React, { useEffect, useState } from 'react';
import { FaSearch, FaDownload } from 'react-icons/fa';
import {Link} from 'react-router-dom'
// import './candidate.css'

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



        //Api fetching// if u want fetch api then just commentout the use-effect part and exchange your backend api.


//   useEffect(() => {
//     fetch(`https://api.example.com/candidates?page=${page}`)
//       .then(response => response.json())
//       .then(data => {                                                
//         setCandidates(data.candidates);
//         setTotalPages(data.totalPages);
//       });
//   }, [page]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Candidate</h1>
        <div className="flex items-center ">
        <div className='border-solid border-2 rounded p-2.5  mr-3'>
          <FaSearch />
          </div>
          <button className="bg-customBlue text-white p-2 px-4 rounded mr-14">Post Jobs</button>
        </div>
      </div>
      <div className="flex items-center mb-0 text-sm">
      <select className="mr-4 -mt-20 border border-black rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black font-semibold hover:bg-gray-50 cursor-pointer ">
            <option className="text-gray-700 bg-white hover:bg-blue-100 focus:bg-blue-200 text-sm " selected>All Open and Pused Jobs</option>
            <option className="text-gray-700 bg-white hover:bg-blue-100 focus:bg-blue-200 text-sm ">Natural</option>
            <option className="text-gray-700 bg-white hover:bg-blue-100 focus:bg-blue-200 text-sm ">Review</option>
            <option className="text-gray-700 bg-white hover:bg-blue-100 focus:bg-blue-200 text-sm ">Rejected</option>
            <option className="text-gray-700 bg-white hover:bg-blue-100 focus:bg-blue-200 text-sm ">Hold</option>
            <option className="text-gray-700 bg-white hover:bg-blue-100 focus:bg-blue-200 text-sm ">Hired</option>
       </select>
      </div>
      <h2 className="text-sm font-semibold mb-1 -mt-3 ">Filter</h2>
      <div className="flex flex-row mb-4 mt-6">
        <div className='border rounded text-sm bg-gray-300 pt-2'>
            <label className="p-3 font-bold">Sort By:</label>
            <select className="mb-2  px-2 py-1 w-72 text-sm bg-gray-300">
              <option>Application State(newest First)</option>
            </select>
        </div>
        <div className='border rounded ms-3 pt-2 text-sm bg-gray-300'>
            <label className="p-3 font-bold">State:</label>
            <select className="mb-2  px-2 py-1 w-44 text-sm bg-gray-300">
              <option >Maharastra</option>
            </select>
        </div>
        <div className='border rounded ms-3 pt-2 text-sm bg-gray-300'>
            <label className="p-3 font-bold">Sorted:</label>
            <select className="mb-2  px-2 py-1 w-38 bg-gray-300">
              <option>Neutral</option>
            </select>
        </div>
        <select className="border font-bold rounded px-3 ms-3 text-sm bg-gray-300">
          <option>COP</option>
          <option>WK</option>
          <option>COC</option>
        </select>
        <select className="border rounded font-bold px-3 ms-3 text-sm bg-gray-300">
          <option>Issue Authority</option>
        </select>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th className="border bg-customSky1 px-4 py-4 text-sm font-bold">Candidate Details</th>
            <th className="border bg-customSky1 px-4 py-4 text-sm font-bold">Experience</th>
            <th className="border bg-customSky1 px-4 py-4 text-sm font-bold">Present Rank</th>
            <th className="border bg-customSky1 px-4 py-4 text-sm font-bold">Applied Rank</th>
            <th className="border bg-customSky1 px-4 py-4 text-sm font-bold">Date of Availability</th>
            <th className="border bg-customSky1 px-4 py-4 text-sm font-bold">View Resume</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-sm font-bold">
                <input type="checkbox" className="mr-2" />
                {candidate.details}
              </td>
              <td className="border px-4 py-2">{candidate.experience}</td>
              <td className="border px-4 py-2">{candidate.presentRank}</td>
              <td className="border px-4 py-2">{candidate.appliedRank}</td>
              <td className="border px-4 py-2">{candidate.availabilityDate}</td>
              <td className="border px-4 py-2">
                <button className="mr-2">
                  <FaDownload />
                </button>
                <button>
                  <FaDownload />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-customBlue hover:bg-customBlue2 text-white py-1 px-5 rounded"
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
        >
          Previous
        </button>
        <span className='font-semibold border py-1 px-2 border-slate-300'>
          Page {page} of {totalPages}
        </span>
        <Link>
            <button
              className="bg-customBlue hover:bg-customBlue2 text-white py-1 px-5 rounded"
              onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            >
              Next
            </button>
        </Link>
      </div>
    </div>
  );
};

export default Candidates;