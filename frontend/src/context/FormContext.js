import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState(1);

  const [completedSections, setCompletedSections] = useState([]);

  const [formData, setFormData] = useState({
    peopleCount: "",
    isForYou: "",
    eligible: false,
    store: "",
    appointmentDate: "",
    appointmentTime: "",
    fullName: "",
    dob: "",
    phone: "",
    email: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const completeSection = (id) => {
    setCompletedSections((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const goToNextSection = () => {
    completeSection(activeSection);
    setActiveSection((prev) => Math.min(prev + 1, 5));
  };

  const goToSection = (id) => {
    setActiveSection(id);
  };

const isSectionLocked = (id) => {
  // Always allow current section
  if (id === activeSection) return false;

  // Allow completed sections
  if (completedSections.includes(id)) return false;

  // Allow next section only
  if (id === activeSection + 1) return false;

  // Lock everything else
  return true;
};

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        activeSection,
        completedSections,
        goToNextSection,
        goToSection,
        isSectionLocked,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
