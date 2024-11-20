import React, { useState, useEffect, useRef } from 'react';
import './predict.css';
import axios from 'axios';

const TumorPredictionWithHospitalSearch = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [district, setDistrict] = useState('');
  const [hospitalResults, setHospitalResults] = useState(null);
  const [districtSearchVisible, setDistrictSearchVisible] = useState(false);
  const [userName, setUserName] = useState(''); // Renamed from 'name' to 'userName'
  const [userAge, setUserAge] = useState(''); // Renamed from 'age' to 'userAge'

  const predictionRef = useRef(null);
  const districtSearchRef = useRef(null);
  const hospitalResultsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.8;

      [predictionRef, districtSearchRef, hospitalResultsRef].forEach((ref) => {
        if (ref.current) {
          const topPosition = ref.current.getBoundingClientRect().top;
          if (topPosition < triggerPoint) {
            ref.current.style.opacity = 1;
            ref.current.style.transform = 'translateY(0)';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  // Handle image selection
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Handle form submission for tumor prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
        alert('Please select an image to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    setLoading(true);
    setError(null);
    setPredictionResult(null);

    try {
        const response = await axios.post('http://localhost:5000/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setLoading(false);
        setPredictionResult(response.data);

        // Show district search form only if tumor is detected
        if (response.data.predicted_label !== 'No Tumor') {
            setDistrictSearchVisible(true);
        } else {
            setDistrictSearchVisible(false);
        }

    } catch (err) {
        setLoading(false);
        console.error('Error response:', err.response);
        setError(`Error: ${err.response?.data?.message || 'Something went wrong'}`);
    }
  };

  // Handle district search
  const searchHospitals = async () => {
    setHospitalResults(null);
    setError(null);

    if (!district) {
        setError('Please enter a district.');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:5000/search_hospitals?district=${encodeURIComponent(district)}`);
        const result = response.data;

        if (result.message) {
            setError(result.message);
        } else {
            setHospitalResults(result.hospitals);
        }
    } catch (error) {
        console.error("Error during API call:", error);
        if (error.response) {
            setError(error.response.data.message || "An error occurred on the server.");
        } else {
            setError("An unexpected error occurred.");
        }
    }
  };

  const downloadReport = () => {
    if (!predictionResult) return;

    const reportContent = `
      Name: ${userName}
      Age: ${userAge}
      Prediction Result: ${predictionResult.predicted_label}
      Message: ${predictionResult.message || ''}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${userName}_Tumor_Prediction_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxHeight: '700px', overflowY: 'auto', padding: '15px' }}>
      <h1>Brain Tumor Prediction and Hospital Search</h1>

      <h2>Tumor Detection</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label htmlFor="userAge">Age:</label>
        <input
          type="number"
          id="userAge"
          value={userAge}
          onChange={(e) => setUserAge(e.target.value)}
          required
        />

        <label htmlFor="image">Upload MRI Image:</label>
        <input type="file" id="image" onChange={handleImageChange} accept="image/*" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Submit Image'}
        </button>
      </form>

      {predictionResult && (
        <div className="prediction-result-container">
          <div className="prediction-result">
            <h2>Prediction Result:</h2>
            <p><strong>Predicted Label:</strong> {predictionResult.predicted_label}</p>
            <p>{predictionResult.message}</p>
            <button onClick={downloadReport}>Download Report</button>
          </div>
        </div>
      )}

      {districtSearchVisible && (
        <div id="district-search">
          <h2>Search Hospitals by District</h2>
          <input
            type="text"
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter District Name"
            required
          />
          <button type="button" onClick={searchHospitals}>
            Search Hospitals
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}

       {/* Hospital Results Section */}
      {hospitalResults && hospitalResults.length > 0 && (
        <div ref={hospitalResultsRef} style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Hospital Results:</h3>
          {hospitalResults.map((hospital, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <p><strong>Hospital Name:</strong> {hospital.hospital_name}</p>
              <p><strong>Address:</strong> {hospital.address}</p>
              <p><strong>Contact Number:</strong> {hospital.contact_number}</p>
              <p><strong>Location Link:</strong> <a href={hospital.location_link} target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TumorPredictionWithHospitalSearch;