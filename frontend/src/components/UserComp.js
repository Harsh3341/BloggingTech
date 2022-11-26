import { useNavigate } from "react-router-dom";
import { searchedUser } from "../actions/userAction";
import { useDispatch } from "react-redux";

const UserComp = (post) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <li className="flex items-center mt-3 mb-3">
      <img
        className="w-10 h-10 object-cover rounded-full mx-4"
        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
        alt="avatar"
      />
      <p>
        <a
          className="text-gray-700 font-bold mx-1 hover:underline"
          href={`/${post.username}`}
        >
          {post.name}
        </a>
        <span className="text-gray-700 text-sm font-light"></span>
      </p>
    </li>
  );
};

export default UserComp;
