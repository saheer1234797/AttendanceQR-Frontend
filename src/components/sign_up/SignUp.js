// import './SignUp.css';
// import axios from 'axios';
// import Endpoint from '../../apis/Endpoint';
// import { toast,ToastContainer } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// function SignUp(){

//   const[state,setstate]=useState({
//     name:"",
//     email:"",
//   password:"",
//     role:"",
//   rollNumber:""
//   });
// const[isLoading,setIsloading]=useState(false);
// const handleSubmit=async(event)=>{
//   try{
//     event.preventDefault();
//     setIsloading(true);
//     let response=await axios.post(Endpoint.SignUp,state);
//     toast.success(response.data.message);
//     setstate({
//         name:"",
//     email:"",
//   password:"",
//     role:"",
//   rollNumber:""

//     });
//   }
//   catch(err){
//     console.log(err);
//     toast.error("Oops! something went wrong..");
//   }
//   setIsloading(false);
// }

//     return <>
//     <ToastContainer/>

//      <div className="parent d-flex justify-content-center align-items-center">
//       <div className="parent-card p-2 bg-white shadow rounded">
//       <h3 className='d-flex  justify-content-center align-items-center'> QR Attend</h3>
//         <h5 className="text-center text-muted mb-4">Create Account</h5>
//         <form onSubmit={handleSubmit} >
//           <div className="mb-2">
//             <label className="form-label">Full Name</label>
//             <input defaultValue={state.name} onChange={(event)=>setstate({...state,name:event.target.value})} type="text" className="form-control" placeholder="Enter your full name" required />
//           </div>

//           <div className="mb-2">
//             <label className="form-label">Email</label>
//             <input  defaultValue={state.email} onChange={(event)=>setstate({...state,email:event.target.value})} type="email" className="form-control" placeholder="Enter your email" required />
//           </div>

//           <div className="mb-2">
//             <label className="form-label">Role</label>
//             <select  defaultValue={state.role} onChange={(event)=>setstate({...state,role:event.target.value})} className="form-select" required>
//               <option value="">Select your role</option>
//               <option value="Student">Student</option>
//               <option value="Teacher">Teacher</option>
//             </select>
//           </div>

//           <div className="mb-2">
//             <label className="form-label">Password</label>
//             <input  defaultValue={state.password} onChange={(event)=>setstate({...state,password:event.target.value})}  type="password" className="form-control" placeholder="Enter your password" required />
//           </div>

//           <div className="mb-2">
//             <label className="form-label">rollNumber</label>
//             <input  defaultValue={state.rollNumber} onChange={(event)=>setstate({...state,rollNumber:event.target.value})} type="text" className="form-control" placeholder="Enter your Rollnumber  " required />
//           </div>

//           <div className="d-grid mt-3">
//             <button type="submit" className="btn btn-primary">Create Account</button>
//           </div>

//           <p className="text-center mt-2">
//             Already have an account? <a href="/login">Login</a>
//           </p>
//         </form>
//       </div>
//     </div>
//     </>
// }
// export default SignUp;


import './SignUp.css';
import axios from 'axios';
import EndPoint from '../../apis/Endpoint';
import { toast, ToastContainer } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';


function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    rollNumber: ""
  });
  const navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //add something ok
    const userRole=localStorage.getItem("role");
     if (state.role !== "student" && state.role !== "teacher") {
    toast.error("Please select a valid role.");
    return;
  }

  if (userRole !== "admin") {
    toast.error("Only Admin can create new accounts. Please login as Admin.");
    return;
  }

    //end 
    setIsLoading(true);
    try {
      const response = await axios.post(EndPoint.SignUp, state,{
        
           withCredentials: true,
        
      });
      toast.success(response.data.message);
   setTimeout(() => {
  navigate("/login");
}, 1500);

      // Reset form
      setState({
        name: "",
        email: "",
        password: "",
        role: "",
        rollNumber: ""
      });
    } catch (err) {
      console.error("ye erro  hai ====      "+err);
      toast.error("Oops! Something went wrong..");
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="parent d-flex justify-content-center align-items-center">
        <div className="parent-card p-2 bg-white shadow rounded">
          <h3 className='text-center'>QR Attend</h3>
          <h5 className="text-center text-muted mb-4">Create Account</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Full Name</label>
              <input
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Role</label>
              <select
                value={state.role}
                onChange={(e) => setState({ ...state, role: e.target.value })}
                className="form-select"
                required
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                value={state.password}
                onChange={(e) => setState({ ...state, password: e.target.value })}
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Roll Number</label>
              <input
                value={state.rollNumber}
                onChange={(e) => setState({ ...state, rollNumber: e.target.value })}
                type="text"
                className="form-control"
                placeholder="Enter your Roll Number"
                // required
              />
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Account"}
              </button>
            </div>

            <p className="text-center mt-2">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;

