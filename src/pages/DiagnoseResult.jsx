
import { Typography } from "@mui/material";
import { Chart } from "chart.js";
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import AnimatedWave from "../components/AnimatedWave";
import rec from "../images/Rectangle 258.png";
import empathy from "../images/empathy.jpg";
import long from "../images/long.png";
import therapy from "../images/therapy.png";

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

const ResultPage = () => {
  const location = useLocation();
  const { resultId, totalScore, user } = location.state || {
    resultId: "",
    totalScore: 0,
    user: {},
  };
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = totalScore;
    if (start === end) return;

    let totalMilSecDur = 1000; // Total animation duration
    let incrementTime = (totalMilSecDur / end) * 2; // Adjusting the speed

    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [totalScore]);

  const getBackgroundColor = (score) => {
    if (score >= 0 && score <= 19) return ["#D2E58D", "#ffffff"]; // Green
    if (score >= 20 && score <= 29) return ["#F8E98C", "#ffffff"]; // Yellow
    if (score >= 30 && score <= 50) return ["#E57373", "#ffffff"]; // Red
    return ["#ffffff", "#ffffff"];
  };

  const data = {
    datasets: [
      {
        data: [animatedScore, 50 - animatedScore],
        backgroundColor: getBackgroundColor(animatedScore),
        hoverBackgroundColor: getBackgroundColor(animatedScore),
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
        text: animatedScore.toString(),
        color: "#000000", // Default is #000000
        fontStyle: "Arial", // Default is Arial
        sidePadding: 20, // Default is 20 (as a percentage)
        minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
        lineHeight: 25, // Default is 25 (in px), used for wrapping.
      },
    },
  };

  return (
    <div>
      <AnimatedWave />
      <Typography
        id="fixed-heading"
        variant="h4"
        component="div"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          color: "white",
        }}
      >
        K10 Assessment Result
      </Typography>
      <div style={{ margin: "0 30px" }}>
        <p className="score-text">
          Based on your score of <strong>{totalScore}</strong>, here's what it
          means for your psychological distress level:
        </p>

        <div className="chart-container">
          <Doughnut
            data={data}
            options={options}
            className="custom-doughnut-chart"
          />
        </div>
        <div className="score-explanation">
          <p>
            <strong>10–19:</strong> You are likely to be well. Maintain your
            current habits and continue to take care of your mental health.
          </p>
          <p>
            <strong>20–24:</strong> You may have a mild mental disorder. It
            might be helpful to monitor your mental health and consider talking
            to a healthcare provider if symptoms persist.
          </p>
          <p>
            <strong>25–29:</strong> You may have a moderate mental disorder.
            Seeking advice from a mental health professional for further
            evaluation and support is recommended.
          </p>
          <p>
            <strong>30–50:</strong> You may have a severe mental disorder. It is
            important to seek help from a mental health professional as soon as
            possible.
          </p>
        </div>
      </div>

      <div className="additional-info">
        <div style={styles.container}>
          <div style={styles.imageSection}>
            <div style={styles.imageWrapper}>
              <img
                src={therapy}
                alt="Mental Health Assessment"
                style={styles.wellnessImage}
              />
            </div>
          </div>
          <div style={styles.textSection}>
            <h2 style={styles.textSectionH1}>
              Accuracy of Mental Health Assessment
            </h2>
            <p style={styles.textSectionP}>
              The accuracy of an Assessment can depend on several factors,
              including the honesty and accuracy of the responses provided by
              the user, and the individual’s current state of mental health.
              It’s essential to note that an Assessment is not a substitute for
              a formal diagnosis.
            </p>
            <p style={styles.textSectionP}>
              In this context, the assessment uses the{" "}
              <strong>Kessler Psychological Distress Scale (K10)</strong> to
              measure general psychological distress. The K10 is a valuable tool
              for providing an initial indication of distress levels, but it
              does not diagnose specific mental health conditions. High scores
              on the K10 suggest the need for further evaluation by a mental
              health professional to identify and address specific issues.
            </p>
            <p style={styles.textSectionP}>
              Regular self-assessment can be a useful part of managing mental
              health, but it should be complemented by professional support and
              guidance.
            </p>
          </div>
        </div>
      </div>

      <div style={styles.additionalInfoContainer}>
        <div style={styles.infoTextSection}>
          <h2 style={styles.textSectionH2}>Counseling Can Help You</h2>
          <p style={styles.textSectionP}>
            Taking small, consistent, and positive steps every day can make a
            big difference in effectively managing your mental health, & there's
            always hope for recovery. Remember, every journey starts with a
            single step.
          </p>
          <img src={long} alt="Group of people" style={styles.longImage} />
        </div>
        <div style={styles.infoImageSection}>
          <img src={rec} alt="Counseling" style={styles.infoImage} />
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.imageSection}>
          <div style={styles.imageWrapper}>
            <img src={empathy} alt="Wellness" style={styles.wellnessImage} />
            <div style={styles.imageCaption}>#Lets Grow Together</div>
          </div>
        </div>
        <div style={styles.textSection}>
          <h1 style={styles.textSectionH1}>
            Ready To Embark On The Journey Of Wellness?
          </h1>
          <p style={styles.textSectionP}>
            Start your mental transformation with our experienced counselors and
            therapists today. Get to be in your ultimate inner peace and lasting
            well-being with our programs, tailored specially to your health
            needs.
          </p>
          <button style={styles.getStartedBtn}>Get Started →</button>
        </div>
      </div>
      <style jsx>{`
        .score-text {
          font-size: 20px;
          margin: 5px 20px;
        }
        .user-info {
          font-size: 16px;
          margin: 5px 20px;
        }
        .score {
          font-weight: bold;
        }
        .custom-doughnut-chart {
          width: 150px !important;
          height: 150px !important;
        }

        .chart-container {
          margin: 10px auto -80px; /* Removed bottom margin */
          width: 250px;
          height: 250px;
        }

        .score-explanation {
          text-align: left;
          margin: 10px auto;
          max-width: 1180px;
        }
        .score-explanation p {
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    maxWidth: "1200px",
    margin: "20px auto", // Center the container with equal margins
  },
  textSection: {
    flex: 2.5,
    paddingLeft: "20px",
  },
  textSectionH2: {
    fontSize: "2rem",
    marginBottom: "20px",
    marginRight: "10px",

    textAlign: "right", // Indent the text to the right
  },
  textSectionH1: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  textSectionP: {
    fontSize: "1.1rem",
    marginBottom: "20px",
  },
  textSectionPa: {
    fontSize: "1.1rem",
    marginBottom: "20px",
  },
  getStartedBtn: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#000",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  imageSection: {
    flex: 1,
    textAlign: "center",
  },
  imageWrapper: {
    display: "inline-block",
    textAlign: "center",
  },
  wellnessImage: {
    width: "100%", // Reduce the size of the image
    borderRadius: "8px",
  },
  imageCaption: {
    backgroundColor: "#f7d072",
    padding: "10px 0",
    marginTop: "10px",
    borderRadius: "5px",
    fontSize: "1rem",
    width: "100%", // Match the width of the image
    textAlign: "center",
    margin: "0 auto",
  },
  waveSection: {
    position: "relative",
    paddingBottom: "50px",
  },
  additionalInfoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    maxWidth: "1200px",
    marginTop: "-50px",
    margin: "20px auto", // Center the container with equal margins
  },
  infoTextSection: {
    flex: 2.5,
    paddingRight: "20px",
  },
  infoImageSection: {
    flex: 1,
    textAlign: "center",
  },
  infoImage: {
    width: "100%",
    borderRadius: "8px",
  },
  longImage: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "20px",
  },
};

export default ResultPage;
