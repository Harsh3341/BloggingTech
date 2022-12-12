import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors, lodeUser } from "../actions/userAction";
import Loading from "../components/loading/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    username: "",
  });

  const { name, email, username } = credentials;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(name, username, email));

    setCredentials({
      name: "",
      email: "",
      username: "",
    });
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Profile updated successfully");
      dispatch(lodeUser());
      navigate("/profile");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="flex flex-col h-screen w-full bg-gray-100 overflow-x-hidden overflow-y-auto bg-cover bg-center"
          style={{
            backgroundImage: `url(/img/bg3.jpg)`,
          }}
        >
          <Navbar />
          <div className="w-full h-full p-10 overflow-auto">
            <div className="flex items-center justify-center h-full">
              <div className="md:w-2/6 w-3/4 h-3/4 bg-white rounded-xl shadow-md">
                <form
                  className="flex flex-col p-5 h-full justify-center"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">Name:</label>
                    <input
                      className="w-full px-5 py-1 rounded-lg border-2"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={name}
                      placeholder={user.name}
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">Username:</label>
                    <input
                      className="w-full px-5 py-1 rounded-lg border-2"
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={username}
                      placeholder={user.username}
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">Email:</label>
                    <input
                      className="w-full px-5 py-1 rounded-lg border-2"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={email}
                      placeholder={user.email}
                    />
                  </div>
                  <div className="flex flex-col my-4 font-bold text-lg w-full items-center">
                    <button className="border-2 w-1/4 rounded-lg hover:border-black hover:ease-in duration-300  hover:-translate-y-1 hover:scale-105 ">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
