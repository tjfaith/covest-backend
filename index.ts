import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const PORT = process.env.PORT || 3001;

app
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on("error", () => {
    console.log("Server error");
  });

  // routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);