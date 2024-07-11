// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Import Link from 'react-router-dom'
// import { toast } from "react-toastify";
// import { loginApi, loginCounselorApi } from "../apis/Api";
// import AnimatedWave from "../components/AnimatedWave";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const changeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const changePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(email, password);

//     const data = {
//       email: email,
//       password: password,
//     };

//     try {
//       const res = await loginApi(data);
//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.userData));
//         navigate("/home");
//       }
//     } catch (err) {
//       toast.error("Server error");
//     }
//   };

//   return (
//     <div className="wave-section">
//       <AnimatedWave />
//       <div
//         className=" form-container d-flex justify-content-center align-items-center  border rounded"
//         style={{ minHeight: "70vh", backgroundColor: "#ffffff" }}
//       >
//         <div
//           className="border rounded p-4"
//           style={{
//             width: "100%",
//             maxWidth: "400px",
//             backgroundColor: "#ffccc",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//           }}
//         >
//           <h2 className="text-center mb-3 " style={{ color: "#3586ff" }}>
//             Hey! Log In to your account
//           </h2>
//           <form>
//             <div className="mb-3">
//               <label>Email</label>
//               <input
//                 onChange={changeEmail}
//                 className="form-control"
//                 type="email"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div className="mb-3">
//               <label>Password</label>
//               <input
//                 onChange={changePassword}
//                 className="form-control"
//                 type="password"
//                 placeholder="Enter your password"
//               />
//               {/* Add Forgot Password Link */}
//               <div className="text-end mt-2">
//                 <Link to="/forgot-password" className="text-decoration-none">
//                   Forgot Password?
//                 </Link>
//               </div>
//             </div>
//             <button
//               onClick={handleSubmit}
//               className=" custom-button border rounded btn w-100"
//               style={{
//                 color: "black",
//                 border: " 6px solid black",
//                 width: "50%",
//               }}
//             >
//               Login
//             </button>
//             <div className="text-center mt-2">
//               New to the application?{" "}
//               <Link to="/register" className="text-decoration-none">
//                 Register
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true); // Set to true by default
  const navigate = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await loginApi(data);
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
        } else {
          sessionStorage.setItem("token", res.data.token);
        }
        localStorage.setItem("user", JSON.stringify(res.data.userData));
        navigate("/home");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="wave-section">
      <AnimatedWave />
      <div
        className="form-container d-flex justify-content-center align-items-center border rounded"
        style={{ minHeight: "70vh", backgroundColor: "#ffffff" }}
      >
        <div
          className="border rounded p-4"
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#ffccc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2 className="text-center mb-3" style={{ color: "#3586ff" }}>
            Hey! Log In to your account
          </h2>
          <form>
            <div className="mb-3">
              <label>Email</label>
              <input
                onChange={changeEmail}
                className="form-control"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                onChange={changePassword}
                className="form-control"
                type="password"
                placeholder="Enter your password"
              />
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={changeRememberMe}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="custom-button border rounded btn w-100"
              style={{
                color: "black",
                border: "6px solid black",
                width: "50%",
              }}
            >
              Login
            </button>
            <div className="text-center mt-2">
              New to the application?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
