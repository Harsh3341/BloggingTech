import { FaRegUser } from "react-icons/fa";

const BlogPosts = (post) => {
  return (
    <>
      <div className="px-6 h-fit border-y-2 border-y-gray-500 p-2 flex justify-center items-center my-5">
        <div className="p-2">
          <div className="p-2 flex  items-center">
            <FaRegUser />
            {post.user}
          </div>
          <div className="p-2 text-center text-2xl font-bold ">
            {post.title}
          </div>
          <div className="p-2 text-sm font-semibold">{post.content}</div>
        </div>
        <div>
          <img src={post.Image}></img>
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
