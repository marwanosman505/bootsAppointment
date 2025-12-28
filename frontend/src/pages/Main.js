import {
  FaCheckCircle,
  FaLock,
  FaEdit,
} from "react-icons/fa";

import { useForm } from "../context/FormContext";
import ProgressBar from "../components/ProgressBar";
import Appointment from "../components/Appointment";
import FindStore from "../components/FindStore";
import Location from "../components/Location";
import CustomerDetails from "../components/CustomerDetails";
import Confirmation from "../components/Confirmation";

const sections = [
  { id: 1, title: "Appointment Type", component: <Appointment /> },
  { id: 2, title: "Find Store", component: <FindStore /> },
  { id: 3, title: "Location", component: <Location /> },
  { id: 4, title: "Customer Details", component: <CustomerDetails /> },
  { id: 5, title: "Confirmation", component: <Confirmation /> },
];

const Main = () => {
  const {
    activeSection,
    goToSection,
    completedSections,
    isSectionLocked,
  } = useForm();

  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12">
  <main className="max-w-4xl mx-auto px-6">

      <h1 className="text-5xl font-bold text-blue-900 mb-4">
        Book Medical Appointment
      </h1>
      <ProgressBar />
      <div className="h-[2px] bg-gray-300 mb-8" />

<section className="flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-8">


        {sections.map((section) => {
          const isCompleted = completedSections.includes(section.id);
          const isLocked = isSectionLocked(section.id);

          return (
            <div
              key={section.id}
              className={`border rounded-lg overflow-hidden ${
                isLocked ? "opacity-60" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-gray-100 p-4">
                <button
                  disabled={isLocked}
                  onClick={() => goToSection(section.id)}
                  className="flex items-center gap-4 text-left"
                >
                  <div className="text-xl font-bold text-blue-900">
                    {section.id}
                  </div>

                  <h2 className="text-xl font-semibold">
                    {section.title}
                  </h2>

                  {isCompleted && (
                    <FaCheckCircle className="text-green-600 ml-2" />
                  )}

                  {isLocked && (
                    <FaLock className="text-gray-500 ml-2" />
                  )}
                </button>

                {isCompleted && !isLocked && (
                  <button
                    onClick={() => goToSection(section.id)}
                    className="flex items-center gap-1 text-sm text-blue-700 hover:underline"
                  >
                    <FaEdit />
                    Edit
                  </button>
                )}
              </div>

              {/* Content */}
              {activeSection === section.id && !isLocked && (
                <div className="p-6 bg-white border-t">
                  {section.component}
                </div>
              )}
            </div>
          );
        })}
      </section>
  </main>
</div>

  );
};

export default Main;
