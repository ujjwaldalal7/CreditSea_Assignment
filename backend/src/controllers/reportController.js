import fs from "fs";
import CreditReport from "../Models/creditReport.js";
import { parseCreditXML } from "../utils/parseXML.js";

export const uploadAndParseXML = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded or file processing failed by Multer." });
    }

    const filePath = req.file.path;

    try {
        const xmlData = fs.readFileSync(filePath, "utf-8");
        const parsed = await parseCreditXML(xmlData);

        const report = await CreditReport.create(parsed);

        res.status(201).json({ success: true, data: report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to process XML" });
    } finally {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting temporary file:", err);
            }
        });
    }
};

export const getReports = async (req, res) => {
    try {
        const reports = await CreditReport.find().sort({ createdAt: -1 }).limit(1); 
        res.json(reports); 
    } catch (err) {
        res.status(500).json({ message: "Error fetching reports" });
    }
};