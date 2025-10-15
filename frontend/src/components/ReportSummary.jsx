import { formatCurrency } from "../utils/formatCurrency";

const ReportSummary = ({ summary }) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all">
    <h3 className="text-lg font-semibold mb-4 text-blue-400">Report Summary</h3>
    <ul className="grid grid-cols-2 gap-y-2 text-sm">
      <li>Total Accounts: {summary?.totalAccounts}</li>
      <li>Active: {summary?.activeAccounts}</li>
      <li>Closed: {summary?.closedAccounts}</li>
      <li>Balance: {formatCurrency(summary?.currentBalance)}</li>
      <li>Secured: {formatCurrency(summary?.securedAmount)}</li>
      <li>Unsecured: {formatCurrency(summary?.unsecuredAmount)}</li>
      <li>Enquiries (7d): {summary?.recentEnquiries}</li>
    </ul>
  </div>
);
export default ReportSummary;