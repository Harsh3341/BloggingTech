import { useState } from "react";
import Navbar from "../components/Navbar";

const Create = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="h-screen">
        <Navbar />
        <div className="h-2/3 p-8 w-full flex justify-center">
          <div className="w-2/4 h-full flex items-center flex-col p-8 relative ">
            <h1 className="text-4xl text-left w-full m-5">
              <input
                onChange={handleChange}
                name="title"
                placeholder="Title"
                className="focus:outline-none w-full "
              />
            </h1>
            <textarea
              onChange={handleChange}
              name="body"
              placeholder="Tell your story..."
              className="text-xl focus:outline-none m-5 w-full h-full"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="bg-black text-white right-0 bottom-0 absolute rounded-2xl w-24 h-18"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
