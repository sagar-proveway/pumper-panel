import axios from "axios";
import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

const OfferList = () => {
  const [loading, setLoading] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [offerList, setOfferList] = useState([]);

  const { id } = useParams();

  const getOfferList = async () => {
    setLoading({
      loading: true,
      success: "",
      error: "",
    });

    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/discountDetails/getAllDiscountById",
        { shop: id },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );

      setOfferList(data.data);

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
    getOfferList();
  }, []);

  return (
    <div className="h-screen bg-slate-900 text-white p-5">
      <h1 className="text-3xl text-white mb-10 tracking-wider">Offer List</h1>

      <div>
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

        {!loading.loading &&
          loading.success !== "" &&
          offerList?.map((item) => {
            return (
              <div className="bg-slate-800 p-5 me-3 rounded-lg mb-3 flex justify-between items-center">
                <h1>{item.offerName}</h1>
                <Link
                  to={`/offer/list/edit/${item?._id}?shop=${id}`}
                  className="me-5 font-bold hover:underline"
                >
                  <AiFillEdit size={20} />
                </Link>
              </div>
            );
          })}

        {!loading.loading && loading.error !== "" && (
          <div className="text-red-400 flex justify-center mt-5">
            {loading.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferList;
