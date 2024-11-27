import { GenericSection } from "./components/GenericSection";

export const Usage = () => {
  const steps = [
    {
      text: (
        <p>
          <a href="/#" className="underline hover:text-gray-500">
            Sign up
          </a>{" "}
          for Fitsho with your email and personal details
        </p>
      ),
    },
    { text: "Verify your email to activate your account." },
    {
      text: (
        <p>
          <a href="/#" className="underline hover:text-gray-500">
            Download
          </a>{" "}
          the Fitsho app or access the dashboard on our website
        </p>
      ),
    },
    { text: "Start using Fitsho to track your fitness goals and enjoy!" },
  ];

  return (
    <GenericSection
      title="How to use Fitsho"
      description={
        <ul className="list-decimal ml-5 space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="section-description">
              <span>{step.text}</span>
            </li>
          ))}
        </ul>
      }
      bgGradient="bg-[radial-gradient(ellipse_250%_100%_at_bottom_left,#183EC2,#EAEEFE_45%)]"
    />
  );
};
