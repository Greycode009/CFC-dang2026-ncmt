import React, { useState } from "react";
import { FaHospital, FaStethoscope, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Profile from "../components/Profile";

const InstituteProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Facility Basics
    instituteType: "General Hospital",
    bedCapacity: "150",
    // Step 2: Departments & Specialties
    departments: "Emergency, Cardiology, Pediatrics",
    // Step 3: Operating Hours
    emergencyCare: "24/7 Available",
    opdHours: "08:00 AM - 08:00 PM",
    // Step 4: Location & Address
    address: "",
    city: "",
  });

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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Complete Institute Profile Data:", formData);
      alert("Institute Profile Setup Complete!");
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

  const getStepConfig = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Institute Details",
          subtitle: "Provide basic information about your healthcare facility.",
          cardIcon: <FaHospital className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Hospital Listing",
          cardDescription:
            "Accurate facility details help patients discover your services and book specialized care.",
          content: (
            <>
              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Institute Type
                </label>
                <select
                  name="instituteType"
                  value={formData.instituteType}
                  onChange={handleChange}
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white"
                >
                  <option value="General Hospital">General Hospital</option>
                  <option value="Specialized Clinic">Specialized Clinic</option>
                  <option value="Diagnostic Center">Diagnostic Center</option>
                  <option value="Nursing Home">Nursing Home</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Total Bed Capacity
                </label>
                <input
                  type="number"
                  name="bedCapacity"
                  value={formData.bedCapacity}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>
            </>
          ),
        };

      case 2:
        return {
          title: "Departments & Specialties",
          subtitle: "List key medical departments available at your facility.",
          cardIcon: <FaStethoscope className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Clinical Specialties",
          cardDescription:
            "Listing your departments allows AI health consultation to match relevant patients to your doctors.",
          content: (
            <>
              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Available Departments
                </label>
                <textarea
                  name="departments"
                  rows={3}
                  value={formData.departments}
                  onChange={handleChange}
                  placeholder="e.g. Cardiology, Neurology, Pediatrics, ICU"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>
            </>
          ),
        };

      case 3:
        return {
          title: "Operating Hours",
          subtitle: "Specify OPD and Emergency care timings.",
          cardIcon: <FaClock className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Timely Care",
          cardDescription:
            "Clear operating hours enable smooth appointment scheduling and emergency triage.",
          content: (
            <>
              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  OPD Timings
                </label>
                <input
                  type="text"
                  name="opdHours"
                  value={formData.opdHours}
                  onChange={handleChange}
                  placeholder="08:00 AM - 08:00 PM"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Emergency Service Availability
                </label>
                <select
                  name="emergencyCare"
                  value={formData.emergencyCare}
                  onChange={handleChange}
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white"
                >
                  <option value="24/7 Available">24/7 Available</option>
                  <option value="Daytime Only">Daytime Only</option>
                  <option value="On Call">On Call</option>
                </select>
              </div>
            </>
          ),
        };

      case 4:
        return {
          title: "Location & Address",
          subtitle: "Specify your institute address for location-based hospital search.",
          cardIcon: <FaMapMarkerAlt className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Geographic Mapping",
          cardDescription:
            "Your location is pinned on MedAssist hospital search for nearby patient navigation.",
          content: (
            <>
              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  className="font-sans w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  City / District
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
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

export default InstituteProfile;
