import { Fragment } from "react";

export const TextTicker = () => {
  const words = [
    "Responsive",
    "Interactive",
    "Performant",
    "Accessible",
    "Secure",
    "User Friendly",
    "Practical",
  ];
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          {[...new Array(2)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              {words.map((word) => (
                <div key={word} className="flex flex-none ">
                  <span className="text-2xl font-extrabold text-gray-600 tracking-wide px-8">
                    {word}
                  </span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
