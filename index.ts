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
  "https://mybackbone.io",
];
const corsOptions = {
  origin: (origin:any, callback:any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests with no origin or from allowed origins
      callback(null, true);
    } else {
      console.log(origin, 'origin')
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

import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


// Load the Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Serve Swagger UI at the base route
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));


