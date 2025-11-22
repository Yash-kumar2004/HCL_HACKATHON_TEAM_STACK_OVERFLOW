import "./../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Latest Health Information</h1>

      <div className="card">
        <h2>COVID-19 Updates</h2>
        <p>Stay informed about the latest COVID-19 guidelines and vaccination information.</p>
        <button className="btn">Read More</button>
      </div>

      <div className="card">
        <h2>Seasonal Flu Prevention</h2>
        <p>Learn how to prevent flu and when to get vaccinated.</p>
        <button className="btn">Read More</button>
      </div>

      <div className="card">
        <h2>Mental Health Awareness</h2>
        <p>Explore resources for improving mental health and well-being.</p>
        <button className="btn">Read More</button>
      </div>
    </div>
  );
}
