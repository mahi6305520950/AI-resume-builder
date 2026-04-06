import imageKit from "../configs/imageKit.js";
import Resume from "../model/resume.js";
import fs from "fs"


//POST /api/resumes/create

export const createResume = async (req, res) => {
  try {
    const userId = req.userId; //come's from middleware
    const {title}=req.body
    //create new resume

    const newResume = await Resume.create({ userId, title });

    return res
      .status(201)
      .json({ resume: newResume, message: "Resume created Successfull" });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



//delete Resume
//DELETE : /api/resumes/delete

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId; //come's from middleware
    const { resumeId } = req.params;
    //delete 

     await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res
      .status(200)
      .json({ message: "Resume deleted Successfull" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


//getting resume By Id
//GET :/api/resumes/get

export const getResume = async (req, res) => {
  try {
    const userId = req.userId; //come's from middleware
    const { resumeId } = req.params;
    //get
    


    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume){
        return res.status(404).json({ message:"Resume not Found" });
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
        return res.status(200).json({ resume });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//getting resume public
//GET :/api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    //const userID = req.userId; //come's from middleware
    const { resumeId } = req.params;
    //delete

    const resume=await Resume.findOne({ public:true, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not Found" });
    }

    return res.status(200).json({resume});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



//updating ther resume
//PUT:/api/resumes/update

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId; //come's from middleware
    const { resumeId, resumeData, removeBackground } = req.body;
    const image=req.file
    let copyOfResume;
    if(typeof resumeData === 'string' ){
    copyOfResume = await JSON.parse(resumeData);
    }else{
      copyOfResume = structuredClone(resumeData);
    }
 

    if(image){
      const imageBufferData = fs.createReadStream(image.path);
        const response = await imageKit.files.upload({
          file: imageBufferData,
          fileName: "resume.png",
          folder: "user-resumes",
          transformation: {
            pre: "w-300, h-300, fo-face, z-0.75" + (removeBackground?",e-bgremove":"")
          },
        });

        copyOfResume.personal_info.image = response.url;
    }


    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: copyOfResume },
      { returnDocument: "after" },
    );

    return res.status(200).json({ resume,message:"Updated successFull"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

