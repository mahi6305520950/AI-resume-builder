import { Loader2, SparkleIcon, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import api from '../configs/api';

const ProfissonalSummary = ({data,onChange,setResumeData}) => {

const {token}=useSelector(state=>state.auth)

const [isGenerating,setIsGenerating]=useState(false)

const generateSummary=async()=>{
  try {
    setIsGenerating(true)
    const prompt=`enhance my professional summary "${data}"`
    const response = await api.post(
      "/api/ai/enhance-pro-sum",
      {
        userContent: prompt,
      },
      { headers: { Authorization: token } },
    );

    setResumeData((priv) => ({
      ...priv,
      professional_summary: response.data.enchancedContent,
    }));

    
  } catch (error) {
    toast(error?.response?.data?.message || error.message);
  }
  finally{
     setIsGenerating(false);
  }
}



  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add the summary for your Resume here
          </p>
        </div>
        <button
          onClick={generateSummary}
          disabled={isGenerating}
          className="flex items-center justify-center gap-1 hover:bg-amber-300 duration-400 transition-all rounded-2xl bg-gray-200 p-2 border-0"
        >
          {isGenerating ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="write a compelling professional summary that highlights your key strengths and career objective..."
        />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
}

export default ProfissonalSummary