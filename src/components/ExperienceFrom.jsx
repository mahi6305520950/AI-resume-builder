import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from "react-hot-toast";

const ExperienceFrom = ({data,onChange}) => {

  const { token } = useSelector((state) => state.auth);
  const [isGeneratingindex, setIsGeneratingindex] = useState(-1);

    const addExperience=()=>{
        const newExperience = {
          company: "",
          position: "",
          start_date: "",
          description: "",
          is_current:false,
        };
        onChange([...data,newExperience])
    }

    const removeExperience=(index)=>{
        const updated=data.filter((_,i)=>i!==index)
        onChange(updated)
    }
    const updateExperience = (index, field, value) => {
      const updated = [...data];
      updated[index] = { ...updated[index], [field]: value };
      onChange(updated);
    };

const geratingDiscription=async(index)=>{
  if (isGeneratingindex === index) return; 
  setIsGeneratingindex(index)
  const experience=data[index]
  const prompt = `
    Enhance the following job description into 1-2 strong, ATS-friendly sentences.
    Use action verbs and measurable impact.
    Role: ${experience.position}
    Company: ${experience.company}
    Description: ${experience.description}
    `;

  try {
    const response = await api.post(
      "/api/ai/enhance-job-disc",
      { userContent: prompt },
      { headers: { Authorization: token } },
    );

    updateExperience(index, "description", response.data.enchancedContent);
    
  } catch (error) {
    console.error("FULL ERROR:", error);
    toast(error?.response?.data?.message || error.message);
  }
  finally{
    setIsGeneratingindex(-1);
  }

}


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add your Experience</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center justify-center gap-1 hover:bg-amber-300 duration-400 transition-all rounded-2xl bg-gray-200 p-2 border-0"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <Briefcase className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started. </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <h4>Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 trainsition-color"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  type="text"
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  value={experience.end_date || ""}
                  disabled={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked ? true : false,
                    )
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Currently Working Here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Discription
                  </label>
                  <button
                    onClick={() => geratingDiscription(index)}
                    disabled={
                      isGeneratingindex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="flex items-center justify-center gap-1 hover:bg-amber-300 duration-400 transition-all rounded-2xl bg-gray-200 p-2 border-0"
                  >
                    {isGeneratingindex === index ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
                    )}
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-1g resize-none"
                  placeholder="Describe your key responsibilities and achievements... "
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExperienceFrom