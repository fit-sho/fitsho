"use client";

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="mb-8 flex justify-center">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                currentStep >= step
                  ? "border-cyan-500 bg-cyan-500 text-white"
                  : "border-gray-600 text-gray-400"
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`mx-2 h-1 w-16 ${
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
