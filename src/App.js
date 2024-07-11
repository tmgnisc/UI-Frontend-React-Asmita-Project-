
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AnimatedWave from './components/AnimatedWave';
import Calendar from './components/Calendar';
import Footer from './components/Footer';
import NavbarWrapper from './components/NavbarWrapper';
import OneStep from './components/OneStep';
import QRcodeScanner from './components/QRcodeScanner';
import SplashScreenHandler from './components/spash/SplashScreenHandler';
import ArticleListPage from './pages/CounselorList';
import QuestionnairePage from './pages/Diagnose';
import ResultPage from './pages/DiagnoseResult';
import PasswordResetRequest from './pages/Forgotpassword';
import Home from './pages/Homepage';
import IssueListPage from './pages/IssueList';
import Login from './pages/Login';
import { default as MentalHealthIssue, default as YouTubePlayer } from './pages/MentalHealthIssue';
import ParentComponent from './pages/ParentComponent';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPass';
import ArticleDetailPage from './pages/SingleCounselorPage';
import SingleIssue from './pages/SingleIssuePage';
import MyCalendar from './pages/UserBooking';
import AdminArticleDashboard from './pages/adminside/AddCounselor';
import AdminIssueDashboard from './pages/adminside/AddIssue';
import AdminEditArticle from './pages/adminside/AdminEditCounselor';
import AdminEditIssue from './pages/adminside/AdminEditIssue';
import UserRoutes from "./protected_routes/UserRoutes";

import { MeetingProvider } from "@videosdk.live/react-sdk";
import { MeetingAppProvider } from "./MeetingAppContextDef";
import { JoiningScreen } from "./components/video_screens/JoiningScreen";
import { LeaveScreen } from "./components/video_screens/LeaveScreen";
import { MeetingContainer } from "./meeting/MeetingContainer";
import Aboutus from "./pages/AboutUs";
import CounselorAppointments from "./pages/CounselorCalendar";
import HIPAAComplianceGuide from "./pages/Hippa";
import LoginCounselor from "./pages/LoginCounselor";
import ProfilePage from "./pages/Profile";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [customAudioStream, setCustomAudioStream] = useState(null);
  const [customVideoStream, setCustomVideoStream] = useState(null);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);

  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  return (
    <Router>
      <MeetingAppProvider>
        <Routes>
          <Route path="/" element={<SplashScreenHandler />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login_counselor" element={<LoginCounselor />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/wave" element={<AnimatedWave />} />
          <Route path="/one_step" element={<OneStep />} />
          <Route path="/forgot-password" element={<PasswordResetRequest />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/admin/counselorDashboard" element={<AdminArticleDashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/counselor/calendar" element={<CounselorAppointments />} />
          <Route path="/hippa" element={<HIPAAComplianceGuide />} />
          <Route path="/profile" element={<ProfilePage />} />


          <Route path="/user/*" element={<UserRoutes />}>
            <Route path="counselor" element={<ArticleListPage />} />
            <Route path="issue" element={<IssueListPage />} />
            <Route path="calendar" element={<MyCalendar />} />
            <Route path="form" element={<ParentComponent />} />

          </Route>
          <Route path="/admin/edit-counselor/:id" element={<AdminEditArticle />} />
          <Route path="/counselor/:counselorId" element={<ArticleDetailPage />} />
          <Route path="/mental-health-issue" element={<MentalHealthIssue />} />
          <Route path="/admin/issueDashboard" element={<AdminIssueDashboard />} />
          <Route path="/admin/edit-issue/:id" element={<AdminEditIssue />} />
          <Route path="/issue/:issueId" element={<SingleIssue />} />
          <Route path="/video" element={<YouTubePlayer />} />
          <Route path="/diagnose" element={<QuestionnairePage />} />
          <Route path="/diagnose/result" element={<ResultPage />} />
          <Route path="/qr" element={<QRcodeScanner />} />

          <Route
            path="/video-call/*"
            element={
              isMeetingStarted ? (
                <MeetingProvider
                  config={{
                    meetingId,
                    micEnabled: micOn,
                    webcamEnabled: webcamOn,
                    name: participantName ? participantName : "TestUser",
                    multiStream: true,
                    customCameraVideoTrack: customVideoStream,
                    customMicrophoneAudioTrack: customAudioStream
                  }}
                  token={token}
                  reinitialiseMeetingOnConfigChange={true}
                  joinWithoutUserInteraction={true}
                >
                  <MeetingContainer
                    onMeetingLeave={() => {
                      setToken("");
                      setMeetingId("");
                      setParticipantName("");
                      setWebcamOn(false);
                      setMicOn(false);
                      setMeetingStarted(false);
                    }}
                    setIsMeetingLeft={setIsMeetingLeft}
                  />
                </MeetingProvider>
              ) : isMeetingLeft ? (
                <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
              ) : (
                <JoiningScreen
                  participantName={participantName}
                  setParticipantName={setParticipantName}
                  setMeetingId={setMeetingId}
                  setToken={setToken}
                  micOn={micOn}
                  setMicOn={setMicOn}
                  webcamOn={webcamOn}
                  setWebcamOn={setWebcamOn}
                  customAudioStream={customAudioStream}
                  setCustomAudioStream={setCustomAudioStream}
                  customVideoStream={customVideoStream}
                  setCustomVideoStream={setCustomVideoStream}
                  onClickStartMeeting={() => {
                    setMeetingStarted(true);
                  }}
                  startMeeting={isMeetingStarted}
                  setIsMeetingLeft={setIsMeetingLeft}
                />
              )
            }
          />
        </Routes>
      </MeetingAppProvider>
      <NavbarWrapper />
      <ToastContainer />
    </Router>
  );
};

export default App;
