import { parseStringPromise } from "xml2js";

export const parseCreditXML = async (xmlData) => {
  const result = await parseStringPromise(xmlData, { explicitArray: false });
  const data = result.INProfileResponse;

  const basic = {
    name: data.Current_Application.Current_Application_Details.Current_Applicant_Details.First_Name,
    pan: data.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_ID_Details.Income_TAX_PAN,
    mobile: data.Current_Application.Current_Application_Details.Current_Applicant_Details.MobilePhoneNumber,
    creditScore: parseInt(data.SCORE.BureauScore),
  };

  const summary = {
    totalAccounts: parseInt(data.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountTotal),
    activeAccounts: parseInt(data.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountActive),
    closedAccounts: parseInt(data.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountClosed),
    currentBalance: parseInt(data.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_All),
    securedAmount: parseInt(data.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_Secured),
    unsecuredAmount: parseInt(data.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured),
    last7DaysEnquiries: parseInt(data.TotalCAPS_Summary.TotalCAPSLast7Days),
  };

  // Extract credit accounts
  const accounts = data.CAIS_Account.CAIS_Account_DETAILS.map((acc) => ({
    bank: acc.Subscriber_Name?.trim(),
    accountNumber: acc.Account_Number,
    currentBalance: parseInt(acc.Current_Balance) || 0,
    amountPastDue: parseInt(acc.Amount_Past_Due) || 0,
    address: acc.CAIS_Holder_Address_Details.First_Line_Of_Address_non_normalized,
  }));

  return { ...basic, ...summary, accounts };
};
