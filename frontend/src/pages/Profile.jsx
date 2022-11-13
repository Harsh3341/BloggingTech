import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" w-full h-screen bg-gray-100">
          <Navbar />
          <div
            className=" px-8 absolute w-full flex items-center justify-center
         "
            style={{ height: "-webkit-fill-available" }}
          >
            <div className="bg-white w-4/5 h-4/5 m-0 py-8 flex flex-col items-center rounded-2xl md:p-8 md:m-8">
              <h1 className="text-3xl mt-2 font-bold">My Profile</h1>
              <div className=" w-full mt-4 h-full  p-10 flex justify-center items-center">
                <div className="flex flex-col w-full ">
                  <div className=" flex flex-col w-full justify-center ">
                    <h1 className="font-bold text-xl">Name</h1>
                    <p>{user.name}</p>
                  </div>
                  <div className="mt-7 flex flex-col w-full justify-center ">
                    <h1 className="font-bold text-xl">Username</h1>
                    <p>{user.username}</p>
                  </div>
                  <div className="mt-7 flex flex-col w-full justify-center ">
                    <h1 className="font-bold text-xl">Email</h1>
                    <p> {user.email}</p>
                  </div>
                  <div className="w-2/5 p-1 flex justify-center text-white bg-black mt-7 rounded-md">
                    <button className="w-full hover:bg-gray-500">
                      Change Password
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full  items-center h-full">
                  <div className="w-3/4 h-3/4 flex items-center justify-center">
                    <img
                      className="w-3/4 h-52 rounded-full border-4 border-black"
                      src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg"
                      alt="#"
                    />
                  </div>
                  <div className="w-2/4 p-1 flex justify-center text-white bg-black rounded-md">
                    <button className="w-full hover:bg-gray-500">
                      Edit Profile
                    </button>
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

export default Profile;
