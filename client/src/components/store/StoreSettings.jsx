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
    customBundleSelector: "",
    customBundleCss: "",
    customBundleJs: "",
  });

  const [storeName, setStoreName] = useState();

  const getSettings = async (shopId) => {
    try {
      setLoading({
        loading: true,
        success: "",
        error: "",
      });
      const { data } = await axios.post(
        "/api/shopDetails/getSettings",
        {
          shopName: shopId,
        },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );

      setStoreName(shopId);

      setFormData({
        customCss: data.data[0]?.customCss,
        customJs: data.data[0]?.customJs,
        customWidgetSelector: data.data[0]?.customWidgetSelector,
        customBundleSelector: data.data[0]?.customBundleSelector,
        customBundleCss: data.data[0]?.customBundleCss,
        customBundleJs: data.data[0]?.customBundleJs,
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

  const updateSettings = async (shopId) => {
    setLoading({
      loading: true,
      success: "",
      error: "",
    });

    try {
      console.log(formData);
      const { data } = await axios.post(
        "/api/shopDetails/setSettings",

        {
          shopName: shopId,
          ...formData,
        },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );

      setFormData({
        customCss: formData.customCss,
        customJs: formData.customJs,
        customWidgetSelector: formData.customWidgetSelector,
        customBundleJs: formData.customBundleJs,
        customBundleCss: formData.customBundleCss,
        customBundleSelector: formData.customBundleSelector,
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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(id);
    getSettings(id);
  }, [id]);

  return (
    <div className="p-5 h-screen overflow-auto bg-slate-900 text-white">
      <h1 className="text-3xl text-white mb-10 tracking-wider">
        Settings <span className="text-teal-300">({storeName})</span>
      </h1>
      <div>
        <button
          type="button"
          className="focus:outline-none text-white bg-teal-500 hover:bg-teal-400 font-medium rounded-lg text-sm px-6 py-2 mr-2 mt-6 float-right"
          onClick={() => {
            updateSettings(searchQuery);
          }}
        >
          Submit
        </button>
      </div>
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
          <div className="mb-8 w-96">
            <h1 className="text-teal-300">Enter the shop name</h1>
            <div className="flex align-middle mt-3 gap-4">
              <input
                id="message"
                value={searchQuery}
                className="w-full  rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                placeholder="Enter shop name"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getSettings(searchQuery);
                  }
                }}
              />

              <button
                type="button"
                className="focus:outline-none text-white bg-teal-500 hover:bg-teal-400 font-medium rounded-lg text-sm px-6 py-2 mr-2 float-right"
                onClick={() => {
                  getSettings(searchQuery);
                }}
              >
                Save
              </button>
            </div>
          </div>
          <h1 className="text-white-800 mb-8 text-2xl">
            Settings for Quantity break
          </h1>
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
          <h1 className="text-white-800 my-8 text-2xl">Settings for Bundle</h1>
          <div className="flex justify-around mb-8 text-white">
            <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-[40vw] h-64 ">
              <h1 className="text-teal-300">Custom Css </h1>

              <textarea
                id="message"
                rows="4"
                value={formData.customBundleCss}
                className="mt-3 h-full rounded-lg block p-3 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                placeholder="Enter Your Custom CSS"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    customBundleCss: e.target.value,
                  });
                }}
              />
            </div>

            <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-[40vw] h-64">
              <h1 className="text-teal-300">Custom Javascript</h1>

              <textarea
                id="message"
                rows="4"
                value={formData.customBundleJs}
                className="mt-3 h-full rounded-lg block p-3 text-sm bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-0 border-2 focus:border-gray-500 border-gray-600"
                placeholder="Enter Your Custom Js"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    customBundleJs: e.target.value,
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
              value={formData.customBundleSelector}
              className="mt-3 rounded-lg block p-3 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
              placeholder="Enter Custom Selector to Place Pumper Widget"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  customBundleSelector: e.target.value,
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

          <div>
            <button
              type="button"
              className="focus:outline-none text-white bg-teal-500 hover:bg-teal-400 font-medium rounded-lg text-sm px-6 py-2 mr-2 mt-6  float-right"
              onClick={() => {
                updateSettings(searchQuery);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreSettings;
