import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const login = async () => {
    setLoading({
      loading: true,
      success: "",
      error: "",
    });

    try {
      await axios.post(
        "/api/user/login",
        {
          name: formData.name,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      navigate("/store");

      setLoading({
        loading: false,
        success: "Successfully logged in",
        error: "",
      });
    } catch (error) {
      console.log(error);
      setLoading({
        loading: false,
        success: "",
        error: error?.response?.data?.error,
      });
    }
  };

  return (
    <div className="bg-slate-900 text-white h-[100vh] flex justify-center items-center">
      <div className="bg-slate-800 flex flex-col items-center">
        <div className="px-5 pt-3 pb-3 rounded-lg flex flex-col w-[40vw]">
          <h1 className="text-teal-300">Name</h1>

          <input
            id="message"
            value={formData.name}
            className="mt-3 rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
            placeholder="Enter Your Name"
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
          />
        </div>

        <div className="px-5 pt-3 pb-3 rounded-lg flex flex-col w-[40vw]">
          <h1 className="text-teal-300">Password</h1>

          <input
            id="message"
            type="password"
            value={formData.password}
            className="mt-3 rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
            placeholder="Enter Your Password"
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />
        </div>

        {!loading.loading && loading.error !== "" && (
          <div className="text-red-400 flex justify-center my-3">
            {loading.error}
          </div>
        )}

        {loading.loading && (
          <div className="flex justify-center mt-5">
            <div
              className="inline-block text-teal-300 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          className="focus:outline-none text-white bg-teal-500 hover:bg-teal-400 font-medium rounded-lg text-sm px-6 py-2 mr-2 mt-2 mb-5"
          onClick={() => {
            login();
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
