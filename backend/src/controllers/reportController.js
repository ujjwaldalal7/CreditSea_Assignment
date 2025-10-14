import fs from "fs";
import CreditReport from "../Models/CreditReport.js";
import { parseCreditXML } from "../utils/parseXML.js";

export const uploadAndParseXML = async (req, res) => {
  try {
    const xmlData = fs.readFileSync(req.file.path, "utf-8");
    const parsed = await parseCreditXML(xmlData);

    const report = await CreditReport.create(parsed);

    res.status(201).json({ success: true, data: report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to process XML" });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await CreditReport.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};
