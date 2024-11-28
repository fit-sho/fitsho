import { GenericSection } from "./components/GenericSection";
import Image from "next/image";
import img from "@/assets/images/aboutImages/img.jpg";

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
      // image={
      //   <div
      //     className="flex flex-col md:flex-row
      //    items-start md:items-start mt-5"
      //   >
      //     <div className="w-full flex justify-center md:justify-end md:ml-[250px]">
      //       <Image
      //         src={}
      //         alt="Introduction to FitSho"
      //         className="rounded-lg shadow-lg mt-10"
      //         width={550}
      //         height={300}
      //       />
      //     </div>
      //   </div>
      // }
    />
  );
};
