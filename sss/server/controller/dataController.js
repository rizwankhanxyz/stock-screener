import express from "express";
import dataModel from "../models/dataModel.js";
import multer from "multer";
import xlsx from "xlsx";

const router = express.Router();
// Setup multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
 * API: /api/admin/add
 * METHOD: POST
 * DESC: Data Adding in Backend
 * Body: Excel File Data
 * Access: Private
 * Validations: so far none
 */

router.post("/data/add", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded or Invalid file type");
    } else {
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      await dataModel.insertMany(sheetData);
      res.status(200).send({success:"File uploaded successfully"});
    }
  } catch (error) {
    res.status(500).send({error:"File upload failed"});
  }
});

/*
 * API: /api/admin/get
 * METHOD: GET
 * DESC: Data readin0 * Body: Excel File Data'[;pppp-o]
 * Access: Private
 * Validations: so far none
 */

router.get("/data/get", async (req, res) => {
    try {
        const data = await dataModel.find();
        res.status(200).json(data);
    } catch (error) {
      res.status(500).send({error:"Error fetching data"});
    }
  });

export default router;
