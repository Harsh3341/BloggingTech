import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import { Link } from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri";
import { useState } from "react";
import { lodeUser, uploadAvatar } from "../actions/userAction";
import { useEffect } from "react";

const UsersProfile = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { loader, error, isUploaded } = useSelector((state) => state.image);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(reader.result);
        setPreviewImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isUploaded) {
      dispatch(lodeUser());
      dispatch({ type: "UPDATE_PROFILE_IMAGE_RESET" });
    }
  }, [dispatch, isUploaded]);

  return (
    <>
      {loading || loader ? (
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
            className=" px-8  w-full flex items-center justify-center  h-full
         "
          >
            <div className="bg-white w-4/5 h-4/5 m-0 py-8 flex flex-col items-center rounded-2xl md:p-8 md:m-8 shadow-md">
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
                  <Link
                    className="w-2/5 p-1 flex justify-center text-white bg-black mt-7 rounded-md"
                    to="/profile/password/update"
                  >
                    <button className="w-full hover:bg-gray-500">
                      Change Password
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col w-full  items-center h-full">
                  <div className="w-3/4 h-3/4 flex items-center justify-center relative">
                    <img
                      className="w-2/4 h-52 rounded-full object-cover shadow-gray-500 shadow-2xl"
                      src={
                        previewImage ||
                        (user.avatar ? user.avatar.url : "/img/avatar.png")
                      }
                      alt="#"
                    />
                    <label
                      className="absolute bottom-6 bg-zinc-400 border-none rounded-full p-2 flex items-center justify-center"
                      htmlFor="file-input"
                    >
                      <RiImageAddLine className="text-white cursor-pointer" />
                      <input
                        className="hidden"
                        id="file-input"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <button
                        className={`text-white ${
                          previewImage ? "block" : "hidden"
                        }`}
                        onClick={() => dispatch(uploadAvatar(selectedImage))}
                      >
                        Upload
                      </button>
                    </label>
                  </div>

                  <Link
                    className="w-2/4 p-1 flex justify-center text-white bg-black rounded-md"
                    to="/profile/update"
                  >
                    <button className="w-full hover:bg-gray-500">
                      Edit Profile
                    </button>
                  </Link>
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
