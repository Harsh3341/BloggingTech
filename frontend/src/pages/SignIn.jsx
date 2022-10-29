import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();

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

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify({
        email,
        password,
      }),
      url: "http://localhost:5000/login",
    };

    const response = await fetch(options.url, options);
    const data = await response.json();

    if (data.success) {
      alert("Login successful");
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <>
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
    </>
  );
};

export default SignIn;
