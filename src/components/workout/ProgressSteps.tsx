"use client";

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= step
                  ? "bg-cyan-500 border-cyan-500 text-white"
                  : "border-gray-600 text-gray-400"
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  currentStep > step ? "bg-cyan-500" : "bg-gray-600"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
