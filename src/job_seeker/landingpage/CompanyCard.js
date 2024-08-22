import React from 'react';

const CompanyCard = ({ name, designation, imageUrl }) => (
  <div className="border p-4 rounded-md shadow-md text-center">
    <img src={imageUrl} alt={`${name} logo`} className="mx-auto mb-2 w-16 h-16 object-contain" />
    <h3 className="font-semibold text-lg mb-2">{name}</h3>
    <p className="border rounded-2xl">{designation}</p>
  </div>
);

export default CompanyCard;
