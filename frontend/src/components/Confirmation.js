import { useForm } from "../context/FormContext";

const Confirmation = () => {
  const { formData } = useForm();

  const isComplete =
    formData.peopleCount &&
    formData.isForYou &&
    formData.eligible &&
    formData.store &&
    formData.appointmentDate &&
    formData.appointmentTime &&
    formData.fullName &&
    formData.dob &&
    formData.phone &&
    formData.email;

  const handleSubmit = () => {
    if (!isComplete) return;

    // Replace with API call
    console.log("Final booking payload:", formData);
    alert("Appointment booked successfully!");
  };

  return (
    <div className="flex flex-col gap-6 text-sm text-gray-800">
      <p>
        Please review all details below carefully before confirming your
        appointment.
      </p>

      {/* Appointment Details */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Appointment</h3>
        <ul className="space-y-1">
          <li>
            <strong>People:</strong> {formData.peopleCount}
          </li>
          <li>
            <strong>For you:</strong>{" "}
            {formData.isForYou === "yes" ? "Yes" : "No"}
          </li>
          <li>
            <strong>Eligibility confirmed:</strong>{" "}
            {formData.eligible ? "Yes" : "No"}
          </li>
        </ul>
      </div>

      {/* Store */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Store</h3>
        <p>{formData.store}</p>
      </div>

      {/* Date & Time */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Date & Time</h3>
        <p>
          {new Date(formData.appointmentDate).toDateString()} at{" "}
          {formData.appointmentTime}
        </p>
      </div>

      {/* Customer */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Customer Details</h3>
        <ul className="space-y-1">
          <li>
            <strong>Name:</strong> {formData.fullName}
          </li>
          <li>
            <strong>Date of Birth:</strong>{" "}
            {new Date(formData.dob).toDateString()}
          </li>
          <li>
            <strong>Telephone:</strong> {formData.phone}
          </li>
          <li>
            <strong>Email:</strong> {formData.email}
          </li>
        </ul>
      </div>

      {/* Validation warning */}
      {!isComplete && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded">
          Some required information is missing. Please go back and review all
          sections.
        </div>
      )}

      {/* Confirm */}
      <button
        disabled={!isComplete}
        onClick={handleSubmit}
        className="bg-green-700 text-white py-3 rounded disabled:opacity-50"
      >
        Confirm Appointment
      </button>
    </div>
  );
};

export default Confirmation;
