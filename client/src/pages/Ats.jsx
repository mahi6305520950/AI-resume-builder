import { LoaderCircleIcon, UploadCloud, X, XCircleIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import pdfToText from "react-pdftotext";
import api from '../configs/api';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const Ats = () => {
   const [allResume,setallResume]=useState([])
   const navigate=useNavigate()
   
   

  const [statusUploadResume, setStatusUploadResume] = useState(false);
   const [title,setTitle]=useState("")
    const [resume,setResume]=useState("")
    const [resumeData,setResumeData]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    
    const { user, token } = useSelector((state) => state.auth);
    const { resumeId } = useParams();

    const [isLoadingResumeStatus, setIsLoadingResumeStatus] = useState(false);

    const uploadResume = async (i) => {
      i.preventDefault();
       setIsLoading(true);
       try {
     const resumeText = await pdfToText(resume);
      //console.log(resumeText);
         const { data } = await api.post(
           "/api/ai/ats-check-resume",
           { title, resumeText },
           { headers: { Authorization: token } },
         );
         loadAllResumes()
         console.log(data)
         setResumeData(data?.data)
         //console.log(resumedata)
         setTitle("");
         setStatusUploadResume(false);

    
       } catch (error) {
         toast(error?.response?.data?.message || error.message);
       }
       setIsLoading(false);


    };

     const loadAllResumes = async () => {
      setIsLoading(true);
       try {
        
         const { data } = await api.get("/api/ai/ats-check-resume", {
           headers: { Authorization: token },
         });
         console.log(data.resumes)
         setallResume(data.resumes);
         setResumeData(data.resumes[0])
       } catch (error) {
         toast(error?.response?.data?.message || error.message);
       }
       setIsLoading(false);
     };

     const atsCheckResume=async(resumeId)=>{
      setIsLoading(true);
      try {
        const { data } = await api.post(
          `/api/ai/ats-check-resume/${resumeId}`,
          {},
          {
            headers: { Authorization: token },
          },
        );
        await loadAllResumes();
        console.log(data.data);
        setResumeData(data.data);
        
        
      } catch (error) {
        toast(error?.response?.data?.message || error.message);
      }
      setIsLoading(false);
     }


 useEffect(() => {
   if (!token) return;

   const init = async () => {
     setIsLoading(true);

     await loadAllResumes();

     if (resumeId) {
       await atsCheckResume(resumeId);
     }

     setIsLoading(false);
   };

   init();
 }, [token, resumeId]);

 const deleteAts=async(id)=>{
    try {
      const { data } = await api.delete(
        `/api/ai/ats-check-resume/${id}`,
        {
          headers: { Authorization: token },
        },
      );
      toast.success(data.message);
      setallResume((prev) => prev.filter((item) => item._id !== id));
      await loadAllResumes();
      
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
 }

 const generateAtsResumeByAi = async () => {
  setIsLoadingResumeStatus(true)
   try {
    let resumeText = "";
    let url = "/api/ai/generate-ats-resume-by-ai";
    if (resumeId) {
      url = `/api/ai/generate-ats-resume-by-ai/${resumeId}`;
      
    }
    else{
       resumeText = await pdfToText(resume);

    }
    
    let Atstitle = resumeData?.title;
    const { data } = await api.post(
      url,
      { resumeText, title,resumeData, Atstitle},
      {
        headers: { Authorization: token },
      },
    );
    toast.success(data.message)
    navigate(`/app/builder/${data.data._id}`);
    
    //await loadAllResumes();

   } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
   }
   setIsLoadingResumeStatus(false);
 };


    


    const getScoreColor = (score) => {
      if (score >= 80) return "text-green-600";
      if (score >= 50) return "text-yellow-500";
      return "text-red-500";
    };

    const getBgGradient = (score) => {
      if (score >= 80) return "from-green-50 to-green-100";
      if (score >= 50) return "from-yellow-50 to-yellow-100";
      return "from-red-50 to-red-100";
    };

    const getMessage = (score) => {
      if (score >= 80) return "Excellent! Your resume is highly optimized.";
      if (score >= 50) return "Good, but there is room for improvement.";
      return "Needs improvement to pass ATS filters.";
    };
    const handleHover = () => {
      setProgress(0);
      setTimeout(() => setProgress(score), 50);
    };

    const atsCardHanduler=(id)=>{
      const selectedResume = allResume.find((i)=>i._id===id)
      setResumeData(selectedResume)
    }

    



  return (
    <div className="min-h-screen mx-auto  bg-indigo-50">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl md:text-5xl font-semibold max-w-5xl text-center mt-17 md:leading-[70px] text-center bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent text-nowrap">
          {resumeId ? "Resume ATS Analysis" : "Analyze Resume Compatibility"}
        </h2>
        <p className="text-3xl text-center text-slate-600 mt-2">
          {resumeId
            ? "Your resume has been analyzed. Review insights and improve your chances."
            : "Upload your resume to check ATS score and get suggestions."}
        </p>
        <button
          onClick={() => setStatusUploadResume(true)}
          className="flex  items-center gap-2 px-5 py-2.5 h-16
      bg-amber-400 font-bold text-indigo-600 rounded-lg 
      hover:bg-indigo-100 transition-all duration-400 hover:text-xl   mt-3  mb-3"
        >
          <UploadCloud className="size-5" />
          Upload Resume
        </button>
      </div>
      {statusUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setStatusUploadResume(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4 mt-2">
              Upload a resume to check ATS score
            </h2>
            <input
              type="text"
              placeholder="Enter resume title"
              onChange={(i) => setTitle(i.target.value)}
              value={title}
              className="w-full px-4 py-2 mb-4 focus : border-green-600 ring-green-600"
              required
            />
            <div>
              <label htmlFor="resume-upload">
                Select Resume File
                <div
                  className="flex flex-col items-center justify-center gap-2
              border group text-slate-400 border-slate-400 border-dashed
              rounded-md p-4 py-10 my-4 hover:border-green-500
              hover:text-green-700 cursor-pointer transition-colors"
                >
                  {resume ? (
                    <p className="text-green-700">{resume?.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="stroke-1 size-14" />
                      <p>Upload resume to check ATS Score</p>
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="resume-upload"
                accept=".pdf"
                hidden
                onChange={(i) => setResume(i.target.files[0])}
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircleIcon className="animate-spin size-4 text-white" />
                  Uploading...
                </span>
              ) : (
                "Upload Resume"
              )}
            </button>
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                (setStatusUploadResume(false), setTitle(""));
              }}
            />
          </div>
        </form>
      )}

      <div>
        <hr className="my-6 w-full border-0 h-[2px] bg-slate-300" />
        {isLoading && <Loader />}

        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allResume.map((item) => (
              <div
                key={item._id}
                onClick={() => atsCardHanduler(item._id)}
                className={`
          bg-white rounded-xl p-4 
          border transition-all duration-300

          ${
            resumeData?._id === item._id
              ? "ring-2 border-none ring-green-500 ring-offset-2 ring-offset-white shadow-lg scale-[1.02]"
              : "border-gray-200 hover:shadow-md hover:-translate-y-1"
          }
        `}
              >
                <div className=" relative group flex items-center flex-row justify-between ">
                  <h2 className="text-sm font-semibold text-gray-800 truncate">
                    {item.title}
                  </h2>
                  <X
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAts(item._id);
                    }}
                    className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100  size-5 cursor-pointer hover:bg-gray-200 transition  rounded-full"
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">ATS Score</span>
                  <span className="text-sm font-bold text-green-600">
                    {item.ats.score}%
                  </span>
                </div>

                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.ats.score}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Last updated: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 w-full border-0 h-[2px] bg-slate-300" />
      </div>

      <div
        className={`w-full bg-gradient-to-r ${getBgGradient(resumeData?.ats?.score)} p-6 rounded-2xl shadow-md`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">ATS Score</h2>
          <h1 className="text-xl font-semibold text-indigo-900">
            {resumeData?.title || "Title of the Resume"}
          </h1>
          <span className="text-xs text-gray-500">
            Last analyzed Date is:{" "}
            {new Date(resumeData?.updatedAt).toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-6">
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gray-300">
            <div className="absolute inset-0 rounded-full  bg-amber-200"></div>

            <div
              className="absolute inset-0 rounded-full bg-gray-500/20 border-[15px] border-blue-900 border-t-transparent"
              style={{
                clipPath: `inset(${100 - resumeData?.ats?.score}% 0 0 0)`,
              }}
            ></div>

            <div className="absolute flex items-center justify-center w-[98px] h-[98px] bg-white rounded-full">
              <span
                className={`text-2xl font-bold ${getScoreColor(resumeData?.ats?.score)}`}
              >
                {resumeData?.ats?.score} %
              </span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <p
              className={`text-lg font-semibold ${getScoreColor(resumeData?.ats?.score)}`}
            >
              {getMessage(resumeData?.ats?.score)}
            </p>

            <p className="text-sm text-gray-600 mt-2 max-w-md">
              Your resume score reflects how well it matches ATS requirements,
              including keyword relevance, formatting, and overall structure.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <p className="text-xs text-gray-500">Status</p>
            <p
              className={`font-semibold ${getScoreColor(resumeData?.ats?.score)}`}
            >
              {resumeData?.ats?.score >= 80
                ? `Strong: ${resumeData?.ats?.score}`
                : resumeData?.ats?.score >= 50
                  ? `Average: ${resumeData?.ats?.score}`
                  : `Weak: ${resumeData?.ats?.score}`}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <div className="mt-16">
          <h1 className="text-2xl text-center font-semibold text-indigo-700 mb-2 mt-4">
            Performance Breakdown
          </h1>

          <p className="text-lg text-center text-gray-500 mb-3">
            Here is a detailed analysis of your resume across key evaluation
            criteria:
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4  mt-10">
          <div className="p-4 bg-mauve-200 rounded-lg text-center">
            <p className="text-sm font-bold">Keywords Match</p>
            <p className="font-semibold text-2xl text-green-700">
              {resumeData?.metrics?.keywordsMatch} %
            </p>
            <p className="text-zinc-600  text-sm">
              Measures how well your resume matches job-relevant keywords.
            </p>
          </div>

          <div className="p-4 bg-emerald-200 rounded-lg text-center">
            <p className="text-sm font-bold">Readability</p>
            <p className="font-semibold text-2xl text-blue-600">
              {resumeData?.metrics?.readability} %
            </p>
            <p className="text-zinc-600  text-sm">
              Evaluates clarity, sentence structure, and ease of reading.
            </p>
          </div>

          <div className="p-4 bg-mauve-200 rounded-lg text-center">
            <p className="text-sm font-bold">Formatting</p>
            <p className="font-semibold text-2xl text-orange-600">
              {resumeData?.metrics?.formatting} %
            </p>
            <p className="text-zinc-600  text-sm">
              Assesses layout consistency, spacing, and visual structure.
            </p>
          </div>

          <div className="p-4 bg-emerald-200 rounded-lg text-center">
            <p className="text-sm font-bold">Sections</p>
            <p className="font-semibold text-2xl text-purple-600">
              {resumeData?.metrics?.sections} %
            </p>
            <p className="text-zinc-600  text-sm">
              Checks completeness of essential resume sections.
            </p>
          </div>
        </div>
      </div>

      <div className=" min-h-screen mt-10">
        <div className=" p-6">
          <div className="max-w-6xl  mx-auto flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="w-full md:w-[45%] order-1 md:order-2 flex">
              <div className="sticky md:top-6 w-full flex">
                <div className="bg-white rounded-2xl shadow-lg p-3 flex-1">
                  <img
                    src="/ats-suggestions-image.png"
                    alt="Preview"
                    className="rounded-xl w-full h-full object-cover
        transition-all duration-300 ease-in-out
        hover:-translate-y-1.5 hover:shadow-xl
        border-x border-y border-indigo-100"
                  />
                </div>
              </div>
            </div>

            <div className=" flex-1 bg-indigo-50 rounded-2xl p-6 order-2 md:order-1">
              <h2 className="text-xl text-center font-semibold text-indigo-700 mb-2">
                Suggestions
              </h2>

              <p className="text-zinc-600  text-xl text-center mb-4">
                Improve your resume using these recommendations:
              </p>

              {resumeData?.ats?.suggestions?.map((suggestion, index) => (
                <div className="space-y-3 mt-1.5" key={index}>
                  <div className="bg-white border border-indigo-100 rounded-lg p-3 shadow-sm relative hover:shadow-md transition">
                    <span className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-l-lg"></span>
                    <p className="text-zinc-600  text-sm pl-3">
                      Use strong action verbs and quantify your achievements.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6">
          {/* 🔹 IMAGE (first on mobile, LEFT on desktop) */}
          <div className="w-full md:w-[45%] order-1 md:order-1">
            <div className="sticky md:top-6">
              <div className="bg-white rounded-2xl shadow-lg p-3">
                <img
                  src="/ats-improvement-image.png"
                  alt="Improvements Preview"
                  className="
              rounded-xl w-full h-full object-cover
              transition-all duration-300 ease-in-out
              hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-200
              border-x border-y border-indigo-100
            "
                />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-yellow-50 rounded-2xl p-6 order-2 md:order-2">
            <div>
              <h1 className="text-lg text-center font-semibold text-yellow-700 mb-1">
                Content Improvements
              </h1>

              <p className=" text-center text-zinc-600  text-xl mb-4">
                Enhance the quality and impact of your resume with these
                improvements:
              </p>

              {resumeData?.ats?.improvements?.map((improvement, index) => (
                <div
                  key={index}
                  className="bg-emerald-50 border border-yellow-100 rounded-lg p-3 shadow-sm relative hover:shadow-md transition mt-1.5"
                >
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-lg"></span>
                  <p className="text-zinc-600  text-sm pl-3">{improvement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1 bg-indigo-50 rounded-2xl p-6 order-2 md:order-1">
            <h1 className="text-lg text-center font-semibold text-indigo-700 mb-1">
              Interview Preparation Questions
            </h1>

            <p className=" text-center text-zinc-600  text-xl mb-4">
              Based on your resume, here are some potential interview questions:
            </p>

            {resumeData?.ats?.interviewQuestions?.map((question, index) => (
              <div
                key={index}
                className="bg-orange-50 border border-yellow-100 rounded-lg p-3 shadow-sm relative hover:shadow-md transition mt-2"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-lg"></span>
                <p className="text-zinc-600  text-sm pl-3">{question}</p>
              </div>
            ))}
          </div>

          <div className="w-full md:w-[45%] order-1 md:order-2">
            <div className="sticky md:top-6">
              <div className="bg-white rounded-2xl shadow-lg p-3">
                <img
                  src="/ai-interview-image.jpg"
                  alt="Interview Preview"
                  className="
              rounded-xl w-full h-full object-cover
              transition-all duration-300 ease-in-out
              hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-200
              border-x border-y border-indigo-100
            "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">
        <p className="text-xl font-medium max-w-md text-slate-800">
          Create a Professional, AI-Powered Resume That Helps You Stand Out and
          Get Hired
        </p>
        <p className="text-lg font-semibold text-slate-600">
          Start building your dream resume with the above features today!
        </p>
        <button
          onClick={() => generateAtsResumeByAi()}
          className="flex items-center gap-2 rounded py-3 px-8 bg-green-600 hover:bg-green-700 transition text-white"
        >
          <span>{isLoadingResumeStatus?(
            <div className='flex flex-row items-center '>
              <LoaderCircleIcon className="animate-spin size-4 text-white m-2" />
              Generating...
            </div>
          ):"Get Started"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Ats