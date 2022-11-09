import { useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../actions/blogsAction";
import Loading from "../components/Loading";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (success) {
      alert("Blog Created Successfully");
    }
  }, [error, success, navigate]);

  const [blogData, setBlogData] = useState({
    title: "",
    blog: "",
    imageUrl:
      "https://www.teachmint.com/static2/images/seo-pages/virtual-classroom/live-class-recording.png",
  });

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog(blogData));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen w-full bg-gray-100">
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
                name="blog"
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
      )}
    </>
  );
};

export default Create;
