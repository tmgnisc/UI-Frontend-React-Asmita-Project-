import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleIssueApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";
import empathy from "../images/empathy.jpg";
import om from "../images/om.png";

const SingleIssue = () => {
  const [issue, setIssue] = useState(null);
  const { issueId } = useParams();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await getSingleIssueApi(issueId);
        setIssue(response.data.issue);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching issue details");
      }
    };

    fetchIssue();
    const handleScroll = () => {
      const heading = document.getElementById("fixed-heading");
      const waveSection = document.querySelector(".wave-section");

      if (window.scrollY > waveSection.offsetHeight) {
        heading.style.position = "relative";
        heading.style.top = "0";
        heading.style.transform = "translate(-50%, 0)";
      } else {
        heading.style.position = "fixed";
        heading.style.top = "25%";
        heading.style.transform = "translate(-50%, -50%)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [issueId]);

  if (!issue) {
    return <div>Loading...</div>;
  }

  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeVideoId = getYoutubeVideoId(issue.youtubeUrl);

  return (
    <div>
      <AnimatedWave />
      <Typography
        id="fixed-heading"
        variant="h4"
        component="div"
        style={styles.fixedHeading}
      >
        Details
      </Typography>
      <div style={styles.additionalInfoContainer}>
        <div style={styles.infoTextSection}>
          <h2 style={styles.textSectionH2}>{issue.issueName}</h2>
          <p>{issue.issueDescription}</p>

          <div style={styles.additionalContent}>
            <img src={om} alt="om image" style={styles.longImage} />
            <div style={styles.imageCaption}>{issue.stat}</div>
          </div>
        </div>
        <div style={styles.infoImageSection}>
          <img
            src={issue.issueImageUrl}
            alt="Counseling"
            style={styles.infoImage}
          />
        </div>
      </div>

      <div className="details-section" style={styles.detailsSection}>
        <h3 style={styles.sectionTitle}>What is it?</h3>
        <p style={styles.sectionText}>
          When experiencing depression, a person often feels sadness,
          hopelessness, and a loss of interest in activities they once enjoyed.
          They may also experience fatigue, difficulty concentrating, changes in
          appetite or sleep patterns, and feelings of worthlessness or excessive
          guilt.
        </p>
      </div>

      <div style={styles.youtubeVideoContainer}>
        {youtubeVideoId && (
          <div style={styles.videoBox}>
            <iframe
              className="iframe"
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video"
              style={styles.iframe}
            ></iframe>
          </div>
        )}
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
        .additional-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .long-image {
          width: 100%;
          max-width: 150px;
          height: auto;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .issue-image {
          max-width: 100%;
          height: auto;
        }

        .details-section {
          margin: 30px 15px;
        }

        .iframe {
          width: 100%;
          height: auto;
          max-height: 315px;
          border-radius: 5px;
        }

        @media (max-width: 768px) {
          .issue-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .infoTextSection,
          .infoImageSection {
            flex: none;
            margin: 0;
            width: 100%;
          }

          .infoImageSection {
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    maxWidth: "1200px",
    margin: "20px auto", // Center the container with equal margins
  },
  textSection: {
    textAlign: "center",
    padding: "10px",
  },
  textSectionH2: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  textSectionH1: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  textSectionP: {
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  imageWrapper: {
    display: "inline-block",
    textAlign: "center",
  },
  wellnessImage: {
    width: "100%",
    borderRadius: "8px",
  },
  imageCaption: {
    backgroundColor: "#f7d072",
    padding: "10px 0",
    borderRadius: "5px",
    fontSize: "1rem",
    width: "100%",
    textAlign: "center",
    margin: "10px auto",
  },
  additionalInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    maxWidth: "1200px",
    margin: "20px auto", // Center the container with equal margins
  },
  infoTextSection: {
    flex: 1,
    padding: "10px",
    textAlign: "center",
  },
  infoImageSection: {
    flex: 1,
    textAlign: "center",
  },
  youtubeVideoContainer: {
    margin: "20px auto",
    padding: "10px",
    maxWidth: "800px",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  videoBox: {
    position: "relative",
    paddingBottom: "56.25%",
    height: "0",
    overflow: "hidden",
    maxWidth: "100%",
    borderRadius: "5px",
  },
  iframe: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "5px",
  },
  fixedHeading: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    color: "white",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    textAlign: "center",
  },
  sectionText: {
    fontSize: "1rem",
    textAlign: "justify",
  },
};

export default SingleIssue;
