import React, { useEffect, useState } from 'react'
import {BarChart3, FilePenLineIcon, FilePlus, LoaderCircleIcon, PenBoxIcon, PlusIcon, Sparkles, Target, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, Zap} from "lucide-react"
import {dummyResumeData} from "../assets/assets"
import { useNavigate,Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import toast from "react-hot-toast";
import api from "../configs/api";
import pdfToText from "react-pdftotext"

const Dashboard = () => {
    
    const {user,token}=useSelector(state=>state.auth)
    const [allResume,setallResume]=useState([])
    const [statusCreateResume, setStatusCreateResume] = useState(false);
    const [statusUploadResume, setStatusUploadResume] = useState(false);
    const [statusAtsResume, setstatusAtsResume] = useState(false);
    const [title,setTitle]=useState("")
    const [resume,setResume]=useState("")
    const [editresumeId, setEditresumeId] = useState("");
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()

    const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]

    const loadAllResumes=async()=>{
      try {
        const { data } = await api.get("api/users/resumes", {
          headers: { Authorization: token },
        });
        setallResume(data.resumes);
      } catch (error) {
        toast(error?.response?.data?.message || error.message);
      }
      

    }

    const createResume=async (i)=>{
      try {
        i.preventDefault();
        const {data}=await api.post("/api/resumes/create",{title},{headers:{Authorization:token}})
        setallResume([...allResume,data.resume]);
        setTitle("")
        setStatusCreateResume(false)
        navigate(`builder/${data.resume._id}`)
        toast.success(data.message)
        
      } catch (error) {
        toast(error?.response?.data?.message || error.message);
      }
    

    }

    const uploadResume = async (i) => {
      i.preventDefault();
      setIsLoading(true)
      try {
        const resumeText=await pdfToText(resume)
        const { data } = await api.post(
          "/api/ai/upload-resume",
          { title, resumeText },
          { headers: { Authorization: token } },
        );
        setTitle("")
        setStatusUploadResume(false);
        navigate(`builder/${data.resumeId}`);
        
      } catch (error) {
        toast(error?.response?.data?.message || error.message);
      }
      setIsLoading(false);

    };

    const editresumename=async (i)=>{
      try {
        i.preventDefault();
        const { data } = await api.put(
          "api/resumes/update",
          { resumeId: editresumeId, resumeData: { title } },
          {
            headers: { Authorization: token },
          },
        );
        setallResume((prev) =>
          prev.map((i) => (i._id === editresumeId ? { ...i, title } : i)),
        );

        setTitle("")
        setEditresumeId("");
        toast.success(data.message)

      } catch (error) {
        toast(error?.response?.data?.message || error.message);
      }
      
      
    }
    const deleteresume=async (id)=>{
      try {
        const confirm = window.confirm(
          "Are you sure you want to delete the resume?",
        );
        if (confirm) {
          const { data } = await api.delete(`/api/resumes/delete/${id}`, {
            headers: { Authorization: token },
          });
          
          setallResume((pri) => pri.filter((i) => i._id !== id));
          toast.success(data.message);
        }
        
      } catch (error) {
        toast(error?.response?.data?.message || error.message);
      }
        
    }

    useEffect(()=>{
      loadAllResumes()

    },[])


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p
          className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700
bg-clip-text text-transparent sm: hidden"
        >
          Welcome
        </p>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setStatusCreateResume(true)}
            className="w-full sm:max-w-40 h-52 flex flex-col items-center justify-center
    rounded-2xl gap-3 text-slate-600 bg-white
    border border-dashed border-slate-300
    hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1
    transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-indigo-100 to-purple-100"></div>

            <PlusIcon
              className="size-12 p-3 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-full 
    transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10"
            />

            <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 relative z-10">
              Create Resume
            </p>

            <p className="text-xs text-slate-500 text-center px-2 group-hover:text-indigo-400 relative z-10">
              Build from scratch with guided sections
            </p>
          </button>
          <button
            onClick={() => setStatusUploadResume(true)}
            className="w-full sm:max-w-40 h-52 flex flex-col items-center justify-center
  rounded-2xl gap-3 text-slate-600 
  bg-white
  border border-dashed border-slate-300 
  hover:border-green-500 hover:shadow-xl hover:-translate-y-1
  transition-all duration-300 
  cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-green-100 to-emerald-100"></div>

            {/* ICON */}
            <UploadCloudIcon
              className="size-12 p-3 
    bg-gradient-to-br from-green-400 to-green-600 
    text-white rounded-full 
    transition-all duration-300 
    group-hover:scale-110 group-hover:rotate-6 relative z-10"
            />

            {/* TITLE */}
            <p
              className="text-sm font-medium text-slate-700 
    group-hover:text-green-600 transition-all duration-300 relative z-10"
            >
              Upload Existing
            </p>

            {/* SUBTEXT (optional but recommended) */}
            <p className="text-xs text-slate-500 text-center px-2 group-hover:text-green-400 relative z-10">
              Upload and enhance your resume
            </p>
          </button>

          <Link to="/ats-resume" className="w-full sm:max-w-40">
            <button
              className="w-full sm:max-w-40 h-52 flex flex-col items-center justify-center
    rounded-2xl gap-3 text-slate-600 bg-white
    border border-dashed border-slate-300
    hover:border-orange-500 hover:shadow-xl hover:-translate-y-1
    transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-orange-100 to-amber-100"></div>

              <BarChart3
                className="size-12 p-3 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full 
    transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10"
              />

              <p className="text-sm font-medium text-slate-700 group-hover:text-orange-600 relative z-10">
                ATS Score Check
              </p>

              <p className="text-xs text-slate-500 text-center px-2 group-hover:text-orange-400 relative z-10">
                Have a resume? Check your ATS score and improve it instantly.
              </p>
            </button>
          </Link>
        </div>

        <hr className="my-6 w-full border-0 h-[2px] bg-slate-300" />

        <h2 className="text-3xl font-semibold text-blue-950">
          Manage Your Resumes
        </h2>
        <p className="text-2xl text-slate-500 mt-1 mb-10">
          Edit, organize, and optimize your resumes for every opportunity.
        </p>

        <div className="flex gap-5 overflow-x-auto pb-3 px-1 scroll-smooth scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent flex-wrap">
          {allResume.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <div>
                <button
                  key={index}
                  onClick={() => navigate(`builder/${resume._id}`)}
                  className="relative min-w-[160px] h-52 flex flex-col items-center justify-center 
        rounded-2xl gap-3 border group 
        hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
        transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}15, ${baseColor}50)`,
                    borderColor: baseColor + "50",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}20, ${baseColor}60)`,
                    }}
                  ></div>

                  <FilePenLineIcon
                    className="size-8 transition-all duration-300 group-hover:scale-110 relative z-10"
                    style={{ color: baseColor }}
                  />

                  <p
                    className="text-sm font-medium transition-all duration-300 group-hover:scale-105 px-3 text-center relative z-10"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>

                  <p
                    className="absolute bottom-2 text-[11px] transition-all duration-300 px-2 text-center opacity-80 group-hover:opacity-100"
                    style={{ color: baseColor + "AA" }}
                  >
                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 hidden group-hover:flex items-center gap-2 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm"
                  >
                    <TrashIcon
                      onClick={() => {
                        deleteresume(resume._id);
                      }}
                      className="size-6 p-1 hover:bg-red-100 rounded transition"
                    />
                    <PenBoxIcon
                      onClick={() => {
                        setEditresumeId(resume._id);
                        setTitle(resume.title);
                      }}
                      className="size-6 p-1 hover:bg-indigo-100 rounded transition"
                    />
                  </div>
                </button>
                <Link to={`/ats-resume/${resume._id}`}>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600 transition mt-2">
                    <BarChart3 className="size-4" />
                    Check ATS Score
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 space-y-10">
          <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-500" />
              <h3 className="text-xl font-semibold text-slate-800">
                Improve Your Resume
              </h3>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              Simple tips to make your resume stand out and pass ATS systems.
            </p>

            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border-2 border-b-cyan-500">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-indigo-500" />
                  <p className="text-sm font-medium text-slate-700">
                    Use Action Verbs
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Start bullet points with strong verbs like “Built”, “Led”, or
                  “Improved”.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border-2 border-b-cyan-500">
                <div className="flex items-center gap-2">
                  <BarChart3 className="size-4 text-green-500" />
                  <p className="text-sm font-medium text-slate-700">
                    Add Measurable Results
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Include numbers and impact (e.g., increased performance by
                  30%).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border-2 border-b-cyan-500">
                <div className="flex items-center gap-2">
                  <Target className="size-4 text-orange-500" />
                  <p className="text-sm font-medium text-slate-700">
                    Optimize Keywords
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Match job description keywords to improve ATS score.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-sm">
            <div className="flex items-center gap-2">
              <Zap className="text-indigo-500" />
              <h3 className="text-xl font-semibold text-slate-800">
                Quick Actions
              </h3>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              Continue building or improve your resumes instantly.
            </p>

            <div className="mt-5 flex flex-wrap gap-4">
              <button
                onClick={() => setStatusCreateResume(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500 text-white text-sm hover:bg-indigo-600 transition"
              >
                <FilePlus className="size-4" />
                Create Resume
              </button>

              <button
                onClick={() => setStatusUploadResume(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500 text-white text-sm hover:bg-green-600 transition"
              >
                <UploadCloud className="size-4" />
                Upload Resume
              </button>

              <Link to="/ats-resume">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600 transition">
                  <BarChart3 className="size-4" />
                  Check ATS Score
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-yellow-500 shadow-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-indigo-500" />
              <h3 className="text-xl font-semibold text-slate-800">
                Resume Insights
              </h3>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              Track your resume activity and progress.
            </p>

            <div className="mt-5 grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-indigo-50 text-center">
                <p className="text-lg font-semibold text-indigo-600">
                  {allResume.length}
                </p>
                <p className="text-xs text-slate-500">Total Resumes</p>
              </div>

              <div className="p-4 rounded-xl bg-green-50 text-center">
                <p className="text-lg font-semibold text-green-600">
                  {allResume?.[0]?.updatedAt
                    ? new Date(allResume[0].updatedAt).toLocaleDateString()
                    : "--"}
                </p>
                <p className="text-xs text-slate-500">Last Updated</p>
              </div>

              <div className="p-4 rounded-xl bg-orange-50 text-center">
                <p className="text-lg font-semibold text-orange-600">85%</p>
                <p className="text-xs text-slate-500">Avg ATS Score</p>
              </div>
            </div>
          </div>
        </div>

        {statusCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setStatusCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                type="text"
                onChange={(i) => setTitle(i.target.value)}
                value={title}
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus : border-green-600 ring-green-600"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  (setStatusCreateResume(false), setTitle(""));
                }}
              />
            </div>
          </form>
        )}
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
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
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
                        <p>Upload resume</p>
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
        {editresumeId && (
          <form
            onSubmit={editresumename}
            onClick={() => setEditresumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                type="text"
                placeholder="Enter resume title"
                onChange={(i) => setTitle(i.target.value)}
                value={title}
                className="w-full px-4 py-2 mb-4 focus : border-green-600 ring-green-600"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  (setEditresumeId(""), setTitle(""));
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Dashboard