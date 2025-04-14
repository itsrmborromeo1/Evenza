import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cards from "../components/Cards";
import Analytics from "../components/Analytics"; // Import Analytics component

export default function LandingPageTabs() {
  const [activeTab, setActiveTab] = useState("hero");

  return (
   <>
    <Navbar />
    <Hero />
   </>
  );
}
