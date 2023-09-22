import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ShopDetailsSchema = new Schema({
  shop: String,
  accessToken: String,
  plan: String,
  planStatus: String,
  status: String,
  storeName: String,
  storeEmail: String,
  storeDomain: String,
  storeCountry: String,
  storeCurrency: String,
  storePhone: String,
  storeAddress: String,
  storeCity: String,
  storeZip: String,
  storeProvince: String,
  storeTimeZone: String,
  storeCreatedAt: String,
  storeCustomerEmail: String,
  storeShopOwner: String,
  storeLanguage: String,
  storeSource: String,
  storePlanName: String,
  storePlanDisplayName: String,
  storeMyshopifyDomain: String,
  revenue: Number,
  noBranding: Boolean,
  offers: Number,
  createdAt: Date,
});

export default mongoose.model("ShopDetails", ShopDetailsSchema);
