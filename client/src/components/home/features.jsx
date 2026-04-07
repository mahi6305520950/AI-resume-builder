import React from "react";
import { Zap } from "lucide-react";
import Title from "./Title";
import Faqfeatures from "../Faqfeatures";
import CardFeatures from "../CardFeatures";

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div id="features" className="flex flex-col items-center py-10">
      <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10  rounded-full px-4 py-1">
        <Zap width={12} />

        <span>simple process</span>
      </div>
      <Title
        title="Build your Resume"
        description="Our streamlined process
helps you create a professional resume in minutes with intelligent
AI-powered tools and features."
      />
      <Faqfeatures />
      <CardFeatures />

      <div className="flex flex-col md:flex-row items-center justify-center scroll-mt-12">
        <img
          className="max-w-2xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt=""
        />
        <div
          className="px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={
              "flex items-center justify-center gap-6 max-w-md group cursor-pointer"
            }
          >
            <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
              <div className="p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors">
                <svg
                  className="size-6 stroke-violet-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path d="M4 12v.01M12 12v.01M20 12v.01" />
                  <path d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z" />
                </svg>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-700">
                    Share Resume Link
                  </h3>
                  <p className="text-sm text-slate-600 max-w-xs">
                    Generate a unique link and share your resume instantly with
                    recruiters.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
              <svg
                className="size-6 stroke-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
              </svg>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Live Resume Website
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Turn your resume into a personal website with a shareable live
                  link.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
              <svg
                className="size-6 stroke-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Public / Private Control
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Control visibility by making your resume private or publicly
                  accessible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
    </div>
  );
};

export default Features;
