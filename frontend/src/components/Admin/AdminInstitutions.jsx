import React, { useState, useEffect } from "react";
import {
  FaHospital,
  FaSearch,
  FaCheckCircle,
  FaBan,
  FaSpinner,
  FaEye,
  FaTimes,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaUserMd,
  FaBed,
  FaFilter,
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";
import {
  adminGetAllInstitutions,
  adminVerifyInstitution,
  adminRejectInstitution,
} from "../../api";

const AdminInstitutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [actionLoading, setActionLoading] = useState(null);
  const [toast, setToast] = useState(null);
  const [detailModal, setDetailModal] = useState(null);

  useEffect(() => {
    loadInstitutions();
  }, []);

  const loadInstitutions = async () => {
    setLoading(true);
    try {
      const res = await adminGetAllInstitutions();
      setInstitutions(res?.institutions || []);
    } catch (err) {
      console.error("Failed to load institutions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    setActionLoading(id);
    try {
      await adminVerifyInstitution(id);
      setToast({ type: "success", message: "Institution verified successfully!" });
      await loadInstitutions();
    } catch (err) {
      setToast({ type: "error", message: err.response?.data?.message || "Failed to verify." });
    } finally {
      setActionLoading(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this institution?")) return;
    setActionLoading(id);
    try {
      await adminRejectInstitution(id);
      setToast({ type: "success", message: "Institution rejected." });
      await loadInstitutions();
    } catch (err) {
      setToast({ type: "error", message: err.response?.data?.message || "Failed to reject." });
    } finally {
      setActionLoading(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredInstitutions = institutions.filter((inst) => {
    const name = (inst.User?.fullName || "").toLowerCase();
    const district = (inst.district || "").toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase()) || district.includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || inst.verificationStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: institutions.length,
    pending: institutions.filter((i) => i.verificationStatus === "pending").length,
    verified: institutions.filter((i) => i.verificationStatus === "verified").length,
    rejected: institutions.filter((i) => i.verificationStatus === "rejected").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 space-x-3 text-slate-400">
        <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold">Loading institutions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-bold shadow-xl border ${
          toast.type === "success"
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : "bg-rose-50 text-rose-800 border-rose-200"
        }`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Institutions Management</h1>
          <p className="text-sm text-slate-500 mt-1">Review, verify, or reject institution registration requests. Click any row to view full details.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
          <FaFilter className="text-slate-400" />
          <span>{filteredInstitutions.length} of {institutions.length} shown</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 flex-wrap">
          {["all", "pending", "verified", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                filterStatus === status
                  ? "bg-[#0d9488] text-white shadow-md shadow-teal-500/15"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {status}
              <span className="ml-1.5 opacity-70">({statusCounts[status]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Institutions Table */}
      {filteredInstitutions.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            <FaHospital />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Institutions Found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Institution</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Profile</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInstitutions.map((inst) => {
                  const status = inst.verificationStatus || "pending";
                  let badgeCls = "bg-amber-100 text-amber-800 border-amber-200";
                  if (status === "verified") badgeCls = "bg-emerald-100 text-emerald-800 border-emerald-200";
                  if (status === "rejected") badgeCls = "bg-rose-100 text-rose-800 border-rose-200";

                  return (
                    <tr
                      key={inst.id}
                      onClick={() => setDetailModal(inst)}
                      className="hover:bg-teal-50/40 transition cursor-pointer group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] group-hover:bg-[#0d9488] group-hover:text-white flex items-center justify-center flex-shrink-0 border border-teal-100 transition-colors">
                            <FaHospital className="text-sm" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-[#0d9488] transition-colors">{inst.User?.fullName || "Unnamed"}</p>
                            <p className="text-xs text-slate-500">{inst.User?.email || "—"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600 capitalize">{inst.institutionType || "—"}</td>
                      <td className="px-5 py-4 text-slate-600">
                        {[inst.municipality, inst.district].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                          inst.profileCompleted
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          {inst.profileCompleted ? "Complete" : "Incomplete"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${badgeCls}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setDetailModal(inst); }}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                            title="View Full Details"
                          >
                            <FaEye className="text-xs" />
                          </button>
                          {status !== "verified" && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleVerify(inst.id); }}
                              disabled={actionLoading === inst.id}
                              className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition cursor-pointer disabled:opacity-50 border border-emerald-200/60"
                              title="Approve / Verify"
                            >
                              {actionLoading === inst.id ? <FaSpinner className="text-xs animate-spin" /> : <FaCheckCircle className="text-xs" />}
                            </button>
                          )}
                          {status !== "rejected" && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReject(inst.id); }}
                              disabled={actionLoading === inst.id}
                              className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition cursor-pointer disabled:opacity-50 border border-rose-200/60"
                              title="Reject"
                            >
                              <FaBan className="text-xs" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Pop-up Modal */}
      {detailModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in cursor-pointer"
          onClick={() => setDetailModal(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 space-y-6 relative max-h-[90vh] overflow-y-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setDetailModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <FaTimes className="text-base" />
            </button>

            {/* Header / Banner */}
            <div className="flex items-start space-x-4 pr-8">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-2xl flex-shrink-0 border border-teal-100 shadow-xs">
                <FaHospital />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <h2 className="text-2xl font-black text-slate-900">{detailModal.User?.fullName || "Unnamed Institution"}</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                    detailModal.verificationStatus === "verified"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : detailModal.verificationStatus === "rejected"
                      ? "bg-rose-100 text-rose-800 border-rose-200"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }`}>
                    {detailModal.verificationStatus || "pending"}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                    detailModal.profileCompleted
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}>
                    {detailModal.profileCompleted ? "Profile Complete" : "Profile Incomplete"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium capitalize flex items-center space-x-1">
                  <FaBuilding className="text-slate-400 text-xs" />
                  <span>{detailModal.institutionType || "Healthcare Institution"}</span>
                </p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Institution Description & Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <InfoRow icon={FaEnvelope} label="Account Email" value={detailModal.User?.email} />
                <InfoRow icon={FaPhoneAlt} label="Main Phone" value={detailModal.User?.phoneNumber} />
                <InfoRow icon={FaUser} label="Authorized Contact Person" value={detailModal.authPersonName} />
                <InfoRow icon={FaPhoneAlt} label="Auth Person Phone" value={detailModal.authPersonNumber} />
                <InfoRow icon={FaIdCard} label="Registration / License #" value={detailModal.registrationNumber} />
                <InfoRow icon={FaClock} label="Operating Hours" value={detailModal.openingTime && detailModal.closingTime ? `${detailModal.openingTime} - ${detailModal.closingTime}` : null} />
                <InfoRow icon={FaBed} label="Bed Capacity" value={detailModal.beds} />
                <InfoRow icon={FaUserMd} label="Number of Doctors" value={detailModal.noOfDoctor} />
                <InfoRow icon={FaMapMarkerAlt} label="Full Address" value={detailModal.fullAddress} />
                <InfoRow
                  icon={FaMapMarkerAlt}
                  label="Region / Location"
                  value={[detailModal.municipality, detailModal.district, detailModal.province].filter(Boolean).join(", ")}
                />
                <InfoRow
                  icon={FaCalendarAlt}
                  label="Registered On"
                  value={detailModal.createdAt ? new Date(detailModal.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : null}
                />
              </div>
            </div>

            {/* Departments */}
            {detailModal.department && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Departments Available</p>
                <p className="text-sm text-slate-800 font-medium leading-relaxed">{detailModal.department}</p>
              </div>
            )}

            {/* Services */}
            {detailModal.services && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Medical Services Provided</p>
                <p className="text-sm text-slate-800 font-medium leading-relaxed">{detailModal.services}</p>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
              {detailModal.verificationStatus !== "verified" && (
                <button
                  onClick={() => { handleVerify(detailModal.id); setDetailModal(null); }}
                  className="flex-1 py-3 bg-[#0d9488] hover:bg-[#0b7a70] text-white font-bold text-sm rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/15"
                >
                  <FaCheckCircle />
                  <span>Approve & Verify Institution</span>
                </button>
              )}
              {detailModal.verificationStatus !== "rejected" && (
                <button
                  onClick={() => { handleReject(detailModal.id); setDetailModal(null); }}
                  className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-sm rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 border border-rose-200/60"
                >
                  <FaBan />
                  <span>Reject Institution</span>
                </button>
              )}
              <button
                onClick={() => setDetailModal(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100/80">
    <Icon className="text-[#0d9488] text-sm mt-0.5 flex-shrink-0" />
    <div className="min-w-0">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-xs text-slate-800 font-semibold truncate">{value || "Not provided"}</p>
    </div>
  </div>
);

export default AdminInstitutions;
