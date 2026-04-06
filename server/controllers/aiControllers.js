
import ai from "../configs/ai.js";
import Resume from "../model/resume.js";

import AtsResume from "../model/ats.js";

//professonal-summary by ai
// POST: /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary=async(req,res)=>{

   try {
     const { userContent } = req.body;
    if(!userContent){
        return res.status(400).json({message:"Missing required fields"})
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a highly experienced resume strategist and ATS optimization expert. Your task is to transform a given professional summary into a concise, impactful 1–2 sentence statement that effectively highlights core competencies, relevant experience, and clear career objectives. Ensure the summary is results-driven, keyword-optimized for Applicant Tracking Systems (ATS), and tailored to demonstrate measurable value, industry alignment, and professional positioning. Maintain a strong, confident tone and return only the refined summary without any explanations, options, or additional text",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enchancedContent = response.choices[0].message.content
    return res.status(200).json({ enchancedContent });
    
   } catch (error) {
    return res.status(400).json({message:error.message});
    
   }

}


//job-Discription by ai
// POST: /api/ai/enhance-job-disc


export const enhanceJobDiscription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a senior resume optimization specialist with deep expertise in crafting ATS-compliant, high-impact job descriptions. Your task is to refine a given job description into a concise 1–2 sentence statement that clearly communicates key responsibilities, measurable achievements, and business impact. Use strong action verbs, incorporate quantifiable results wherever possible, and align the language with industry-relevant keywords to maximize ATS visibility. Ensure the tone is professional, results-driven, and value-focused, and return only the enhanced description without any additional text or explanation.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
   

    const enchancedContent = response.choices[0].message.content;
    return res.status(200).json({ enchancedContent });
    
  } catch (error) {
    return res.status(400).json({ message: error.message });
    console.error("FULL ERROR:", error);
  }
};



//job-Discription by ai
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;
    if(!resumeText){
        return res.status(400).json({ message: "Missing required fields" });
    }
    const systemText =
      "You are an advanced AI-powered resume parsing and information extraction specialist. Your task is to accurately extract structured data from a given resume, including personal details, professional summary, work experience, education, skills, and projects. Ensure high precision, maintain the original context, and normalize the output into a clean, well-organized format suitable for downstream processing and ATS systems. Avoid adding assumptions or fabrications, and return only the extracted structured data without any explanations or additional text";

    const userText = `Extract data from this resume:${resumeText}
     Provide data in the following JSON format with no additional text before or
     after:
     {
      professional_summary: { type: String, default: "" },
      skills: [{ type: String }],
      personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
      },
      experience: [
        {
          company: { type: String },
          position: { type: String },
          start_date: { type: String },
          end_date: { type: String },
          description: { type: String },
          is_current: { type: Boolean },
        },
      ],
      project: [
        {
          name: { type: String },
          type: { type: String },
          description: { type: String },
        },
      ],
      education: [
        {
          institution: { type: String },
          degree: { type: String },
          field: { type: String },
          graduation_date: { type: String },
          gpa: { type: String },
        },
      ],
     }
    `;


    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemText,
        },
        {
          role: "user",
          content: userText,
        },
      ],
      response_format:{type:"json_object"} 
    });

    const enchancedContent = response.choices[0].message.content;
    const parsedData=JSON.parse(enchancedContent)
    const newResume = await Resume.create({ userId, title ,...parsedData});


    return res.status(200).json({ data: newResume._id});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



// POST: /api/ai/ats-check-resume
export const atsCheckResume = async (req, res) => {
  try {
    let { resumeText="", title="" } = req.body;
    const { resumeId } = req.params;
    const userId = req.userId;
    if(resumeId){
      const existAtsResume = await AtsResume.findOne({ userId, resumeId });
      if (existAtsResume) {
        return res.status(200).json({ data: existAtsResume });
      }
      else{
        const resume = await Resume.findOne({ userId, _id: resumeId });
        if (!resume) {
          return res.status(404).json({ message: "Resume not Found" });
        }
        resumeText = resume;
        title = resume.title;

      }
       
    }
    

    
    
      const systemText =`You are an advanced AI-powered resume parsing and ATS (Applicant Tracking System) evaluation specialist.Your task is to accurately analyze the given resume and generate a structured ATS evaluation.
            Carefully evaluate all sections of the resume, including:
        - Personal details (if present)
        - Professional summary
        - Education (degree, stream such as B.Tech CSE, etc.)
        - Skills (technical and soft skills)
        - Programming languages
        - Projects
        - Work experience

      Ensure high precision, maintain the original context, and normalize the analysis into a clean, structured format suitable for ATS systems.

      Do NOT make assumptions or fabricate missing information.

      TASK:

      1. Generate an ATS score out of 100 based on:
        - Keyword relevance
        - Content quality (action verbs, measurable impact)
        - Resume structure
        - Formatting and readability

      2. Provide concise, actionable suggestions.

      3. Provide improvements to weak content.

      4. Generate relevant interview questions based on:
        - skills
        - projects
        - experience
        - education (if applicable)

      RULES:

      - Be strict and realistic in scoring
      - Do NOT hallucinate
      - Do NOT assume missing data
      - Keep responses concise
      - Return ONLY valid JSON
      - Do NOT include explanations or extra text
            You are an advanced AI-powered resume parsing and information extraction specialist. Your task is to accurately extract structured data from a given resume, including personal details, professional summary, work experience, education, skills, and projects. Ensure high precision, maintain the original context, and normalize the output into a clean, well-organized format suitable for downstream processing and ATS systems. Avoid adding assumptions or fabrications, and return only the extracted structured data without any explanations or additional text`

    const userText = `Check the ats score from this resume:${resumeText}
     Provide data in the following JSON format with no additional text before or
     after, Return all metric scores as numbers between 0–100 (no % symbol),Return ONLY valid JSON. No comments, no trailing commas, no explanations.
     {
     metrics: {
        keywordsMatch:  0 ,
        readability: 0 ,
        formatting: 0 ,
        sections: 0 ,
      },
     ats: {
      score:  0 ,
      suggestions: [String],
      improvements: [String],
      interviewQuestions: [String],
      
    },
  }
    `;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemText,
        },
        {
          role: "user",
          content: userText,
        },
      ],
      response_format: { type: "json_object" },
    });

    const enchancedContent = response.choices[0].message.content;
    const parsedData = JSON.parse(enchancedContent);
    
    const atsResume = await AtsResume.create({
      title,
      resumeId: resumeId || null,
      ...parsedData,
      userId,
    });
    


    return res.status(200).json({ data:atsResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//

// GET: /api/ai/ats-check-resume


export const getAtsResume = async (req, res) => {
  try {
    const userId = req.userId;
    const atsResumes = await AtsResume.find({ userId }).sort({ createdAt: -1 });
    if (!atsResumes) {
      return res.status(404).json({ message: "No ATS evaluations found" });
    }
    return res.status(200).json({ resumes: atsResumes });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}


//DELETE: /api/ai/ats-check-resume/:resumeId

export const atsDeleteResume = async(req,res)=>{
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const atsResume = await AtsResume.findOneAndDelete({ _id: resumeId, 
      userId
     });

    if (!atsResume) {
      return res.status(404).json({ message: "ATS evaluation not found" });
    }

    return res.status(200).json({ message: "ATS evaluation deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
