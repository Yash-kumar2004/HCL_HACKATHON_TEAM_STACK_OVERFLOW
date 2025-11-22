
import React from "react";
import NewsCard from "./Newscard.jsx";
import Navbar from "./Navbar";
import "../Home.css";

const Home = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="homepage-container">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="content-wrapper">
        <h2 className="section-title">Latest Health Information</h2>

        <NewsCard
          title="COVID-19 Updates"
          description="Stay informed about the latest COVID-19 guidelines and vaccination information.kdjkksdokdokkdkjkdkv  kdjkfjdkdncjnjdfkjekjefjiehihfi kdjkfejfjbjfijf akdknnjdbfjejajknfjdnf najknjndfjdkkd skfkdknjnjkkdk"
        />

        <NewsCard
          title="Seasonal Flu Prevention"
          description="Learn about steps you can take to prevent the seasonal flu and when to get vaccinated."
        />

        <NewsCard
          title="Mental Health Awareness"
          description="Explore resources and support options for maintaining good mental health."
        />
      </div>
    </div>
  );
};

export default Home;
