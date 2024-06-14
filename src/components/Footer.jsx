import React from "react";



// Updated CSS styles with smaller font sizes
const footerStyles = {
  footerContainer: {
    backgroundColor: "#fff", // white background
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "20px 10%",
    alignItems: "flex-start", // align items to the start
    borderTop: "3px solid pink", // pink line
  },
  footerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  footerHeader: {
    color: "pink",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "1rem", // smaller font size for headers
  },
  footerLink: {
    color: "grey", // grey color for links
    textDecoration: "none",
    marginBottom: "5px",
    fontSize: "0.8rem", // smaller font size for links
  },
  socialIcons: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px", // space above social icons
  },
  socialIcon: {
    width: "24px",
    height: "24px",
    marginRight: "10px",
  },
};

// Social Icon component
const SocialIcon = ({ src, alt }) => {
  return <img src={src} alt={alt} style={footerStyles.socialIcon} />;
};

// Footer component
const Footer = () => {
  return (
    <>
      <footer style={footerStyles.footerContainer}>
        <div style={footerStyles.footerSection}>
          <h3 style={footerStyles.footerHeader}>Support</h3>
          <a href="/support" style={footerStyles.footerLink}>
            Ask Our Team
          </a>
          <a href="/help" style={footerStyles.footerLink}>
            Help Center
          </a>
        </div>
        <div style={footerStyles.footerSection}>
          <h3 style={footerStyles.footerHeader}>About</h3>
          <a href="/story" style={footerStyles.footerLink}>
            Our Story
          </a>
          <a href="/faq" style={footerStyles.footerLink}>
            FAQ
          </a>
        </div>
        <div style={footerStyles.footerSection}>
          <h3 style={footerStyles.footerHeader}>Sign Up For 15% Off</h3>
          <p style={{ color: 'grey', fontSize: '0.8rem' }}>
            Get the latest updates and offers in your inbox, with 15% off your first subscription order.
          </p>
          <h3 style={footerStyles.footerHeader}>Stay in Touch</h3>
          <div style={footerStyles.socialIcons}>
            <SocialIcon src="/assets/images/facebook.png" alt="Facebook" />
            <SocialIcon src="/assets/images/instagram.png" alt="Instagram" />
            <SocialIcon src="/assets/images/mail.png" alt="Mail" />
            <SocialIcon src="/assets/images/viber.png" alt="Viber" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
