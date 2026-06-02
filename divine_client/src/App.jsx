import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./main/Header";
import Register from "./component/Register";
import DonationDashboard from "./component/DonationDashboard";
import ContactUs from "./component/ContactUs";
import Home from "./component/Home";

const Ministries = () => (
  <div className="p-8 text-xl dark:text-white">⛪ Ministries Page</div>
);

import PrayerRequest from "./component/PrayerRequest";
import Donate from "./component/Donate";
import PrayerSchedule from "./component/PrayerSchedule ";
import KidsMinistry from "./component/KidsMinistry";
import MicMinistry from "./component/MicMinistry";
import EmpowHerMinistry from "./component/EmpowHerMinistry";
import DivineHands from "./component/DivineHands ";
import Gallery from "./component/Gallery";
import Programs from "./component/Programs";
import About from "./component/About";
import PrayerRequestList from "./component/PrayerRequestList";
import CreateEvent from "./component/CreateEvent";
import EditEvent from "./component/EditEvent";
import GalleryCreate from "./component/GalleryCreate";
import GalleryEdit from "./component/GalleryEdit";
import ViewAttendeesList from "./component/ViewAttendeesList";
import Charity from "./component/Charity";
import ViewAllHelp from "./component/ViewAllHelp";
import Sponsor from "./component/Sponsor";
import CreateYoutube from "./component/CreateYoutube";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // localStorage initial value
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      {/* 1. Added w-full and overflow-x-hidden to the parent container */}
      <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-900 transition-colors duration-300 overflow-x-hidden">
        {/* Pass darkMode state to Header */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* 2. Added w-full and overflow-hidden to main tag to stop inner components from stretching the screen */}
        <main className="w-full max-w-7xl mx-auto p-4 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charity" element={<Charity />} />
            <Route path="/viewAllHelp" element={<ViewAllHelp />} />
            <Route path="/about" element={<About />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/create" element={<CreateEvent />} />
            <Route path="/programs/edit/:id" element={<EditEvent />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/create" element={<GalleryCreate />} />
            <Route path="/gallery/edit/:id" element={<GalleryEdit />} />
            <Route path="/prayer-request" element={<PrayerRequest />} />
            <Route path="/prayer-requestList" element={<PrayerRequestList />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donation-dashboard" element={<DonationDashboard />} />
            <Route path="/admin-login" element={<Register />} />
            <Route path="/ministries/kids" element={<KidsMinistry />} />
            <Route path="/ministries/mic" element={<MicMinistry />} />
            <Route path="/ministries/empowher" element={<EmpowHerMinistry />} />
            <Route path="/divine-hands" element={<DivineHands />} />
            <Route path="/prayerSchedule" element={<PrayerSchedule />} />
            <Route path="/createYoutube" element={<CreateYoutube />} />
            <Route
              path="/viewAttenderslist/:id"
              element={<ViewAttendeesList />}
            />
          </Routes>
        </main>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
