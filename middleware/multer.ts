import multer from "multer";
import path from "path";
import { Request } from "express";

// Multer config
const storage = multer.diskStorage({});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  let ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".PNG" && ext !== ".JPG" && ext !== ".pdf") {
    cb(new Error("File type is not supported"), false);
    return;
  }
  cb(null, true);
};

export const upload= multer({ storage, fileFilter });

