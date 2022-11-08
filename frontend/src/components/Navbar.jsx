import { ImBlog } from "react-icons/im";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
    navigate("/login");
  }

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
          <div className="group flex flex-col border-2 border-black rounded-full p-1">
            <FaUserAlt />
            <ul className="absolute right-2 top-10 hidden text-gray-700 pt-1 group-hover:block">
              <li>
                <a
                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="/profile"
                >
                  Profile
                </a>
              </li>
              <li onClick={logoutUser}>
                <a
                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="/login"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
