import 'module-alias/register';
import express from "express";
import cors from "cors";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import paymentRoutes from "@/routes/paymentRoutes";

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
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/payment", paymentRoutes)