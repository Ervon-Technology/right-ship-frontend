import React from 'react';
import { FaRegSadCry, FaBuilding, FaArrowRight } from "react-icons/fa";
import CompanyCard from './CompanyCard';
import SectionTitle from './SectionTitle';

const CompaniesSection = ({ title, companies }) => (
  <section className="my-16 px-4">
    <SectionTitle title={title} className="text-3xl font-bold text-center mb-8 text-gray-800" />
    {companies.length > 0 ? (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <CompanyCard 
              key={index} 
              name={company.company_name}
              designation={company.designation || 'N/A'}
              imageUrl={company.imageUrl || 'https://via.placeholder.com/150'}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="group inline-flex items-center bg-customBlue text-white hover:bg-customDarkBlue rounded-full py-3 px-8 transition duration-300 shadow-md hover:shadow-lg">
            View all companies
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
        <div className="bg-white p-6 rounded-full mb-6 shadow-inner">
          <FaRegSadCry className="text-6xl text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">Oops! No companies found</h3>
        <p className="text-md text-gray-600 mb-6 text-center max-w-md">
          It looks like we haven't listed any companies here yet. Want to be the first? Reach out to us, and let's get your company featured!
        </p>
        <a href="mailto:hello@ship" className="inline-flex items-center bg-customBlue text-white hover:bg-customDarkBlue rounded-full py-3 px-8 transition duration-300 shadow-md hover:shadow-lg">
          <FaBuilding className="mr-2" />
          Contact us at info@rightships.com
        </a>
      </div>
    )}
  </section>
);

export default CompaniesSection;