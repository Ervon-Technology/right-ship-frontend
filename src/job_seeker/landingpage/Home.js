import React, { useEffect, useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';

// Importing the images
import Company1 from '../../images/companies/Company 1.jpg';
import Company2 from '../../images/companies/Company 2.jpg';
import Company3 from '../../images/companies/Company 3.jpg';
import Company4 from '../../images/companies/Company 4.jpg';
import Company5 from '../../images/companies/Company 5.jpg';
import Company6 from '../../images/companies/Company 6.jpeg';
import Company7 from '../../images/companies/Company 7.jpg';
import Company8 from '../../images/companies/Company 8.jpg';
import Company9 from '../../images/companies/Company 9.jpg';
import Company10 from '../../images/companies/Company 10.jpg';
import Company11 from '../../images/companies/Company 11.jpg';
import Company12 from '../../images/companies/Company 12.jpg';
import Company13 from '../../images/companies/Company 13.jpg';
import Company14 from '../../images/companies/Company 14.jpg';
import Company15 from '../../images/companies/Company 15.jpeg';
import Company16 from '../../images/companies/Company 16.jpg';
import Company17 from '../../images/companies/Company 17.jpg';
import Company18 from '../../images/companies/Company 18.jpg';
import Company19 from '../../images/companies/Company 19.jpg';
import Company20 from '../../images/companies/Company 20.jpg';
import Company21 from '../../images/companies/Company 21.jpg';
import Company22 from '../../images/companies/Company 22.jpg';
import Company23 from '../../images/companies/Company 23.jpeg';
import Company24 from '../../images/companies/Company 24.jpg';

const HomePage = () => {
  const [topCompanies, setTopCompanies] = useState([]);
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [sponsoredCompanies, setSponsoredCompanies] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const fetchData = async (url) => {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': '*/*',
              'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          });
          const data = await response.json();
          return data.data; // Ensure this matches the structure of your fetched data
        };

        const [topCompaniesData, featuredCompaniesData, sponsoredCompaniesData, subscriptionData] = await Promise.all([
          // fetchData(`${process.env.REACT_APP_API_URL}/company/get`),
          // fetchData(`${process.env.REACT_APP_API_URL}/company/get`),
          // fetchData(`${process.env.REACT_APP_API_URL}/company/get`),
          fetchData(`${process.env.REACT_APP_API_URL}/subscription/get`),
        ]);

        setSubscriptions(subscriptionData);

        const filterCompaniesWithSubscriptions = (companies) => {
          return companies.filter((company) =>
            subscriptionData.some((sub) => sub.company_id === company.company_id)
          );
        };

        setTopCompanies(filterCompaniesWithSubscriptions(topCompaniesData));
        setFeaturedCompanies(filterCompaniesWithSubscriptions(featuredCompaniesData));
        setSponsoredCompanies(filterCompaniesWithSubscriptions(sponsoredCompaniesData));
      } catch (error) {
        console.error('Error fetching companies or subscriptions:', error);
      }
    };

    fetchCompanies();
  }, []);

  // Array of imported images
  const companyImages = [
    { src: Company1, alt: 'Company 1' },
    { src: Company2, alt: 'Company 2' },
    { src: Company3, alt: 'Company 3' },
    { src: Company4, alt: 'Company 4' },
    { src: Company5, alt: 'Company 5' },
    { src: Company6, alt: 'Company 6' },
    { src: Company7, alt: 'Company 7' },
    { src: Company8, alt: 'Company 8' },
    { src: Company9, alt: 'Company 9' },
    { src: Company10, alt: 'Company 10' },
    { src: Company11, alt: 'Company 11' },
    { src: Company12, alt: 'Company 12' },
    { src: Company13, alt: 'Company 13' },
    { src: Company14, alt: 'Company 14' },
    { src: Company15, alt: 'Company 15' },
    { src: Company16, alt: 'Company 16' },
    { src: Company17, alt: 'Company 17' },
    { src: Company18, alt: 'Company 18' },
    { src: Company19, alt: 'Company 19' },
    { src: Company20, alt: 'Company 20' },
    { src: Company21, alt: 'Company 21' },
    { src: Company22, alt: 'Company 22' },
    { src: Company23, alt: 'Company 23' },
    { src: Company24, alt: 'Company 24' },
  ];

  return (
    <div>
      <Header />
      <SearchBar />
      <div className="container mx-auto px-4">
        <div className="my-8">
          <h2 className="text-3xl font-bold text-center mb-12">Top Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
            {companyImages.map((image, index) => (
              <a href="#" key={index} className="block hover:shadow-lg transition-shadow duration-200">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover rounded-md"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
