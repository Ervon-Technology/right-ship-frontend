import React, { useState, useEffect } from 'react';
import { FaSearch, FaArrowLeft, FaEnvelope, FaBell, FaCheck, FaTimes, FaQuestion } from 'react-icons/fa';
import { Phone } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { nishiPdf} from "./pdf/Nishikant's Resume.pdf";

const CandidatesDetails = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ current: 1, total: 1 });
  const [searching, setSearching] = useState(false);
  const [focusedCandidateId, setFocusedCandidateId] = useState(null);

  useEffect(() => {
    // Demo data
    const demoCandidates = [
      { id: 1, name: 'Nishikant Sahoo', designation: 'Full-Stack Developer', city: 'Banglore', state: 'Karnataka', phone: '1234567890', email: 'nishi@gmail.com', resume: '/pdf/Nishikant\'s Resume.pdf' },
      { id: 2, name: 'Ankita Rouray', designation: 'UX Designer', city: 'Cuttack', state: 'Odisha', phone: '0987654321', email: 'ankita@gmail.com', resume: '/demo_resume.pdf' },
      { id: 3, name: 'Aman Mishra', designation: 'Full-Stack Developer', city: 'New Mumbai', state: 'Maharastra', phone: '1122334455', email: 'aman@gmail.com', resume: '/demo_resume.pdf' },
      { id: 4, name: 'Sambit Pattnaik', designation: 'Front-End Devloper', city: 'Banglore', state: 'Karnataka', phone: '6677889900', email: 'chakuli@gmail.com', resume: '/demo_resume.pdf' },
    ];
    setCandidates(demoCandidates);
    setFilteredCandidates(demoCandidates);
    setSelectedCandidate(demoCandidates[0]);
    setPagination({ current: 1, total: 1 });
  }, []);

  const handleSearch = () => {
    const filtered = candidates.filter(candidate => 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCandidates(filtered);
    setSearching(true);
    if (filtered.length > 0) {
      setSelectedCandidate(filtered[0]);
    } else {
      setSelectedCandidate(null);
    }
  };

  const handleBackToMain = () => {
    setSearchQuery('');
    setFilteredCandidates(candidates);
    setSelectedCandidate(candidates[0]);
    setSearching(false);
  };

  const handlePagination = (direction) => {
    // Handle pagination logic
  };
  const [isAccepted, setIsAccepted]=useState(false)
  const handleAccept = () => {
    toast.success(`${selectedCandidate.name} has been selected.`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setIsAccepted(true);
    setIsRejected(false);
  };
  const [isRejected, setIsRejected]=useState(false)
  const handleReject = () => {
    toast.error(`${selectedCandidate.name} has been rejected.`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setIsRejected(true)
    setIsAccepted(false);
  };
  const handleReset=()=>{
    setIsRejected(false);
    setIsAccepted(false);
  }

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setFocusedCandidateId(candidate.id);
  };

  const handleCall = () => {
    window.open(`tel:${selectedCandidate.phone}`);
  };

  const handleEmail = () => {
    window.open(`mailto:${selectedCandidate.email}`);
  };

  const handleNotify = () => {
    toast.info(`${selectedCandidate.name} has been notified.`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Candidates</h1>
          <button className="ml-4 px-2 py-1 bg-customGrey text-white rounded">All Candidates</button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search candidate"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
          />
          <FaSearch className="text-xl mr-2 cursor-pointer" onClick={handleSearch} />
          {searching && <FaArrowLeft className="text-xl mr-2 cursor-pointer" onClick={handleBackToMain} />}
          <button className="px-2 py-1 bg-blue-500 text-white rounded">Post Jobs</button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FaArrowLeft className="text-lg mr-2" />
          <span className="mr-4">Back</span>
          <span className="text-customBlue2 font-bold">All Active Jobs</span>
        </div>
        <div className="flex items-center">
          <span className="mr-4">Candidate {pagination.current} of {pagination.total}</span>
          <button onClick={() => handlePagination('prev')} className="px-2 py-1 bg-gray-300 rounded">Previous</button>
          <button onClick={() => handlePagination('next')} className="ml-2 px-2 py-1 bg-gray-300 rounded">Next</button>
        </div>
      </div>

      <div className="flex">
        <aside className="w-1/4 mr-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <div 
                key={candidate.id} 
                className={`mb-4 p-4 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 ${focusedCandidateId === candidate.id ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleCandidateClick(candidate)}
              >
                <h2 className="font-bold text-customBlue2">{candidate.name}</h2>
                <p>{candidate.designation}</p>
                <p>{candidate.city}, {candidate.state}</p>
              </div>
            ))
          ) : (
            <p className="text-red-500">No user found</p>
          )}
        </aside>

        <main className="flex-1">
          {selectedCandidate && (
            <div className="mb-8 p-4 bg-white shadow rounded">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">{selectedCandidate.name}</h2>
                  <p>{selectedCandidate.city}, {selectedCandidate.state}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-3 py-2 bg-customBlue text-white rounded" onClick={handleCall}>
                    <Phone className="mr-1" /> Call
                  </button>
                  <button className="flex items-center px-3 py-2 bg-customBlue text-white rounded" onClick={handleEmail}>
                    <FaEnvelope className="mr-1" /> Email
                  </button>
                  <button className="flex items-center px-3 py-2 bg-customBlue text-white rounded" onClick={handleNotify}>
                    <FaBell className="mr-1" /> Notify
                  </button>
                </div>
              </div>

              <div className="flex justify-start items-start  mb-4">
                <div className="flex items-center bg-white border-solid border-black border-2 p-0 space-x-0">
                <button className="px-2 py-1 bg-white text-black" onClick={handleAccept} style={{backgroundColor: isAccepted ? 'green' : '', color: isAccepted ? 'white' : ''}}>
                    <FaCheck />
                  </button>
                  <button className="px-2 py-1 bg-gray-500 text-white" onClick={handleReset}>
                    <FaQuestion />
                  </button>
                  <button className="px-2 py-1 bg-white text-black" onClick={handleReject} style={{backgroundColor: isRejected ? 'red' : '', color: isRejected ? 'white' : ''}}>
                    <FaTimes />
                  </button>
                  
                </div>
              </div>

              <div className='-ms-4'>
                <h3 className="font-bold mb-2 p-2 px-4 bg-customSky1">Resume</h3>
                <div className="flex justify-between items-center">
                  <span className='px-4'>CV</span>
                  <a href={selectedCandidate.resume} download className="px-2 py-1 bg-white border border-slate-700 font-bold text-customBlue rounded">Download PDF</a>
                </div>
                <div className="mt-4 ms-4 p-4 border border-slate-200 rounded">
                  <iframe 
                    src={selectedCandidate.resume} 
                    width="100%" 
                    height="500px" 
                    title="Resume"
                    className="border-0"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CandidatesDetails;