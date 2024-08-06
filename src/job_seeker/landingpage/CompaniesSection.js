import CompanyCard from './CompanyCard';
import SectionTitle from './SectionTitle';

const CompaniesSection = ({ title, companies }) => (
  <section className="my-8">
    <SectionTitle title={title} />
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {companies.map((company, index) => (
        <CompanyCard 
          key={index} 
          name={company.name} 
          designation={company.designation} 
          imageUrl={company.imageUrl} // Pass imageUrl prop
        />
      ))}
    </div>
    <div className="text-center mt-4">
      <button className="text-customBlue border-customBlue hover:bg-customBlue hover:text-white border rounded-2xl py-2 px-4 mt-5 rounded-md">View all companies</button>
    </div>
  </section>
);

export default CompaniesSection;
