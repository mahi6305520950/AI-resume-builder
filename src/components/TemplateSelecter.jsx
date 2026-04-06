import { Check, CheckCheck, Layout, LayoutDashboard } from 'lucide-react';
import React, { useState } from 'react'

const TemplateSelecter = ({ selectedTemplate, onChange }) => {
  const [IsOpen, setIsOpen] = useState(false);
  const Templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean,traditional resume formate with clear sections and profissional topograpy",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "Sleek design with strategic use of color and modern choices",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal design with a single image your and clean typography",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center",
    },


    
    {
      id: "card",
      name: "Card Modern",
      preview:
        "Clean card-based layout with soft shadows and section separation",
    },
    {
      id: "sidebar-pro",
      name: "Sidebar Pro",
      preview:
        "Professional two-column layout with bold sidebar and structured content",
    },
    {
      id: "compact-ats",
      name: "ATS Compact",
      preview:
        "Minimal, highly optimized layout designed for ATS parsing and fast readability",
    },
  ];
  return (
    <div className=" relative">
      <button
        onClick={() => setIsOpen(!IsOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />{" "}
        <span className="max-sm:hidden">Temp1ate</span>
      </button>
      {IsOpen && (
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {Templates.map((tem) => (
            <div
              key={tem.id}
              onClick={() => {
                onChange(tem.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === tem.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300  hover:border-gray-400 hover:bg-gray-100"
              }
                        
                        `}
            >
              {selectedTemplate === tem.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{tem.name}</h4>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                  {tem.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelecter