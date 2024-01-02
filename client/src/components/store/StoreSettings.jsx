import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const StoreSettings = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [formData, setFormData] = useState({
    customCss: "",
    customJs: "",
    customWidgetSelector: "",
  });

  const getSettings = async () => {
    try {
      setLoading({
        loading: true,
        success: "",
        error: "",
      });
      const { data } = await axios.post(
        "http://localhost:8081/api/shopDetails/getSettings",
        {
          shopName: id,
        },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );

      setFormData({
        customCss: data.data[0]?.customCss,
        customJs: data.data[0]?.customJs,
        customWidgetSelector: data.data[0]?.customWidgetSelector,
      });

      setLoading({
        loading: false,
        success: "Successfully retrieved settings details",
        error: "",
      });
    } catch (error) {
      console.log(error);
      setLoading({
        loading: false,
        success: "",
        error: error.response.data.error,
      });
    }
  };

  const updateSettings = async () => {
    setLoading({
      loading: true,
      success: "",
      error: "",
    });

    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/shopDetails/setSettings",

        {
          shopName: id,
          customCss: formData.customCss,
          customJs: formData.customJs,
          customWidgetSelector: formData.customWidgetSelector,
        },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );

      setFormData({
        customCss: data.data[0]?.customCss,
        customJs: data.data[0]?.customJs,
        customWidgetSelector: data.data[0]?.customWidgetSelector,
      });

      setLoading({
        loading: false,
        success: "Successfully updated settings",
        error: "",
      });
    } catch (error) {
      console.log(error);
      setLoading({
        loading: false,
        success: "",
        error: error.response.data.error,
      });
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div className="p-5 h-screen bg-slate-900 text-white">
      <h1 className="text-3xl text-white mb-10 tracking-wider">
        Settings <span className="text-teal-300">({id})</span>
      </h1>

      {loading.loading && (
        <div className="flex justify-center">
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

      {!loading.loading && loading.error !== "" && (
        <div className="text-red-400 flex justify-center mt-5">
          {loading.error}
        </div>
      )}

      {!loading.loading && loading.success !== "" && (
        <div>
          <div className="flex justify-around mb-8 text-white">
            <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-[40vw] h-64 ">
              <h1 className="text-teal-300">Custom Css </h1>

              <textarea
                id="message"
                rows="4"
                value={formData.customCss}
                className="mt-3 h-full rounded-lg block p-3 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                placeholder="Enter Your Custom CSS"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    customCss: e.target.value,
                  });
                }}
              />
            </div>

            <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-[40vw] h-64">
              <h1 className="text-teal-300">Custom Javascript</h1>

              <textarea
                id="message"
                rows="4"
                value={formData.customJs}
                className="mt-3 h-full rounded-lg block p-3 text-sm bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-0 border-2 focus:border-gray-500 border-gray-600"
                placeholder="Enter Your Custom Js"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    customJs: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-full h-32">
            <h1 className="text-teal-300">Custom Selector For Pumper Widget</h1>

            <input
              id="message"
              rows="4"
              value={formData.customWidgetSelector}
              className="mt-3 rounded-lg block p-3 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
              placeholder="Enter Custom Selector to Place Pumper Widget"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  customWidgetSelector: e.target.value,
                });
              }}
            />
          </div>

          {!loading.loading &&
            loading.success === "Successfully updated settings" && (
              <div className="text-green-500 flex justify-center mt-5">
                Successfully updated settings
              </div>
            )}

          <button
            type="button"
            className="focus:outline-none text-white bg-teal-500 hover:bg-teal-400 font-medium rounded-lg text-sm px-6 py-2 mr-2 mt-6 float-right"
            onClick={() => {
              updateSettings();
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default StoreSettings;
