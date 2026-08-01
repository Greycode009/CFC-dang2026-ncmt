import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCheck, FaHeartbeat, FaNotesMedical, FaPhoneAlt, FaSpinner } from "react-icons/fa";
import Profile from "../../components/common/Profile";
import PersonalBasics from "../../components/patient/PersonalBasics";
import BodyMetrics from "../../components/patient/BodyMetrics";
import MedicalHistory from "../../components/patient/MedicalHistory";
import EmergencyContact from "../../components/patient/EmergencyContact";
import PatientProfileDetails from "../../components/patient/PatientProfileDetails";
import { getPatientProfile, updatePatientProfile } from "../../api";
import { useAuth } from "../../context/AuthContext";

const PatientProfile = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Mode, Toast & Loading States
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    bloodGroup: "",
    allergies: "",
    chronicConditions: "",
    currentMedications: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    address: "",
  });

  // Load Profile Details from GET /api/patients/profile
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const res = await getPatientProfile();
        setProfileData(res);
        if (res?.patient) {
          const p = res.patient;
          const u = p.User || {};
          setFormData({
            fullName: u.fullName || "",
            email: u.email || "",
            phoneNumber: u.phoneNumber || "",
            age: p.age !== null && p.age !== undefined ? String(p.age) : "",
            gender: p.gender || "",
            height: p.height !== null && p.height !== undefined ? String(p.height) : "",
            weight: p.weight !== null && p.weight !== undefined ? String(p.weight) : "",
            bloodGroup: p.bloodGroup || "",
            allergies: p.allergies || "",
            chronicConditions: p.chronicConditions || "",
            currentMedications: p.currentMedications || "",
            emergencyContactName: p.emergencyContactName || p.emergencyName || "",
            emergencyContactNumber: p.emergencyContactNumber || p.emergencyPhone || "",
            address: p.address || "",
          });
        }
      } catch (err) {
        console.error("Failed loading patient profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const steps = [
    { id: 1, label: "Personal Basics" },
    { id: 2, label: "Body Metrics" },
    { id: 3, label: "Medical History" },
    { id: 4, label: "Emergency Contact" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit PATCH /api/patients/profile
  const handleSaveProfile = async () => {
    setIsSaving(true);
    setToast(null);
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        age: formData.age && !isNaN(formData.age) ? parseInt(formData.age) : null,
        gender: formData.gender || null,
        height: formData.height && !isNaN(formData.height) ? parseFloat(formData.height) : null,
        weight: formData.weight && !isNaN(formData.weight) ? parseFloat(formData.weight) : null,
        bloodGroup: formData.bloodGroup || null,
        allergies: formData.allergies || null,
        chronicConditions: formData.chronicConditions || null,
        currentMedications: formData.currentMedications || null,
        emergencyContactName: formData.emergencyContactName || null,
        emergencyContactNumber: formData.emergencyContactNumber || null,
        address: formData.address || null,
      };

      const updated = await updatePatientProfile(payload);
      setProfileData({
        patient: {
          ...payload,
          User: {
            fullName: payload.fullName,
            email: payload.email,
            phoneNumber: payload.phoneNumber,
          },
        },
      });

      if (updated?.patient?.User) {
        login({
          id: updated.patient.User.id,
          name: updated.patient.User.fullName,
          email: updated.patient.User.email,
          role: "patient",
        });
      }

      setToast({ type: "success", message: "Patient profile saved to database!" });
      setTimeout(() => {
        setIsEditing(false);
        setToast(null);
      }, 1500);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setToast({
        type: "error",
        message: err.response?.data?.message || "Failed to update profile.",
      });
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
        <span className="text-sm font-semibold">Loading Patient Profile...</span>
      </div>
    );
  }

  // 1. DEFAULT VIEW: GET /api/patients/profile Details Page with Edit Button
  if (!isEditing) {
    return (
      <PatientProfileDetails
        profileData={profileData}
        onEdit={() => setIsEditing(true)}
      />
    );
  }

  // 2. EDIT MODE: Form Editor for PATCH /api/patients/profile
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Tell us about yourself",
          subtitle: "This helps us personalize your patient health experience.",
          cardIcon: <FaUserCheck className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Your profile, your care",
          cardDescription: "Personalizing your demographics helps our medical systems serve context-aware diagnostic advice.",
          component: <PersonalBasics formData={formData} handleChange={handleChange} />,
        };
      case 2:
        return {
          title: "Your body metrics",
          subtitle: "Help us calculate your vital patient health indicators.",
          cardIcon: <FaHeartbeat className="text-5xl sm:text-6xl text-[#0d9488] animate-pulse" />,
          cardTitle: "Vitals tracker",
          cardDescription: "Height and weight metrics let us calculate your body mass index (BMI) safely for prescription dosing.",
          component: <BodyMetrics formData={formData} handleChange={handleChange} />,
        };
      case 3:
        return {
          title: "Medical History",
          subtitle: "Share known medical conditions and allergies.",
          cardIcon: <FaNotesMedical className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Clinical Safety",
          cardDescription: "Providing your medical history prevents adverse drug reactions and assists consulting doctors.",
          component: <MedicalHistory formData={formData} handleChange={handleChange} />,
        };
      case 4:
        return {
          title: "Emergency Contact",
          subtitle: "Provide details of a trusted person to contact in emergency.",
          cardIcon: <FaPhoneAlt className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Instant Support",
          cardDescription: "Your emergency contact info is kept confidential and only accessed during urgent medical situations.",
          component: <EmergencyContact formData={formData} handleChange={handleChange} />,
        };
      default:
        return {};
    }
  };

  const stepConfig = renderStepContent();

  return (
    <div className="relative">
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
    </div>
  );
};

export default PatientProfile;
