import { useNavigate } from "react-router-dom";
import { useState } from "react";
import qs from "qs";

const SignUp = () => {
  const navigate = useNavigate();

  const [credintials, setCredintials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = credintials;

  const handleChange = (e) => {
    setCredintials({ ...credintials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify({
        username,
        email,
        password,
      }),
      url: "http://localhost:5000/register",
    };

    const response = await fetch(options.url, options);
    const data = await response.json();

    if (data.success) {
      alert("User registered successfully");
      navigate("/signin");
    } else {
      alert(data.message);
    }

    setCredintials({ username: "", email: "", password: "" });

    console.log(credintials);
  };

  return (
    <>
      <div className="bg-gray-100 h-screen flex justify-center items-center p-8">
        <div className="shadow-sm border-y-2 border-y-stone-900 bg-gray-100 h-5/6 w-2/3 transition  ease-in-out delay-150 hover:-translate-y-1 hover:shadow-2xl duration-300 flex flex-col items-center p-8">
          <h1>Sign Up</h1>
          <div className="flex justify-center items-center w-full h-full">
            <form className=" h-3/4 w-3/4 p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                <label>Username</label>
                <input
                  className="border-2 border-gray-500 h-10 p-1"
                  type="username"
                  name="username"
                  onChange={handleChange}
                  value={username}
                />
              </div>
              <div className="flex flex-col items-center mb">
                <label>Email</label>
                <input
                  className="border-2 border-gray-500 h-10 p-1"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                />
              </div>
              <div className="flex flex-col items-center mb-8">
                <label>Password</label>
                <input
                  className="border-2 border-gray-500 h-10 p-1"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={password}
                />
              </div>
              <div className="flex flex-col items-center ">
                <button
                  className="bg-red-500 rounded-2xl w-28 h-10 hover:bg-red-700"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
