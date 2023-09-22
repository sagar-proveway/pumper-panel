export async function getCollectionsProducts(client, collectionIds) {
  // Get all product IDs for the given collections.
  let productIds = [];
  for (let i = 0; i < collectionIds.length; i++) {
    // Get the product IDs for the current collection.
    let collectionData = await client.query({
      data: {
        query: `query {
                    collection(id: "${collectionIds[i]}") {
                        products(first: 250) {
                            edges {
                                node {
                                    id
                                }
                            }
                        }
                    }
                }`,
      },
    });
    // Check if there are any products in the collection.
    if (!collectionData.body.data.collection.products.edges.length) {
      continue;
    }
    // Store all of the product IDs.
    let products = collectionData.body.data.collection.products.edges;
    for (let j = 0; j < products.length; j++) {
      productIds.push(products[j].node.id);
    }
  }
  return productIds;
}
