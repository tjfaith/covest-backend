import "module-alias/register";
import express from "express";
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

dotenv.config();
const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.135.18:3000"
];
const corsOptions = {
  origin: (origin:any, callback:any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests with no origin or from allowed origins
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
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

// Load the Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Serve Swagger UI at the base route
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


