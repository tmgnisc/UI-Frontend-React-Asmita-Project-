import React, { useEffect, useRef, useState } from "react";
import ellipse1 from "../images/Ellipse 4.png";
import ellipse4 from "../images/Ellipse 5.png";
import ellipse5 from "../images/Ellipse 6.png";
import ellipse2 from "../images/Ellipse 7.png";
import ellipse3 from "../images/Ellipse 8.png";
import backgroundImage from "../images/hero1.jpg";
import MentalHealthSection from "../components/CustomShapeSection";

const testimonials = [
  {
    name: "User 1",
    text: "This is a great service that has helped me a lot.",
    image: ellipse1,
  },
  {
    name: "User 2",
    text: "I found the counseling sessions very helpful.",
    image: ellipse2,
  },
  {
    name: "User 3",
    text: "Amazing support and great counselors.",
    image: ellipse3,
  },
  {
    name: "User 4",
    text: "I highly recommend this service to everyone.",
    image: ellipse4,
  },
  {
    name: "User 5",
    text: "The best mental health app I have ever used.",
    image: ellipse5,
  },
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
        ref.current.innerHTML =
          Math.floor(progress * (end - start) + start) + suffix;
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
    // <div className="home-page">
    //   <div className="hero-section">
    //     <img src={backgroundImage} alt="Healthy Mind" className="hero-image" />
    <div className="hero-shape-section">
      <div className="image-section">
        <div className="hero-shape">
          <img
            src={backgroundImage}
            alt="Healthy Mind"
            className="background-image"
          />

          <div className="overlay">
            <div className="testimonial-section">
              <div className="testimonial-header">
                <p>
                  See what our users have to <b></b>say about us!
                </p>
                <div className="testimonial-images">
                  {testimonials.map((testimonial, index) => (
                    <img
                      key={index}
                      src={testimonial.image}
                      alt={testimonial.name}
                      onMouseEnter={() => setSelectedTestimonial(testimonial)}
                      onMouseLeave={() => setSelectedTestimonial(null)}
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
      <MentalHealthSection/>
    </div>
  );
};

export default Home;
