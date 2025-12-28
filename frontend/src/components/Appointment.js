import { useForm } from "../context/FormContext";

const Appointment = () => {
  const {
    formData,
    updateFormData,
    goToNextSection,
    goToSection
  } = useForm();

  const canContinue =
    formData.peopleCount &&
    formData.isForYou &&
    formData.eligible;

  return (
    <div className="flex flex-col gap-5 text-sm">
      <p>
        An estimated <strong>5.5 million people</strong> have undiagnosed high
        blood pressure.
      </p>

      {/* People Count */}
      <div>
        <label className="font-semibold">
          How many people? <span className="text-red-600">*</span>
        </label>
        <select
          className="border p-2 w-full"
          value={formData.peopleCount}
          onChange={(e) =>
            updateFormData("peopleCount", e.target.value)
          }
        >
          <option value="">Please select</option>
          <option value="1">1 person</option>
          <option value="2">2 people</option>
        </select>
      </div>

      {/* Is for you */}
      <div>
        <label className="font-semibold">
          Is this appointment for you? <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-6 mt-1">
          {["yes", "no"].map((v) => (
            <label key={v} className="flex gap-2">
              <input
                type="radio"
                checked={formData.isForYou === v}
                onChange={() => updateFormData("isForYou", v)}
              />
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Eligibility */}
      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={formData.eligible}
          onChange={(e) =>
            updateFormData("eligible", e.target.checked)
          }
        />
        I confirm eligibility criteria is met
      </label>

      {/* Continue */}
      <button
        disabled={!canContinue}
        onClick={goToNextSection}
        // onClick={() => goToSection(3)}
        className="bg-blue-900 text-white py-3 rounded disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
};

export default Appointment;
