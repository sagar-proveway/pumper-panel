import mongoose from "mongoose"
const Schema = mongoose.Schema;

const ShopRevenue = new Schema({
    "shop": String,
    "revenue": Number,
    "date": Date
});

export default mongoose.model('ShopRevenue', ShopRevenue);