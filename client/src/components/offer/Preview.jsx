import useShopifyCurrencyFormat from "@ansugroup/use-shopify-currency-format";

export default function Preview(props) {
  let titleStyle = getStyle(
    props.titleStyleTypo,
    props.titleSizeTypo,
    props.titleColor
  );
  let textStyle = getStyle(
    props.textStyleTypo,
    props.textSizeTypo,
    props.textColor
  );
  let blockTitleStyle = getStyle(
    props.blockTitleStyleTypo,
    props.blockTitleSizeTypo,
    props.blockTitleColor
  );
  let footerStyle = getStyle(
    props.footerStyleTypo,
    props.footerSizeTypo,
    props.footerColor
  );

  let labelStyle = getStyle(
    props.labelStyleTypo,
    props.labelSizeTypo,
    props.labelColor
  );

  let discountStyle = getStyle(
    props.discountStyleTypo,
    props.discountSizeTypo,
    props.discountColor
  );

  const currencyFormat = useShopifyCurrencyFormat(props.moneyFormat);

  return (
    <div className="prvw_bundle_container">
      <div className="block">
        <div
          className={
            props.hideHeaderFooterLines ? "block__title_noline" : "block__title"
          }
        >
          {props.blockTitle ? (
            <h3 style={blockTitleStyle}>{props.blockTitle}</h3>
          ) : (
            ""
          )}
        </div>
        <div className="block__cbwrapper">
          {props.fields.map((item, index) => {
            return (
              <div className="block__cb" key={index}>
                <input
                  type="radio"
                  id={"prvw_pair_" + index}
                  name="drone"
                  value={index}
                  checked={props.previewCheckBox === index}
                  onChange={(e) => {
                    props.setPreviewCheckBox(e.target.value);
                  }}
                />

                <label
                  style={{
                    borderRadius: `${props.borderRadius}px`,
                    borderWidth:
                      props.previewCheckBox == index
                        ? `${props.borderWidth}px`
                        : "",
                    borderColor:
                      props.previewCheckBox == index ? props.borderColor : "",
                    backgroundColor:
                      props.previewCheckBox == index
                        ? props.backgroundColor
                        : "",
                  }}
                  htmlFor={"prvw_pair_" + index}
                >
                  <div className="block__cbmain">
                    <div
                      className="block__cbmain--radio"
                      style={{
                        backgroundColor:
                          props.previewCheckBox == index
                            ? props.borderColor
                            : "",
                        boxShadow:
                          props.previewCheckBox == index
                            ? "0 0 0 1px " + props.borderColor
                            : "",
                      }}
                    ></div>
                    <div className="block__cbmain--content">
                      <div className="block__cbmain--content--left">
                        <h5 style={titleStyle}>
                          {item?.title ? item?.title : index + 1 + " Pair"}
                        </h5>
                        <h4 style={titleStyle}>
                          {props.showPriceByEach
                            ? item?.price != "each"
                              ? item?.price == "percentage"
                                ? currencyFormat(
                                    (props.productPrice * item?.quantity -
                                      props.productPrice *
                                        item?.quantity *
                                        (item?.discount / 100)) /
                                      item?.quantity
                                  ).replace(/(<([^>]+)>)/gi, "")
                                : item?.price == "amount"
                                ? currencyFormat(
                                    (props.productPrice * item?.quantity -
                                      item?.discount) /
                                      item?.quantity
                                  ).replace(/(<([^>]+)>)/gi, "")
                                : currencyFormat(props.productPrice).replace(
                                    /(<([^>]+)>)/gi,
                                    ""
                                  )
                              : currencyFormat(
                                  props.productPrice - item?.discount
                                ).replace(/(<([^>]+)>)/gi, "")
                            : item?.price != "each"
                            ? item?.price == "percentage"
                              ? currencyFormat(
                                  props.productPrice * item?.quantity -
                                    props.productPrice *
                                      item?.quantity *
                                      (item?.discount / 100)
                                ).replace(/(<([^>]+)>)/gi, "")
                              : item?.price == "amount"
                              ? currencyFormat(
                                  props.productPrice * item?.quantity -
                                    item?.discount
                                ).replace(/(<([^>]+)>)/gi, "")
                              : currencyFormat(
                                  props.productPrice * item?.quantity
                                ).replace(/(<([^>]+)>)/gi, "")
                            : currencyFormat(
                                (props.productPrice - item?.discount) *
                                  item?.quantity
                              ).replace(/(<([^>]+)>)/gi, "")}
                        </h4>

                        {props.compareToPrice &&
                          props.previewCheckBox == index && (
                            <p className="prevprice">
                              {currencyFormat(
                                props.customCompareAtPrice != "0" &&
                                  props.customCompareAtPrice
                                  ? props.customCompareAtPrice * item?.quantity
                                  : props.productComparePrice
                                  ? props.productComparePrice * item?.quantity
                                  : props.productPrice * item?.quantity
                              ).replace(/(<([^>]+)>)/gi, "")}
                            </p>
                          )}
                      </div>
                      <div className="block__cbmain--content--right">
                        <h6
                          style={{
                            ...labelStyle,
                            display: item?.labelSelected === false && "none",
                          }}
                        >
                          {item?.label ? item?.label : "Most Popular"}
                        </h6>
                        <h5
                          style={{
                            ...discountStyle,
                            display: item?.subtitleSelected === false && "none",
                          }}
                        >
                          {item?.subtitle
                            ? item?.subtitle
                            : index == 0
                            ? "Standard Price"
                            : index * 10 + "% OFF"}
                        </h5>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
        {!props.showTotalPrice ? (
          <div
            className={
              props.hideHeaderFooterLines
                ? "block__bottomtitle_noline"
                : "block__bottomtitle"
            }
          >
            {props.footerText ? (
              <h5 style={footerStyle}>{props.footerText}</h5>
            ) : (
              ""
            )}
            {!props.noBranding && (
              <div
                style={{
                  top: "3px",
                  fontStyle: "normal",
                  fontWeight: 300,
                  position: "relative",
                  color: "#c5c5c5",
                  fontSize: "9px",
                  textAlign: "right",
                  cursor: "pointer",
                }}
                title="Click to remove branding"
              >
                Powered By Pumper
              </div>
            )}
          </div>
        ) : (
          <div className="block__bottomtitle__total">
            <h5>
              <div style={footerStyle} className="bottomtitle__total__text">
                {props.footerText}
              </div>
              <div style={footerStyle} className="bottomtitle__total">
                Total: &nbsp;&nbsp;
                {props.fields[props.previewCheckBox].price != "each"
                  ? props.fields[props.previewCheckBox].price == "percentage"
                    ? currencyFormat(
                        props.productPrice *
                          props.fields[props.previewCheckBox].quantity -
                          props.productPrice *
                            props.fields[props.previewCheckBox].quantity *
                            (props.fields[props.previewCheckBox].discount / 100)
                      ).replace(/(<([^>]+)>)/gi, "")
                    : props.fields[props.previewCheckBox].price == "amount"
                    ? currencyFormat(
                        props.productPrice *
                          props.fields[props.previewCheckBox].quantity -
                          props.fields[props.previewCheckBox].discount
                      ).replace(/(<([^>]+)>)/gi, "")
                    : currencyFormat(
                        props.productPrice *
                          props.fields[props.previewCheckBox].quantity
                      ).replace(/(<([^>]+)>)/gi, "")
                  : currencyFormat(
                      (props.productPrice -
                        props.fields[props.previewCheckBox].discount) *
                        props.fields[props.previewCheckBox].quantity
                    ).replace(/(<([^>]+)>)/gi, "")}
              </div>
            </h5>
            {!props.noBranding && (
              <div
                style={{
                  top: "3px",
                  fontStyle: "normal",
                  fontWeight: 300,
                  position: "relative",
                  color: "#c5c5c5",
                  fontSize: "9px",
                  textAlign: "right",
                  cursor: "pointer",
                }}
                title="Click to remove branding"
              >
                Powered By Pumper
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
function getStyle(titleStyleTypo, titleSizeTypo, titleColor) {
  let fontWeight = "";
  let fontStyle = "";
  if (titleStyleTypo == "light") {
    fontWeight = 300;
    fontStyle = "normal";
  } else if (titleStyleTypo == "light-italic") {
    fontWeight = 300;
    fontStyle = "italic";
  } else if (titleStyleTypo == "regular") {
    fontWeight = "normal";
    fontStyle = "normal";
  } else if (titleStyleTypo == "italic") {
    fontWeight = "normal";
    fontStyle = "italic";
  } else if (titleStyleTypo == "medium") {
    fontWeight = 500;
    fontStyle = "normal";
  } else if (titleStyleTypo == "medium-italic") {
    fontWeight = 500;
    fontStyle = "italic";
  } else if (titleStyleTypo == "semi-bold") {
    fontWeight = 600;
    fontStyle = "normal";
  } else if (titleStyleTypo == "bold") {
    fontWeight = "bold";
    fontStyle = "normal";
  } else if (titleStyleTypo == "bold-italic") {
    fontWeight = "bold";
    fontStyle = "italic";
  }
  return {
    color: titleColor,
    fontWeight: fontWeight,
    fontStyle: fontStyle,
    fontSize: titleSizeTypo + "px",
  };
}
