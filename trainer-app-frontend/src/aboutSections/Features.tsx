import { GenericSection } from "./components/GenericSection";

export const Features = () => {
  return (
    <GenericSection
      title="FitSho's Features"
      description={
        <ul className="section-description list-none space-y-4 mt-6">
          <li className="flex items-start">
            <span className="mr-3 text-blue-500">•</span>
            <span>
              <strong>Personalized Workouts:</strong> AI-powered plans tailored
              to your goals.
            </span>
          </li>

          <li className="flex items-start">
            <span className="mr-3 text-blue-500">•</span>
            <span>
              <strong>Progress Tracking:</strong> Visualize your fitness journey
              with stats and graphs.
            </span>
          </li>

          <li className="flex items-start">
            <span className="mr-3 text-blue-500">•</span>
            <span>
              <strong>Nutrition Guidance:</strong> Meal plans and calorie
              trackers.
            </span>
          </li>

          <li className="flex items-start">
            <span className="mr-3 text-blue-500">•</span>
            <span>
              <strong>Community Support:</strong> Connect with like-minded
              fitness enthusiasts.
            </span>
          </li>

          <li className="flex items-start">
            <span className="mr-3 text-blue-500">•</span>
            <span>
              <strong>Interactive Workouts:</strong> Follow live or pre-recorded
              sessions.
            </span>
          </li>
        </ul>
      }
      bgGradient="bg-[radial-gradient(ellipse_250%_100%_at_top_right,#183EC2,#EAEEFE_45%)]"
    />
  );
};
