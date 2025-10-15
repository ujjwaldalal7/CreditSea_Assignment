// src/pages/Dashboard.jsx (Updated)

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
  // 1. Initial loading state is false, as we are not fetching immediately.
  const [loading, setLoading] = useState(false); 

  const transformReportData = (backendReport) => {
    // ... (keep this function as is)
    return {
      basicDetails: {
        name: backendReport.name,
        mobile: backendReport.mobile,
        pan: "XXXX-XXXX-XXXX", 
        creditScore: backendReport.creditScore,
      },
      reportSummary: {
        totalAccounts: backendReport.totalAccounts,
        activeAccounts: backendReport.activeAccounts,
        closedAccounts: backendReport.closedAccounts,
        currentBalance: backendReport.currentBalance,
        securedAmount: backendReport.securedAmount,
        unsecuredAmount: backendReport.unsecuredAmount,
        recentEnquiries: backendReport.last7DaysEnquiries,
      },
      creditAccounts: backendReport.accounts.map(acc => ({
        ...acc,
        amountOverdue: acc.amountPastDue, 
      })),
    };
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await getReportData();
      
      if (res.data && res.data.length > 0) {
        const transformedData = transformReportData(res.data[0]);
        setReport(transformedData);
        toast.success("Report loaded successfully!");
      } else {
        setReport(null);
        toast.info("No reports found in the database. Upload a file.");
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      toast.error("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  // 2. Remove the useEffect hook that caused the automatic fetch:
  /* useEffect(() => {
    fetchReport();
  }, []);
  */

  const handleUploadSuccess = () => {
    fetchReport(); // This remains the only way to fetch the report.
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-blue-400 text-lg">
        <Loader2 className="animate-spin w-8 h-8 mb-4" />
        Loading report...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-400">
          Credit Report Dashboard
        </h1>

        <UploadXML onUploadSuccess={handleUploadSuccess} />

        {report ? (
          <div className="space-y-8 animate-fadeIn">
            {/* ... (rest of the report display logic) ... */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <BasicDetails info={report.basicDetails} />
              </div>
              <div className="md:col-span-2">
                <ReportSummary summary={report.reportSummary} />
              </div>
            </div>
            
            <CreditAccounts accounts={report.creditAccounts} />
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-6 text-xl p-10 border border-dashed border-gray-700 rounded-xl">
            No report data available. Please upload an Experian XML file to proceed.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;