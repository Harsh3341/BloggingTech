import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import Loading from "../components/loading/Loading";
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
        <div
          className="flex flex-col h-screen w-full bg-gray-100 overflow-x-hidden overflow-y-auto bg-cover bg-center"
          style={{
            backgroundImage: `url(/img/bg3.jpg)`,
          }}
        >
          <Navbar />
          <div className="px-6 py-8">
            <div className="flex justify-between container mx-auto">
              <div className="w-full lg:w-8/12">
                {blogs &&
                  blogs.map((post, i) => (
                    <BlogPosts
                      key={i}
                      id={post._id}
                      type="UserBlogs"
                      user={post.name}
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
