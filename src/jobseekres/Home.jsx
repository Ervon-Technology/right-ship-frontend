import React, { useState, useEffect } from 'react';
import './Home.css';
import worldmap from "./Assets/world map.png";
import shipvideo from "./Assets/shipvideo.mp4";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

function Home() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [timezones, setTimezones] = useState({});
  const [showAllJobs, setShowAllJobs] = useState(false);

  const companies = Array(20).fill({ companyName: 'Company 1', companyImg: 'xyz' });
  const companies2 = Array(20).fill({ companyName: 'Company 2', companyImg: 'xyz' });

  const jobs = [
    { title: 'Job 1', company: 'Company A', date: 'today' },
    { title: 'Job 2', company: 'Company B', date: 'yesterday' },
    { title: 'Job 3', company: 'Company C', date: 'today' },
    { title: 'Job 4', company: 'Company D', date: 'yesterday' },
  ];

  useEffect(() => {
    setVisitorCount(1234);
    setTimezones({
      USA: 'GMT-5',
      India: 'GMT+5:30',
    });
  }, []);

  const handleCountryClick = (country) => {
    alert(`Timezone for ${country}: ${timezones[country]}`);
  };

  const handleShowAllClick = () => {
    setShowAllJobs(true);
  };

  return (
    <div className="App">
      {/* Background video and header */}
      <div className="relative w-full h-screen">
        <video className="absolute w-full h-full object-cover" autoPlay loop muted>
          <source src={shipvideo} type="video/mp4" />
        </video>
        <div className="relative flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white">
          <h1 className="text-5xl mb-4 font-bold">CHARTING CAREERS, SEA TO SHORE</h1>
          <div className="flex space-x-4">
            <ButtonWithHoverEffect text="I Want a Job" img="job-seeker.jpg" />
            <ButtonWithHoverEffect text="I Want to Hire" img="employer.jpg" />
          </div>
          <div className="absolute -left-6 top-32 bg-white bg-opacity-75 text-black rounded-full px-7 py-0">
            <span className='ms-3 font-bold'>Active Users</span> <br />
            <span className='ms-3 font-bold text-2xl'>{visitorCount}+</span>
          </div>
        </div>
      </div>

      {/* Scrolling companies list */}
      <div className="my-8">
        <h2 className="text-2xl text-center mb-4 font-bold">Sponsored Company</h2>
        <div className="overflow-hidden">
          <div className="flex space-x-4 py-4 bg-blue-300 h-44">
            {companies.map((company, index) => (
              <div key={index} className="bg-white p-2 rounded shadow min-w-max scrolling-companies animate-scroll">
                <div className='mt-5 ms-24'>{company.companyImg}</div>
                <div className='mt-12 -ms-12'>{company.companyName}</div>
              </div>
            ))}
          </div>
          <div className="flex space-x-4 py-4 bg-blue-300 mt-14 h-44">
            {companies2.map((company, index) => (
              <div key={index} className="bg-white p-2 rounded shadow min-w-max scrolling-companies animate-scroll">
                <div className='mt-5 ms-24'>{company.companyImg}</div>
                <div className='mt-12 -ms-12'>{company.companyName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive map */}
      <div className="-my-8">
        <div className="relative w-full h-96">
          <img src={worldmap} alt="World Map" className="w-full h-full object-cover" />
          {Object.keys(timezones).map((country, index) => (
            <div
              key={index}
              className="absolute cursor-pointer bg-red-500 text-white rounded-full p-2"
              style={{ top: `${index * 20 + 20}px`, left: `${index * 50 + 50}px` }}
              onClick={() => handleCountryClick(country)}
            >
              {country}
            </div>
          ))}
        </div>
      </div>

      {/* Job listings */}
      <div className="my-12 flex flex-col items-center w-full">
        <div className="w-full px-4 md:px-0 md:w-4/5">
          <h3 className="text-2xl mb-1 font-bold">Jobs For You</h3>
          <hr className="w-full h-1 bg-blue-500 mb-4" />
        </div>
        <div className="w-full md:w-4/5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {(showAllJobs ? jobs : jobs.slice(0, 3)).map((job, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow flex flex-col">
              <h3 className="text-xl">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <hr className="my-2" />
              <p className="text-right text-gray-500">{job.date}</p>
            </div>
          ))}
        </div>
        {!showAllJobs && jobs.length > 3 && (
          <button
            onClick={handleShowAllClick}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 "
          >
            Show All
          </button>
        )}
      </div>
    </div>
  );
}

function ButtonWithHoverEffect({ text, img }) {
  return (
    <div className="relative group p-10 h-52 w-96 overflow-hidden">
      <button className="bg-blue-500 text-white px-4 py-3 rounded-lg h-full w-full focus:outline-none transition-opacity duration-300 glossy-bg">
        {text}
        <FaRegArrowAltCircleRight size={30} className='ms-52 -mt-6'/>
      </button>
      <div className="absolute inset-0 bg-cover bg-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundImage: `url(${img})` }}>
        <span className="sr-only">{text}</span>
      </div>
    </div>
  );
}

export default Home;
