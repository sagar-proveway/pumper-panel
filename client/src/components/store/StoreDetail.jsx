import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const StoreDetail = () => {
  const [loading, setLoading] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [data, setData] = useState([]);

  const { id } = useParams();

  const getStoreDetails = async () => {
    setLoading({
      loading: true,
      success: "",
      error: "",
    });

    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/shopDetails/getShopById",
        { shop: id },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );

      setData(data.data);

      setLoading({
        loading: false,
        success: "Successfully retrieved shop",
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
    getStoreDetails();
  }, []);

  return (
    <div className="p-5 h-screen bg-slate-900">
      <h1 className="text-xl text-white mb-4">
        Store details for <span className="text-teal-300">{id}</span>
      </h1>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-slate-800 border-b-2 border-teal-500">
            <tr>
              <th className="w-20 p-3 text-sm text-white font-semibold tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-sm text-white font-semibold tracking-wide text-left">
                Access token
              </th>
              <th className="w-48 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="w-48 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Customer email
              </th>
              <th className="w-48 p-3 text-sm text-white font-semibold tracking-wide text-left">
                Email
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500 divide-opacity-10">
            {!loading.loading && loading.success !== "" && (
              <Fragment>
                {data?.map((item, index) => {
                  return (
                    <tr className="bg-slate-800" key={item?._id}>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {item?.accessToken}
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
                        {item?.storeCustomerEmail}
                      </td>
                      <td className="p-3 text-sm text-white whitespace-nowrap">
                        {item?.storeEmail}
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
    </div>
  );
};

export default StoreDetail;
