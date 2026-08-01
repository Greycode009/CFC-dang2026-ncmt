import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaStethoscope,
  FaClock,
  FaMapMarkerAlt,
  FaSpinner,
} from "react-icons/fa";
import Profile from "../components/Profile";
import FacilityBasicsStep from "../components/InstituteProfile/FacilityBasicsStep";
import DepartmentsStep from "../components/InstituteProfile/DepartmentsStep";
import OperatingHoursStep from "../components/InstituteProfile/OperatingHoursStep";
import LocationStep from "../components/InstituteProfile/LocationStep";
import { useAuth } from "../context/AuthContext";
import { getInstitutionProfile, updateInstitutionProfile } from "../api";

const InstituteProfile = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State matching api.md section 3.2 schema
  const [formData, setFormData] = useState({
    fullName: "City General Hospital",
    email: "info@cityhospital.com",
    phoneNumber: "014200000",
    institutionType: "hospital", // "hospital" | "clinic"
    registrationNumber: "REG-123456",
    province: "Lumbini",
    district: "Banke",
    municipality: "Nepalgunj Sub-Metropolitan",
    fullAddress: "Ward No. 2, BBP Chowk",
    department: "Emergency, Cardiology, Pediatrics",
    services: "24/7 Emergency, ICU, OPD, Lab Tests",
    openingTime: "08:00 AM",
    closingTime: "08:00 PM",
    beds: "150",
    noOfDoctor: 45,
    authPersonName: "Dr. Ram Sharma",
    authPersonNumber: "9841234567",
  });

  // Load existing profile from GET /api/institutions/profile on mount
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const res = await getInstitutionProfile();
        if (res?.institution) {
          const inst = res.institution;
          const u = inst.User || {};
          setFormData({
            fullName: u.fullName || "City General Hospital",
            email: u.email || "info@cityhospital.com",
            phoneNumber: u.phoneNumber || "014200000",
            institutionType: inst.institutionType || "hospital",
            registrationNumber: inst.registrationNumber || "REG-123456",
            province: inst.province || "Lumbini",
            district: inst.district || "Banke",
            municipality: inst.municipality || "Nepalgunj Sub-Metropolitan",
            fullAddress: inst.fullAddress || "Ward No. 2, BBP Chowk",
            department: inst.department || "Emergency, Cardiology, Pediatrics",
            services: inst.services || "24/7 Emergency, ICU, OPD, Lab Tests",
            openingTime: inst.openingTime || "08:00 AM",
            closingTime: inst.closingTime || "08:00 PM",
            beds: String(inst.beds || 150),
            noOfDoctor: inst.noOfDoctor || 45,
            authPersonName: inst.authPersonName || "Dr. Ram Sharma",
            authPersonNumber: inst.authPersonNumber || "9841234567",
          });
        }
      } catch (err) {
        console.warn("Institute profile fetch fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const steps = [
    { id: 1, label: "Facility Basics" },
    { id: 2, label: "Departments" },
    { id: 3, label: "Operating Hours" },
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
        beds: formData.beds,
        noOfDoctor: parseInt(formData.noOfDoctor) || 45,
        authPersonName: formData.authPersonName,
        authPersonNumber: formData.authPersonNumber,
      };

      await updateInstitutionProfile(payload);
      login("institution", { name: formData.fullName, email: formData.email });
      alert("Institution profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to update profile: " + (err.response?.data?.message || err.message));
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
          title: "Operating Hours",
          subtitle: "Specify OPD and emergency service hours.",
          cardIcon: <FaClock className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Real-time Slots",
          cardDescription: "Setting accurate operating schedules allows instant automated appointment slot generation.",
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
      cardIcon={stepConfig.cardIcon}
      cardTitle={stepConfig.cardTitle}
      cardDescription={stepConfig.cardDescription}
    >
      {stepConfig.component}
    </Profile>
  );
};

export default InstituteProfile;
