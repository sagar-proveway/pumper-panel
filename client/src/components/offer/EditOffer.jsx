import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "./css/bundle.css";
import { useParams, useSearchParams } from "react-router-dom";
import Preview from "./Preview";
import useShopifyCurrencyFormat from "@ansugroup/use-shopify-currency-format";
import ColorPicker from "../../features/ColorPicker";
import { styleOptions } from "../../data/styleData";

const EditOffer = () => {
  const [loading, setLoading] = useState({
    loading: false,
    success: "sdf",
    error: "",
  });

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const shopName = searchParams.get("shop");
  const [productPrice, setProductPrice] = useState(100);
  const [productOptions, setProductOptions] = useState([]);
  const [previewCheckBox, setPreviewCheckBox] = useState(1);
  const [tab, setTab] = useState(1);
  const [moneyFormat, setMoneyFormat] = useState("");
  const [hasDefaultVariant, setHasDefaultVariant] = useState(false);
  const [productComparePrice, setProductComparePrice] = useState(100);

  const [formData, setFormData] = useState({
    offerName: "Offer",
    blockTitle: "Bundle & Save",
    product: "",
    productArray: [],
    productId: [],
    productCollection: "",
    productCollectionArray: [],
    collectionId: [],
    template: "1",
    quantity: ["1", "2", "3"],
    title: ["1 Pair", "2 Pair", "3 Pair"],
    subtitle: ["Standard Price", "10% OFF", "20% OFF"],
    price: ["default", "percentage", "percentage"],
    discount: ["5", "10", "20"],
    label: ["Most Popular", "Most Popular", "Most Popular"],
    defaultSelected: "0",
    includeVarient: true,
    compareToPrice: false,
    showTotalPrice: false,
    showPriceByEach: false,
    discountTarget: "product",
    labelSelected: [true, false, false],
    subtitleSelected: [true, true, true],
    titleColor: "#000000",
    discountColor: "#000000",
    textColor: "#000000",
    labelColor: "#007F61",
    blockTitleColor: "#007F61",
    borderColor: "#237f00",
    backgroundColor: "#f4fbf9",
    footerColor: "#007F61",
    titleSizeTypo: "14",
    titleStyleTypo: "medium",
    discountSizeTypo: "14",
    discountStyleTypo: "medium",
    textSizeTypo: "14",
    textStyleTypo: "medium",
    labelSizeTypo: "12",
    labelStyleTypo: "bold",
    blockTitleSizeTypo: "20",
    blockTitleStyleTypo: "semi-bold",
    borderWidth: 1,
    borderRadius: 4,
    footerSizeTypo: "13",
    footerStyleTypo: "medium",
    footerText: "Free 2 Day Shipping",
    hideHeaderFooterLines: false,
    customCompareAtPrice: "0",
    skipToCheckout: false,
    combineOrderDiscounts: false,
    combineProductDiscounts: false,
    combineShippingDiscounts: false,
  });

  const [offerList, setOfferList] = useState([
    {
      quantity: "1",
      title: "1 Pair",
      subtitle: "10% OFF",
      price: "default",
      discount: "10",
      subtitleSelected: true,
      label: "Most Popular",
      labelSelected: false,
    },
  ]);

  const getOfferList = async () => {
    setLoading({
      loading: true,
      success: "",
      error: "",
    });

    try {
      const { data } = await axios.post(
        "/api/discountDetails/getDiscountById",
        { id },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );

      setPreviewCheckBox(data.data[0].defaultSelected - 0);
      setProductPrice(data.productData.variants.nodes[0].price);
      setProductOptions(data.productData.options);
      setHasDefaultVariant(data.productData.hasOnlyDefaultVariant);
      setProductComparePrice(data.productData.variants.nodes[0].compareAtPrice);
      setFormData(data.data[0]);
      unGroupFields(data.data[0]);

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

  const getCurrency = async () => {
    try {
      const { data } = await axios.post(
        "/api/shopDetails/getCurrency",
        { shopName },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );
      setMoneyFormat(data.moneyFormat);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadDetails = async () => {
    setLoading({
      loading: true,
      success: "",
      error: "",
    });

    try {
      let tempData = groupFields(formData, offerList);

      const { data } = await axios.post(
        "/api/discountDetails/editDiscount",
        { id, data: tempData },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );

      setLoading({
        loading: false,
        success: "Success",
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

  function groupFields(list, offer) {
    let obj = {
      ...list,
      quantity: [],
      title: [],
      subtitle: [],
      price: [],
      discount: [],
      subtitleSelected: [],
      label: [],
      labelSelected: [],
    };

    offer.map((item) => {
      obj.quantity = [...obj.quantity, item.quantity];
      obj.title = [...obj.title, item.title];
      obj.subtitle = [...obj.subtitle, item.subtitle];
      obj.price = [...obj.price, item.price];
      obj.discount = [...obj.discount, item.discount];
      obj.subtitleSelected = [...obj.subtitleSelected, item.subtitleSelected];
      obj.label = [...obj.label, item.label];
      obj.labelSelected = [...obj.labelSelected, item.labelSelected];
    });

    return obj;
  }

  function unGroupFields(data) {
    let temp = [];

    data.quantity.map((item, index) => {
      temp[index] = {
        ...temp[index],
        quantity: item,
      };
    });

    data.price.map((item, index) => {
      temp[index] = {
        ...temp[index],
        price: item,
      };
    });

    data.discount.map((item, index) => {
      temp[index] = {
        ...temp[index],
        discount: item,
      };
    });

    data.label.map((item, index) => {
      temp[index] = {
        ...temp[index],
        label: item,
      };
    });

    data.subtitle.map((item, index) => {
      temp[index] = {
        ...temp[index],
        subtitle: item,
      };
    });

    data.subtitleSelected.map((item, index) => {
      temp[index] = {
        ...temp[index],
        subtitleSelected: item,
      };
    });

    data.title.map((item, index) => {
      temp[index] = {
        ...temp[index],
        title: item,
      };
    });

    data.labelSelected.map((item, index) => {
      temp[index] = {
        ...temp[index],
        labelSelected: item,
      };
    });

    setOfferList(temp);
  }

  useEffect(() => {
    getOfferList();
    getCurrency();
  }, []);

  const currencyFormat = useShopifyCurrencyFormat(moneyFormat);

  const discountOptions = [
    { label: "Default", value: "default" },
    {
      label: "Discounted % (e.g. 25% off)",
      value: "percentage",
    },
    {
      label:
        "Discounted " +
        " (e.g. " +
        currencyFormat(29).replace(/(<([^>]+)>)/gi, "") +
        " off)",
      value: "amount",
    },
    {
      label:
        "Discount on each unit (e.g. " +
        currencyFormat(29).replace(/(<([^>]+)>)/gi, "") +
        " off on each)",
      value: "each",
    },
    // { label: 'Fixed Price (e.g. ' + currencyFormat(29).replace(/(<([^>]+)>)/ig, '') + ')', value: 'fixed' },
  ];

  const handleInputChange = (index, field, value) => {
    setOfferList((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  return (
    <div className="h-screen bg-slate-900 text-white p-5 overflow-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl text-white mb-10 tracking-wider">
          Offer List <span className="text-teal-300"> ({shopName})</span>
        </h1>
        <button
          type="button"
          className=" text-white bg-teal-500 hover:bg-teal-400 font-medium rounded-lg text-sm h-10 w-20"
          onClick={() => {
            uploadDetails();
          }}
        >
          Save
        </button>
      </div>

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

        {!loading.loading && loading.success !== "" && (
          <div className="grid grid-cols-2">
            <div>
              <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-full mb-3">
                <h1 className="text-teal-300 font-semibold text-lg mb-3">
                  Offer name
                </h1>

                <input
                  id="message"
                  rows="4"
                  value={formData.offerName}
                  className="rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                  placeholder="Enter Custom Selector to Place Pumper Widget"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      offerName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-full mb-3">
                <h1 className="text-teal-300 font-semibold text-lg mb-3">
                  Products / Collections
                </h1>
                {formData.productArray.length !== 0 && (
                  <div className="flex gap-2">
                    <p className="text-teal-300">Products:</p>
                    <p>{formData.product}</p>
                  </div>
                )}

                {formData.productCollectionArray.length !== 0 && (
                  <div className="flex gap-2">
                    <p className="text-teal-300">Collections:</p>
                    <p>{formData.productCollection}</p>
                  </div>
                )}
              </div>

              <div className="bg-slate-800 me-3 rounded-lg flex flex-col w-full mb-3">
                <div className="flex flex-col ">
                  <div className="flex mb-5">
                    {offerList?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`${
                            tab === index + 1 && "bg-slate-700"
                          } px-7 py-3 cursor-pointer`}
                          onClick={() => {
                            setTab(index + 1);
                          }}
                        >
                          Offer {index + 1}
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-4 relative">
                    <h1 className="text-teal-300 font-semibold text-lg mb-6">
                      Edit offer
                    </h1>
                    {offerList?.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          {tab === index + 1 && (
                            <Fragment>
                              <div className="absolute top-1 right-5">
                                <input
                                  type="checkbox"
                                  id={`defaultSelected${index}`}
                                  name={`defaultSelected${index}`}
                                  checked={formData.defaultSelected == index}
                                  onChange={() => {
                                    setFormData({
                                      ...formData,
                                      defaultSelected: index,
                                    });
                                  }}
                                />
                              </div>

                              <div className="mb-3 grid grid-cols-2">
                                <div className="me-3">
                                  <h1 className="text-teal-300">
                                    Discount Type
                                  </h1>
                                  <select
                                    className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                                    value={item?.price}
                                    onChange={(e) => {
                                      let newArr = offerList.map(
                                        (stateItem) => {
                                          let tempObj = {};

                                          if (
                                            item.quantity ===
                                            stateItem?.quantity
                                          ) {
                                            tempObj = {
                                              ...stateItem,
                                              price: e.target.value,
                                            };
                                            return tempObj;
                                          }

                                          return stateItem;
                                        }
                                      );

                                      setOfferList(newArr);
                                    }}
                                  >
                                    {discountOptions.map((item) => {
                                      return (
                                        <option
                                          key={item.value}
                                          value={item.value}
                                        >
                                          {item.label}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                {item.price !== "default" && (
                                  <div>
                                    <h1 className="text-teal-300">Discount</h1>
                                    <input
                                      id="message"
                                      rows="4"
                                      value={item.discount}
                                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                                      placeholder="Enter Custom Selector to Place Pumper Widget"
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          "discount",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="mb-3 grid grid-cols-2">
                                <div className="me-3">
                                  <h1 className="text-teal-300">Quantity</h1>

                                  <input
                                    id="quantity"
                                    rows="4"
                                    value={item.quantity}
                                    className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                                    placeholder="Enter Custom Selector to Place Pumper Widget"
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "quantity",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <h1 className="text-teal-300">Offer title</h1>
                                  <input
                                    id="offerTitle"
                                    rows="4"
                                    value={item?.title}
                                    className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                                    placeholder="Enter Custom Selector to Place Pumper Widget"
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="mb-3 grid grid-cols-2">
                                <div className="me-3">
                                  <div className="text-teal-300">
                                    Discount label
                                  </div>
                                  <input
                                    id="discountLabel"
                                    rows="4"
                                    // disabled={item?.subtitleSelected}
                                    value={item?.subtitle}
                                    className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 disabled:opacity-50 "
                                    placeholder="Enter Custom Selector to Place Pumper Widget"
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "subtitle",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <h1 className="text-teal-300">Tag</h1>
                                  <input
                                    id="tag"
                                    rows="4"
                                    // disabled={item?.labelSelected}
                                    value={item?.label}
                                    className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 disabled:opacity-50 "
                                    placeholder="Enter Custom Selector to Place Pumper Widget"
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "label",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </Fragment>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-full mb-3">
                <div className="mb-3">
                  <h1 className="text-teal-300">Block Title</h1>

                  <input
                    id="blockTitle"
                    rows="4"
                    value={formData.blockTitle}
                    className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                    placeholder="Enter Custom Selector to Place Pumper Widget"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        blockTitle: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <h1 className="text-teal-300 ">Footer Text</h1>

                  <input
                    id="footerText"
                    rows="4"
                    value={formData.footerText}
                    className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                    placeholder="Enter Custom Selector to Place Pumper Widget"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        footerText: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-full mb-3">
                <h1 className="text-teal-300 font-semibold text-lg mb-3">
                  Settings
                </h1>
                <div>
                  <div className="mb-3">
                    <p className="text-teal-300 mb-1 ">Appearance and looks</p>
                    <div className="flex items-center mb-2 ">
                      <input
                        id="showPriceByEach"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={formData.showPriceByEach}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            showPriceByEach: !formData.showPriceByEach,
                          });
                        }}
                      />
                      <label
                        htmlFor="showPriceByEach"
                        className="text-sm ms-2 cursor-pointer"
                      >
                        Show each unit price
                      </label>
                    </div>

                    <div className="flex items-center mb-2">
                      <input
                        id="showTotalPrice"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={formData.showTotalPrice}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            showTotalPrice: !formData.showTotalPrice,
                          });
                        }}
                      />
                      <label
                        htmlFor="showTotalPrice"
                        className="text-sm ms-2 cursor-pointer"
                      >
                        Show total price
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="hideHeaderFooterLines"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={formData.hideHeaderFooterLines}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            hideHeaderFooterLines:
                              !formData.hideHeaderFooterLines,
                          });
                        }}
                      />
                      <label
                        htmlFor="hideHeaderFooterLines"
                        className="text-sm ms-2 cursor-pointer"
                      >
                        Hide header and footer lines
                      </label>
                    </div>
                  </div>

                  <hr />
                  <div className="mt-3 mb-3">
                    <p className="text-teal-300 mb-1 ">Functionality</p>
                    <div className="flex items-center mb-2">
                      <input
                        id="includeVarient"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={formData.includeVarient}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            includeVarient: !formData.includeVarient,
                          });
                        }}
                      />
                      <label
                        htmlFor="includeVarient"
                        className="text-sm ms-2 cursor-pointer"
                      >
                        Let customers choose different variants for each item
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="skipToCheckout"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={formData.skipToCheckout}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            skipToCheckout: !formData.skipToCheckout,
                          });
                        }}
                      />
                      <label
                        htmlFor="skipToCheckout"
                        className="text-sm ms-2 cursor-pointer"
                      >
                        Skip cart directly to checkout
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="compareToPrice"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={formData.compareToPrice}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            compareToPrice: !formData.compareToPrice,
                          });
                        }}
                      />
                      <label
                        htmlFor="compareToPrice"
                        className="text-sm ms-2 cursor-pointer"
                      >
                        Show compare to price
                      </label>
                    </div>
                    {formData.compareToPrice && (
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-teal-300 text-sm">
                            Set custom compare price
                          </label>

                          <input
                            id="customComparePrice"
                            rows="4"
                            value={formData.customCompareAtPrice}
                            className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                customCompareAtPrice: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-teal-300 text-sm">
                            Shopify product compare price
                          </label>
                          <input
                            id="productComparePrice"
                            rows="4"
                            disabled
                            value={productComparePrice}
                            className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 disabled:opacity-50  "
                            onChange={(e) => {}}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <hr />

                  <div className="mt-3">
                    <p className="text-teal-300 mb-1 ">
                      Enable Discount Combination
                    </p>
                    <div className="flex items-center mb-2">
                      <input
                        id="combineProductDiscounts"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={formData.combineProductDiscounts}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            combineProductDiscounts:
                              !formData.combineProductDiscounts,
                          });
                        }}
                      />
                      <label
                        htmlFor="combineProductDiscounts"
                        className="text-sm ms-2 cursor-pointer"
                      >
                        Product Discounts
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="combineOrderDiscounts"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={formData.combineOrderDiscounts}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            combineOrderDiscounts:
                              !formData.combineOrderDiscounts,
                          });
                        }}
                      />
                      <label
                        htmlFor="combineOrderDiscounts"
                        className="text-sm ms-2 cursor-pointer"
                      >
                        Order Discounts
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="combineShippingDiscounts"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={formData.combineShippingDiscounts}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            combineShippingDiscounts:
                              !formData.combineShippingDiscounts,
                          });
                        }}
                      />
                      <label
                        htmlFor="combineShippingDiscounts"
                        className="text-sm ms-2 cursor-pointer"
                      >
                        Shipping Discounts
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-5 me-3 rounded-lg flex flex-col w-full mb-3">
                <h1 className="text-teal-300 font-semibold text-lg mb-6">
                  Typography & Color
                </h1>
                <div className="flex flex-col ">
                  <div>
                    <h1 className="text-teal-300">Block Title</h1>
                  </div>

                  <div className="mb-3 grid grid-cols-3 gap-x-3">
                    <input
                      id="message"
                      rows="4"
                      value={formData?.blockTitleSizeTypo}
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      placeholder="Enter Custom Selector to Place Pumper Widget"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          blockTitleSizeTypo: e.target.value,
                        });
                      }}
                    />

                    <select
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      value={formData?.blockTitleStyleTypo}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          blockTitleStyleTypo: e.target.value,
                        });
                      }}
                    >
                      {styleOptions.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>

                    <ColorPicker
                      value={formData.blockTitleColor}
                      setFormData={(color) => {
                        setFormData({
                          ...formData,
                          blockTitleColor: color.hex,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div>
                    <h1 className="text-teal-300">Title </h1>
                  </div>

                  <div className="mb-3 grid grid-cols-3 gap-x-3">
                    <input
                      id="message"
                      rows="4"
                      value={formData?.titleSizeTypo}
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      placeholder="Enter Custom Selector to Place Pumper Widget"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          titleSizeTypo: e.target.value,
                        });
                      }}
                    />

                    <select
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      value={formData?.titleStyleTypo}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          titleStyleTypo: e.target.value,
                        });
                      }}
                    >
                      {styleOptions.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>

                    <ColorPicker
                      value={formData.titleColor}
                      setFormData={(color) => {
                        setFormData({
                          ...formData,
                          titleColor: color.hex,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div>
                    <h1 className="text-teal-300">Subtitle</h1>
                  </div>

                  <div className="mb-3 grid grid-cols-3 gap-x-3">
                    <input
                      id="message"
                      rows="4"
                      value={formData?.discountSizeTypo}
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      placeholder="Enter Custom Selector to Place Pumper Widget"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          discountSizeTypo: e.target.value,
                        });
                      }}
                    />

                    <select
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      value={formData?.discountStyleTypo}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          discountStyleTypo: e.target.value,
                        });
                      }}
                    >
                      {styleOptions.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>

                    <ColorPicker
                      value={formData.discountColor}
                      setFormData={(color) => {
                        setFormData({
                          ...formData,
                          discountColor: color.hex,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div>
                    <h1 className="text-teal-300">Price</h1>
                  </div>

                  <div className="mb-3 grid grid-cols-3 gap-x-3">
                    <input
                      id="message"
                      rows="4"
                      value={formData?.textSizeTypo}
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      placeholder="Enter Custom Selector to Place Pumper Widget"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          textSizeTypo: e.target.value,
                        });
                      }}
                    />

                    <select
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      value={formData?.textStyleTypo}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          textStyleTypo: e.target.value,
                        });
                      }}
                    >
                      {styleOptions.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>

                    <ColorPicker
                      value={formData.textColor}
                      setFormData={(color) => {
                        setFormData({
                          ...formData,
                          textColor: color.hex,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div>
                    <h1 className="text-teal-300">Label</h1>
                  </div>

                  <div className="mb-3 grid grid-cols-3 gap-x-3">
                    <input
                      id="message"
                      rows="4"
                      value={formData?.labelSizeTypo}
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      placeholder="Enter Custom Selector to Place Pumper Widget"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          labelSizeTypo: e.target.value,
                        });
                      }}
                    />

                    <select
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      value={formData?.labelStyleTypo}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          labelStyleTypo: e.target.value,
                        });
                      }}
                    >
                      {styleOptions.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>

                    <ColorPicker
                      value={formData.labelColor}
                      setFormData={(color) => {
                        setFormData({
                          ...formData,
                          labelColor: color.hex,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div>
                    <h1 className="text-teal-300">Footer</h1>
                  </div>

                  <div className="mb-3 grid grid-cols-3 gap-x-3">
                    <input
                      id="message"
                      rows="4"
                      value={formData?.footerSizeTypo}
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      placeholder="Enter Custom Selector to Place Pumper Widget"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          footerSizeTypo: e.target.value,
                        });
                      }}
                    />

                    <select
                      className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                      value={formData?.footerStyleTypo}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          footerStyleTypo: e.target.value,
                        });
                      }}
                    >
                      {styleOptions.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>

                    <ColorPicker
                      value={formData.footerColor}
                      setFormData={(color) => {
                        setFormData({
                          ...formData,
                          footerColor: color.hex,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* <hr /> */}
                <div className="flex flex-col ">
                  {/* <div>
                    <h1 className="text-teal-300">Color</h1>
                  </div> */}

                  <div className="mb-3 grid grid-cols-2 gap-x-3">
                    <div className="flex flex-col mt-5">
                      <h1 className="text-teal-300">Border Color</h1>
                      <ColorPicker
                        value={formData.borderColor}
                        setFormData={(color) => {
                          setFormData({
                            ...formData,
                            borderColor: color.hex,
                          });
                        }}
                      />
                    </div>

                    <div className="flex flex-col mt-5">
                      <h1 className="text-teal-300">Background color</h1>
                      <ColorPicker
                        value={formData.backgroundColor}
                        setFormData={(color) => {
                          setFormData({
                            ...formData,
                            backgroundColor: color.hex,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3 grid grid-cols-2 gap-x-3">
                    <div className="flex flex-col mt-5">
                      <h1 className="text-teal-300">Border Width</h1>
                      <input
                        id="message"
                        rows="4"
                        value={formData?.borderWidth}
                        className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                        placeholder="Enter Custom Selector to Place Pumper Widget"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            borderWidth: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="flex flex-col mt-5">
                      <h1 className="text-teal-300">Border Radius</h1>
                      <input
                        id="message"
                        rows="4"
                        value={formData?.borderRadius}
                        className="mt-1 w-full rounded-lg block p-2 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
                        placeholder="Enter Custom Selector to Place Pumper Widget"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            borderRadius: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-col mx-5 ">
              <h1 className="text-2xl mb-3 text-center">Preview</h1>
              <div className="bg-white  text-black rounded-lg p-5 sticky top-0">
                <Preview
                  previewCheckBox={previewCheckBox}
                  setPreviewCheckBox={setPreviewCheckBox}
                  fields={offerList}
                  blockTitle={formData.blockTitle}
                  titleColor={formData.titleColor}
                  discountColor={formData.discountColor}
                  textColor={formData.textColor}
                  labelColor={formData.labelColor}
                  blockTitleColor={formData.blockTitleColor}
                  borderColor={formData.borderColor}
                  backgroundColor={formData.backgroundColor}
                  footerColor={formData.footerColor}
                  productPrice={productPrice}
                  productComparePrice={formData.productComparePrice}
                  moneyFormat={moneyFormat}
                  defaultSelected={formData.defaultSelected}
                  footerText={formData.footerText}
                  titleSizeTypo={formData.titleSizeTypo}
                  titleStyleTypo={formData.titleStyleTypo}
                  discountSizeTypo={formData.discountSizeTypo}
                  discountStyleTypo={formData.discountStyleTypo}
                  textSizeTypo={formData.textSizeTypo}
                  textStyleTypo={formData.textStyleTypo}
                  labelSizeTypo={formData.labelSizeTypo}
                  labelStyleTypo={formData.labelStyleTypo}
                  blockTitleSizeTypo={formData.blockTitleSizeTypo}
                  blockTitleStyleTypo={formData.blockTitleStyleTypo}
                  footerSizeTypo={formData.footerSizeTypo}
                  footerStyleTypo={formData.footerStyleTypo}
                  borderWidth={formData.borderWidth}
                  borderRadius={formData.borderRadius}
                  productOptions={productOptions}
                  includeVarient={formData.includeVarient}
                  compareToPrice={formData.compareToPrice}
                  showTotalPrice={formData.showTotalPrice}
                  showPriceByEach={formData.showPriceByEach}
                  hasDefaultVariant={hasDefaultVariant}
                  noBranding={formData.noBranding}
                  hideHeaderFooterLines={formData.hideHeaderFooterLines}
                  customCompareAtPrice={formData.customCompareAtPrice}
                />
              </div>
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

export default EditOffer;
