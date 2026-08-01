import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaStethoscope,
  FaClock,
  FaMapMarkerAlt,
  FaSpinner,
} from "react-icons/fa";
import Profile from "../../components/common/Profile";
import InstituteProfileDetails from "../../components/institute/InstituteProfileDetails";
import FacilityBasicsStep from "../../components/institute/FacilityBasicsStep";
import DepartmentsStep from "../../components/institute/DepartmentsStep";
import OperatingHoursStep from "../../components/institute/OperatingHoursStep";
import LocationStep from "../../components/institute/LocationStep";
import { useAuth } from "../../context/AuthContext";
import { getInstitutionProfile, updateInstitutionProfile } from "../../api";

const InstituteProfile = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Form State without hardcoded dummy defaults
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    institutionType: "hospital",
    registrationNumber: "",
    province: "",
    district: "",
    municipality: "",
    fullAddress: "",
    department: "",
    services: "",
    openingTime: "09:00 AM",
    closingTime: "05:00 PM",
    beds: "",
    noOfDoctor: "",
    authPersonName: "",
    authPersonNumber: "",
  });

  // Load existing profile from GET /api/institutions/profile on mount
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const res = await getInstitutionProfile();
        setProfileData(res);
        if (res?.institution) {
          const inst = res.institution;
          const u = inst.User || {};
          setFormData({
            fullName: u.fullName || user?.name || "",
            email: u.email || user?.email || "",
            phoneNumber: u.phoneNumber || "",
            institutionType: inst.institutionType || "hospital",
            registrationNumber: inst.registrationNumber || "",
            province: inst.province || "",
            district: inst.district || "",
            municipality: inst.municipality || "",
            fullAddress: inst.fullAddress || "",
            department: inst.department || "",
            services: inst.services || "",
            openingTime: inst.openingTime || "09:00 AM",
            closingTime: inst.closingTime || "05:00 PM",
            beds: inst.beds ? String(inst.beds) : "",
            noOfDoctor: inst.noOfDoctor ? String(inst.noOfDoctor) : "",
            authPersonName: inst.authPersonName || "",
            authPersonNumber: inst.authPersonNumber || "",
          });
        }
      } catch (err) {
        console.warn("Institute profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [user]);

  const steps = [
    { id: 1, label: "Facility Basics" },
    { id: 2, label: "Departments" },
    { id: 3, label: "Authorized Details" },
    { id: 4, label: "Location & Address" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setToast(null);
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        institutionType: formData.institutionType.toLowerCase().includes("clinic") ? "clinic" : "hospital",
        registrationNumber: formData.registrationNumber,
        province: formData.province,
        district: formData.district,
        municipality: formData.municipality,
        fullAddress: formData.fullAddress,
        department: formData.department,
        services: formData.services,
        openingTime: formData.openingTime,
        closingTime: formData.closingTime,
        beds: parseInt(formData.beds) || 0,
        noOfDoctor: parseInt(formData.noOfDoctor) || 0,
        authPersonName: formData.authPersonName,
        authPersonNumber: formData.authPersonNumber,
      };

      const res = await updateInstitutionProfile(payload);
      
      // Refetch fresh profile from backend to ensure 100% database sync
      const freshProfile = await getInstitutionProfile();
      if (freshProfile?.institution) {
        setProfileData(freshProfile);
        const inst = freshProfile.institution;
        const u = inst.User || {};
        setFormData({
          fullName: u.fullName || formData.fullName,
          email: u.email || formData.email,
          phoneNumber: u.phoneNumber || formData.phoneNumber,
          institutionType: inst.institutionType || formData.institutionType,
          registrationNumber: inst.registrationNumber || formData.registrationNumber,
          province: inst.province || formData.province,
          district: inst.district || formData.district,
          municipality: inst.municipality || formData.municipality,
          fullAddress: inst.fullAddress || formData.fullAddress,
          department: inst.department || formData.department,
          services: inst.services || formData.services,
          openingTime: inst.openingTime || formData.openingTime,
          closingTime: inst.closingTime || formData.closingTime,
          beds: inst.beds ? String(inst.beds) : "",
          noOfDoctor: inst.noOfDoctor ? String(inst.noOfDoctor) : "",
          authPersonName: inst.authPersonName || formData.authPersonName,
          authPersonNumber: inst.authPersonNumber || formData.authPersonNumber,
        });
      } else {
        const updatedInst = res?.institution || payload;
        const updatedUser = res?.user || { fullName: payload.fullName, email: payload.email, phoneNumber: payload.phoneNumber };
        setProfileData({
          institution: {
            ...updatedInst,
            User: updatedUser,
          },
        });
      }

      login("institution", {
        id: user?.id,
        name: formData.fullName,
        email: formData.email,
        role: "institution"
      });

      setToast({ type: "success", message: res?.message || "Institution profile updated successfully!" });

      setTimeout(() => {
        setIsEditing(false);
      }, 1000);

    } catch (err) {
      console.error("Save profile error:", err);
      setToast({ type: "error", message: err.response?.data?.message || err.message || "Failed to update profile." });
      setTimeout(() => setToast(null), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSaveProfile();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSaveProfile();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center space-x-2 text-slate-500">
        <FaSpinner className="animate-spin text-2xl text-[#0d9488]" />
        <span className="text-sm font-semibold">Loading Institution Profile...</span>
      </div>
    );
  }

  // If user is not in editing mode, show the clean summary details view
  if (!isEditing) {
    return (
      <InstituteProfileDetails
        profileData={profileData}
        onEdit={() => {
          setCurrentStep(1);
          setIsEditing(true);
        }}
      />
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Setup your Institution",
          subtitle: "Provide core details about your medical facility.",
          cardIcon: <FaHospital className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Verified Provider Hub",
          cardDescription: "Adding basic facility specifications builds instant patient trust across Banke and Nepalgunj.",
          component: <FacilityBasicsStep formData={formData} handleChange={handleChange} />,
        };
      case 2:
        return {
          title: "Departments & Specialties",
          subtitle: "List clinical services and medical units offered.",
          cardIcon: <FaStethoscope className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Clinical Offerings",
          cardDescription: "Clear specialty categories help matching algorithm pair patient symptoms with your departments.",
          component: <DepartmentsStep formData={formData} handleChange={handleChange} />,
        };
      case 3:
        return {
          title: "Authorized Details",
          subtitle: "Specify authorized personnel and direct contact information.",
          cardIcon: <FaClock className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Authorized Representative",
          cardDescription: "Provide verified administrative details for official institutional communications.",
          component: <OperatingHoursStep formData={formData} handleChange={handleChange} />,
        };
      case 4:
        return {
          title: "Location & Address",
          subtitle: "Provide location details for patient navigation.",
          cardIcon: <FaMapMarkerAlt className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Geo-Location Access",
          cardDescription: "Precise ward and district address data displays your facility on the interactive map filter.",
          component: <LocationStep formData={formData} handleChange={handleChange} />,
        };
      default:
        return {};
    }
  };

  const stepConfig = renderStepContent();

  return (
    <Profile
      steps={steps}
      currentStep={currentStep}
      title={stepConfig.title}
      subtitle={stepConfig.subtitle}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onSkip={handleSkip}
      isFirstStep={currentStep === 1}
      isLastStep={currentStep === steps.length}
      isSaving={isSaving}
      toast={toast}
      cardIcon={stepConfig.cardIcon}
      cardTitle={stepConfig.cardTitle}
      cardDescription={stepConfig.cardDescription}
    >
      {stepConfig.component}
    </Profile>
  );
};

export default InstituteProfile;
