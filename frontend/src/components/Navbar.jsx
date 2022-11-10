import { ImBlog } from "react-icons/im";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  function logoutUser() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-white px-6 py-4 shadow">
        <div className="flex container mx-auto flex-row items-center justify-between">
          <div className="flex justify-between items-center">
            <div>
              <a
                className="text-gray-800 text-xl font-bold md:text-2xl"
                href="/"
              >
                <ImBlog />
              </a>
            </div>
          </div>
          <div className="flex flex-row -mx-4 ">
            <a
              className="flex items-center my-1 text-gray-800 hover:text-blue-500 mx-4 "
              href="/"
            >
              <AiFillHome /> Home
            </a>
            <a
              className="flex items-center my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
              href="/create"
            >
              <IoIosCreate />
              Create
            </a>
          </div>
          <div
            className={`group flex md:flex-row flex-col md:-mx-4 ${
              toggle ? "block" : "hidden md:block"
            }`}
          >
            <a
              className="flex items-center my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              <FaUserAlt />
            </a>
            <ul className="absolute right-2 top-10 hidden text-gray-700 pt-1 group-hover:block">
              <li>
                <a
                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="/profile"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="/blog"
                >
                  My Blogs
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
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
            >
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
