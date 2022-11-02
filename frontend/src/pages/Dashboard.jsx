import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import { getBlogs } from "../actions/blogsAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../components/Loading";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, blogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen">
          <Navbar />
          <div className="h-fit p-8 w-full ">
            <div className="h-full flex justify-center flex-col p-8">
              {blogs &&
                blogs.map((post) => (
                  <BlogPosts
                    user={post.user}
                    title={post.title}
                    content={post.blog}
                    Image={post.image[0].url}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
