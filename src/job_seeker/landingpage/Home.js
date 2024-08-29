import React, { useEffect, useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import CompaniesSection from './CompaniesSection';

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
          console.log(`Fetched data from ${url}:`, data);
          return data.data; // Ensure this matches the structure of your fetched data
        };

        const [topCompaniesData, featuredCompaniesData, sponsoredCompaniesData, subscriptionData] = await Promise.all([
          fetchData(`${process.env.REACT_APP_API_URL}/company/get`),
          fetchData(`${process.env.REACT_APP_API_URL}/company/get`),
          fetchData(`${process.env.REACT_APP_API_URL}/company/get`),
          fetchData(`${process.env.REACT_APP_API_URL}/subscription/get`),
        ]);

        console.log('Top Companies Data:', topCompaniesData);
        console.log('Featured Companies Data:', featuredCompaniesData);
        console.log('Sponsored Companies Data:', sponsoredCompaniesData);
        console.log('Subscription Data:', subscriptionData);

        setSubscriptions(subscriptionData);

        const filterCompaniesWithSubscriptions = (companies) => {
          if (!Array.isArray(companies)) return [];
          console.log('Filtering companies with subscriptions');
          return companies.filter((company) => {
            const hasSubscription = subscriptionData.some((sub) => {
              console.log(`Comparing ${sub.company_id} with ${company.company_id}`);
              return sub.company_id === company.company_id;
            });
            console.log(`Company ${company.company_name} has subscription: ${hasSubscription}`);
            return hasSubscription;
          });
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

  useEffect(() => {
    console.log('Top Companies:', topCompanies);
    console.log('Featured Companies:', featuredCompanies);
    console.log('Sponsored Companies:', sponsoredCompanies);
  }, [topCompanies, featuredCompanies, sponsoredCompanies]);

  return (
    <div>
      <Header />
      <SearchBar />
      <div className="container mx-auto px-4">
        <CompaniesSection title="Top Companies" companies={topCompanies} />
        <CompaniesSection title="Featured Companies" companies={featuredCompanies} />
        <CompaniesSection title="Sponsored Companies" companies={sponsoredCompanies} />
      </div>
    </div>
  );
};

export default HomePage;
