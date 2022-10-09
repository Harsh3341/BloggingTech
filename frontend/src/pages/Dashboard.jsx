import BlogPosts from "../components/BlogPosts";
import Navbar from "../components/Navbar";
import data from "../testData.json";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <div className="h-fit p-8 w-full ">
          <div className="h-full flex justify-center flex-col p-8">
            {data &&
              data.map((post) => (
                <BlogPosts
                  user={post.name}
                  title={post.title}
                  content={post.content}
                  Image={post.image}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
