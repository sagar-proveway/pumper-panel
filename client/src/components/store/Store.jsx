import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import { HiExternalLink, HiOutlineCog } from "react-icons/hi";
import { Link } from "react-router-dom";

import { BiSort } from "react-icons/bi";

const Store = () => {
  const [loading, setLoading] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [sort, setSort] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState([]);

  const getStoreDeatils = async () => {
    try {
      setLoading({
        loading: true,
        success: "",
        error: "",
      });

      const { data } = await axios.post(
        "/api/shopDetails/getStore",
        {
          sort,
          shop: searchQuery,
        },
        {
          withCredentials: true,
        }
      );

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
  }, [sort, searchQuery]);

  return (
    <div className="p-5 h-screen bg-slate-900">
      <h1 className="text-3xl text-white mb-5 tracking-wider">SHOPS</h1>

      <div className="mb-8 w-96">
        <h1 className="text-teal-300">Enter the shop name</h1>
        <input
          id="message"
          value={searchQuery}
          className="w-full mt-3 rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
          placeholder="Enter shop name"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>

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
              <th className="w-36 p-3 text-sm text-white font-semibold tracking-wide text-left ">
                <div className="flex items-center gap-2">
                  <span> Revenue</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setSort(!sort);
                    }}
                  >
                    <BiSort />
                  </span>
                </div>
              </th>
              <th className="w-36 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Shop Url
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
              <th className="w-28 p-3 text-sm text-white font-semibold tracking-wide text-left text-nowrap">
                Offer Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500 divide-opacity-10">
            {!loading.loading && loading.success !== "" && (
              <Fragment>
                {data?.map((item, index) => {
                  return (
                    <tr className="bg-slate-800" key={item?.storeDomain}>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {item?.storeDomain}
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {item.status === "installed" && (
                          <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            {item?.status}
                          </span>
                        )}

                        {item.status === "uninstalled" && (
                          <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
                            Uninstalled
                          </span>
                        )}
                      </td>

                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {item?.revenue === undefined && 0}
                        {item?.revenue}
                      </td>

                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {item?.shop}
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap flex ">
                        <div>
                          {item?.offers === undefined && 0}
                          {item?.offers}
                        </div>

                        <Link
                          to={`/offer/${item?.shop}`}
                          className="font-bold ms-2 hover:underline"
                        >
                          <HiExternalLink size={20} />
                        </Link>
                      </td>

                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        <Link
                          to={`/store/${item?.shop}`}
                          className="font-bold hover:underline"
                        >
                          <HiExternalLink size={20} />
                        </Link>
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        <Link
                          to={`/store/settings/${item?.shop}`}
                          className="font-bold hover:underline"
                        >
                          <HiOutlineCog size={20} />
                        </Link>
                      </td>

                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        <Link
                          to={`/offer/list/${item?.shop}`}
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
      </div>
    </div>
  );
};

export default Store;
