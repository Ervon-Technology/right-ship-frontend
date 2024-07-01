import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaEye as Eye } from 'react-icons/fa';

const Dashboard = () => {
    
                                        // Api parts


    // const [jobData, setJobData] = useState([]);
    // const [orderData, setOrderData] = useState([]);
    // const [candidateData, setCandidateData] = useState([]);
    // const [graphData, setGraphData] = useState([]);
  
    // useEffect(() => {
    //   // Function to fetch job data
    //   const fetchJobData = async () => {
    //     try {
    //       const response = await axios.get('https://api.example.com/jobs');
    //       setJobData(response.data);
    //     } catch (error) {
    //       console.error('Error fetching job data:', error);
    //     }
    //   };
  
    //   // Function to fetch order data
    //   const fetchOrderData = async () => {
    //     try {
    //       const response = await axios.get('https://api.example.com/orders');
    //       setOrderData(response.data);
    //     } catch (error) {
    //       console.error('Error fetching order data:', error);
    //     }
    //   };
  
    //   // Function to fetch candidate data
    //   const fetchCandidateData = async () => {
    //     try {
    //       const response = await axios.get('https://api.example.com/candidates');
    //       setCandidateData(response.data);
    //     } catch (error) {
    //       console.error('Error fetching candidate data:', error);
    //     }
    //   };
  
    //   // Function to fetch graph data
    //   const fetchGraphData = async () => {
    //     try {
    //       const response = await axios.get('https://api.example.com/graph');
    //       setGraphData(response.data);
    //     } catch (error) {
    //       console.error('Error fetching graph data:', error);
    //     }
    //   };
  
    //   // Call all fetch functions
    //   fetchJobData();
    //   fetchOrderData();
    //   fetchCandidateData();
    //   fetchGraphData();
    // }, []);
  const jobData = [
    { job: 'Marine Officer', companyName: 'Scorpio', experience: '2.5 yrs', jobType: 'Full-time' },
    { job: 'Deck Officer', companyName: 'Maersk', experience: '3 yrs', jobType: 'Contract' },
    { job: 'Engineer', companyName: 'Shell', experience: '5 yrs', jobType: 'Full-time' },
    { job: 'Cook', companyName: 'Carnival', experience: '1 yr', jobType: 'Part-time' },
    { job: 'Steward', companyName: 'Princess', experience: '2 yrs', jobType: 'Full-time' },
    { job: 'Pilot', companyName: 'Delta', experience: '6 yrs', jobType: 'Contract' },
    { job: 'Manager', companyName: 'ABC Corp', experience: '4 yrs', jobType: 'Full-time' },
    { job: 'Technician', companyName: 'XYZ Inc', experience: '3 yrs', jobType: 'Contract' },
    { job: 'Supervisor', companyName: '123 Ltd', experience: '7 yrs', jobType: 'Full-time' },
    { job: 'Operator', companyName: 'LMN Co', experience: '2 yrs', jobType: 'Part-time' }
  ];

  const orderData = [
    { orderId: '#1234', name: 'Nishikant Sahoo', plan: 'Standard Plan', purchaseDate: '2024-06-01', expiryDate: '2025-06-01' },
    { orderId: '#1235', name: 'Jane Doe', plan: 'Premium Plan', purchaseDate: '2024-07-01', expiryDate: '2025-07-01' },
    { orderId: '#1236', name: 'John Smith', plan: 'Standard Plan', purchaseDate: '2024-08-01', expiryDate: '2025-08-01' },
    { orderId: '#1237', name: 'Emily Davis', plan: 'Basic Plan', purchaseDate: '2024-09-01', expiryDate: '2025-09-01' },
    { orderId: '#1238', name: 'Michael Brown', plan: 'Premium Plan', purchaseDate: '2024-10-01', expiryDate: '2025-10-01' },
    { orderId: '#1239', name: 'Jessica Wilson', plan: 'Standard Plan', purchaseDate: '2024-11-01', expiryDate: '2025-11-01' },
    { orderId: '#1240', name: 'David Miller', plan: 'Basic Plan', purchaseDate: '2024-12-01', expiryDate: '2025-12-01' },
    { orderId: '#1241', name: 'Laura Garcia', plan: 'Premium Plan', purchaseDate: '2025-01-01', expiryDate: '2026-01-01' },
    { orderId: '#1242', name: 'Daniel Martinez', plan: 'Standard Plan', purchaseDate: '2025-02-01', expiryDate: '2026-02-01' },
    { orderId: '#1243', name: 'Sarah Anderson', plan: 'Basic Plan', purchaseDate: '2025-03-01', expiryDate: '2026-03-01' }
  ];

  const candidateData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', createdTime: '2024-01-01', plan: 'Standard Plan' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', status: 'Inactive', createdTime: '2024-02-01', plan: 'Premium Plan' },
    { id: 3, name: 'Michael Smith', email: 'michael@example.com', status: 'Active', createdTime: '2024-03-01', plan: 'Standard Plan' },
    { id: 4, name: 'Emily Johnson', email: 'emily@example.com', status: 'Inactive', createdTime: '2024-04-01', plan: 'Basic Plan' },
    { id: 5, name: 'David Brown', email: 'david@example.com', status: 'Active', createdTime: '2024-05-01', plan: 'Standard Plan' },
    { id: 6, name: 'Jessica Davis', email: 'jessica@example.com', status: 'Inactive', createdTime: '2024-06-01', plan: 'Premium Plan' },
    { id: 7, name: 'Daniel Martinez', email: 'daniel@example.com', status: 'Active', createdTime: '2024-07-01', plan: 'Standard Plan' },
    { id: 8, name: 'Laura Garcia', email: 'laura@example.com', status: 'Inactive', createdTime: '2024-08-01', plan: 'Basic Plan' },
    { id: 9, name: 'Sarah Anderson', email: 'sarah@example.com', status: 'Active', createdTime: '2024-09-01', plan: 'Standard Plan' },
    { id: 10, name: 'Johnathan Wilson', email: 'johnathan@example.com', status: 'Inactive', createdTime: '2024-10-01', plan: 'Premium Plan' }
  ];

  const graphData = [
    { month: 'Jan', jobs: 1200 },
    { month: 'Feb', jobs: 1100 },
    { month: 'Mar', jobs: 1400 },
    { month: 'Apr', jobs: 1300 },
    { month: 'May', jobs: 900 },
    { month: 'Jun', jobs: 1000 },
    { month: 'Jul', jobs: 1500 },
    { month: 'Aug', jobs: 1250 },
    { month: 'Sep', jobs: 1350 },
    { month: 'Oct', jobs: 1100 },
    { month: 'Nov', jobs: 1200 },
    { month: 'Dec', jobs: 1300 }
  ];
  
//   function ColorBar(data) {
//     if(data.jobs>1200){
//         return '#2563eb'
//     }else{                ------------------------------  for api
//         return '#93c5fd'
//     }
    
//   }



 
  
  const openTab = (data, title) => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div class="p-4">
            <h1 class="text-2xl font-bold mb-2">${title}</h1>
            <table class="w-full border border-gray-300">
              <thead>
                <tr class="bg-gray-100">
                  ${Object.keys(data[0]).map(key => `<th class="border border-gray-300 p-2">${key.charAt(0).toUpperCase() + key.slice(1)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${data.map(row => `
                  <tr>
                    ${Object.values(row).map(value => `<td class="border border-gray-300 p-2">${value}</td>`).join('')}
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <hr className="mb-4" />

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Box 1 */}
        <div className="bg-white p-4 shadow rounded flex">
          <div className="bg-yellow-500 p-6 rounded mb-2 w-11"></div>
          <p className="text-sm ms-4 font-bold">Totall Companies</p>
          <p className="mt-6 -ms-28 text-sm">1234</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex">
          <div className="bg-yellow-200 p-6 rounded mb-2 w-11"></div>
          <p className="text-sm ms-4 font-bold">Totall Candidate</p>
          <p className="mt-6 -ms-28 text-sm">1234</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex">
          <div className="bg-yellow-500 p-6 rounded mb-2 w-11"></div>
          <p className="text-sm ms-4 font-bold">Active Users</p>
          <p className="mt-6 -ms-20 text-sm">1234</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex">
          <div className="bg-yellow-500 p-6 rounded mb-2 w-11"></div>
          <p className="text-sm ms-4 font-bold">All Jobs</p>
          <p className="mt-6 -ms-14 text-sm">1234</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex">
          <div className="bg-green-500 p-6 rounded mb-2 w-11"></div>
          <p className="text-sm ms-4 font-bold">Active Jobs</p>
          <p className="mt-6 -ms-20 text-sm">1234</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex">
          <div className="bg-pink-500 p-6 rounded mb-2 w-11"></div>
          <p className="text-sm ms-4 font-bold">Expired Jobs</p>
          <p className="mt-6 -ms-20 text-sm">1234</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex">
          <div className="bg-green-300 p-6 rounded mb-2 w-11"></div>
          <p className="text-sm ms-4 font-bold">Earnings</p>
          <p className="mt-6 -ms-14 text-sm">1234</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex">
          <div className="bg-yellow-500 p-6 rounded mb-2 w-11"></div>
          <p className="text-sm ms-4 font-bold">Non-Active Users</p>
          <p className="mt-6 -ms-28 text-sm">1234</p>
        </div>
        
        
      </div>

      <div className="relative bg-blue-100 rounded-lg shadow  mb-4">
        <h2 className="text-xl font-bold  ms-8">  Jobs Overview</h2>
        <hr className="mt-8 mb-4" />
        <ResponsiveContainer width="100%" height={400}>
        <BarChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Legend />

  {/* <Bar dataKey="jobs">
      {graphData.map((entry, index) => (
        <Bar key={`bar-${index}`} data={entry} fill={ColorBar(entry)} />        this is for api part
      ))}
    </Bar> */}
      <Bar dataKey="jobs" fill="#2563eb" />
</BarChart>

        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="bg-blue-700 text-white p-4 rounded-t flex justify-between items-center h-16">
            <h2 className="text-xl font-bold">Recently Published Jobs</h2>
            <button className="bg-white text-black px-4 py-2 rounded" onClick={() => openTab(jobData, 'Recently Published Jobs')}>View All</button>
          </div>
          <div className="bg-white shadow rounded-b mb-4 overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Job</th>
                  <th className="border border-gray-300 p-2">Company Name</th>
                  <th className="border border-gray-300 p-2">Experience</th>
                  <th className="border border-gray-300 p-2">Job Type</th>
                </tr>
              </thead>
              <tbody>
                {jobData.slice(0, 4).map((job, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{job.job}</td>
                    <td className="border border-gray-300 p-2">{job.companyName}</td>
                    <td className="border border-gray-300 p-2">{job.experience}</td>
                    <td className="border border-gray-300 p-2">{job.jobType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="bg-blue-700 text-white p-4 rounded-t flex justify-between items-center h-16">
            <h2 className="text-xl font-bold">Recently Purches Plans</h2>
            <button className="bg-white text-black px-4 py-2 rounded" onClick={() => openTab(orderData, 'Orders')}>View All</button>
          </div>
          <div className="bg-white shadow rounded-b mb-4 overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Order ID</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Plan</th>
                  <th className="border border-gray-300 p-2">Purchase Date</th>
                  <th className="border border-gray-300 p-2">Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {orderData.slice(0, 4).map((order, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{order.orderId}</td>
                    <td className="border border-gray-300 p-2">{order.name}</td>
                    <td className="border border-gray-300 p-2">{order.plan}</td>
                    <td className="border border-gray-300 p-2">{order.purchaseDate}</td>
                    <td className="border border-gray-300 p-2">{order.expiryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-blue-700 text-white p-4 rounded-t flex justify-between items-center h-16">
        <h2 className="text-xl font-bold">Latest Users</h2>
        <button className="bg-white text-black px-4 py-2 rounded" onClick={() => openTab(candidateData, 'Latest Users')}>View All Candidates</button>
      </div>
      <div className="bg-white shadow rounded-b mb-4 overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Created Time</th>
              <th className="border border-gray-300 p-2">Plan</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidateData.slice(0, 4).map((candidate, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{candidate.id}</td>
                <td className="border border-gray-300 p-2">{candidate.name}</td>
                <td className="border border-gray-300 p-2">{candidate.email}</td>
                <td className="border border-gray-300 p-2">{candidate.status}</td>
                <td className="border border-gray-300 p-2">{candidate.createdTime}</td>
                <td className="border border-gray-300 p-2">{candidate.plan}</td>
                <td className="border border-gray-300 p-2"><Eye /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
