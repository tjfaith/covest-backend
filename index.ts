import "module-alias/register";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(helmet());

const PORT = process.env.PORT || 7000;

app
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on("error", () => {
    console.log("Server error");
  });

// routes
import adminRoutes from "@/routes/adminRoutes";
import propertyRoutes from "@/routes/propertyRoutes";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import paymentRoutes from "@/routes/paymentRoutes";

app.use("/api/admin", adminRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
