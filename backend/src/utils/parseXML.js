import { parseStringPromise } from "xml2js";

const parseDate = (dateString) => {
    if (!dateString || dateString.length !== 8 || dateString.startsWith('0000')) {
        return null;
    }
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6)) - 1;
    const day = parseInt(dateString.substring(6, 8));
    return new Date(year, month, day);
};

const mapAccountType = (code) => {
    const map = {
        '00': 'Not Classified',
        '10': 'Credit Card',
        '51': 'Home Loan',
        '52': 'Personal Loan',
        '53': 'Auto Loan',
        '55': 'Loan Against Property',
        '58': 'Consumer Loan',
    };
    return map[code] || 'Other Loan/Product';
};

const mapAccountStatus = (code) => {
    const map = {
        '11': 'Active',
        '13': 'Closed',
        '14': 'Settled',
        '53': 'Suit Filed/Wilful Default',
        '71': 'Written Off (Bad Debt)',
        '90': 'Default/Doubtful',
    };
    return map[code] || 'Unknown/Other Status';
};

export const parseCreditXML = async (xmlData) => {
    const result = await parseStringPromise(xmlData, { explicitArray: false });
    const data = result.INProfileResponse;
    const applicantDetails = data.Current_Application.Current_Application_Details.Current_Applicant_Details;
    const summaryData = data.CAIS_Account.CAIS_Summary;
    const totalBalanceData = summaryData.Total_Outstanding_Balance;
    const holderDetails = data.CAIS_Account.CAIS_Account_DETAILS[0]?.CAIS_Holder_Details;
    const holderAddress = data.CAIS_Account.CAIS_Account_DETAILS[0]?.CAIS_Holder_Address_Details;
    const holderID = data.CAIS_Account.CAIS_Account_DETAILS[0]?.CAIS_Holder_ID_Details;


    const identification = {
        name: applicantDetails.First_Name,
        mobile: applicantDetails.MobilePhoneNumber,
        pan: holderID?.Income_TAX_PAN || '', 
        dateOfBirth: parseDate(holderDetails?.Date_of_birth), 
        fullAddress: [
            holderAddress?.First_Line_Of_Address_non_normalized,
            holderAddress?.Second_Line_Of_Address_non_normalized,
            holderAddress?.City_non_normalized,
            holderAddress?.ZIP_Postal_Code_non_normalized,
        ].filter(Boolean).join(', '),
    };


    const summary = {
        creditScore: parseInt(data.SCORE.BureauScore) || 0,
        scoreConfidence: data.SCORE.BureauScoreConfidLevel || 'N/A',

        totalAccounts: parseInt(summaryData.Credit_Account.CreditAccountTotal) || 0,
        activeAccounts: parseInt(summaryData.Credit_Account.CreditAccountActive) || 0,
        closedAccounts: parseInt(summaryData.Credit_Account.CreditAccountClosed) || 0,
        defaultedAccounts: parseInt(summaryData.Credit_Account.CreditAccountDefault) || 0, 

        totalBalance: parseInt(totalBalanceData.Outstanding_Balance_All) || 0,
        securedAmount: parseInt(totalBalanceData.Outstanding_Balance_Secured) || 0,
        unsecuredAmount: parseInt(totalBalanceData.Outstanding_Balance_UnSecured) || 0,

        last7DaysEnquiries: parseInt(data.TotalCAPS_Summary.TotalCAPSLast7Days) || 0,
        last180DaysEnquiries: parseInt(data.TotalCAPS_Summary.TotalCAPSLast180Days) || 0,
    };


    const rawAccounts = data.CAIS_Account.CAIS_Account_DETAILS;
    const accountsArray = Array.isArray(rawAccounts) ? rawAccounts : [rawAccounts]; 
    
    const accounts = accountsArray.map((acc) => {
        const accountCode = acc.Account_Type;
        const statusCode = acc.Account_Status;
        const firstAddressLine = acc.CAIS_Holder_Address_Details?.First_Line_Of_Address_non_normalized || '';

        return {
            bank: acc.Subscriber_Name?.trim(),
            accountNumber: acc.Account_Number,
            
            accountTypeCode: accountCode,
            accountTypeDescription: mapAccountType(accountCode),
            accountStatusCode: statusCode,
            accountStatusDescription: mapAccountStatus(statusCode),
            
            currentBalance: parseInt(acc.Current_Balance) || 0,
            amountOverdue: parseInt(acc.Amount_Past_Due) || 0,
            
            dateOpened: parseDate(acc.Open_Date),
            dateClosed: parseDate(acc.Date_Closed),

            isWrittenOff: !!acc.SuitFiledWillfulDefaultWrittenOffStatus || false,
            
            addressLine1: firstAddressLine,
        };
    });

    return { ...identification, ...summary, accounts };
};