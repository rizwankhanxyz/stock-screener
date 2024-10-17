import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({

    companyName: { type: String, required: true },
    industryGroup: { type: String, required: true },
    mainProductServiceGroup: { type: String, required: true },
    nseorbseSymbol: { type: String, required: true },
    exchange: { type: String, required: true },
    debtsMarketCap: { type: Number, required: true },
    compliantStatusDebts: { type: String, required: true },
    interestBearingSecuritiesMarketCap: { type: Number, required: true },
    compliantStatusInterestBearing: { type: String, required: true },
    interestIncomeTotalIncome: { type: Number, required: true },
    compliantStatusInterestIncome: { type: String, required: true },
    financialScreeningStatus: { type: String, required: true },

})

const dataModel = mongoose.model(
    "excelData",dataSchema,"stock-data"
)

export default dataModel;