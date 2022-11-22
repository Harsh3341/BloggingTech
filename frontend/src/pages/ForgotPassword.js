import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../actions/userAction";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { FORGOT_PASSWORD_RESET } from "../constants/userConstants";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, status } = useSelector(
    (state) => state.profile
  );

  const [credentials, setCredentials] = useState({
    userEmail: "",
  });

  const { userEmail } = credentials;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(userEmail));
  };

  console.log(status);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (status) {
      navigate("/login");
      alert(message);
      dispatch({ type: FORGOT_PASSWORD_RESET });
    }
  }, [dispatch, error, status, message]);

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
          <div className="w-full backdrop-blur-lg h-full p-10 overflow-auto">
            <div className="flex items-center justify-center h-full">
              <div className="md:w-2/6 w-3/4 h-3/4 bg-white rounded-xl shadow-md">
                <form
                  className="flex flex-col p-5 h-full justify-center"
                  onSubmit={resetPasswordSubmit}
                >
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">
                      Enter your email address and we'll send you a link to
                      reset your password.
                    </label>
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="font-bold text-xl">Email address:</label>
                    <input
                      className="w-full px-5 py-1 rounded-lg border-2"
                      type="email"
                      name="userEmail"
                      onChange={handleChange}
                      value={userEmail}
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

export default ForgotPassword;
