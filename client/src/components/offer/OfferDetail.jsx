import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const OfferDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const { id } = useParams();

  const getStoreDetails = async () => {
    let shopName = id.replace(/ /g, "-").toLowerCase().concat(".myshopify.com");
    try {
      setLoading({
        loading: true,
        success: "",
        error: "",
      });
      const { data } = await axios.post(
        "/api/discountDetails/getDiscountByIdToCompare",
        {
          shopName,
        },
        {
          "Content-Type": "application/json",
        }
      );

      setData(data.data);

      setLoading({
        loading: false,
        success: "Successfully retrieved offfer details",
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
    <div className="p-5 h-screen bg-slate-900 text-white">
      <h1 className="text-2xl text-white mb-10 tracking-wider">
        Offer details for store <span className="text-teal-300"> {id}</span>
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

      {!loading.loading && loading.success !== "" && (
        <Fragment>
          <div className="flex justify-around mb-8 text-teal-300">
            <div className="text-2xl">Db Data</div>
            <div className="text-2xl">Query Data </div>
          </div>

          {data?.discount?.map((discountData) => {
            return (
              <div className="flex justify-around items-ceter mb-3">
                <div className="bg-slate-800 p-5 me-3 rounded-lg ">
                  <div className="flex flex-col text-sm">
                    <div className="tracking-widest">
                      <span className="me-2 font-bold">id :</span>{" "}
                      {discountData.discountGid}
                    </div>
                    <div className="tracking-widest">
                      <span className="me-2 font-bold">Title : </span>
                      {discountData.discountTitles}
                    </div>
                    <div className="tracking-widest">
                      <span className="me-2 font-bold">Status : </span>
                      {discountData.status}
                    </div>
                  </div>
                </div>

                {data?.queryData?.map((queryData) => {
                  return (
                    <Fragment>
                      {queryData.discountId === discountData.discountGid && (
                        <div className="bg-slate-800 p-5 me-3 rounded-lg ">
                          <div className="flex flex-col text-sm">
                            <div className="tracking-widest">
                              <span className="me-2 font-bold">id :</span>
                              {queryData.discountId}
                            </div>
                            <div className="tracking-widest">
                              <span className="me-2 font-bold">Title : </span>
                              {queryData.title}
                            </div>
                            <div className="tracking-widest">
                              <span className="me-2 font-bold">Status : </span>
                              {queryData.status}
                            </div>
                          </div>
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            );
          })}
        </Fragment>
      )}

      {!loading.loading && loading.error !== "" && (
        <div className="text-red-400 flex justify-center mt-5">
          {loading.error}
        </div>
      )}
    </div>
  );
};

export default OfferDetails;
