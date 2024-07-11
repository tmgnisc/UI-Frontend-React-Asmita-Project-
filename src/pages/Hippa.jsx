import React from "react";
import { useInView } from "react-intersection-observer";
import { CSSTransition } from "react-transition-group";
import AnimatedWave from "../components/AnimatedWave";

const HIPAAComplianceGuide = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [introRef, introInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [privacyRef, privacyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [securityRef, securityInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [bestPracticesRef, bestPracticesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [resourcesRef, resourcesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div>
      <AnimatedWave />

      <div className="container">
        <div ref={titleRef} className="section">
          <CSSTransition
            in={titleInView}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div>
              <h1 className="header">HIPAA Compliance Guide for Counselors</h1>
              <hr />
            </div>
          </CSSTransition>
        </div>

        <div ref={introRef} className="section">
          <CSSTransition
            in={introInView}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div className="segment">
              <h2>Introduction to HIPAA</h2>
              <p>
                The Health Insurance Portability and Accountability Act (HIPAA)
                is a federal law designed to protect sensitive patient health
                information from being disclosed without the patient's consent
                or knowledge. As a counselor, it is crucial to adhere to HIPAA
                guidelines to ensure the privacy and security of your clients'
                health information.
              </p>
            </div>
          </CSSTransition>
        </div>

        <div ref={privacyRef} className="section">
          <CSSTransition
            in={privacyInView}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div className="segment">
              <h2>Key Practices for Ensuring Privacy</h2>
              <ul className="list">
                <li className="list-item">
                  <h4>Private Communication</h4>
                  <p>
                    Ensure that all communications with clients, whether in
                    person, via phone, or electronically, are conducted in a
                    private setting. Use encrypted communication channels for
                    online sessions.
                  </p>
                </li>
                <li className="list-item">
                  <h4>Confidential Documentation</h4>
                  <p>
                    Store all client records securely. Use locked filing
                    cabinets for paper records and encrypted, password-protected
                    systems for electronic records.
                  </p>
                </li>
                <li className="list-item">
                  <h4>Secure Session Environment</h4>
                  <p>
                    Conduct sessions in a private, soundproof room to prevent
                    unauthorized listening. Ensure that your computer screen is
                    not visible to unauthorized individuals during sessions.
                  </p>
                </li>
                <li className="list-item">
                  <h4>Informed Consent</h4>
                  <p>
                    Always obtain informed consent from clients before beginning
                    sessions. Ensure that clients understand their rights and
                    how their information will be used and protected.
                  </p>
                </li>
                <li className="list-item">
                  <h4>Limit Access</h4>
                  <p>
                    Only authorized personnel should have access to client
                    information. Implement role-based access controls to ensure
                    that only those who need to know have access to sensitive
                    information.
                  </p>
                </li>
              </ul>
            </div>
          </CSSTransition>
        </div>

        <div ref={securityRef} className="section">
          <CSSTransition
            in={securityInView}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div className="segment">
              <h2>Security Measures</h2>
              <div className="grid">
                <div className="grid-column">
                  <div className="segment">
                    <h3>
                      <span className="icon">🔒</span> Use Strong Passwords
                    </h3>
                    <p>
                      Ensure that all devices and systems used to store client
                      information are protected by strong, unique passwords.
                      Change passwords regularly and avoid sharing them.
                    </p>
                  </div>
                </div>
                <div className="grid-column">
                  <div className="segment">
                    <h3>
                      <span className="icon">🛡️</span> Encryption
                    </h3>
                    <p>
                      Encrypt all electronic client records and communications.
                      This ensures that even if data is intercepted, it cannot
                      be read without the encryption key.
                    </p>
                  </div>
                </div>
                <div className="grid-column">
                  <div className="segment">
                    <h3>
                      <span className="icon">🕵️‍♂️</span> Two-Factor Authentication
                    </h3>
                    <p>
                      Use two-factor authentication (2FA) for accessing
                      sensitive systems. This adds an extra layer of security by
                      requiring a second form of verification in addition to a
                      password.
                    </p>
                  </div>
                </div>
                <div className="grid-column">
                  <div className="segment">
                    <h3>
                      <span className="icon">📄</span> Regular Audits
                    </h3>
                    <p>
                      Conduct regular audits of your security practices and
                      systems to identify and address potential vulnerabilities.
                      Document these audits and any actions taken.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>

        <div ref={bestPracticesRef} className="section">
          <CSSTransition
            in={bestPracticesInView}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div className="segment">
              <h2>Best Practices for Effective Counseling Sessions</h2>
              <ul className="list">
                <li className="list-item">
                  <h4>Prepare Thoroughly</h4>
                  <p>
                    Before each session, review the client's history and notes
                    to ensure you are fully prepared. This helps build trust and
                    ensures that the session is productive.
                  </p>
                </li>
                <li className="list-item">
                  <h4>Active Listening</h4>
                  <p>
                    Practice active listening by fully focusing on the client,
                    understanding their message, and responding thoughtfully.
                    This helps clients feel heard and valued.
                  </p>
                </li>
                <li className="list-item">
                  <h4>Set Clear Boundaries</h4>
                  <p>
                    Establish and maintain clear boundaries with clients to
                    ensure a professional and therapeutic relationship. This
                    includes respecting session times and confidentiality.
                  </p>
                </li>
                <li className="list-item">
                  <h4>Follow Up</h4>
                  <p>
                    After sessions, provide follow-up resources or action items
                    for clients. This helps reinforce the session's progress and
                    supports the client's ongoing development.
                  </p>
                </li>
              </ul>
            </div>
          </CSSTransition>
        </div>

        <div ref={resourcesRef} className="section">
          <CSSTransition
            in={resourcesInView}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div className="segment">
              <h2>Resources</h2>
              <ul className="list">
                <li className="list-item">
                  <a
                    href="https://www.hhs.gov/hipaa/for-professionals/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Official HHS HIPAA Page
                  </a>
                </li>
                <li className="list-item">
                  <a
                    href="https://www.hipaa.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    HIPAA.com
                  </a>
                </li>
                <li className="list-item">
                  <a
                    href="https://www.healthit.gov/topic/privacy-security-and-hipaa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Health IT - Privacy, Security, and HIPAA
                  </a>
                </li>
              </ul>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default HIPAAComplianceGuide;
