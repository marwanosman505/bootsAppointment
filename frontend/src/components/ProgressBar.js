import { useForm } from "../context/FormContext";

const TOTAL_STEPS = 5;

const ProgressBar = () => {
  const { activeSection } = useForm();

  const progressPercent =
    ((activeSection - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>Start</span>
        <span>Confirmation</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-900 transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
