interface LoadingSpinnerProps {
  message?: string;
  theme?: "blue" | "indigo" | "purple" | "gradient";
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  message = "Loading...",
  theme = "blue",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const themeClasses = {
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    purple: "text-purple-600",
    gradient:
      "text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        <div className={`${sizeClasses[size]} relative`}>
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div
            className={`absolute inset-0 rounded-full border-4 border-transparent ${
              theme === "gradient"
                ? "border-r-indigo-600 border-t-blue-600"
                : `border-t-${theme === "blue" ? "blue" : theme === "indigo" ? "indigo" : "purple"}-600`
            } animate-spin`}
          ></div>

          <div
            className={`absolute inset-2 rounded-full ${
              theme === "gradient"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                : theme === "blue"
                  ? "bg-blue-600"
                  : theme === "indigo"
                    ? "bg-indigo-600"
                    : "bg-purple-600"
            } animate-pulse`}
          ></div>

          <div
            className={`absolute -right-1 -top-1 h-2 w-2 rounded-full ${
              theme === "gradient"
                ? "bg-blue-400"
                : theme === "blue"
                  ? "bg-blue-400"
                  : theme === "indigo"
                    ? "bg-indigo-400"
                    : "bg-purple-400"
            } animate-ping`}
          ></div>
          <div
            className={`absolute -bottom-1 -left-1 h-1.5 w-1.5 rounded-full ${
              theme === "gradient"
                ? "bg-indigo-400"
                : theme === "blue"
                  ? "bg-blue-300"
                  : theme === "indigo"
                    ? "bg-indigo-300"
                    : "bg-purple-300"
            } animation-delay-300 animate-ping`}
          ></div>
        </div>
      </div>

      <div className="text-center">
        <p
          className={`text-sm font-medium ${themeClasses[theme]} animate-pulse`}
        >
          {message}
        </p>
        <div className="mt-2 flex justify-center space-x-1">
          <div
            className={`h-1 w-1 rounded-full ${
              theme === "gradient"
                ? "bg-blue-400"
                : theme === "blue"
                  ? "bg-blue-400"
                  : theme === "indigo"
                    ? "bg-indigo-400"
                    : "bg-purple-400"
            } animate-bounce`}
          ></div>
          <div
            className={`h-1 w-1 rounded-full ${
              theme === "gradient"
                ? "bg-indigo-400"
                : theme === "blue"
                  ? "bg-blue-400"
                  : theme === "indigo"
                    ? "bg-indigo-400"
                    : "bg-purple-400"
            } animation-delay-100 animate-bounce`}
          ></div>
          <div
            className={`h-1 w-1 rounded-full ${
              theme === "gradient"
                ? "bg-purple-400"
                : theme === "blue"
                  ? "bg-blue-400"
                  : theme === "indigo"
                    ? "bg-indigo-400"
                    : "bg-purple-400"
            } animation-delay-200 animate-bounce`}
          ></div>
        </div>
      </div>
    </div>
  );
}
