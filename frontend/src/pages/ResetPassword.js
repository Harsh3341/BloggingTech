import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetpassword, clearErrors } from "../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { RESET_PASSWORD_RESET } from "../constants/userConstants";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, status, user } = useSelector(
    (state) => state.profile
  );

  const { token } = useParams();

  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = credentials;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(resetpassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (status) {
      navigate("/login");
      alert("Password reset successfully");
      dispatch({ type: RESET_PASSWORD_RESET });
    }
  }, [dispatch, error, status]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="w-full h-full bg-gray-100 flex flex-col bg-cover bg-center"
          style={{
            backgroundImage: `url(/img/bg3.jpg)`,
          }}
        >
          <div className="w-full h-full p-10 overflow-auto">
            <div className="flex items-center justify-center h-full">
              <div className="shadow-md md:w-2/6 w-3/4 h-3/4 bg-white rounded-xl ">
                <form
                  className="flex flex-col p-5 h-full justify-center"
                  onSubmit={resetPasswordSubmit}
                >
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">Password:</label>
                    <input
                      className="w-full px-5 py-1 rounded-lg border-2"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={password}
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">
                      Confirm Password:
                    </label>
                    <input
                      className="w-full px-5 py-1 rounded-lg border-2"
                      type="password"
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

export default ResetPassword;
