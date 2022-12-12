import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/loading/Loading";
import { useEffect } from "react";
import { searchedUser } from "../actions/userAction";
import { useParams } from "react-router-dom";

const UsersProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.searchedUser);

  useEffect(() => {
    dispatch(searchedUser(id));
  }, [dispatch, id]);

  return (
    <>
      {loading || !data ? (
        <Loading />
      ) : (
        <div
          className="flex flex-col h-screen w-full bg-gray-100 overflow-x-hidden overflow-y-auto bg-cover bg-center"
          style={{
            backgroundImage: `url(/img/bg3.jpg)`,
          }}
        >
          <Navbar />
          <div
            className=" px-8  w-full flex items-center justify-center h-full
         "
          >
            <div className="bg-white w-4/5 h-4/5 m-0 py-8 flex flex-col items-center rounded-2xl md:p-8 md:m-8 shadow-md">
              <h1 className="text-3xl mt-2 font-bold">{data.name}'s Profile</h1>
              <div className=" w-full mt-4 h-full  p-10 flex justify-center items-center">
                <div className="flex flex-col w-full ">
                  <div className=" flex flex-col w-full justify-center ">
                    <h1 className="font-bold text-xl">Name</h1>
                    <p>{data.name}</p>
                  </div>
                  <div className="mt-7 flex flex-col w-full justify-center ">
                    <h1 className="font-bold text-xl">Username</h1>
                    <p>{data.username}</p>
                  </div>
                  <div className="mt-7 flex flex-col w-full justify-center ">
                    <h1 className="font-bold text-xl">Email</h1>
                    <p> {data.email}</p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersProfile;
