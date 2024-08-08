import React from 'react';
import CompanyCard from './CompanyCard';
import SectionTitle from './SectionTitle';

const CompaniesSection = ({ title, companies }) => (
  <section className="my-8">
    <SectionTitle title={title} />
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {companies.length > 0 ? (
        companies.map((company, index) => {
          console.log('Rendering Company:', company);
          return (
            <CompanyCard 
              key={index} 
              name={company.company_name} // Adjusted to match data structure
              designation={company.designation || 'N/A'} // Default value if designation is missing
              imageUrl={company.imageUrl || 'https://via.placeholder.com/150'} // Default image if imageUrl is missing
            />
          );
        })
      ) : (
        <p className='text-center '>No companies available</p>
      )}
    </div>
    <div className="text-center mt-4">
      <button className="text-customBlue border-customBlue hover:bg-customBlue hover:text-white border rounded-2xl py-2 px-4 mt-5 rounded-md">View all companies</button>
    </div>
  </section>
);

export default CompaniesSection;
