let combinesWith = {
  orderDiscounts: false,
  productDiscounts: false,
  shippingDiscounts: false,
};

export async function updateShopifyDiscount(client, dbData, dId, metaId) {
  console.log("started");

  let value = [];
  for (let i = 0; i < dbData.quantity.length; i++) {
    if (dbData.price[i] != "default") {
      if (dbData.discount[i] > 0 && dbData.quantity[i] != 0) {
        if (dbData.price[i] == "percentage") {
          value.push({
            productId: dbData.productId,
            quantity: parseInt(dbData.quantity[i]),
            percentage: parseFloat(dbData.discount[i]),
            amount: 0,
            appliesToEachItem: false,
            title: dbData.title[i],
            type: "percentage",
          });
        } else if (dbData.price[i] == "amount") {
          value.push({
            productId: dbData.productId,
            quantity: parseInt(dbData.quantity[i]),
            amount: parseFloat(dbData.discount[i]),
            percentage: 0,
            appliesToEachItem: false,
            title: dbData.title[i],
            type: "amount",
          });
        } else if (dbData.price[i] == "each") {
          value.push({
            productId: dbData.productId,
            quantity: parseInt(dbData.quantity[i]),
            amount: parseFloat(dbData.discount[i]),
            percentage: 0,
            appliesToEachItem: true,
            title: dbData.title[i],
            type: "amount",
          });
        } else if (dbData.price[i] == "fixed") {
          value.push({
            productId: dbData.productId,
            quantity: parseInt(dbData.quantity[i]),
            amount: parseFloat(dbData.discount[i]),
            percentage: 0,
            appliesToEachItem: true,
            title: dbData.title[i],
            type: "fixed",
          });
        }
      }
    }
  }

  const discountRes = await client.query({
    data: {
      query: `mutation discountAutomaticAppUpdate($automaticAppDiscount: DiscountAutomaticAppInput!, $id: ID!) {
                discountAutomaticAppUpdate(automaticAppDiscount: $automaticAppDiscount, id: $id) {
                    userErrors {
                        field
                        message
                    }
                    automaticAppDiscount {
                        discountId
                        title
                        startsAt
                        endsAt
                        status
                        appDiscountType {
                            appKey
                            functionId
                        }
                        combinesWith {
                            orderDiscounts
                            productDiscounts
                            shippingDiscounts
                        }
                    }
                }
            }`,
      variables: {
        id: dId,
        automaticAppDiscount: {
          combinesWith: {
            orderDiscounts: dbData.combineOrderDiscounts,
            productDiscounts: dbData.combineProductDiscounts,
            shippingDiscounts: dbData.combineShippingDiscounts,
          },
          title: dbData.offerName,
          functionId: process.env.FUNCTION_ID,
          startsAt: "2022-06-22T00:00:00",
          metafields: [
            {
              id: metaId,
              namespace: "volume-discount",
              key: "function-configuration",
              value: JSON.stringify(value),
              type: "json",
            },
          ],
        },
      },
    },
  });
  console.log("logging now");
  console.log(discountRes.body.data.discountAutomaticAppUpdate);
  return {
    discountTitles: dbData.offerName,
    discountGids:
      discountRes.body.data.discountAutomaticAppUpdate.automaticAppDiscount
        .discountId,
  };
}
