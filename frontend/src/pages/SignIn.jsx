const SignIn = () => {
  return (
    <>
      <div className="bg-gray-100 h-screen flex justify-center items-center p-8">
        <div className="shadow-sm border-y-2 border-y-stone-900 bg-gray-100 h-5/6 w-2/3 transition  ease-in-out delay-150 hover:-translate-y-1 hover:shadow-2xl duration-300 flex flex-col items-center p-8">
          <h1>Sign In</h1>
          <div className="flex justify-center items-center w-full h-full">
            <form className=" h-3/4 w-3/4 p-8">
              <div className="flex flex-col items-center mb-8">
                <label>Email</label>
                <input className="border-2 border-gray-500 h-10" type="email" />
              </div>
              <div className="flex flex-col items-center mb-8">
                <label>Password</label>
                <input
                  className="border-2 border-gray-500  h-10"
                  type="email"
                />
              </div>
              <div className="flex flex-col items-center ">
                <button
                  className="bg-red-500 rounded-2xl w-28 h-10"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
