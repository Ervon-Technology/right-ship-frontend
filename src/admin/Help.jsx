import React, { useState } from 'react';

const Help = () => {
  const [data, setData] = useState({
    issues: { total: 120, critical: 15, solved: 100 },
    companies: [
      { user: 'Company A', issue: 'Issue 1', status: 'Pending', date: '01-01-2023' },
      { user: 'Company B', issue: 'Issue 2', status: 'Active', date: '02-02-2023' },
      { user: 'Company C', issue: 'Issue 3', status: 'Suspended', date: '03-03-2023' },
    ],
    userReviews: [
      { name: 'User 1', email: 'user1@example.com', comment: 'Great service!', date: '04-04-2023' },
      { name: 'User 2', email: 'user2@example.com', comment: 'Needs improvement.', date: '05-05-2023' },
      { name: 'User 3', email: 'user3@example.com', comment: 'Excellent support!', date: '06-06-2023' },
      // Add more user reviews as needed
    ],
    companyData: [
      { name: 'Company X', email: 'companyx@example.com', comment: 'Very responsive.', date: '07-07-2023' },
      { name: 'Company Y', email: 'companyy@example.com', comment: 'Quick turnaround.', date: '08-08-2023' },
      { name: 'Company Z', email: 'companyz@example.com', comment: 'Highly recommend.', date: '09-09-2023' },
      // Add more company data as needed
    ],
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Help and Support</h1>
      <hr className="my-4 border-gray-400" />
      <div className="flex space-x-4 mb-8 w-3/4">
        <Box title="Total Issues Raised" number={data.issues.total}  numberColor="text-blue-500" />
        <Box title="Critical Issues" number={data.issues.critical}  numberColor="text-red-500" />
        <Box title="Solved Issues" number={data.issues.solved}  numberColor="text-green-500" />
      </div>
      <Table data={data.companies} title="Company" headers={["User", "Issue", "Status", "Date", "Action"]} />
      <Table data={data.userReviews} title="User Reviews" headers={["Name", "Email", "Comment", "Date"]} />
      <Table data={data.companyData} title="Company Data" headers={["Name", "Email", "Comment", "Date"]} />
    </div>
  );
};

const Box = ({ title, number, color, numberColor }) => (
  <div className={`flex-1 p-4 border-2 rounded-lg ${color} text-black`}>
    <h2 className="text-lg font-bold">{title}</h2>
    <p className={`text-2xl ${numberColor} font-bold`}>{number}</p>
  </div>
);

const Table = ({ data, title, headers }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-2 ">{title}</h2>
    <table className="min-w-full bg-white ">
      <thead className=" text-black bg-gray-400">
        <tr className=''>
          {headers.map(header => <th key={header} className="py-2 px-16 ">{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-b">
            {headers.map(header => (
              <td key={header} className="py-2 px-18 ">{row[header.toLowerCase()]}</td>
            ))}
            {title === 'Company' && (
              <td className="py-2 px-0">
                <button className="bg-blue-500 text-white px-2 py-1 rounded -ms-44">View</button>
                <button className="bg-green-500 text-white px-2 py-1 ml-2 rounded">Resolve</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Help;
