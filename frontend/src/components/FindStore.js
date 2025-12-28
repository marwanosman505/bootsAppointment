import { useForm } from "../context/FormContext";

const STORES = [
  "Boots Nottingham Victoria Centre",
  "Boots Nottingham Riverside",
  "Boots Beeston",
  "Boots West Bridgford",
];

const FindStore = () => {
  const { formData, updateFormData, goToNextSection } = useForm();

  const canContinue = Boolean(formData.store);

  return (
    <div className="flex flex-col gap-5 text-sm text-gray-800">
      {/* Intro */}
      <p>
        Please select the store where you would like to attend your appointment.
      </p>

      {/* Store Select */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">
          Choose a store <span className="text-red-600">*</span>
        </label>

        <select
          className="border rounded p-2"
          value={formData.store}
          onChange={(e) => updateFormData("store", e.target.value)}
        >
          <option value="">Please select</option>
          {STORES.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>

      {/* Selected store preview */}
      {formData.store && (
        <div className="p-3 bg-gray-100 rounded text-xs">
          <strong>Selected store:</strong> {formData.store}
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

      {/* Required note */}
      <p className="text-xs text-gray-500">
        <span className="text-red-600">*</span> required fields
      </p>
    </div>
  );
};

export default FindStore;
