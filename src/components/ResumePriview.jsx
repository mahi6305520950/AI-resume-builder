import React from "react";
import ModernTemplate from "../assets/templates/ModernTemplate";
import ClassicTemplate from "../assets/templates/ClassicTemplate";
import MinimalImageTemplate from "../assets/templates/MinimalImageTemplate";
import MinimalTemplate from "../assets/templates/MinimalTemplate";
import ModernCardTemplate from "../assets/templates/ModernCardTemplate";
import SidebarProTemplate from "../assets/templates/SidebarProTemplate";
import ATSCompactTemplate from "../assets/templates/ATSCompactTemplate";

const ResumePriview = ({ data, template, accentColor, classes = "" }) => { 
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "card":
        return <ModernCardTemplate data={data} accentColor={accentColor} />;
      case "sidebar-pro":
        return <SidebarProTemplate data={data} accentColor={accentColor} />;
      case "compact-ats":
        return <ATSCompactTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100 p-4">
      <div
        id="resume-preview"
        className={`border border-gray-200 print:shadow-none print:border-none ${classes}`}
      >
        {renderTemplate()}
      </div>

      <style jsx="true">{`
        @page {
          size: letter;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 8.5in;
            height: 11in;
            margin: 0;
            padding: 0;
          }

          body * {
            visibility: hidden;
          }

          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 8.5in;
            min-height: 11in;
            background: white;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePriview;
