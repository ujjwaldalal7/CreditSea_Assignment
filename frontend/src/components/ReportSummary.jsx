import { formatCurrency } from "../utils/formatCurrency";
import { Zap, Shield, Lock, TrendingUp, HelpCircle } from "lucide-react";

const ReportSummary = ({ summary }) => {
    const isGoodScore = summary?.creditScore >= 700;
    const scoreColor = isGoodScore ? 'bg-green-600' : 'bg-yellow-600';
    
    return (
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 hover:border-teal-500 transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-teal-400 border-b border-teal-400/30 pb-2">Credit Health Overview</h3>

        <div className="flex items-center justify-between p-4 mb-4 rounded-lg transition-colors duration-300" style={{ backgroundColor: scoreColor }}>
            <div>
                <p className="text-sm font-semibold text-white">Score Confidence Level:</p>
                <p className="text-2xl font-bold text-white">{summary?.scoreConfidence}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-semibold text-white">Defaulted Accounts:</p>
                <p className={`text-2xl font-bold ${summary?.defaultedAccounts > 0 ? 'text-red-300' : 'text-green-300'}`}>{summary?.defaultedAccounts}</p>
            </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <MetricBox icon={<TrendingUp className="w-5 h-5 text-blue-400" />} title="Total Balance" value={formatCurrency(summary?.totalBalance)} />
            <MetricBox icon={<Lock className="w-5 h-5 text-green-400" />} title="Secured Amount" value={formatCurrency(summary?.securedAmount)} />
            <MetricBox icon={<Shield className="w-5 h-5 text-red-400" />} title="Unsecured Amount" value={formatCurrency(summary?.unsecuredAmount)} />
            <MetricBox icon={<Zap className="w-5 h-5 text-yellow-400" />} title="Total Accounts" value={summary?.totalAccounts} />
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-700 rounded-lg text-center">
                <p className="text-xs text-gray-400">Active / Closed</p>
                <p className="text-lg font-bold text-green-400">{summary?.activeAccounts} / <span className="text-red-400">{summary?.closedAccounts}</span></p>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg text-center">
                <p className="text-xs text-gray-400">7-Day Enquiries</p>
                <p className={`text-lg font-bold ${summary?.last7DaysEnquiries > 0 ? 'text-red-400' : 'text-gray-200'}`}>{summary?.last7DaysEnquiries}</p>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg text-center">
                <p className="text-xs text-gray-400">180-Day Enquiries</p>
                <p className={`text-lg font-bold ${summary?.last180DaysEnquiries > 1 ? 'text-red-400' : 'text-gray-200'}`}>{summary?.last180DaysEnquiries}</p>
            </div>
        </div>

      </div>
    );
};

const MetricBox = ({ icon, title, value }) => (
    <div className="p-3 bg-gray-700 rounded-lg flex flex-col justify-center items-center transform transition-transform duration-300 hover:scale-[1.02]">
        {icon}
        <p className="text-xs text-gray-400 mt-1">{title}</p>
        <p className="text-md font-bold text-white">{value}</p>
    </div>
);

export default ReportSummary;