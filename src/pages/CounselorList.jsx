import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import empathy from "../images/empathy.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCounselorsApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";

const CounselorListPage = () => {
  const [counselors, setCounselors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllCounselorsApi()
      .then((res) => {
        if (res.data.counselors) {
          setCounselors(res.data.counselors);
        } else {
          toast.error("Failed to fetch counselors.");
        }
      })
      .catch((error) => {
        console.error("Error fetching counselors:", error);
        toast.error("Error fetching counselors.");
      });

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
      padding: "10px",
    },
    textSectionH1: {
      fontSize: "2rem",
      marginBottom: "20px",
    },
    textSectionP: {
      fontSize: "1rem",
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
      padding: "10px",
    },
    imageWrapper: {
      display: "inline-block",
      textAlign: "center",
    },
    wellnessImage: {
      width: "100%", // Adjust as needed for responsiveness
      maxWidth: "400px", // Max width for larger screens
      borderRadius: "8px",
    },
    imageCaption: {
      backgroundColor: "#f7d072",
      padding: "10px 0",
      marginTop: "10px",
      borderRadius: "5px",
      fontSize: "1rem",
      width: "100%",
      textAlign: "center",
    },
    waveSection: {
      position: "relative",
      paddingBottom: "50px",
    },
    fixedHeading: {
      position: "absolute",
      top: "22%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontWeight: "bold",
      color: "white",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      minHeight: "350px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      backgroundColor: "#fff",
      textAlign: "center",
      margin: "20px",
      borderRadius: "8px",
    },
    cardMedia: {
      objectFit: "cover",
      transition: "transform 0.3s ease",
      borderRadius: "8%", // Make images rounded
      padding: "16px",
      marginBottom: "-16px", // Remove gap between image and title
    },
    cardContent: {
      flexGrow: 1,
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
    cardTitle: {
      fontWeight: "bold",
      marginTop: 0,
    },
    cardPosition: {
      color: "#007bff",
      fontSize: "18px",
    },
    viewMore: {
      marginTop: "10px",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#007bff",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    viewMoreHover: {
      backgroundColor: "#0056b3",
    },
    searchContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "-20px",
      padding: "10px",
    },
    searchBox: {
      width: "100%",
      maxWidth: "600px",
      height: "40px",
      borderRadius: "25px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    },
  };

  const filteredCounselors = counselors.filter(
    (counselor) =>
      counselor.counselorName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      counselor.counselorPosition
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AnimatedWave />
      <Typography
        id="fixed-heading"
        variant="h4"
        component="div"
        style={styles.fixedHeading}
      >
        Counselors
      </Typography>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <div style={styles.searchContainer}>
          <div style={styles.searchBox}>
            <SearchIcon style={{ marginLeft: "10px" }} />
            <TextField
              variant="outlined"
              placeholder="Search counselors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              InputProps={{
                disableUnderline: true,
                style: { height: "40px" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
            />
          </div>
        </div>
        <Grid container spacing={2}>
          {filteredCounselors.map((counselor) => (
            <Grid item xs={12} sm={6} md={4} key={counselor._id}>
              <Card style={styles.card}>
                <Link
                  to={`/counselor/${counselor._id}`}
                  style={{ textDecoration: "none", overflow: "hidden" }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={counselor.counselorImageUrl || "/default-image.jpg"}
                    alt={counselor.counselorName}
                    style={styles.cardMedia}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Link>
                <CardContent style={styles.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={styles.cardTitle}
                  >
                    {counselor.counselorName}
                  </Typography>
                  <Typography variant="body2" style={styles.cardPosition}>
                    {counselor.counselorPosition}
                  </Typography>
                  <Link
                    to={`/counselor/${counselor._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      style={styles.viewMore}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          styles.viewMoreHover.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          styles.viewMore.backgroundColor)
                      }
                    >
                      View More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div style={styles.container}>
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

export default CounselorListPage;
