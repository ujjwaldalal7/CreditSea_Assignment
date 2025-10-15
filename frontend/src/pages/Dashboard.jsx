import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getReportData } from "../api/api";
import UploadXML from "../components/UploadXML";
import BasicDetails from "../components/BasicDetails";
import ReportSummary from "../components/ReportSummary";
import CreditAccounts from "../components/CreditAccounts";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false); 

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } catch (e) {
        return 'Invalid Date';
    }
  };

  const transformReportData = (backendReport) => {
    return {
      basicDetails: {
        name: backendReport.name,
        mobile: backendReport.mobile,
        pan: backendReport.pan, 
        creditScore: backendReport.creditScore,
        dateOfBirth: formatDateForDisplay(backendReport.dateOfBirth),
        fullAddress: backendReport.fullAddress,
      },
      reportSummary: {
        totalAccounts: backendReport.totalAccounts,
        activeAccounts: backendReport.activeAccounts,
        closedAccounts: backendReport.closedAccounts,
        totalBalance: backendReport.totalBalance, // Renamed in schema
        securedAmount: backendReport.securedAmount,
        unsecuredAmount: backendReport.unsecuredAmount,
        recentEnquiries: backendReport.last7DaysEnquiries,
        scoreConfidence: backendReport.scoreConfidence, // New
        defaultedAccounts: backendReport.defaultedAccounts, // New
        last180DaysEnquiries: backendReport.last180DaysEnquiries, // New
      },
      creditAccounts: backendReport.accounts.map(acc => ({
        ...acc,
        // Use mapped descriptions
        accountTypeDescription: acc.accountTypeDescription,
        accountStatusDescription: acc.accountStatusDescription,
        amountOverdue: acc.amountOverdue, // Renamed in schema
        isWrittenOff: acc.isWrittenOff, // New flag
      })),
    };
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      // Fetches the single, latest report from the backend
      const res = await getReportData(); 
      
      if (res.data && res.data.length > 0) {
        const transformedData = transformReportData(res.data[0]);
        setReport(transformedData);
        toast.success("Report data synchronized.");
      } else {
        setReport(null);
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      toast.error("Failed to load report data from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    fetchReport();
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-blue-400 text-lg">
        <Loader2 className="animate-spin w-8 h-8 mb-4" />
        Processing XML and Loading Data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 md:px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-4xl font-extrabold text-center text-teal-400 drop-shadow-lg shadow-teal-500/50">
          Advanced Credit Profile Dashboard
        </h1>

        <UploadXML onUploadSuccess={handleUploadSuccess} />

        {report ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Unified Top Section */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <BasicDetails info={report.basicDetails} />
              </div>
              <div className="lg:col-span-2">
                <ReportSummary summary={report.reportSummary} />
              </div>
            </div>
            
            <CreditAccounts accounts={report.creditAccounts} />
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-6 text-xl p-16 border border-dashed border-blue-500/50 bg-gray-800/50 rounded-2xl shadow-inner animate-pulse-once">
            <p className="mb-2 font-semibold">Dashboard Ready 🚀</p>
            <p className="text-lg">Please upload an Experian XML file to generate and display the credit report data.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;