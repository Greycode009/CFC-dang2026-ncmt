import { useState } from "react";
import { FaUserCheck, FaHeartbeat, FaNotesMedical, FaPhoneAlt } from "react-icons/fa";
import Profile from "../components/Profile";
import PersonalBasics from "../components/PatientProfile/PersonalBasics";
import BodyMetrics from "../components/PatientProfile/BodyMetrics";
import MedicalHistory from "../components/PatientProfile/MedicalHistory";
import EmergencyContact from "../components/PatientProfile/EmergencyContact";

const PatientProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Basics
    age: "28",
    gender: "Female",
    // Step 2: Body Metrics
    height: "168",
    weight: "62",
    bloodGroup: "O-positive (O+)",
    // Step 3: Medical History
    allergies: "None",
    conditions: "None",
    // Step 4: Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    relationship: "",
  });

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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Complete Patient Profile Data:", formData);
      alert("Patient Profile Onboarding Complete!");
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
    }
  };

  // Step configurations & modular components
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

export default PatientProfile;
