import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({

})

const dataModel = mongoose.model(
    "excelData",dataSchema,"stock-data"
)

export default dataModel;