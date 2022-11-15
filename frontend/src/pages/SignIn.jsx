import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { ImBlog } from "react-icons/im";

const SignIn = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

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
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white font-family-karla w-full h-screen">
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                <a href="/" className="font-bold text-xl p-4">
                  <ImBlog />
                </a>
              </div>

              <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p className="text-center text-3xl">Welcome.</p>
                <form
                  className="flex flex-col pt-3 md:pt-8"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col pt-4">
                    <label for="email" className="text-lg">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="flex flex-col pt-4">
                    <label for="password" className="text-lg">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <input
                    type="submit"
                    value="Log In"
                    className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                  />
                </form>
                <div className="text-center pt-12 pb-12">
                  <p>
                    Don't have an account?{" "}
                    <a href="/signup" className="underline font-semibold">
                      Register here.
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="w-1/2 shadow-2xl">
              <img
                className="object-cover w-full h-screen hidden md:block"
                src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
                alt="login"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
