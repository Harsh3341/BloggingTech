import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../actions/blogsAction";
import Loading from "./Loading";

const BlogPosts = (post) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blogs);
  const date = post.date.substring(0, 10).split("-");

  let MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let myDate, myFormatDate;

  if (date[0]) {
    myDate = new Date(date[0], date[1] - 1, date[2]);
    myFormatDate =
      MONTHS[myDate.getMonth()] +
      " " +
      myDate.getDate() +
      "," +
      myDate.getFullYear();
  } else {
    myDate = new Date(new Date().getFullYear(), date[0] - 1, date[1]);
    myFormatDate = MONTHS[myDate.getMonth()] + "," + myDate.getDate();
  }

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-6">
          <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <span className="font-light text-gray-600">{myFormatDate}</span>
              <div>
                <a
                  className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500 mx-2"
                  href="/"
                >
                  TAG
                </a>
                <button
                  className={`px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500 ${
                    post.type === "UserBlogs" ? "" : "hidden"
                  }`}
                  onClick={() => {
                    deleteHandler(post.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-2">
              <a
                className="text-2xl text-gray-700 font-bold hover:underline"
                href="/"
              >
                {post.title}
              </a>
              <p className="mt-2 text-gray-600">{post.content}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <a className="text-blue-500 hover:underline" href="/">
                Read more
              </a>
              <div>
                <a className="flex items-center" href="/">
                  <img
                    className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                    src={post.Image}
                    alt="avatar"
                  />
                  <h1 className="text-gray-700 font-bold hover:underline">
                    {post.user}
                  </h1>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPosts;
