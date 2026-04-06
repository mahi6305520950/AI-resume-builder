import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" },
  ];

  return (
    <div className="relative inline-block">
      {/* BUTTON */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-purple-600
        bg-gradient-to-br from-purple-50 to-purple-100 
        hover:ring ring-purple-300 transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="hidden sm:inline">Accent</span>
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="grid grid-cols-4 w-64 gap-4 absolute top-full mt-2 p-3 z-10 
          bg-white rounded-md border border-gray-200 shadow-lg"
        >
          {colors.map((color) => (
            <div
              key={color.value}
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
              className="relative flex flex-col items-center cursor-pointer group"
            >
              {/* COLOR CIRCLE */}
              <div
                className="w-12 h-12 rounded-full border-2 border-transparent 
                group-hover:border-black/25 transition-all flex items-center justify-center"
                style={{ backgroundColor: color.value }}
              >
                {/* SELECTED ICON */}
                {selectedColor === color.value && (
                  <Check className="w-5 h-5 text-white" />
                )}
              </div>

              {/* LABEL */}
              <p className="text-xs text-center mt-1 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
