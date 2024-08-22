import { FaRegArrowAltCircleRight } from "react-icons/fa";
import './header.css';
import Iwantjob from "../../images/landing/iwantajob.svg";
import Iwanttohire from "../../images/landing/iwanttohire.svg";
import { Link } from "react-router-dom";

const Header = () => (
  <section className="landingShip py-9">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <Link to="/login">
            <img src={Iwantjob} alt="I Want a Job" className="w-full h-auto" />
          </Link>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <Link to="/hire">
            <img src={Iwanttohire} alt="I Want to Hire" className="w-full h-auto" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Header;
