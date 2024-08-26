import { FaRegArrowAltCircleRight } from "react-icons/fa";
import './header.css';
import Iwantjob from "../../images/landing/iwantajob.png";
import Iwanttohire from "../../images/landing/iwanttohire.png";
import { Link } from "react-router-dom";

const Header = () => (
  <section className="landingShip py-9">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap ">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <Link to="/login">
            <img src={Iwantjob} alt="I Want a Job" className="w-full h-auto opacity-75" />
          </Link>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <Link to="/company/register">
            <img src={Iwanttohire} alt="I Want to Hire" className="w-full h-auto opacity-75" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Header;
