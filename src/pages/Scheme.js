import React from 'react';

function Scheme() {
  return (
    <div>
      {/* Inline CSS for the component */}
      <style jsx>{`
        div {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #ffff;
        }
        h1 {
          color: #ffff;
          text-align: center;
          font-size: 1.8em;
          margin-bottom: 10px;
        }
        h2 {
          color: #ff0040;
          font-size: 1.5em;
          margin-top: 20px;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
          font-size: 1em;
          padding-left: 20px;
          position: relative;
          color:#e0e0e0;
        }
        li:before {
          content: "•";
          color: #007bff;
          position: absolute;
          left: 0;
        }
      `}</style>

<h1 style={{ fontSize: '20px' }}>Schemes Provided by Tamil Nadu Government</h1>


      <h1>Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)</h1>

      <h2>Eligibility Criteria</h2>
      <ul>
        <li><strong>Residency:</strong> The applicant must be a resident of Tamil Nadu, verified through a family card issued by the state.</li>
        <li><strong>Income Limit:</strong> Families with an annual income of up to INR 1,20,000 qualify. Proof of income is required, such as a certificate from the Village Administrative Officer or other revenue authorities.</li>
        <li><strong>Family Coverage:</strong> The policy is a family floater, covering the applicant, spouse, dependent children, and parents.</li>
      </ul>

      <h2>Key Benefits</h2>
      <ul>
        <li><strong>Cashless Treatment:</strong> Eligible individuals receive cashless treatment at empaneled hospitals. The scheme covers a variety of neurosurgical procedures and includes diagnostic and follow-up treatments.</li>
        <li><strong>Coverage Amount:</strong> The scheme provides up to INR 5 lakh annually per family, helping to cover extensive medical costs, including neurosurgery for brain tumors.</li>
        <li><strong>Free Health Check-ups:</strong> Beneficiaries are entitled to free medical check-ups in various Tamil Nadu districts.</li>
      </ul>
    </div>
  );
}

export default Scheme;
