import app from "./app.js";
import connectDatabase from "./config/connect.js";

connectDatabase();

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
