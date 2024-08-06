import React , { useState }from 'react';
import ProfileCard from './ProfileCard';
import InfoSection from './InfoSection';
import FileUploadComponent from './FileUploadComponent';
import Advertiesment from './Advertiesment';
// import './main.css'

function Main() {

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <aside className="w-full lg:w-2/6 ms-5 py-0 bg-white shadow-md ">
        <ProfileCard />
        <FileUploadComponent/>
        <Advertiesment/>

      </aside>
      <main className="w-full lg:w-3/4 p-4 -mt-8 -ms-4  ">
        <InfoSection />
      </main>
    </div>
  );
}

export default Main;
