import ShopModal from "../model/shopModal.js";
import shopify from "../config/shopify.js";
import discountModel from "../model/discountModel.js";
import { getCollectionsProducts } from "../utils/getCollectionIds.js";
import { updateShopifyDiscount } from "../utils/updateShopifyDiscount.js";
import {
  saveMetafields,
  deleteMetafields,
  getDiscountMetaId,
} from "../utils/metaData.js";

export const getAllDiscountById = async (req, res, next) => {
  const { shop } = req.body;

  try {
    const offerDetails = await discountModel.find({
      shop,
    });

    if (!offerDetails || offerDetails.length === 0) {
      throw new Error("Shop not found");
    }

    return res.json({
      data: offerDetails,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({ error: error.message });
  }
};

export const getDiscountByIdToCompare = async (req, res, next) => {
  const { shop } = req.body;

  try {
    const shopDetails = await ShopModal.find({
      shop,
    });

    if (!shopDetails || shopDetails.length === 0) {
      throw new Error("Shop not found");
    }

    const discount = await discountModel.find({
      shop,
    });

    if (!discount || discount.length === 0) {
      throw new Error("No discount exists");
    }

    const client = new shopify.clients.Graphql({
      session: {
        shop: shopDetails[0].shop,
        accessToken: shopDetails[0].accessToken,
      },
    });

    let queryData = [];

    for (let item of discount) {
      let discountData = await client.query({
        data: `query {
                    discountNode(id: "${item.discountGid}") {
                      discount {
                        ... on DiscountAutomaticApp {
                          status
                          title
                          discountId
                        }
                      }
                    }
                  }
                  `,
      });

      queryData.push(discountData.body.data?.discountNode?.discount);
    }

    return res.json({
      data: { discount, queryData, shopDetails },
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({ error: error.message });
  }
};

export const getDiscountById = async (req, res, next) => {
  const { id } = req.body;

  try {
    const discount = await discountModel.find({
      _id: id,
    });

    if (!discount || discount.length === 0) {
      throw new Error("offer not found");
    }

    let shop = discount[0].shop;

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

    let productDatas = await client.query({
      data: `
        query {
            product(id: "${discount[0].productId[0]}") {
                options {
                    name
                    values
                }
                variants(first: 1){
                    nodes{
                    compareAtPrice
                    price
                    }
                }
                totalVariants
                hasOnlyDefaultVariant
            }
        }`,
    });

    return res.json({
      data: discount,
      productData: productDatas?.body?.data?.product,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({ error: error.message });
  }
};

export const editDiscount = async (req, res) => {
  const { id, data } = req.body;

  try {
    const discount = await discountModel.find({
      _id: id,
    });

    if (!discount || discount.length === 0) {
      throw new Error("offer not found");
    }

    let shop = discount[0].shop;

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

    if (data.discountTarget == "product" && data.productId.length == 0) {
      throw new Error({ error: "Please select a product" });
    } else if (
      data.discountTarget == "collection" &&
      data.collectionId.length == 0
    ) {
      throw new Error({ error: "Please select a collection" });
    }

    if (data.discountTarget == "collection") {
      let productIds = await getCollectionsProducts(client, data.collectionId);
      if (productIds.length > 50) {
        res.json({
          error:
            "You are unable to add a new offer to these collections due to their combined product count exceeding the limit of 50 products.",
        });
        return;
      }
      data.productId = productIds;
    }

    await deleteMetafields(client, discount[0].metaId);

    let gid = await saveMetafields(client, data);

    data["metaId"] = gid;

    let discountMetaId = await getDiscountMetaId(client, discount[0]);

    let discountData = await updateShopifyDiscount(
      client,
      data,
      discount[0].discountGid,
      discountMetaId
    );

    data["discountGid"] = discountData.discountGids;
    data["status"] = "published";
    data["discountTitles"] = data.offerName;
    data["shop"] = shop;
    data["_id"] = id;

    console.log(data);

    let result = await discountModel.findOneAndUpdate({ _id: id }, data);

    return res.json({
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({ error: error.message });
  }
};
