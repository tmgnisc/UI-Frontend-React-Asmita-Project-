// import { Typography } from "@mui/material";
// import axios from "axios";
// import { Chart } from "chart.js";
// import React, { useEffect, useState } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { getUserResultsApi } from "../apis/Api";
// import AnimatedWave from "../components/AnimatedWave";

// const centerTextPlugin = {
//   id: "centerText",
//   beforeDraw: function (chart) {
//     if (chart.config.options.elements.center) {
//       const ctx = chart.ctx;
//       const centerConfig = chart.config.options.elements.center;
//       const fontStyle = centerConfig.fontStyle || "Arial";
//       const txt = centerConfig.text;
//       const color = centerConfig.color || "#000";
//       const sidePadding = centerConfig.sidePadding || 20;
//       const sidePaddingCalculated =
//         (sidePadding / 100) * (chart.innerRadius * 2);
//       ctx.font = "30px " + fontStyle;

//       const stringWidth = ctx.measureText(txt).width;
//       const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

//       const widthRatio = elementWidth / stringWidth;
//       const newFontSize = Math.min(
//         Math.floor(30 * widthRatio),
//         chart.innerRadius * 2
//       );
//       const fontSizeToUse = Math.max(newFontSize, centerConfig.minFontSize);
//       const lineHeight = centerConfig.lineHeight || 25;
//       const wrapText = newFontSize < centerConfig.minFontSize;

//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.font = fontSizeToUse + "px " + fontStyle;
//       ctx.fillStyle = color;

//       const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
//       const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

//       if (!wrapText) {
//         ctx.fillText(txt, centerX, centerY);
//         return;
//       }

//       const words = txt.split(" ");
//       let line = "";
//       const lines = [];

//       for (let n = 0; n < words.length; n++) {
//         const testLine = line + words[n] + " ";
//         const metrics = ctx.measureText(testLine);
//         const testWidth = metrics.width;
//         if (testWidth > elementWidth && n > 0) {
//           lines.push(line);
//           line = words[n] + " ";
//         } else {
//           line = testLine;
//         }
//       }
//       lines.push(line);

//       let lineY = centerY - (lines.length / 2) * lineHeight;
//       for (let k = 0; k < lines.length; k++) {
//         ctx.fillText(lines[k], centerX, lineY);
//         lineY += lineHeight;
//       }
//     }
//   },
// };

// Chart.register(centerTextPlugin);

// const ProfilePage = () => {
//   const [profile, setProfile] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     userImageUrl: "",
//   });
//   const [results, setResults] = useState([]);
//   const [totalScore, setTotalScore] = useState(0);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const userId = user._id;

//         const response = await axios.get(
//           `http://localhost:5000/api/user/${userId}`
//         );
//         setProfile(response.data.product);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfile();
//     const fetchProfileAndResults = async () => {
//       try {
//         // Fetch user results
//         const user = JSON.parse(localStorage.getItem("user"));
//         const userId = user._id;
//         const resultsResponse = await getUserResultsApi(userId);
//         setResults(resultsResponse.data);

//         // Calculate total score
//         const total = resultsResponse.data.reduce(
//           (acc, result) => acc + result.totalScore,
//           0
//         );
//         setTotalScore(total);
//       } catch (error) {
//         console.error("Error fetching profile and results data:", error);
//       }
//     };

//     fetchProfileAndResults();
//   }, []);

//   const getBackgroundColor = (score) => {
//     if (score >= 0 && score <= 19) return ["#D2E58D", "#ffffff"]; // Green
//     if (score >= 20 && score <= 29) return ["#F8E98C", "#ffffff"]; // Yellow
//     if (score >= 30 && score <= 50) return ["#E57373", "#ffffff"]; // Red
//     return ["#ffffff", "#ffffff"];
//   };

//   const data = {
//     datasets: [
//       {
//         data: [totalScore, 50 - totalScore], // Adjust according to your data
//         backgroundColor: getBackgroundColor(totalScore),
//         hoverBackgroundColor: getBackgroundColor(totalScore),
//         borderRadius: 20, // Curve the ends
//       },
//     ],
//   };

//   const options = {
//     cutout: "50%",
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             return tooltipItem.label + ": " + tooltipItem.raw;
//           },
//         },
//       },
//     },
//     elements: {
//       center: {
//         text: totalScore.toString(),
//         color: "#000000",
//         fontStyle: "Arial",
//         sidePadding: 20,
//         minFontSize: 20,
//         lineHeight: 25,
//       },
//     },
//   };

//   return (
//     <div>
//       <AnimatedWave />
//       <Typography
//         id="fixed-heading"
//         variant="h4"
//         component="div"
//         style={{
//           position: "absolute",
//           top: "20%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           fontWeight: "bold",
//           color: "white",
//         }}
//       >
//         Profile
//       </Typography>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "20px",
//           maxWidth: "1200px",
//           margin: "0 auto",
//         }}
//       >
//         <div
//           style={{
//             flex: "1",
//             marginRight: "20px",
//             textAlign: "center",
//             padding: "20px",
//             background: "#f9f9f9",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <img
//             src={profile.userImageUrl || "default-avatar.png"}
//             alt="Avatar"
//             style={{
//               width: "100px",
//               height: "100px",
//               borderRadius: "50%",
//               marginBottom: "20px",
//             }}
//           />
//           <div>
//             <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
//               {profile.firstName} {profile.lastName}
//             </h2>
//             <p style={{ fontSize: "18px", color: "#555" }}>
//               <strong>Email:</strong> {profile.email}
//             </p>
//             <button
//               style={{
//                 display: "block",
//                 marginTop: "10px",
//                 padding: "10px 20px",
//                 border: "none",
//                 borderRadius: "5px",
//                 backgroundColor: "#36a2eb",
//                 color: "white",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s",
//               }}
//             >
//               Change Password
//             </button>
//           </div>
//         </div>
//         <div
//           style={{
//             flex: "1",
//             textAlign: "center",
//             padding: "20px",
//             background: "#fff",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <h3 style={{ marginBottom: "10px", fontSize: "20px", color: "#333" }}>
//             Your Diagnostic Score
//           </h3>
//           <Doughnut
//             data={data}
//             options={options}
//             width={150}
//             height={150}
//             style={{ margin: "0 auto" }}
//           />
//           <div style={{ marginTop: "20px" }}>
//             <button
//               style={{
//                 display: "inline-block",
//                 marginRight: "10px",
//                 padding: "10px 20px",
//                 border: "none",
//                 borderRadius: "5px",
//                 backgroundColor: "#36a2eb",
//                 color: "white",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s",
//               }}
//             >
//               Diagnose
//             </button>
//             <button
//               style={{
//                 display: "inline-block",
//                 padding: "10px 20px",
//                 border: "none",
//                 borderRadius: "5px",
//                 backgroundColor: "#36a2eb",
//                 color: "white",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s",
//               }}
//             >
//               My Bookings
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import axios from "axios";
import { Chart } from "chart.js";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getUserResultsApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";
import avatar from "../images/avatar.jpg";

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      const ctx = chart.ctx;
      const centerConfig = chart.config.options.elements.center;
      const fontStyle = centerConfig.fontStyle || "Arial";
      const txt = centerConfig.text;
      const color = centerConfig.color || "#000";
      const sidePadding = centerConfig.sidePadding || 20;
      const sidePaddingCalculated =
        (sidePadding / 100) * (chart.innerRadius * 2);
      ctx.font = "30px " + fontStyle;

      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.min(
        Math.floor(30 * widthRatio),
        chart.innerRadius * 2
      );
      const fontSizeToUse = Math.max(newFontSize, centerConfig.minFontSize);
      const lineHeight = centerConfig.lineHeight || 25;
      const wrapText = newFontSize < centerConfig.minFontSize;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      const words = txt.split(" ");
      let line = "";
      const lines = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      let lineY = centerY - (lines.length / 2) * lineHeight;
      for (let k = 0; k < lines.length; k++) {
        ctx.fillText(lines[k], centerX, lineY);
        lineY += lineHeight;
      }
    }
  },
};

Chart.register(centerTextPlugin);

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userImageUrl: "",
  });
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;

        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setProfile(response.data.product);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
    const fetchProfileAndResults = async () => {
      try {
        // Fetch user results
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        const resultsResponse = await getUserResultsApi(userId);
        setResults(resultsResponse.data);

        // Calculate total score
        const total = resultsResponse.data.reduce(
          (acc, result) => acc + result.totalScore,
          0
        );
        setTotalScore(total);
      } catch (error) {
        console.error("Error fetching profile and results data:", error);
      }
    };

    fetchProfileAndResults();
  }, []);

  const getBackgroundColor = (score) => {
    if (score >= 0 && score <= 19) return ["#D2E58D", "#ffffff"]; // Green
    if (score >= 20 && score <= 29) return ["#F8E98C", "#ffffff"]; // Yellow
    if (score >= 30 && score <= 50) return ["#E57373", "#ffffff"]; // Red
    return ["#ffffff", "#ffffff"];
  };

  const data = {
    datasets: [
      {
        data: [totalScore, 50 - totalScore], // Adjust according to your data
        backgroundColor: getBackgroundColor(totalScore),
        hoverBackgroundColor: getBackgroundColor(totalScore),
        borderRadius: 20, // Curve the ends
      },
    ],
  };

  const options = {
    cutout: "50%",
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
    elements: {
      center: {
        text: totalScore.toString(),
        color: "#000000",
        fontStyle: "Arial",
        sidePadding: 20,
        minFontSize: 20,
        lineHeight: 25,
      },
    },
  };

  return (
    <div>
      <AnimatedWave />
      <div className="profile-container">
        <div className="profile-info">
          <div className="avatar-container">
            <img
              src={profile.userImageUrl || avatar}
              alt="Avatar"
              className="profile-avatar"
            />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="profile-email">
              <strong>Email:</strong> {profile.email}
            </p>
            <button className="update-button">Update</button>
          </div>
        </div>
        <div className="profile-score">
          <h3>Your Diagnostic Score</h3>
          <Doughnut data={data} options={options} width={50} height={50} />
          <div className="profile-score-buttons">
            <button className="profile-button">Diagnose</button>
            <button className="profile-button">My Bookings</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .profile-container {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .profile-info {
          flex: 1;
          margin-right: 20px;
          text-align: left;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: visible;
        }

        .avatar-container {
          background: black;
          border-radius: 50%;
          padding: 5px;
          margin-bottom: 20px;
          text-align: center;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid white;
        }

        .profile-details {
          text-align: center;
        }

        .profile-name {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .profile-email {
          font-size: 18px;
          color: #555;
        }

        .update-button {
          display: block;
          margin: 10px auto;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #36a2eb;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .profile-score {
          flex: 1;
          text-align: center;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-top: 20px; /* Add margin for small screens */
        }

        .profile-score-buttons {
          margin-top: 20px;
        }

        .profile-button {
          display: inline-block;
          margin-right: 10px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #36a2eb;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        @media (max-width: 768px) {
          .profile-container {
            flex-direction: column;
            align-items: center;
          }

          .profile-info,
          .profile-score {
            margin-right: 0;
            width: 100%;
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
