import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";

import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

let shopify = shopifyApi({
  apiKey: process.env.apiKey,
  apiSecretKey: process.env.apiSecretKey,
  scopes: process.env.scopes,
  hostName: process.env.hostName,
});

export default shopify;
