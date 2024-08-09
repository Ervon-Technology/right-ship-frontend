const SearchBar = () => (
    <div className="my-8 text-center">
      <h2 className="text-2xl font-semibold mb-2">Find your dream job now</h2>
      <p className="mb-4">5 lakh+ jobs for you to explore</p>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Enter skills / designation / companies"
          className="p-4 w-1/2 border rounded-l-md"
        />
        <button className="bg-customBlue text-white px-6 py-4 rounded-r-md">Search</button>
      </div>
    </div>
  );
  
  export default SearchBar;
  