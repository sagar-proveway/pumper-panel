const deleteMetafield = `mutation metafieldDelete($input: MetafieldDeleteInput!) {
    metafieldDelete(input: $input) {
      deletedId
      userErrors {
        field
        message
      }
    }
  }`;

const createMetaField = `mutation CreateAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
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
  }`;

export async function deleteMetafields(client, ids) {
  let metaData = [];
  for (let id of ids) {
    let variable = {
      input: {
        id: id,
      },
    };

    metaData.push(
      await client.query({
        data: {
          query: deleteMetafield,
          variables: variable,
        },
      })
    );
  }
  return metaData;
}

export async function saveMetafields(client, dbData) {
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
  let metafields = [];
  for (let i = 0; i < dbData.productId.length; i++) {
    const variable = {
      metafieldsSetInput: [
        {
          key: dbData.productId[i].replace("gid://shopify/Product/", ""),
          namespace: "prvw_metafields",
          ownerId: appId,
          type: "json",
          value: JSON.stringify(dbData),
        },
      ],
    };

    let metaData = await client.query({
      data: {
        query: createMetaField,
        variables: variable,
      },
    });

    if (metaData.body.data.metafieldsSet.userErrors.length > 0) {
      return { error: metaData.body.data.metafieldsSet.userErrors[0].message };
    }
    metafields.push(metaData.body.data.metafieldsSet.metafields[0].id);
  }

  return metafields;
}

export async function getDiscountMetaId(client, discount) {
  let metaFieldData = await client.query({
    data: `
        query{
            discountNodes(first:1, query: "title:'${discount.offerName}'") {
            nodes {
              metafield(namespace: "volume-discount", key:"function-configuration") {
                        id
              }
            }
          }
        }`,
  });
  console.log(metaFieldData.body.data.discountNodes);
  return metaFieldData.body.data.discountNodes.nodes[0].metafield.id;
}
