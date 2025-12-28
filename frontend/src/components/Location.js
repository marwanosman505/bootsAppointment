import { useForm } from "../context/FormContext";

// Generate next 7 days
const getNext7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

// Generate 30-min slots (9:00–17:00)
const generateTimeSlots = () => {
  const slots = [];
  for (let h = 9; h < 17; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    slots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const DAYS = getNext7Days();
const TIME_SLOTS = generateTimeSlots();

const Location = () => {
  const {
    formData,
    updateFormData,
    goToNextSection,
  } = useForm();

  const canContinue =
    formData.appointmentDate && formData.appointmentTime;

  return (
    <div className="flex flex-col gap-5 text-sm text-gray-800">
      <p>
        Please select an available date and time for your appointment.
      </p>

      {/* Date selection */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">
          Select a date <span className="text-red-600">*</span>
        </label>
        <select
          className="border rounded p-2"
          value={formData.appointmentDate}
          onChange={(e) =>
            updateFormData("appointmentDate", e.target.value)
          }
        >
          <option value="">Please select</option>
          {DAYS.map((day) => (
            <option key={day} value={day}>
              {new Date(day).toDateString()}
            </option>
          ))}
        </select>
      </div>

      {/* Time slots */}
      {formData.appointmentDate && (
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Select a time slot <span className="text-red-600">*</span>
          </label>

          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() =>
                  updateFormData("appointmentTime", time)
                }
                className={`border rounded py-2 text-xs ${
                  formData.appointmentTime === time
                    ? "bg-blue-900 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected preview */}
      {formData.appointmentDate && formData.appointmentTime && (
        <div className="p-3 bg-gray-100 rounded text-xs">
          <strong>Selected slot:</strong>{" "}
          {new Date(formData.appointmentDate).toDateString()} at{" "}
          {formData.appointmentTime}
        </div>
      )}

      {/* Continue */}
      <button
        disabled={!canContinue}
        onClick={goToNextSection}
        className="mt-4 bg-blue-900 text-white px-6 py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      <p className="text-xs text-gray-500">
        <span className="text-red-600">*</span> required fields
      </p>
    </div>
  );
};

export default Location;
