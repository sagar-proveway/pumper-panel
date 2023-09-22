import ShopModal from "../model/shopModal.js";
import shopify from "../config/shopify.js";
import Settings from "../model/settingsModal.js";

import { decode } from "html-entities";

export const getStore = async (req, res, next) => {
  try {
    const result = await ShopModal.find();

    if (!result || result.length === 0) {
      throw new Error("Shop not found");
    }

    return res.json({ data: result });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

export const getShopById = async (req, res, next) => {
  const { shopName } = req.body;

  try {
    const result = await ShopModal.find({
      shop: shopName,
    });

    if (!result || result.length === 0) {
      throw new Error("Shop not found");
    }

    return res.json({ data: result });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const getSettings = async (req, res, next) => {
  const { shopName: shop } = req.body;

  try {
    const result = await Settings.find({
      shop,
    });

    return res.json({ data: result });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

export const setSettings = async (req, res, next) => {
  const {
    shopName: shop,
    customCss,
    customJs,
    customWidgetSelector,
  } = req.body;

  try {
    const settings = await Settings.find({
      shop,
    });

    const shopDetails = await ShopModal.find({
      shop,
    });

    if (!shopDetails || shopDetails.length === 0) {
      throw new Error("Shop not found");
    }

    const client = new shopify.clients.Graphql({
      session: {
        shop: shopDetails[0].shop,
        accessToken: shopDetails[0].accessToken,
      },
    });

    let appData = await client.query({
      data: {
        query: `query {
                  currentAppInstallation {
                      id
                  }
              }`,
      },
    });

    let appId = appData.body.data.currentAppInstallation.id;
    let metafieldData = {
      customCss,
      customJs,
      customWidgetSelector,
    };
    const variable = {
      metafieldsSetInput: [
        {
          key: "customSettings",
          namespace: "prvw_metafields",
          ownerId: appId,
          type: "json",
          value: JSON.stringify(metafieldData),
        },
      ],
    };

    const id = await client.query({
      data: {
        query: `mutation CreateAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
                  metafieldsSet(metafields: $metafieldsSetInput) {
                      metafields {
                          id
                          namespace
                          key
                      }
                      userErrors {
                          field
                          message
                      }
                  }
              }`,
        variables: variable,
      },
    });

    const insertData = {
      $set: {
        shop,
        customCss,
        customJs,
        customWidgetSelector,
        createAt: new Date(),
      },
    };

    await Settings.updateOne({ shop }, insertData, {
      upsert: true,
    });

    return res.json({ data: settings });
  } catch (error) {
    console.error(error);
  }
};

export async function getCurrency(req, res) {
  const { shop } = req.body;

  console.log(shop);
  try {
    const shopDetails = await ShopModal.find({
      shop,
    });

    if (!shopDetails || shopDetails.length === 0) {
      throw new Error("Shop not found");
    }

    const client = new shopify.clients.Graphql({
      session: {
        shop: shopDetails[0].shop,
        accessToken: shopDetails[0].accessToken,
      },
    });

    const data = await client.query({
      data: `query {
            shop {
                currencyFormats {
                    moneyFormat
                    moneyWithCurrencyFormat
                }
            }
            }`,
    });
    let formats = data.body.data.shop.currencyFormats;
    formats.moneyFormat = decode(formats.moneyFormat);
    formats.moneyFormat = decode(formats.moneyWithCurrencyFormat);
    res.json(formats);
  } catch (err) {
    console.log(err);
    res.json({ error: true });
  }
}
