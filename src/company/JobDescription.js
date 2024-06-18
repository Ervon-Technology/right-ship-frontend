import React, { useState } from 'react';
import { MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom'

const JobDescription = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    // Do something based on the selected option
  };

  return (
    <div className="bg-gray-100 flex">
      {/* First div */}
      <div className="border-0 w-[800px] h-auto pb-4   mx-4 mt-4 pl-4 pt-4 mb-4 bg-white ">
        <div className="flex items-center text-blue-900 font-medium text-sm">
          <MoveLeft size={20} color="blue" className="mr-4"/> {/* Adjust size in pixels */}
          Back to Jobs
        </div>
        <div>
          <div>
            <table>
              <thead>
                <td className="font-bold text-lg pt-6">Marine Officer</td>
              </thead>
              <tbody>
                <td className="text-md text-black pr-2">sea and job</td>
                <td className="text-md text-black pr-3">Maharashtra</td>
              </tbody>
            </table>
          </div>
        </div>
        <div className="border 2 mr-4 mt-4"></div>
        <div className="mt-6 text-md font-bold">Candidates</div>
        {/* Two box */}
        <div className='flex'>
          <div className="border-2 border-gray-500 rounded-md mr-4 mt-2 w-[380px] h-[130px]">
            <div className='px-4 py-4 font-medium text-sm'>Awating Review</div>
            <div className='px-4 py-2 font-semibold text-4xl pt-2'>0</div>
          </div>
          <div className="border-2 border-gray-500 rounded-md -ml-2 mr-4 mt-2 w-[380px] h-[130px]">
            <div className='px-4 py-4 font-medium text-sm'>Total (excluding rejected)</div>
            <div className='px-4 py-2 font-semibold text-4xl pt-2'>0</div>
          </div>
        </div>
        <div className="border 2 mr-4 mt-5"></div>
        <div className=" text-md font-bold text-2xl pt-3">Peformance summary</div>
        <div className=" text-md font-medium text-gray-400 pt-2 text-sm">Date show from 5 March to 15 March 2024</div>
        <div className='flex'>
          <div className="border-0 bg-gray-300 rounded-sm mr-4 mt-6 w-[190px] h-[100px]">
            <div className='px-4 pt-5 font-bold text-3xl'>0</div>
            <div className='px-4 py-2 font-semibold text-sm pt-2'>Impressions</div>
          </div>
          <div className="border-0 bg-gray-300 rounded-md -ml-2 mr-4 mt-6 w-[190px] h-[100px]">
            <div className='px-4 pt-5 font-bold text-3xl'>0</div>
            <div className='px-4 py-2 font-semibold text-sm pt-2'>Clicks</div>
          </div>
          <div className="border-0 bg-gray-300 rounded-md -ml-2 mr-4 mt-6 w-[190px] h-[100px]">
            <div className='px-4 pt-5 font-bold text-3xl'>0</div>
            <div className='px-4 py-2 font-semibold text-sm pt-2'>Standards Application</div>
          </div>
          <div className="border-0 bg-gray-300 rounded-md -ml-2 mr-4 mt-6 w-[190px] h-[100px]">
            <div className='px-4 pt-5 font-bold text-3xl'>0</div>
            <div className='px-4 py-2 font-semibold text-sm pt-2'>Applications</div>
          </div>
        </div>
        <div className="border 2 mr-4 mt-5"></div>
        <div className=" text-md font-bold text-2xl pt-3">Job Description</div>
        <div className=" text-md font-medium text-black pt-4 text-xs max-w-80 break-words">Date show from 5 sdj 'ajzdbgadSG
          absg ajzdbgadSGbasj;gjasgjad'March to 15 March 2024</div>
        <div className="border 2 mr-4 mt-5 w-[350px]"></div>
        <div>
          <h1 className="text-md font-bold mb-2 pt-4">Ship Type</h1>
          <ul className="custom-square-list pl-5">
            <li className="font-regular text-sm">Bulk Carrier</li>
            <li className="font-regular text-sm">Tanker</li>
            <li className="font-regular text-sm">Fishing vessel</li>
            <li className="font-regular text-sm">Passanger Ship</li>
          </ul>
        </div>
        <div className="border 2 mr-4 mt-5 w-[350px]"></div>
        <div>
          <h1 className="text-md font-bold mb-2 pt-4">Rank</h1>
          <ul className="custom-square-list pl-5">
            <li className="font-regular text-sm">Bulk Carrier</li>
            <li className="font-regular text-sm">Tanker</li>
            <li className="font-regular text-sm">Fishing vessel</li>
            <li className="font-regular text-sm">Passanger Ship</li>
          </ul>
        </div><div className="border 2 mr-4 mt-5 w-[350px]"></div>
        <h1 className="text-md font-bold mb-2 pt-4">Benefits</h1>
        <div className='flex flex-wrap max-w-80 break-normal'>
          <div className='border-0 bg-gray-300 max-w-[100px] h-auto px-2 mx-1 py-1 font-medium text-xs rounderd-sm mt-2'>Joining Bonus</div>
          <div className='border-0 bg-gray-300 max-w-[100px] h-auto px-2 mx-1 py-1 font-medium text-xs rounderd-sm mt-2'>Joining Bonus</div>
          <div className='border-0 bg-gray-300 max-w-[100px] h-auto px-2 mx-1 py-1 font-medium text-xs rounderd-sm mt-2'>Joining Bonus</div>
          <div className='border-0 bg-gray-300 max-w-[100px] h-auto px-2 mx-1 py-1 font-medium text-xs rounderd-sm mt-2'>Joining Bonus</div>
        </div>
        <div className="text-gray-600 font-semibold text-xs pt-7">Posted on 26 May,2024</div>
      </div>
      {/* second div */}
      <div className='mx-2 mt-4 px-4 pt-4 border-0 mb-4 h-[325px]   bg-white'>
        <div className='flex flex-col'>
            <Link to="/edit-jobs">
                <button className='border-0 bg-customBlue text-white font-medium w-[250px] h-[40px] text-center mb-2 rounded-sm'>Edit Job</button>
            </Link>
          <div className="relative">
            <button onClick={toggleDropdown} className='border-2 border-gray-500 text-black font-medium w-[250px] h-[40px] text-center rounded-sm'>Paused V</button>
            {dropdownOpen && (
              <div className="absolute top-[42px] right-0 border border-gray-300 bg-white rounded-sm shadow-md">
                <div className="py-1">
                  <button onClick={() => handleOptionClick("Option 1")} className="block w-[250px] px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Option 1</button>
                  <button onClick={() => handleOptionClick("Option 2")} className="block w-[250px] px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Option 2</button>
                  <button onClick={() => handleOptionClick("Option 3")} className="block w-[250px] px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Option 3</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="border 2 mt-5"></div>
        <div className=" text-lg font-semibold pt-3">Details</div>
        <div className=" font-medium text-sm pt-2">Posted: 26 May 2024</div>
        <div className="  font-medium text-sm pt-1">Views: 27</div>
        <div className="  font-medium text-sm pt-1">Application received: 13 total</div>
        <div>
            <Link to="/candidate-details">
                <button className='border-0 bg-customBlue text-white font-medium w-[250px] h-[40px] text-center my-6 mb-2 rounded-sm'>View Candidate</button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;