import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import Loading from "../components/Loading";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 h-screen flex justify-center items-center p-8">
          <div className="shadow-sm border-y-2 border-y-stone-900 bg-gray-100 h-5/6 w-2/3 transition  ease-in-out delay-150 hover:-translate-y-1 hover:shadow-2xl duration-300 flex flex-col items-center p-8">
            <h1>Sign In</h1>
            <div className="flex justify-center items-center w-full h-full">
              <form className=" h-3/4 w-3/4 p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center mb-8">
                  <label>Email</label>
                  <input
                    className="border-2 border-gray-500 h-10 p-1"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col items-center mb-8">
                  <label>Password</label>
                  <input
                    className="border-2 border-gray-500  h-10 p-1"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col items-center ">
                  <button
                    className="bg-red-500 rounded-2xl w-28 h-10"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
