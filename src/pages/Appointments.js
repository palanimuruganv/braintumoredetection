import React, { useState } from 'react';

function AppointmentPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Tracks the selected doctor
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // Tracks the current step of the form

  // Doctor details
  const doctors = [
    {
      name: 'Dr. G.Pandurengasrinivasan',
      specialty: 'Neurology',
      experience: '10 years',
      contact: 'dr.gps@yahoo.com'
    },
    {
      name: 'Dr.K.Neeleshwar',
      specialty: 'Oncology',
      experience: '5 years',
      contact: 'neel.saalar@gmail.com'
    },
    {
      name: 'Dr.V.Govindraj',
      specialty: 'Radiology',
      experience: '12 years',
      contact: 'govindraj@yaahoo.com'
    },
    {
      name: 'Dr.S.Manoj',
      specialty: 'Neurosurgery',
      experience: '20 years',
      contact: 'manoj@kumar.com'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Your appointment has been successfully registered!");
    setStep(1); // Reset to step 1 after successful submission

    // Clear the form
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    setSelectedDoctor(null); // Reset selected doctor
  };

  const handleNext = (e) => {
    // If we are on the last step (step 6), submit the form
    if (step < 6) {
      setStep(step + 1); // Go to the next step
    } else {
      handleSubmit(e); // Submit the form when on step 6
    }
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(2); // Move to the next step after doctor selection
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    },
    doctorsList: {
      marginBottom: '30px',
      width: '100%',
      maxWidth: '600px',
      maxHeight: '430px', // Limit the height of the doctor list
      overflowY: 'scroll', // Add vertical scroll
      paddingRight: '10px', // Optional, for better scrolling appearance
      scrollbarWidth: 'none', // Firefox
    },
    // Webkit Browsers (Chrome, Safari)
    doctorsListWebkit: {
      '-webkit-scrollbar': {
        display: 'none',
      },
    },
    doctorCard: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black with transparency
      color: 'white',
      border: '1px solid #ccc',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '15px',
      cursor: 'pointer' // Add cursor pointer to indicate interactivity
    },
    doctorName: {
      margin: '0',
      fontSize: '18px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px',
      width: '100%'
    },
    label: {
      marginBottom: '10px',
      fontSize: '16px'
    },
    input: {
      padding: '10px',
      fontSize: '14px',
      marginTop: '5px',
      marginBottom: '15px'
    },
    select: {
      padding: '10px',
      fontSize: '14px',
      marginTop: '5px',
      marginBottom: '15px'
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: 'white',
      border: '100px',
      borderRadius: '50px',
      alignSelf: 'center', // Center the button within the form
    },
    successMessage: {
      marginTop: '20px',
      color: 'green',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      <h1>Book an Appointment</h1>

      {/* Doctor Details Section */}
      {step === 1 && (
        <div style={styles.doctorsList} className="doctors-list">
          <h2>Available Doctors</h2>
          {doctors.map((doctor, index) => (
            <div
              key={index}
              style={styles.doctorCard}
              onClick={() => handleDoctorSelect(doctor)}
            >
              <h3 style={styles.doctorName}>{doctor.name}</h3>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>Experience:</strong> {doctor.experience}</p>
              <p><strong>Contact:</strong> {doctor.contact}</p>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Appointment Form (only after doctor selection) */}
      {step > 1 && selectedDoctor && (
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Step 2: Name */}
          {step === 2 && (
            <div>
              <label style={styles.label}>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <button type="button" onClick={handleNext} style={styles.button}>Next</button>
            </div>
          )}

          {/* Step 3: Email */}
          {step === 3 && (
            <div>
              <label style={styles.label}>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <button type="button" onClick={handleNext} style={styles.button}>Next</button>
            </div>
          )}

          {/* Step 4: Phone */}
          {step === 4 && (
            <div>
              <label style={styles.label}>
                Phone:
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <button type="button" onClick={handleNext} style={styles.button}>Next</button>
            </div>
          )}

          {/* Step 5: Date */}
          {step === 5 && (
            <div>
              <label style={styles.label}>
                Date:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <button type="button" onClick={handleNext} style={styles.button}>Next</button>
            </div>
          )}

          {/* Step 6: Time */}
          {step === 6 && (
            <div>
              <label style={styles.label}>
                Time:
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <button type="button" onClick={handleNext} style={styles.button}>Submit</button>
            </div>
          )}
        </form>
      )}

      {message && <p style={styles.successMessage}>{message}</p>}
    </div>
  );
}

export default AppointmentPage;
