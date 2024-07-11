// src/pages/Home.js

import React, { useEffect, useRef, useState } from "react";
import ChatComponent from "../components/ChatComponent";
import MentalHealthSection from "../components/CustomShapeSection";
import Footer from "../components/Footer";
import ellipse1 from "../images/Ellipse 4.png";
import ellipse2 from "../images/Ellipse 7.png";
import ellipse3 from "../images/Ellipse 8.png";
import ellipse4 from "../images/Ellipse 5.png";
import ellipse5 from "../images/Ellipse 6.png";
import backgroundImage from "../images/hero1 (1).jpg";

const testimonials = [
  { name: "User 1", text: "This is a great service that has helped me a lot.", image: ellipse1 },
  { name: "User 2", text: "I found the counseling sessions very helpful.", image: ellipse2 },
  { name: "User 3", text: "Amazing support and great counselors.", image: ellipse3 },
  { name: "User 4", text: "I highly recommend this service to everyone.", image: ellipse4 },
  { name: "User 5", text: "The best mental health app I have ever used.", image: ellipse5 },
];

const Home = () => {
  const dailyUsersRef = useRef(null);
  const totalSessionsRef = useRef(null);
  const satisfiedUsersRef = useRef(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    const animateValue = (ref, start, end, duration, suffix = "") => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        ref.current.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(dailyUsersRef, 0, 30, 2000, "+");
    animateValue(totalSessionsRef, 0, 12000, 2000, "k");
    animateValue(satisfiedUsersRef, 0, 95, 2000, "%");
  }, []);

  return (
    <div className="home-container">
      <div className="hero-shape-section">
        <div className="image-section">
          <div className="hero-shape">
            <img src={backgroundImage} alt="Healthy Mind" className="background-image" />
            <div className="overlay">
              <div className="testimonial-section">
                <div className="testimonial-header">
                  <p>See what our users have to <b>say</b> about us!</p>
                  <div className="testimonial-images">
                    {testimonials.map((testimonial, index) => (
                      <img
                        key={index}
                        src={testimonial.image}
                        alt={testimonial.name}
                        onMouseEnter={() => setSelectedTestimonial(testimonial)}
                        onMouseLeave={() => setSelectedTestimonial(null)}
                        className="testimonial-image"
                      />
                    ))}
                  </div>
                </div>
              </div>
              {selectedTestimonial && (
                <div className="testimonial-text">
                  <p>{selectedTestimonial.text}</p>
                </div>
              )}
              <div className="message">
                <h1>You Don’t Have</h1>
                <h1> To Suffer In Silence!</h1>
              </div>
              <div className="stats">
                <div className="stat">
                  <span ref={dailyUsersRef} className="number"></span>
                  <div className="text">daily users</div>
                </div>
                <div className="stat">
                  <span ref={totalSessionsRef} className="number"></span>
                  <div className="text">total sessions</div>
                </div>
                <div className="stat">
                  <span ref={satisfiedUsersRef} className="number"></span>
                  <div className="text">satisfied users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MentalHealthSection />
      <ChatComponent />
      <Footer />
      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .hero-shape-section {
          position: relative;
          overflow: hidden;
        }

        .image-section {
          position: relative;
        }

        .hero-shape .background-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .testimonial-section {
          position: relative;
        }

        .testimonial-images {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        .testimonial-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 5px;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .testimonial-image:hover {
          transform: scale(1.1);
        }

        .testimonial-text {
          margin-top: 10px;
        }

        .message h1 {
          margin: 0;
        }

        .stats {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .stat {
          margin: 0 10px;
        }

        .stat .number {
          font-size: 2rem;
          font-weight: bold;
        }

        .stat .text {
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .testimonial-images {
            flex-direction: column;
          }

          .testimonial-image {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 576px) {
          .overlay {
            padding: 10px;
          }

          .message h1 {
            font-size: 1.5rem;
          }

          .stats {
            flex-direction: column;
          }

          .stat {
            margin: 10px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
