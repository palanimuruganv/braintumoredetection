import React from 'react';

function Detail() {
  return (
    <div className="detail-container">
      <style>
        {`
          .detail-container {
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            border-radius: 8px;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
          }

          .detail-image-section {
            margin-top: 20px;
          }

          .brain-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
          }

          .back-button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .back-button:hover {
            background-color: #0056b3;
          }
        `}
      </style>

      <h2>Side Effects of Brain Tumors</h2>
      <ul>
        <li>Difficulty in speaking</li>
        <li>Paralysis or weakness</li>
        <li>Changes in personality</li>
      </ul>

      <section className="detail-image-section">
        <h2>Types of Brain Tumors</h2>
        <img
          src="path-to-your-image/brain-types.jpg"  // Replace with your actual image path
          alt="Brain Types"
          className="brain-image"
        />
      </section>

      <button className="back-button" onClick={() => window.history.back()}>
        Back to Home
      </button>
    </div>
  );
}

export default Detail;
