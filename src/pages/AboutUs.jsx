import React, { useState } from "react";
import AnimatedWave from "../components/AnimatedWave";
import NavbarWrapper from "../components/NavbarWrapper";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: "0",
    margin: "0",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1200px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: "-80px", // To overlap with the AnimatedWave
  },
  header: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    fontSize: "2em",
    fontWeight: "bold",
  },
  contentContainer: {
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  section: {
    margin: "20px 0",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "2em",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  sectionSubtitle: {
    fontSize: "1.2em",
    color: "#555",
  },
  videoSection: {
    textAlign: "center",
    marginTop: "40px",
    position: "relative",
  },
  videoContainer: {
    position: "relative",
    display: "inline-block",
    width: "100%",
    maxWidth: "600px",
  },
  videoImage: {
    width: "100%",
    borderRadius: "8px",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    padding: "15px",
    cursor: "pointer",
    fontSize: "1.5em",
    transition: "background-color 0.3s ease",
  },
  playButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  benefitsSection: {
    textAlign: "center",
    marginTop: "40px",
  },
  benefitsTitle: {
    fontSize: "2em",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  benefitsContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
  },
  benefit: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    flex: "1 1 30%",
    minWidth: "250px",
    marginBottom: "20px",
  },
  benefitIcon: {
    width: "60px",
    height: "60px",
    marginBottom: "10px",
  },
  callToAction: {
    marginTop: "40px",
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "15px 30px",
    borderRadius: "5px",
    fontSize: "1.2em",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
  ctaButtonHover: {
    backgroundColor: "#388E3C",
  },
};

function AboutUs() {
  const [isHover, setIsHover] = useState(false);

  return (
    <div style={styles.app}>
      <NavbarWrapper />
      <AnimatedWave />
      <div style={styles.container}>
        <div style={styles.header}>About Us</div>
        <div style={styles.contentContainer}>
          <Typography style={styles.sectionTitle}>Who We Are</Typography>
          <Typography style={styles.sectionSubtitle}>
            At Mann Ko Bhawana, we are dedicated to transforming mental health
            through innovative and compassionate care. With over 10 years of
            experience, we have empowered thousands of individuals on their
            journey to well-being.
          </Typography>
          
          <div style={styles.section}>
            <Typography style={styles.sectionTitle}>Our Achievements</Typography>
            <Typography style={styles.sectionSubtitle}>
              <strong>10+</strong> Years of Experience
              <br />
              <strong>7000+</strong> Empowered Clients
              <br />
              <strong>150+</strong> Expert Collaborations
            </Typography>
          </div>

          <div style={styles.videoSection}>
            <div style={styles.videoContainer}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/W1pIfKXbOkE"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '8px' }}
              />
            </div>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Welcome to Mann Ko Bhawana. Join us on our transformative journey
              towards lasting peace.
            </Typography>
          </div>

          <div style={styles.benefitsSection}>
            <Typography style={styles.benefitsTitle}>
              What Will You Get?
            </Typography>
            <div style={styles.benefitsContainer}>
              <Paper style={styles.benefit}>
                <img
                  src="path/to/icon1.png"
                  alt="Improved Mental Health"
                  style={styles.benefitIcon}
                />
                <Typography variant="h6">Improved Mental Health</Typography>
                <Typography>
                  Experience improved mental health with our award-winning
                  support.
                </Typography>
              </Paper>
              <Paper style={styles.benefit}>
                <img
                  src="path/to/icon2.png"
                  alt="Better Personal Relations"
                  style={styles.benefitIcon}
                />
                <Typography variant="h6">Better Personal Relations</Typography>
                <Typography>
                  You will experience improved personal relationships through
                  accessible and effective mental health support.
                </Typography>
              </Paper>
              <Paper style={styles.benefit}>
                <img
                  src="path/to/icon3.png"
                  alt="Enhanced Productivity"
                  style={styles.benefitIcon}
                />
                <Typography variant="h6">Enhanced Productivity</Typography>
                <Typography>
                  Boost your productivity by experiencing effective and
                  personalized mental health support.
                </Typography>
              </Paper>
            </div>
          </div>

          <div style={styles.callToAction}>
            <a
              href="/contact-us"
              style={styles.ctaButton}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
