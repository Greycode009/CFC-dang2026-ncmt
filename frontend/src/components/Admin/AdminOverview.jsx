import React, { useState, useEffect } from "react";
import {
  FaHospital,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaExclamationCircle,
} from "react-icons/fa";
import { adminGetAllInstitutions, adminGetPendingInstitutions } from "../../api";

const AdminOverview = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalInstitutions: 0,
    pendingVerifications: 0,
    verifiedInstitutions: 0,
    rejectedInstitutions: 0,
  });
  const [recentInstitutions, setRecentInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOverviewData();
  }, []);

  const loadOverviewData = async () => {
    setLoading(true);
    try {
      const [allRes, pendingRes] = await Promise.all([
        adminGetAllInstitutions(),
        adminGetPendingInstitutions(),
      ]);

      const all = allRes?.institutions || [];
      const pending = pendingRes?.institutions || [];
      const verified = all.filter((i) => i.verificationStatus === "verified");
      const rejected = all.filter((i) => i.verificationStatus === "rejected");

      setStats({
        totalInstitutions: all.length,
        pendingVerifications: pending.length,
        verifiedInstitutions: verified.length,
        rejectedInstitutions: rejected.length,
      });

      setRecentInstitutions(all.slice(0, 5));
    } catch (err) {
      console.error("Overview fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Institutions",
      value: stats.totalInstitutions,
      icon: FaHospital,
      color: "from-teal-500 to-emerald-500",
      bgLight: "bg-teal-50",
      textColor: "text-teal-700",
      trend: "+12%",
      trendUp: true,
    },
    {
      label: "Pending Verifications",
      value: stats.pendingVerifications,
      icon: FaClock,
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
      textColor: "text-amber-700",
      trend: "Action needed",
      trendUp: null,
    },
    {
      label: "Verified Providers",
      value: stats.verifiedInstitutions,
      icon: FaCheckCircle,
      color: "from-emerald-500 to-green-500",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-700",
      trend: "+8%",
      trendUp: true,
    },
    {
      label: "Rejected",
      value: stats.rejectedInstitutions,
      icon: FaExclamationCircle,
      color: "from-rose-500 to-pink-500",
      bgLight: "bg-rose-50",
      textColor: "text-rose-700",
      trend: "-2%",
      trendUp: false,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 space-x-3 text-slate-400">
        <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-200 relative overflow-hidden"
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`} />

              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.label}</p>
                  <p className="text-3xl font-black text-slate-900">{card.value}</p>
                  <div className="flex items-center space-x-1.5">
                    {card.trendUp !== null && (
                      card.trendUp ? (
                        <FaArrowUp className="text-emerald-500 text-[10px]" />
                      ) : (
                        <FaArrowDown className="text-rose-500 text-[10px]" />
                      )
                    )}
                    <span className={`text-[11px] font-bold ${
                      card.trendUp === true ? "text-emerald-600" : card.trendUp === false ? "text-rose-600" : "text-amber-600"
                    }`}>
                      {card.trend}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${card.bgLight} ${card.textColor} flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
                  <Icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions + Recent Institutions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <FaChartLine className="text-[#0d9488]" />
            <span>Quick Actions</span>
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("institutions")}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-teal-50 hover:bg-teal-100 rounded-xl text-sm font-semibold text-teal-800 transition cursor-pointer border border-teal-200/60"
            >
              <FaClock className="text-[#0d9488]" />
              <span>Review Pending Verifications</span>
              {stats.pendingVerifications > 0 && (
                <span className="ml-auto px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full border border-amber-200">
                  {stats.pendingVerifications}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate("institutions")}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-semibold text-slate-700 transition cursor-pointer border border-slate-200/60"
            >
              <FaHospital className="text-slate-400" />
              <span>View All Institutions</span>
            </button>
          </div>
        </div>

        {/* Recent Institutions */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <FaHospital className="text-[#0d9488]" />
              <span>Recent Institutions</span>
            </h3>
            <button
              onClick={() => onNavigate("institutions")}
              className="text-xs font-bold text-[#0d9488] hover:text-teal-700 transition cursor-pointer"
            >
              View All →
            </button>
          </div>

          {recentInstitutions.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No institutions registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                    <th className="text-left pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="text-left pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">District</th>
                    <th className="text-left pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentInstitutions.map((inst) => {
                    const status = inst.verificationStatus || "pending";
                    let badgeCls = "bg-amber-100 text-amber-800 border-amber-200";
                    if (status === "verified") badgeCls = "bg-emerald-100 text-emerald-800 border-emerald-200";
                    if (status === "rejected") badgeCls = "bg-rose-100 text-rose-800 border-rose-200";

                    return (
                      <tr key={inst.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-3 font-semibold text-slate-800">
                          {inst.User?.fullName || "Unnamed"}
                        </td>
                        <td className="py-3 text-slate-500 capitalize">
                          {inst.institutionType || "—"}
                        </td>
                        <td className="py-3 text-slate-500">
                          {inst.district || "—"}
                        </td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${badgeCls}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
