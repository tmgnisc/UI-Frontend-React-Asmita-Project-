import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllIssuesApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";
import empathy from "../images/empathy.jpg";

const IssueListPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getAllIssuesApi()
      .then((res) => {
        if (res.data.issues) {
          setIssues(res.data.issues);
        } else {
          toast.error("Failed to fetch issues.");
        }
      })
      .catch((error) => {
        console.error("Error fetching issues:", error);
        toast.error("Error fetching issues.");
      });

    const handleScroll = () => {
      const heading = document.getElementById("fixed-heading");
      const waveSection = document.querySelector(".wave-section");

      if (heading && waveSection) {
        if (window.scrollY > waveSection.offsetHeight) {
          heading.style.position = "relative";
          heading.style.top = "0";
          heading.style.transform = "translate(-50%, 0)";
        } else {
          heading.style.position = "fixed";
          heading.style.top = "25%";
          heading.style.transform = "translate(-50%, -50%)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
      maxWidth: "1200px",
      margin: "20px auto",
    },
    textSection: {
      textAlign: "center",
      padding: "0 20px",
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
      textAlign: "center",
      marginTop: "20px",
    },
    imageWrapper: {
      textAlign: "center",
    },
    wellnessImage: {
      width: "100%",
      maxWidth: "400px",
      borderRadius: "8px",
    },
    imageCaption: {
      backgroundColor: "#f7d072",
      padding: "10px 0",
      borderRadius: "5px",
      fontSize: "1rem",
      width: "100%",
      textAlign: "center",
      margin: "0 auto",
    },
    fixedHeading: {
      position: "absolute",
      top: "22%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontWeight: "bold",
      color: "white",
    },
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "15px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      overflow: "hidden",
      transition: "transform 0.3s ease",
      backgroundColor: "#fff",
    },
    cardImage: {
      width: "100%",
      height: "auto",
    },
    cardTextContainer: {
      padding: "20px",
      backgroundColor: "#f8f8f8",
      width: "100%",
      textAlign: "center",
    },
    cardText: {
      color: "#000000",
      fontSize: "16px",
    },
    cardLink: {
      textDecoration: "none",
      color: "#007bff",
      fontSize: "14px",
    },
    diagnoseSection: {
      textAlign: "center",
      margin: "20px 0",
    },
    diagnoseText: {
      fontSize: "1.2rem",
      marginRight: "10px",
    },
    diagnoseBtn: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",
      textDecoration: "none",
    },
    diagnoseBtnHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div>
      <AnimatedWave />
      <Typography
        id="fixed-heading"
        variant="h4"
        component="div"
        style={styles.fixedHeading}
      >
        Issues
      </Typography>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          {issues.map((issue) => (
            <Grid item xs={12} sm={6} md={4} key={issue._id}>
              <div style={styles.cardContainer}>
                <Link
                  to={`/issue/${issue._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardMedia
                    component="img"
                    image={issue.issueImageUrl || "/default-image.jpg"}
                    alt={issue.issueName}
                    style={styles.cardImage}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.02)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Link>
                <div style={styles.cardTextContainer}>
                  <Typography variant="body2" style={styles.cardText}>
                    {truncateText(issue.issueQuestion, 100)}{" "}
                    <Link to={`/issue/${issue._id}`} style={styles.cardLink}>
                      Learn More
                    </Link>
                  </Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <div style={styles.diagnoseSection}>
        <Typography style={styles.diagnoseText}>
          Unsure about the type of care you require?
        </Typography>
        <Link to="/diagnose" style={{ textDecoration: "none" }}>
          <Button
            style={styles.diagnoseBtn}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.diagnoseBtnHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.diagnoseBtn.backgroundColor)
            }
          >
            Diagnose
          </Button>
        </Link>
      </div>

      <div style={styles.container}>
        <div style={styles.textSection}>
          <Typography variant="h1" style={styles.textSectionH1}>
            Ready To Embark On The Journey Of Wellness?
          </Typography>
          <Typography variant="body1" style={styles.textSectionP}>
            Start your mental transformation with our experienced counselors and
            therapists today. Get to be in your ultimate inner peace and lasting
            well-being with our programs, tailored specially to your health
            needs.
          </Typography>
          <Button variant="outlined" style={styles.getStartedBtn}>
            Get Started →
          </Button>
        </div>
        <div style={styles.imageSection}>
          <div style={styles.imageWrapper}>
            <img src={empathy} alt="Wellness" style={styles.wellnessImage} />
            <div style={styles.imageCaption}>#Lets Grow Together</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueListPage;
