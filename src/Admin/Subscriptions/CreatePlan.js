import React from 'react';

const Createplan = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="text-xl font-bold text-left">Plan Management</h1>
        <h2 className="text-lg font-semibold">Create Subscription Plan</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Booster Plan"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              placeholder="Get high recommend"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                placeholder="0-3 months"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            <input
              type="text"
              placeholder="Plan feature"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button className="px-4 py-2 me-12 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Preview</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createplan;