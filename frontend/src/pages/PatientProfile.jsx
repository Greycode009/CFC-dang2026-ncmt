import React, { useState } from "react";
import { FaUserCheck, FaHeartbeat, FaNotesMedical, FaPhoneAlt } from "react-icons/fa";
import Profile from "../components/Profile";

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

  // Dynamic step content configuration
  const getStepConfig = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Tell us about yourself",
          subtitle: "This helps us personalize your patient health experience.",
          cardIcon: <FaUserCheck className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Your profile, your care",
          cardDescription:
            "Personalizing your demographics helps our medical systems serve context-aware diagnostic advice.",
          content: (
            <>
              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          ),
        };

      case 2:
        return {
          title: "Your body metrics",
          subtitle: "Help us calculate your vital patient health indicators.",
          cardIcon: <FaHeartbeat className="text-5xl sm:text-6xl text-[#0d9488] animate-pulse" />,
          cardTitle: "Vitals tracker",
          cardDescription:
            "Height and weight metrics let us calculate your body mass index (BMI) safely for prescription dosing.",
          content: (
            <>
              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Height
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="168"
                    className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    cm
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Weight
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="62"
                    className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    kg
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white"
                >
                  <option value="O-positive (O+)">O-positive (O+)</option>
                  <option value="O-negative (O-)">O-negative (O-)</option>
                  <option value="A-positive (A+)">A-positive (A+)</option>
                  <option value="B-positive (B+)">B-positive (B+)</option>
                  <option value="AB-positive (AB+)">AB-positive (AB+)</option>
                </select>
              </div>
            </>
          ),
        };

      case 3:
        return {
          title: "Medical History",
          subtitle: "Share known medical conditions and allergies.",
          cardIcon: <FaNotesMedical className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Clinical Safety",
          cardDescription:
            "Providing your medical history prevents adverse drug reactions and assists consulting doctors.",
          content: (
            <>
              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Known Allergies
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g. Penicillin, Peanuts"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Pre-existing Conditions
                </label>
                <input
                  type="text"
                  name="conditions"
                  value={formData.conditions}
                  onChange={handleChange}
                  placeholder="e.g. Asthma, Diabetes"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>
            </>
          ),
        };

      case 4:
        return {
          title: "Emergency Contact",
          subtitle: "Provide details of a trusted person to contact in emergency.",
          cardIcon: <FaPhoneAlt className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Instant Support",
          cardDescription:
            "Your emergency contact info is kept confidential and only accessed during urgent medical situations.",
          content: (
            <>
              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Relationship
                </label>
                <input
                  type="text"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  placeholder="e.g. Spouse, Parent, Sibling"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>
            </>
          ),
        };

      default:
        return {};
    }
  };

  const stepConfig = getStepConfig();

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
      {stepConfig.content}
    </Profile>
  );
};

export default PatientProfile;
