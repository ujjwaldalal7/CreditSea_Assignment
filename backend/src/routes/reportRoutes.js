import express from "express";
import multer from "multer";
import { uploadAndParseXML, getReports } from "../controllers/reportController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadAndParseXML);
router.get("/", getReports);

export default router;
