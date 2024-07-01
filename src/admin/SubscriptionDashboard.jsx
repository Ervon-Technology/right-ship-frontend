import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const SubscriptionDashboard = () => {
  const [data, setData] = useState([
    { companyName: 'Company A', plan: 'Premium', status: 'Active', isSponsor: false },
    { companyName: 'Company B', plan: 'Standard', status: 'Pending', isSponsor: false },
    { companyName: 'Company C', plan: 'Enterprise', status: 'Deactive', isSponsor: true }
  ]);

  // Uncomment and use this code to fetch data from a backend API
  /*
  useEffect(() => {
    axios.get('/api/subscription')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the subscription data!', error);
      });
  }, []);
  */

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-200 text-green-400';
      case 'Deactive':
        return 'bg-red-200 text-red-400';
      case 'Pending':
        return 'bg-yellow-200 text-yellow-400';
      default:
        return '';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-left mb-4">Subscription Dashboard</h1>
      <div className="border-solid border-2 p-4 rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Company Name</th>
              <th className="py-2 px-4 border-b text-left">Subscription Plan</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index === data.length - 1 ? 'bg-yellow-100' : ''}>
                <td className="py-2 px-4 border-b flex justify-between items-center">
                  {item.companyName}
                  {item.isSponsor && (
                    <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded ml-2">Sponsor</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">{item.plan}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`py-1 px-2 rounded-2xl ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionDashboard;
