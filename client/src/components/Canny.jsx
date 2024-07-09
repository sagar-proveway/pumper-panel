import axios from "axios";
import React, { useEffect } from "react";

const BoardToken = "cf419980-4d7c-79c9-082a-7c22ba534d4b";

const Feedback = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const shopName = decodeURIComponent(urlParams.get("shop"));

  useEffect(() => {
    if (shopName && urlParams.size !== 0) {
      axios
        .get(`/api/canny/cannySSO?shop=${shopName}`)
        .then((response) => {
          const data = response.data;
          if (data.ssoToken !== "") {
            loadCanny(data.ssoToken);
          } else {
            console.log("Failed to fetch SSO token");
          }
        })
        .catch((error) => {
          console.error("Error fetching SSO token:", error);
        });
    }
  }, [shopName]);

  const loadCanny = (token) => {
    (function (w, d, i, s) {
      function l() {
        if (!d.getElementById(i)) {
          var f = d.getElementsByTagName(s)[0],
            e = d.createElement(s);
          e.type = "text/javascript";
          e.async = !0;
          e.src = "https://canny.io/sdk.js";
          e.onload = () => {
            if (w.Canny) {
              w.Canny("render", {
                boardToken: BoardToken,
                basePath: null,
                ssoToken: token,
                theme: "light",
              });
            }
          };
          f.parentNode.insertBefore(e, f);
        }
      }
      if ("function" != typeof w.Canny) {
        var c = function () {
          c.q.push(arguments);
        };
        c.q = [];
        w.Canny = c;
        "complete" === d.readyState
          ? l()
          : w.attachEvent
          ? w.attachEvent("onload", l)
          : w.addEventListener("load", l, !1);
      }
    })(window, document, "canny-jssdk", "script");
  };

  return shopName && urlParams.size !== 0 ? (
    <div data-canny />
  ) : (
    <div>Unauthorized Access</div>
  );
};

export default Feedback;
