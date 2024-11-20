import React from 'react';
import './Details.css';
import { Link } from 'react-router-dom';


function DetailPage() {
  return (
    <div className="app-container">
      <video className="background-video" autoPlay loop muted>
        <source src="path-to-your-video.mp4" type="video/mp4" />
      </video>
      <div className="scrollable-content">
        <h1>Brain Tumor Awareness</h1>
        <section>
          <h2>What is Brain Tumor?</h2>
          <ul>
            <li>An abnormal growth of cells in or around the brain.</li>
            <li>Can be benign (non-cancerous) or malignant (cancerous).</li>
            <li>Can originate in the brain or spread from other body parts.</li>
          </ul>
          <h2>Types of Brain Tumors</h2>
          <ul>
            <li>Primary Brain Tumors: Start within the brain and stay there.
              <ul>
                <li>Gliomas: Arise from glial cells (support brain cells).</li>
                <li>Meningiomas: Form in the membranes covering the brain and spinal cord.</li>
                <li>Pituitary Adenomas: Grow in the pituitary gland.</li>
              </ul>
            </li>
            <li>Secondary (Metastatic) Brain Tumors: Spread to the brain from other parts of the body.</li>
          </ul>
          <h2>Symptoms of Brain Tumor</h2>
          <ul>
            <li>Headaches</li>
            <li>Seizures</li>
            <li>Vision problems</li>
            <li>Memory problems</li>
            <li>Fatigue</li>
          </ul>
          <h2>Side Effects of Brain Tumors</h2>
          <ul>
            <li>Difficulty in speaking</li>
            <li>Paralysis or weakness</li>
            <li>Changes in personality</li>
          </ul>
          {/* Additional content for scrolling */}
          
          <div className="image-container">
        <img src="https://th.bing.com/th/id/OIP.Sw3ICDIWX2vaYx_3IugqlAHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Image 1 description" className="image" />
        <img src="https://th.bing.com/th/id/OIP.MoFsu8xMO61rSyxIOZ1yMQAAAA?w=142&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Image 2 description" className="image" />
        <img src="https://th.bing.com/th/id/OIP.poBwDHMPUCWq7jTJ6H3DRwHaIX?w=162&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Image 3 description" className="image" />
      </div>
        </section>
        <Link to={"/predict"}>
          <button className='back'>prediction</button>
        </Link>
      </div>
    </div>
  );
}

export default DetailPage;
