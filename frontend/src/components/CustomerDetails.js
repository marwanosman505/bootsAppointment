import { useForm } from "../context/FormContext";

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const CustomerDetails = () => {
  const { formData, updateFormData, goToNextSection } = useForm();

  const age = formData.dob ? calculateAge(formData.dob) : null;
  const isUnder40 = age !== null && age < 40;

  const canContinue =
    formData.fullName &&
    formData.dob &&
    formData.phone &&
    formData.email &&
    !isUnder40;

  return (
    <div className="flex flex-col gap-5 text-sm text-gray-800">
      <p>Please enter the customer’s details below.</p>

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          className="border rounded p-2"
          value={formData.fullName}
          onChange={(e) => updateFormData("fullName", e.target.value)}
        />
      </div>

      {/* DOB */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">
          Date of Birth <span className="text-red-600">*</span>
        </label>
        <input
          type="date"
          className="border rounded p-2"
          value={formData.dob}
          onChange={(e) => updateFormData("dob", e.target.value)}
        />
      </div>

      {/* Age warning */}
      {isUnder40 && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded">
          Unfortunately, customers under the age of 40 are not eligible to
          proceed with this appointment.
        </div>
      )}

      {/* Telephone */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">
          Telephone <span className="text-red-600">*</span>
        </label>
        <input
          type="tel"
          className="border rounded p-2"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          className="border rounded p-2"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
        />
      </div>

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

export default CustomerDetails;
