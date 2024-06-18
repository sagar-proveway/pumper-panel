import jwt from "jsonwebtoken";
// import discountModel from "../model/discountModel.js";

const PrivateKey = "02681d25-e2e0-3148-3704-6e467704a3c1";

export async function CannyToken(req, res) {
  try {
    const shop = req.query.shop;
    const name = shop.split(".")[0];
    const email = `${name}@proveway.com`;
    let ssoToken = "";
    const userData = {
      email,
      id: shop,
      name,
    };
    if (shop !== undefined && shop !== null && shop !== "") {
      ssoToken = jwt.sign(userData, PrivateKey, { algorithm: "HS256" });
      res.json({ ssoToken: ssoToken });
    } else {
      res.json({ ssoToken: "" });
    }
    // res.json({ ssoToken });
    // res.json({ ssoToken: ssoToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ ssoToken: null, error: true });
  }
}

// export const getShopName = async (req, res, next) => {
//   const shop = req.query.shop;

//   try {
//     const shopName = await discountModel.find({
//       shop,
//     });

//     console.log(shopName, "shopName");

//     return res.json({ data: result });
//   } catch (error) {
//     console.error(error);
//     return res.status(404).json({ error: error.message });
//   }
// };
