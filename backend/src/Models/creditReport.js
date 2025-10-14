import mongoose from "mongoose";

const CreditAccountSchema = new mongoose.Schema({
  bank: String,
  accountNumber: String,
  currentBalance: Number,
  amountPastDue: Number,
  address: String,
});

const CreditReportSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  pan: String,
  creditScore: Number,
  totalAccounts: Number,
  activeAccounts: Number,
  closedAccounts: Number,
  currentBalance: Number,
  securedAmount: Number,
  unsecuredAmount: Number,
  last7DaysEnquiries: Number,
  accounts: [CreditAccountSchema],
});

export default mongoose.model("CreditReport", CreditReportSchema);
