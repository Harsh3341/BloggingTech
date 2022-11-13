import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBlogs } from "../actions/blogsAction";

const UserBlogs = () => {
  const dispatch = useDispatch();
  const { loading, blogs } = useSelector((state) => state.blogs);
  const { success } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getUserBlogs());
  }, [dispatch, success]);

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
                {blogs &&
                  blogs.map((post) => (
                    <BlogPosts
                      key={post._id}
                      id={post._id}
                      type="UserBlogs"
                      user={post.user}
                      title={post.title}
                      content={post.blog}
                      Image={post.image[0].url}
                      date={post.updatedAt}
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

export default UserBlogs;
