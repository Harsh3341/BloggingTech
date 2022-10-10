import { ImBlog } from "react-icons/im";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="flex justify-between p-2 bg-gray-100 shadow-md h-14 items-center">
          <div>
            <ImBlog />
          </div>
          <div className=" flex rounded w-2/4 justify-evenly items-center border-y-2 border-y-gray-700">
            <div>
              <a
                className="flex justify-center items-center hover:text-blue-500"
                href="/"
              >
                <AiFillHome />
                Home
              </a>
            </div>
            <div>
              <a
                className="flex justify-center items-center hover:text-blue-500"
                href="/create"
              >
                <IoIosCreate />
                Create
              </a>
            </div>
          </div>
          <div>
            <BsFillBellFill />
          </div>
          <div className="border-2 border-black rounded-full p-1">
            <FaUserAlt />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
