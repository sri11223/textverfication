import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Header";
import App from "../Footer";
import "./index.css"; // Custom CSS for animations and smooth effects

const InstructionsPage = () => {
  return (
    <div className="container-fluid bg-light fade-in">
      <Header />

      <div className="text-center py-5">
        <h1 className="display-4 text-primary mb-4 slide-in-top">How We Build and Secure Your Data</h1>
        <p className="lead text-muted zoom-in">
          Our platform is designed to provide you with fast, accurate, and secure title verification. Here, we explain the tools we use, how the system works, and how we ensure your data is protected.
        </p>
      </div>

      <div className="row mt-5">
        {/* Development Tools Section */}
        <div className="col-md-6 fade-in">
          <h3 className="text-primary mb-3">Tools & Technologies Used</h3>
          <p className="text-muted mb-4">
            We use the most advanced tools and technologies to ensure fast, reliable, and scalable title verification.
          </p>
          <ul className="list-group shadow-sm custom-list">
            <li className="list-group-item">React.js for building the frontend user interface.</li>
            <li className="list-group-item">Node.js and Express for the backend API.</li>
            <li className="list-group-item">MongoDB for secure and scalable database management.</li>
            <li className="list-group-item">AI and Machine Learning models to detect duplicates, inappropriate titles, and more.</li>
            <li className="list-group-item">Bootstrap for responsive design and smooth user experience.</li>
          </ul>
        </div>

        {/* Development Process Section */}
        <div className="col-md-6 fade-in-delayed">
          <h3 className="text-primary mb-3">Our Development Process</h3>
          <p className="text-muted mb-4">
            We follow a streamlined development process to build and maintain our platform to ensure that users get accurate and quick results.
          </p>
          <ul className="list-group shadow-sm custom-list">
            <li className="list-group-item">Planning: Defining the requirements and features of the title verification system.</li>
            <li className="list-group-item">Design: Creating wireframes and mockups for the user interface.</li>
            <li className="list-group-item">Development: Implementing both frontend and backend, integrating AI-powered algorithms.</li>
            <li className="list-group-item">Testing: Running unit and integration tests to ensure the system works as expected.</li>
            <li className="list-group-item">Deployment: Launching the platform with continuous monitoring and support.</li>
          </ul>
        </div>
      </div>

      <div className="row mt-5">
        {/* Data Security Section */}
        <div className="col-12 fade-in-long">
          <h3 className="text-primary mb-3">Data Security & Privacy</h3>
          <p className="text-muted mb-4">
            We take data security and user privacy seriously. Here's how we protect your information:
          </p>
          <ul className="list-group shadow-sm custom-list">
            <li className="list-group-item">
              <strong>Data Encryption:</strong> All sensitive data is encrypted during transmission and storage to prevent unauthorized access.
            </li>
            <li className="list-group-item">
              <strong>Role-Based Access:</strong> We implement role-based access control to ensure that only authorized personnel have access to sensitive information.
            </li>
            <li className="list-group-item">
              <strong>Privacy Policy:</strong> We do not sell, share, or misuse your personal information. We are committed to maintaining your privacy.
            </li>
            <li className="list-group-item">
              <strong>Secure Authentication:</strong> All users must authenticate via a secure login process to access the platform.
            </li>
            <li className="list-group-item">
              <strong>Data Retention:</strong> We only retain necessary data for verification purposes and delete unused or unnecessary data periodically.
            </li>
          </ul>
        </div>
      </div>

      <div className="row mt-5">
        {/* Privacy and Policy Section */}
        <div className="col-12 fade-in">
          <h3 className="text-primary mb-3">Our Privacy Policy</h3>
          <p className="text-muted mb-4">
            We value your privacy and ensure that your personal information is handled with the utmost care. Here's what you need to know:
          </p>
          <p className="text-muted mb-4">
            - We collect only the necessary information required to process title verification requests. <br />
            - We use your data solely to improve our verification services and offer actionable feedback. <br />
            - You can delete or request your data anytime. <br />
            - We comply with all relevant privacy laws and regulations, ensuring your data is protected at all times.
          </p>
          <p className="text-center">
            For more details, please read our full <a href="/privacy-policy" className="text-primary">Privacy Policy</a>.
          </p>
        </div>
      </div>

      <div className="text-center mt-5 fade-in-bottom">
        <a href="/" className="btn btn-primary btn-lg shadow rounded-pill px-5">Start Using Our Service</a>
      </div>
      
      <App />
    </div>
  );
};

export default InstructionsPage;
