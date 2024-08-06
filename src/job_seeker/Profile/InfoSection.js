import React from 'react';

function InfoSection() {
  return (
    <div className=" p-4  space-y-1 overflow-scroll">
      <div className="p-4 bg-white border-2">
        <h3 className="text-lg font-semibold">Last Vessel Type</h3>
        <div className="mt-2 text-black"><b>Ship Name</b></div>
      </div>
      <div className="p-4 bg-white border-2">
        <h3 className="text-lg font-semibold">Vessel Applied For</h3>
        <div className="mt-2 text-black"><b>Ship Name</b></div>
      </div>
      <div className="p-4 bg-white border-2">
        <h3 className="text-lg font-semibold">Date of Availability</h3>
        <div className="mt-2 text-black"><b>23 Aug, 2024</b></div>
      </div>
      <div className="p-4 bg-white border-2">
        <h3 className="text-lg font-semibold">Contact Detail</h3>
        <div className="mt-2 text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <p className='text-sm'>Email ID: <b>ancreation4004@gmail.com</b></p>
  <p className='text-sm'>WhatsApp Number: <b>+91838474756</b></p>
  <p className='text-sm'>Date of Birth: <br/><b>17 April, 2002</b></p>
  <p className='text-sm'>Age: <br/><b>20 yrs</b></p>
  <p className='text-sm'>Gender:<br/> <b>Male</b></p>
</div>

      </div>
      <div className="p-4 bg-white border-2">
        <h3 className="text-lg font-semibold">Experience</h3>
        <div className="mt-2 text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <p className='text-sm'>Total Sea Experience:<br/><b> 2 yrs, 3 months</b></p>
          <p className='text-sm'>Total Last Rank Experience:<br/><b> 2 yrs, 3 months</b></p>
          <p className='text-sm'>Present Rank:<br/><b> No</b></p>
          <p className='text-sm'>Last Rank:<br/><b>No</b></p>
        </div>
      </div>
      <div className="p-4 bg-white border-2">
        <h3 className="text-lg font-semibold">License Holding</h3>
        <div className="mt-2 text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <p className='text-sm'>COC: <br/><b> ancreation4004@gmail.com</b></p>
          <p className='text-sm'>COP: <br/><b> ancreation4004@gmail.com</b></p>
          <p className='text-sm'>Watch Keeping: <br/><b> ancreation4004@gmail.com</b></p>
        </div>
      </div>
      <div className="p-4 bg-white border-2 ">
        <h3 className="text-lg font-semibold">Address</h3>
        <div className="mt-2 text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <p className='text-sm'>Address:<br/> <b>XXXXXXXXXX</b></p>
          <p className='text-sm'>Address 2:<br/> <b>XXXXXXXXXX</b></p>
          <p className='text-sm'>State:<br/> <b>XXXXXXXXXX</b></p>
          <p className='text-sm'>Pincode:<br/> <b>XXXXXXXXXX</b></p>
          <p className='text-sm'>Nationality:<br/> <b>XXXXXXXXXX</b></p>
          <p className='text-sm'>City:<br/> <b>XXXXXXXXXX</b></p>
          <p className='text-sm'>Country:<br/> <b>XXXXXXXXXX</b></p>
        </div>
      </div>
      <div className="p-4 bg-white border-2">
        <h3 className="text-lg font-semibold">Others</h3>
        <div className="mt-2 text-black flex gap-10">
          <p>Height:<br/> <b>Yes</b></p>
          <p>BMI:<br/><b> 9.2</b></p>
          <p>Weight (KG):<br/> <b>Yes</b></p>
          <p>SID CARD:<br/><b> 9.2</b></p>
          <p>Willing to accept lower rank:<br/> <b>Yes</b></p>
          
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
