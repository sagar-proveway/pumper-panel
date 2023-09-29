import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import { HiExternalLink, HiOutlineCog } from "react-icons/hi";
import { Link } from "react-router-dom";

const Store = () => {
  const [loading, setLoading] = useState({
    loading: false,
    success: "",
    error: "",
  });
  const [data, setData] = useState([]);

  const getStoreDeatils = async () => {
    try {
      setLoading({
        loading: true,
        success: "",
        error: "",
      });

      const { data } = await axios.get("/api/shopDetails/getStore", {
        withCredentials: true,
      });

      setData(data.data);

      setLoading({
        loading: false,
        success: "Successfully retrieved store details",
        error: "",
      });
    } catch (error) {
      setLoading({
        loading: false,
        success: "",
        error: error.response.data.error,
      });
    }
  };

  useEffect(() => {
    getStoreDeatils();
  }, []);

  return (
    <div className="p-5 h-screen bg-slate-900">
      <h1 className="text-3xl text-white mb-10 tracking-wider">SHOPS</h1>

      <div className="overflow-y-auto h-[80vh] rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-slate-800 border-b-2 border-teal-500">
            <tr>
              <th className="w-20 p-3 text-sm text-white font-semibold tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-sm text-white font-semibold tracking-wide text-left">
                Shop name
              </th>
              <th className="w-36 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="w-36 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Revenue
              </th>
              <th className="w-36 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Offers
              </th>
              <th className="w-28 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Details
              </th>
              <th className="w-28 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Settings
              </th>
              <th className="w-28 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Offer Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500 divide-opacity-10">
            {!loading.loading && loading.success !== "" && (
              <Fragment>
                {data?.map((item, index) => {
                  return (
                    <tr className="bg-slate-800" key={item?.storeName}>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {item?.storeName}
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {item.status === "installed" && (
                          <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            {item?.status}
                          </span>
                        )}

                        {item.status === "uninstalled" && (
                          <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
                            Canceled
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {item?.revenue === undefined && 0}
                        {item?.revenue}
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap flex ">
                        <div>
                          {item?.offers === undefined && 0}
                          {item?.offers}
                        </div>

                        <Link
                          to={`/offer/${item?.storeName}`}
                          className="font-bold ms-2 hover:underline"
                        >
                          <HiExternalLink size={20} />
                        </Link>
                      </td>

                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        <Link
                          to={`/store/${item?.storeName}`}
                          className="font-bold hover:underline"
                        >
                          <HiExternalLink size={20} />
                        </Link>
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        <Link
                          to={`/store/settings/${item?.storeName}`}
                          className="font-bold hover:underline"
                        >
                          <HiOutlineCog size={20} />
                        </Link>
                      </td>

                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        <Link
                          to={`/offer/list/${item?.storeName}`}
                          className="font-bold hover:underline"
                        >
                          <HiExternalLink size={20} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </Fragment>
            )}
          </tbody>
        </table>
      </div>

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
      {!loading.loading && loading.error !== "" && (
        <div className="text-red-400 flex justify-center mt-5">
          {loading.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div>
              <a href="#" className="text-blue-500 font-bold hover:underline">
                #1000
              </a>
            </div>
            <div className="text-gray-500">10/10/2021</div>
            <div>
              <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                Delivered
              </span>
            </div>
          </div>
          <div className="text-sm text-white">
            Kring New Fit office chair, mesh + PU, black
          </div>
          <div className="text-sm font-medium text-black">$200.00</div>
        </div>
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div>
              <a href="#" className="text-blue-500 font-bold hover:underline">
                #1001
              </a>
            </div>
            <div className="text-gray-500">10/10/2021</div>
            <div>
              <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                Shipped
              </span>
            </div>
          </div>
          <div className="text-sm text-white">
            Kring New Fit office chair, mesh + PU, black
          </div>
          <div className="text-sm font-medium text-black">$200.00</div>
        </div>
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div>
              <a href="#" className="text-blue-500 font-bold hover:underline">
                #1002
              </a>
            </div>
            <div className="text-gray-500">10/10/2021</div>
            <div>
              <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
                Canceled
              </span>
            </div>
          </div>
          <div className="text-sm text-white">
            Kring New Fit office chair, mesh + PU, black
          </div>
          <div className="text-sm font-medium text-black">$200.00</div>
        </div>
      </div>
    </div>
  );
};

export default Store;
