import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import { getDetailedBlog } from "../actions/blogsAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailedBlog = () => {
  const dispatch = useDispatch();
  const { loading, blog } = useSelector((state) => state.blogs);

  let myFormatDate;

  if (!loading && blog) {
    const date = blog.createdAt.substring(0, 10).split("-");

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
    let myDate;

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
  }

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetailedBlog(id));
  }, [dispatch, id]);

  return (
    <>
      {loading || !blog ? (
        <Loading />
      ) : (
        <div
          className="flex flex-col h-full w-full bg-gray-100 overflow-x-hidden overflow-y-auto bg-cover bg-center"
          style={{
            backgroundImage: `url(/img/bg3.jpg)`,
          }}
        >
          <Navbar />
          <div className="md:px-6 py-8 h-auto backdrop-blur-lg">
            <div className="flex justify-center container mx-auto h-fit">
              <div className="md:w-2/3 bg-white rounded-2xl shadow-md flex items-center p-8 flex-col h-fit">
                <div className="w-full flex items-center flex-col">
                  <h1 className="md:text-4xl text-2xl font-bold text-center mb-4">
                    {blog.title}
                  </h1>
                  <div className="mb-4 text-xl">{blog.name}</div>
                  <div className="flex mb-4">
                    <div className="mx-4">{myFormatDate}</div>
                    <div className="mx-4 border-black border-y">TAG</div>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <div className="md:text-lg">
                    {blog.blog.split("\n").map((item, i) => {
                      return (
                        <p key={i} className="mt-2 text-gray-600 font-medium">
                          {item}
                        </p>
                      );
                    })}
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

export default DetailedBlog;
