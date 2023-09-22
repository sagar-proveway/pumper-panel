import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Setting = new Schema({
  shop: String,
  customCss: { type: String, default: "" },
  customJs: { type: String, default: "" },
  customWidgetSelector: { type: String, default: "" },
  createAt: Date,
});

export default mongoose.model("Setting", Setting);
