import React, { useState } from "react";
import "../NewsCard.css";

const NewsCard = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);

  // limit text length when collapsed
  const previewText = description.slice(0, 150);

  return (
    <div className="news-card">
      <h3>{title}</h3>

      <p>
        {/* If expanded → show full, else → show preview */}
        {expanded ? description : previewText}

        {/* If not expanded → add "..." */}
        {!expanded && description.length > 150 && " ..."}
      </p>

      <button
        className="read-btn"
        onClick={() => setExpanded(prev => !prev)}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default NewsCard;
