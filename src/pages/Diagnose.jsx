import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitQuestionnaire } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";
import rec from "../images/Rectangle 258.png";
import empathy from "../images/empathy.jpg";
import long from "../images/long.png";
import therapy from "../images/therapy.png";

const questions = [
  {
    id: 1,
    questionText:
      "In the past 4 weeks, about how often did you feel tired out for no good reason?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
  {
    id: 2,
    questionText: "In the past 4 weeks, about how often did you feel nervous?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
  {
    id: 3,
    questionText:
      "In the past 4 weeks, about how often did you feel so nervous that nothing could calm you down?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
  {
    id: 4,
    questionText: "In the past 4 weeks, about how often did you feel hopeless?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
  {
    id: 5,
    questionText:
      "In the past 4 weeks, about how often did you feel restless or fidgety?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
  {
    id: 6,
    questionText:
      "In the past 4 weeks, about how often did you feel so restless you could not sit still?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
  {
    id: 7,
    questionText:
      "In the past 4 weeks, about how often did you feel depressed?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
  {
    id: 8,
    questionText:
      "In the past 4 weeks, about how often did you feel that everything was an effort?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
  {
    id: 9,
    questionText:
      "In the past 4 weeks, about how often did you feel so sad that nothing could cheer you up?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
  {
    id: 10,
    questionText:
      "In the past 4 weeks, about how often did you feel worthless?",
    options: [
      { text: "None of the time", points: 1 },
      { text: "A little of the time", points: 2 },
      { text: "Some of the time", points: 3 },
      { text: "Most of the time", points: 4 },
      { text: "All of the time", points: 5 },
    ],
  },
];

const QUESTIONS_PER_PAGE = 1;

const QuestionnairePage = () => {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handleChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit = async () => {
    const answersArray = Object.keys(answers).map((questionId) => ({
      questionId,
      points: answers[questionId].points,
    }));
    try {
      const { resultId, totalScore } = await submitQuestionnaire(answersArray);
      localStorage.setItem("resultId", resultId);
      navigate("/diagnose/result", { state: { resultId, totalScore } });
    } catch (error) {
      console.error("Error submitting questionnaire", error);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderQuestions = () => {
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    return questions.slice(startIndex, endIndex).map((question) => (
      <div key={question.id} className="question-container">
        <h3>{question.questionText}</h3>
        <div className="options-container">
          {question.options.map((option) => (
            <label key={option.points} className="option-label">
              <input
                type="checkbox"
                name={`question-${question.id}`}
                value={option.points}
                checked={answers[question.id] === option}
                onChange={() => handleChange(question.id, option)}
              />
              {option.text}
            </label>
          ))}
        </div>
      </div>
    ));
  };

  const progress = (
    (Object.keys(answers).length / questions.length) *
    100
  ).toFixed(0);

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
        K10 Assessment
      </Typography>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">{progress}%</span>
      </div>

      {renderQuestions()}
      <div className="navigation-buttons">
        {currentPage > 0 && <button onClick={previousPage}>Previous</button>}
        {currentPage < Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1 && (
          <button onClick={nextPage}>Next</button>
        )}
        {currentPage ===
          Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
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
        .questionnaire-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .progress-bar-container {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .progress-bar {
          height: 10px;
          background-color: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
          flex: 1;
          margin: 10px 30px;
        }
        .progress {
          height: 100%;
          background-color: #007bff;
          transition: width 0.3s;
        }
        .progress-text {
          font-size: 20px;
          font-weight: bold;
          margin-right: 20px;
          color: #3973e1;
        }
        .question-container {
          margin: 0 40px 0px 40px; /* Only bottom and sides */
          padding: 10px;
          border: 0.5px solid #ddd;
          border-radius: 10px;
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .question-container h3 {
          font-size: 18px; /* Smaller question text */
        }
        .options-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
        }
        .option-label {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          transition: background-color 0.3s, border-color 0.3s;
          flex: 1 1 48%;
          border-radius: 10px;
          width: "40%"; // Set the width to 50%
        }
        .option-label:hover {
          background-color: #b2d5f5;
        }
        .option-label input {
          margin-right: 10px;
        }
        .navigation-buttons {
          display: flex;
          justify-content: center; /* Center the button */
          margin-top: 20px;
        }
        button {
          align: center;
          padding: 7px 20px;
          border: 1px solid black;
          background-color: transparent;
          color: #000;
          margin-right: 10px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-size: 14px;
        }
        button:hover {
          background-color: #b2d5f5;
          color: white;
          border: none;
        }
        .additional-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 40px 30px;
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
    marginTop: "-55px",
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

export default QuestionnairePage;
