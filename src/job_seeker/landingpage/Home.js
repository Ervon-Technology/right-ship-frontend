import Header from './Header';
import SearchBar from './SearchBar';
import CompaniesSection from './CompaniesSection';

const HomePage = () => {
  const topCompanies = [
    { name: 'Sea and Beyond', designation: 'Marine Advisor', imageUrl: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66aba0e97d9bb-infosys-015119273-16x9.png?size=948:533' },
    { name: 'Sea and Beyond', designation: 'Credit Manager', imageUrl: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66aba0e97d9bb-infosys-015119273-16x9.png?size=948:533' },
    { name: 'Suraksha Marine', designation: 'Captain', imageUrl: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66aba0e97d9bb-infosys-015119273-16x9.png?size=948:533' },
    { name: 'Infosys', designation: 'Naval Engineer', imageUrl: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66aba0e97d9bb-infosys-015119273-16x9.png?size=948:533' },
  ];

  const featuredCompanies = [
    { name: 'Torm', designation: 'Export Assistant', imageUrl: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66aba0e97d9bb-infosys-015119273-16x9.png?size=948:533' },
    { name: 'Campbell', designation: 'Export Assistant', imageUrl: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66aba0e97d9bb-infosys-015119273-16x9.png?size=948:533' },
    // ... more companies with imageUrl
  ];

  const sponsoredCompanies = [
    { name: 'Torm', designation: 'Export Assistant', imageUrl: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66aba0e97d9bb-infosys-015119273-16x9.png?size=948:533' },
    { name: 'Campbell', designation: 'Export Assistant', imageUrl: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66aba0e97d9bb-infosys-015119273-16x9.png?size=948:533' },
    // ... more companies with imageUrl
  ];

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
