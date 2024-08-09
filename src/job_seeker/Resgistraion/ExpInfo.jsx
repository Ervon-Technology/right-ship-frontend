import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../features/employeeRegistrationSlice';
import Background from "../../images/background.jpg";
import { Link, useNavigate } from 'react-router-dom';

const Experience = () => {

  const navigate=useNavigate()
  const handleNext = () => {
    dispatch(updateData(formData)); // Update the Redux store with current page data
    navigate('/resume&profile');
  };
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.employee);

  const [formData, setFormData] = useState({
    lastVesselType: data.lastVesselType || '',
    presentRank: data.presentRank || '',
    appliedRank: data.appliedRank || '',
    totalSeaExperienceYears: data.totalSeaExperienceYears || '',
    totalSeaExperienceMonths: data.totalSeaExperienceMonths || '',
    totalRankExperienceYears: data.totalRankExperienceYears || '',
    totalRankExperienceMonths: data.totalRankExperienceMonths || '',
    cop: data.cop || '',
    coc: data.coc || '',
    watchKeeping: data.watchKeeping || ''
  });

  useEffect(() => {
    // Update the form data with data from Redux store when the component mounts
    setFormData({
      lastVesselType: data.lastVesselType || '',
      presentRank: data.presentRank || '',
      appliedRank: data.appliedRank || '',
      totalSeaExperienceYears: data.totalSeaExperienceYears || '',
      totalSeaExperienceMonths: data.totalSeaExperienceMonths || '',
      totalRankExperienceYears: data.totalRankExperienceYears || '',
      totalRankExperienceMonths: data.totalRankExperienceMonths || '',
      cop: data.cop || '',
      coc: data.coc || '',
      watchKeeping: data.watchKeeping || ''
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    dispatch(updateData({ [name]: value }));
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-2/5 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}></div>
      <div className="w-full md:w-3/5 h-screen overflow-y-auto bg-white flex justify-center">
        <div className="container-fluid w-9/12">
          <h1 className="text-4xl font-semibold mt-14 mb-2">Your Experience</h1>
          <h6 className='text-lg font-semibold mb-4'>Manish Sir</h6>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-2">
              <label className='text-base'>Last Vessel Type</label>
              <input
                type="text"
                name="lastVesselType"
                value={formData.lastVesselType}
                placeholder="Enter your last vessel type"
                className="w-full border-2 border-gray-200 py-3 px-5 rounded-lg"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <input
                type="text"
                name="presentRank"
                value={formData.presentRank}
                placeholder="Enter your present rank"
                className="w-full border-2 border-gray-200 py-3 px-5 rounded-lg"
                onChange={handleChange}
              />
              <input
                type="text"
                name="appliedRank"
                value={formData.appliedRank}
                placeholder="Enter your applied rank"
                className="w-full border-2 border-gray-200 py-3 px-5 rounded-lg"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-base">Total Sea Experience</label>
                <div className="flex flex-row mt-2">
                  <input
                    type="text"
                    name="totalSeaExperienceYears"
                    value={formData.totalSeaExperienceYears}
                    placeholder="Years"
                    className="w-full border-2 border-gray-200 py-3 px-5 rounded-lg"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="totalSeaExperienceMonths"
                    value={formData.totalSeaExperienceMonths}
                    placeholder="Months"
                    className="w-full border-2 border-gray-200 py-3 px-5 mx-3 rounded-lg"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="text-base">Total Rank Experience</label>
                <div className="flex flex-row mt-2">
                  <input
                    type="text"
                    name="totalRankExperienceYears"
                    value={formData.totalRankExperienceYears}
                    placeholder="Years"
                    className="w-full border-2 border-gray-200 py-3 px-5 rounded-lg"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="totalRankExperienceMonths"
                    value={formData.totalRankExperienceMonths}
                    placeholder="Months"
                    className="w-full border-2 border-gray-200 py-3 px-5 mx-3 rounded-lg"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div>
                <label className="text-base">COP</label>
                <input
                  type="text"
                  name="cop"
                  value={formData.cop}
                  placeholder="Select COP"
                  className="w-full border-2 border-gray-200 py-3 px-5 rounded-lg mt-1"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-base">COC</label>
                <input
                  type="text"
                  name="coc"
                  value={formData.coc}
                  placeholder="Select COC"
                  className="w-full border-2 border-gray-200 py-3 px-5 rounded-lg mt-1"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-base">Watch Keeping</label>
                <input
                  type="text"
                  name="watchKeeping"
                  value={formData.watchKeeping}
                  placeholder="Select watching keeping"
                  className="w-full border-2 border-gray-200 py-3 px-5 rounded-lg mt-1"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-start space-x-4 mt-6">
              <button className="bg-white text-customBlue border font-bold border-customBlue py-2 rounded w-24 text-center">
                BACK
              </button>
              <button  className="bg-customBlue text-white font-bold py-2 rounded w-24 text-center">
                NEXT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Experience;



