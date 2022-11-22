import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { register } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { ImBlog } from "react-icons/im";

const SignUp = () => {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [credintials, setCredintials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { name, username, email, password, confirmpassword } = credintials;

  const handleChange = (e) => {
    setCredintials({ ...credintials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(register(name, username, email, password, confirmpassword));
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
        <div
          className="bg-white font-family-karla h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(/img/bg3.jpg)`,
          }}
        >
          <div className="w-full flex flex-wrap backdrop-blur-lg h-full">
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                <a href="/" classNameName="  font-bold text-xl p-4">
                  <ImBlog />
                </a>
              </div>

              <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p className="text-center text-3xl">Join Us.</p>
                <form
                  className="flex flex-col pt-3 md:pt-8"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col pt-4">
                    <label for="name" className="text-lg">
                      Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      placeholder="Name"
                      onChange={handleChange}
                      value={name}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex flex-col pt-4">
                    <label for="name" className="text-lg">
                      Username
                    </label>
                    <input
                      type="username"
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      value={username}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="flex flex-col pt-4">
                    <label for="email" className="text-lg">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      onChange={handleChange}
                      value={email}
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
                      onChange={handleChange}
                      value={password}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="flex flex-col pt-4">
                    <label for="confirmpassword" className="text-lg">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmpassword"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      value={confirmpassword}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <input
                    type="submit"
                    value="Register"
                    className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                  />
                </form>
                <div className="text-center pt-12 pb-12">
                  <p>
                    Already have an account?{" "}
                    <a href="/login" className="underline font-semibold">
                      Log in here.
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="w-1/2 shadow-2xl">
              <img
                className="object-cover w-full h-screen hidden md:block"
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Background"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
