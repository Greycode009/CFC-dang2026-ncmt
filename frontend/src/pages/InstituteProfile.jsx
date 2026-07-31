import React, { useState } from "react";
import { FaHospital, FaStethoscope, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Profile from "../components/Profile";
import InstituteBasics from "../components/InstituteProfile/InstituteBasics";
import Services from "../components/InstituteProfile/Services";
import ContactDetails from "../components/InstituteProfile/ContactDetails";
import Verification from "../components/InstituteProfile/Verification";

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

  // Render content based on active step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Institute Details",
          subtitle: "Provide basic information about your healthcare facility.",
          cardIcon: <FaHospital className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Hospital Listing",
          cardDescription: "Accurate facility details help patients discover your services and book specialized care.",
          component: <InstituteBasics formData={formData} handleChange={handleChange} />,
        };
      case 2:
        return {
          title: "Departments & Specialties",
          subtitle: "List key medical departments available at your facility.",
          cardIcon: <FaStethoscope className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Clinical Specialties",
          cardDescription: "Listing your departments allows AI health consultation to match relevant patients to your doctors.",
          component: <Services formData={formData} handleChange={handleChange} />,
        };
      case 3:
        return {
          title: "Operating Hours",
          subtitle: "Specify OPD and Emergency care timings.",
          cardIcon: <FaClock className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Timely Care",
          cardDescription: "Clear operating hours enable smooth appointment scheduling and emergency triage.",
          component: <ContactDetails formData={formData} handleChange={handleChange} />,
        };
      case 4:
        return {
          title: "Location & Address",
          subtitle: "Specify your institute address for location-based hospital search.",
          cardIcon: <FaMapMarkerAlt className="text-5xl sm:text-6xl text-[#0d9488]" />,
          cardTitle: "Geographic Mapping",
          cardDescription: "Your location is pinned on MedAssist hospital search for nearby patient navigation.",
          component: <Verification formData={formData} handleChange={handleChange} />,
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
