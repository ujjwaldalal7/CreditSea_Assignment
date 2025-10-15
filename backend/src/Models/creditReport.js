import mongoose from "mongoose";

const CreditAccountSchema = new mongoose.Schema({
    bank: { type: String, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    accountTypeCode: { type: String, trim: true }, 
    accountTypeDescription: { type: String, trim: true }, 
    accountStatusCode: { type: String, trim: true },
    accountStatusDescription: { type: String, trim: true }, 
    currentBalance: { type: Number, default: 0 },
    amountOverdue: { type: Number, default: 0 }, 
    dateOpened: { type: Date }, 
    dateClosed: { type: Date, default: null },
    isWrittenOff: { type: Boolean, default: false }, 
    addressLine1: { type: String, trim: true }, 
}, { _id: false });

const CreditReportSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    mobile: { type: String, trim: true },
    pan: { type: String, trim: true }, 
    dateOfBirth: { type: Date }, 
    fullAddress: { type: String, trim: true },

    creditScore: { type: Number },
    scoreConfidence: { type: String, trim: true }, 
    
    totalAccounts: { type: Number, default: 0 },
    activeAccounts: { type: Number, default: 0 },
    closedAccounts: { type: Number, default: 0 },
    defaultedAccounts: { type: Number, default: 0 }, 

    totalBalance: { type: Number, default: 0 },
    securedAmount: { type: Number, default: 0 },
    unsecuredAmount: { type: Number, default: 0 },
    
    last7DaysEnquiries: { type: Number, default: 0 }, 
    last180DaysEnquiries: { type: Number, default: 0 }, 

    accounts: [CreditAccountSchema],
}, { timestamps: true });

export default mongoose.model("CreditReport", CreditReportSchema);