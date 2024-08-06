// import landinShip from '../../images'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import './header.css'
const Header = () => (
    <header className="bg-blue-500 text-white text-center py-8 landingShip h-80">
      <div className="container-fluid mx-auto ">
        <div className="md:flex justify-between items-center md:mt-16 block ">
        <button className="order-2 md:me-72 2xl:me-96 bg-white bg-opacity-30 backdrop-blur-md hover:bg-opacity-50 h-28 w-64 rounded-md text-lg text-white">
          <span className="-ms-24">
           I want a Job
           </span>
          <FaRegArrowAltCircleRight className="ms-48 -mt-6 size-6 text-white" />
        </button>
        <button className="2xl:ms-96 order-1 bg-white md:ms-72 md:mt-0 mt-5  bg-opacity-30 backdrop-blur-md hover:bg-opacity-50 h-28 w-64 rounded-md text-lg text-white ">
          <span className="-ms-24">
          I want to Hire
          </span>
          <FaRegArrowAltCircleRight className="ms-48 -mt-6 size-6 text-white" />
        </button>

        </div>
      </div>
    </header>
  );
  
  export default Header;
  