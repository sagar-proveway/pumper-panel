import mongoose from "mongoose";
const connectDatabase = () => {
  const DB = process.env.DATABASE;

  mongoose
    .connect(
      DB,
      { useNewUrlParser: true },
      { useCreateIndex: true },
      { useUnifiedTopology: true },
      { useFindAndModify: false }
    )
    .then(() => {
      console.log("Database connected succesfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connectDatabase;
