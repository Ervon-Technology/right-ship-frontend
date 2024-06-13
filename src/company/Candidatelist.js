import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Phone, Search, ChevronLeft, ChevronRight, MessageCircle, CheckCircle, HelpCircle, XCircle, MoreVertical } from 'lucide-react';

const Candidatelist = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetchData();
  }, []);

  const fetchData = () => {
    // Update the URL to the correct API endpoint
    fetch('https://mockapi.io/clone/656ac257dac3630cf727463a/users')
      .then(response => response.json())
      .then(data => {
        // Update the state with new data
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div className='max-h-[460px] scroll-auto'>
      <div className="flex grow border-0 w-auto">
        <div className="font-bold mt-1 text-xl">Candidates</div>
        <div className="border w-32 text-center mx-3 h-9 pt-1 rounded-md bg-blue-950 text-white font-semibold">
          All Candidates
        </div>
        <div className="ml-auto flex">
          <form className="max-w-md mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              </div>
              <input type="search" id="default-search" className="block w-8 p-2 ps-10 text-sm border-2 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-50 dark:border-blue-950" />
            </div>
          </form>
          <div className="border w-24 text-center mx-3 h-9 pt-1 rounded-md bg-blue-950 text-white font-semibold">
            Post Job
          </div>
        </div>
      </div>

      <div className="flex border-0 w-auto mt-4">
        <div className="font-bold text-md mt-1">Back</div>
        <div className="border-0 w-32 text-center mx-3 h-9 pt-2 rounded-md text-blue-600 font-semibold text-sm">
          All Active Jobs
        </div>
        <div className="ml-auto flex">
          <div className="border-0 w-auto text-center mx-3 h-9 rounded-md text-gray-500 font-semibold text-xs pt-2">
            All Candidates 1 of 25
          </div>
          <form className="max-w-md mx-3">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <button type="button" className="block w-10 p-2 text-sm border-1 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-blue-50 dark:border-blue-950">
                <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              </button>
            </div>
          </form>
          <form className="max-w-md mx-auto">
            <div className="relative">
              <button type="button" className="block w-10 p-2 text-sm border-1 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-blue-50 dark:border-blue-950">
                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex">
        <div>
          <table className="border-2 border-b-gray-400 w-60 break-words">
            <thead>
              <ul className="px-4 py-6">
                <li className="text-lg font-bold text-blue-600">Name</li>
                <li className="text-sm font-medium text-gray-500">Job</li>
                <li className="text-sm font-medium text-gray-500">Location</li>
              </ul>
            </thead>
            <tbody>
              {data && data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.job}</td>
                  <td>{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className={'w-[600px] h-[280px] border-2 bg-blue-800 max-w-full flex flex-col items-start justify-start pt-7 px-[33px] pb-[22px] box-border gap-[41px] leading-[normal] tracking-[normal] text-left text-base text-black font-inter mq341:gap-[20px] ${className}'}>
            <img className="w-[660px] h-[248px] relative hidden max-w-full" alt="" src="https://via.placeholder.com/660x248" />
            <img className="w-6 h-6 relative overflow-hidden shrink-0 hidden" alt="" src="https://via.placeholder.com/30" />

            <div className="w-[245px] flex flex-row items-start justify-start gap-[3px]">
              <div className="flex-1 flex flex-col items-start justify-start gap-[22px]">
                <div className="self-stretch rounded-md bg-steelblue-200 flex flex-row items-start justify-start py-2 px-[11px] gap-[11px] z-[2]">
                  <div className="h-10 w-[137px] relative rounded-md bg-steelblue-200 hidden" />
                  <MessageCircle className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px] z-[3]" aria-hidden="true" />
                  <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                    <u className="[text-decoration:none] relative font-black text-[inherit] z-[3]">Message</u>
                  </div>
                </div>
                <div className="rounded-6xs bg-gray-400 flex flex-row items-start justify-start gap-[1px] z-[1] border-[1px] border-solid border-black">
                  <div className="h-[42px] w-[139px] relative rounded-6xs bg-gray-400 box-border hidden border-[1px] border-solid border-black" />
                  <div className="h-10 w-[45px] relative z-[2]">
                    <div className="absolute top-[0px] left-[0px] rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-white w-full h-full">
                      <div className="absolute top-[0px] left-[0px] rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-white w-full h-full hidden" />
                      <CheckCircle className="absolute top-[10px] left-[12px] w-5 h-5 overflow-hidden z-[1]" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="bg-white flex flex-row items-start justify-start py-2 pr-2.5 pl-[11px] z-[2]">
                    <div className="h-10 w-[45px] relative bg-white hidden" />
                    <HelpCircle className="h-6 w-6 relative overflow-hidden shrink-0 z-[1]" aria-hidden="true" />
                  </div>
                  <div className="w-[45px] rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-white flex flex-row items-start justify-start py-2.5 px-3 box-border z-[2]">
                    <div className="h-10 w-[45px] relative rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-white hidden" />
                    <XCircle className="h-5 w-5 relative overflow-hidden shrink-0 z-[1]" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="w-[103px] flex flex-col items-start justify-start gap-[23px]">
                <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-2.5">
                  <div className="flex-1 rounded-md bg-steelblue-200 flex flex-row items-start justify-start py-2 px-3 gap-[8px] z-[1]">
                    <div className="h-10 w-[93px] relative rounded-md bg-steelblue-200 hidden" />
                    <Phone className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px] z-[1]" aria-hidden="true" />
                    <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                      <u className="[text-decoration:none] relative font-black text-[inherit] z-[1]">Call</u>
                    </div>
                  </div>
                </div>
                <div className="w-[45px] rounded-md bg-white flex flex-row items-start justify-start py-2 px-2.5 box-border z-[1]">
                  <div className="h-10 w-[45px] relative rounded-md bg-white hidden" />
                  <MoreVertical className="h-6 w-6 relative overflow-hidden shrink-0 z-[2]" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="w-[275px] flex flex-col items-start justify-start gap-[11px] text-3xl text-black">
              <h3 className="m-0 self-stretch relative text-inherit font-black font-inherit z-[1] mq450:text-lg">
                Yash Chaudhari
              </h3>
              <div className="flex flex-row items-start justify-start py-0 px-px text-base">
                <div className="relative z-[1]">Dombivli, Maharashtra</div>
              </div>
            </div>
            <div className="border-2 text-black w-[600px] h-96 -mx-9 py-4 pt-3 bg-blue-50 px-8 font-bold text-lg">Resume</div>
            <div>
              <div className="w-[600px] -ml-9 -my-8 relative border-2 bg-white flex flex-col items-start justify-start pt-[1.375rem] px-[2.125rem] pb-[1.812rem] box-border gap-[1.562rem] leading-[normal] tracking-[normal]">
                <header className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] text-left text-[1.125rem] text-black font-inter">
                  <div className="flex flex-col items-start justify-start pt-[0.562rem] px-[0rem] pb-[0rem]">
                    <a className="[text-decoration:none] relative font-black text-[inherit] whitespace-nowrap z-[1]">CV</a>
                  </div>
                  <div className="h-[44px] w-[168px] rounded-md bg-blue-900 text-center pt-2 font-bold text-white">
                    Download PDF
                  </div>
                </header>
                <section className="self-stretch h-[100px] relative shadow-[0px_0px_2px_#000] rounded-md bg-tomato z-[1]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidatelist;