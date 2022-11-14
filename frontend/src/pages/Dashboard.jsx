import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import { getBlogs } from "../actions/blogsAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../components/Loading";
import UserComp from "../components/UserComp";
import { getAllUsers } from "../actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, blogs } = useSelector((state) => state.blogs);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen w-full bg-gray-100 overflow-auto">
          <Navbar />
          <div className="px-6 py-8">
            <div className="flex justify-between container mx-auto">
              <div className="w-full lg:w-8/12">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
                    Post
                  </h1>
                </div>
                {blogs &&
                  blogs.map((post) => (
                    <BlogPosts
                      key={post.user}
                      type="dashboard"
                      user={post.name}
                      title={post.title}
                      content={post.blog}
                      Image={post.image[0].url}
                      date={post.updatedAt}
                    />
                  ))}
              </div>
              <div className="-mx-8 w-4/12 hidden lg:block">
                <div className="px-8">
                  <h1 className="mb-4 text-xl font-bold text-gray-700">
                    Authors
                  </h1>
                  <div className="flex flex-col bg-white max-w-sm px-6 py-4  rounded-lg shadow-md">
                    <ul className="-mx-4">
                      {users &&
                        users.map((user) => (
                          <UserComp key={user._id} username={user.username} />
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
