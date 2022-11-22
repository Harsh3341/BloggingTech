import Navbar from "../components/Navbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updatePassword, clearErrors } from "../actions/userAction";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [credentials, setCredentials] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newPassword, confirmPassword } = credentials;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());

      setCredentials({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }

    if (isUpdated) {
      navigate("/profile");
      dispatch({ type: UPDATE_PASSWORD_RESET });
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
          <div className="w-full backdrop-blur-lg h-full p-10 overflow-auto">
            <div className="flex items-center justify-center h-full">
              <div className="md:w-2/6 w-3/4 h-3/4 bg-white rounded-xl shadow-md">
                <form
                  className="flex flex-col p-5 h-full justify-center"
                  onSubmit={resetPasswordSubmit}
                >
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">Old Password: </label>
                    <input
                      className="w-full px-5 py-1 rounded-lg border-2"
                      type="Password"
                      name="oldPassword"
                      onChange={handleChange}
                      value={oldPassword}
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">New Password: </label>
                    <input
                      className="w-full px-5 py-1 rounded-lg border-2"
                      type="Password"
                      name="newPassword"
                      onChange={handleChange}
                      value={newPassword}
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">
                      Confirm Password:
                    </label>
                    <input
                      className="w-full px-5 py-1 rounded-lg border-2"
                      type="Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={confirmPassword}
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

export default ChangePassword;
