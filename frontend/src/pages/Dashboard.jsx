import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import { getBlogs } from "../actions/blogsAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../components/Loading";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, blogs, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    // if (error) {
    //   alert(error);
    // }

    dispatch(getBlogs());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen w-full bg-gray-100">
          <Navbar />
          <div className="px-6 py-8">
            <div className="flex justify-between container mx-auto">
              <div className="w-full lg:w-8/12">
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
        </div>
      )}
    </>
  );
};

export default Dashboard;
