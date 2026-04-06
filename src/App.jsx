import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBulder from "./pages/ResumeBulder";
import Preview from "./pages/Preview"
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";
import { useEffect } from "react";
import {Toaster} from "react-hot-toast"
import Ats from "./pages/Ats";


function App() {
  
    const dispatch=useDispatch()

    const getUserData=async()=>{
      const token=localStorage.getItem("token")
      try {
        if(token){
          const { data } = await api.get("/api/users/data", {
            headers: { Authorization :token},
          });
          if(data.user){
            dispatch(login({ token, user: data.user }));
          }
          dispatch(setLoading(false))
        }else{
          dispatch(setLoading(false));
        }
        
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error.message);
        
      }

    }
    useEffect(()=>{
      getUserData()
    },[])

  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route exact path="builder/:resumeId" element={<ResumeBulder />} />
        </Route>
        <Route exact path="view/:resumeId" element={<Preview />} />
        <Route path="ats-resume" element={<Ats />} />
        <Route path="ats-resume/:resumeId" element={<Ats />} />
        {/* <Route exact path="login" element={<Login />} /> */}
      </Routes>
    </>
  );
}

export default App
