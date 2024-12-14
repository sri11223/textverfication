import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Custom CSS for additional styling
import Header from "../Header";
import Footer from "../Footer";
import Feature from "../features";
import { Step } from "../step";

import StatsSection from "../statssection";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      {/* Hero Section */}
      <div className="hero-section bg-light text-dark text-center py-5 hero-animation">
        <div className="container">
          <p className="badge bg-secondary text-uppercase text-white py-2 px-4 mb-4 animated fadeIn">
            Intelligent Systems for Secure Title Verification
          </p>
          <h1 className="display-4 fw-bold mb-3 animated fadeInUp">
            Unlock the Future of Title Verification
          </h1>
          <p className="lead text-muted mb-5 animated fadeInUp">
            Streamlining accuracy, ensuring security, and providing actionable feedback for optimal results.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-dark btn-lg shadow-lg">
              Get Started
            </button>
            <a href="/" className="btn btn-outline-dark btn-lg shadow-lg">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section bg-white py-5">
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-md-4 animated fadeInUp">
              <div className="feature-box p-4 border rounded shadow-sm">
                <div className="feature-icon mb-3">
                  <svg
                    className="text-dark"
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3.293l4.146 4.147a.5.5 0 0 1-.708.708L8 4.707 4.854 8.146a.5.5 0 1 1-.708-.708L8 3.293z" />
                  </svg>
                </div>
                <h5 className="fw-bold">Smart & Secure</h5>
                <p className="text-muted">
                  Employ AI-driven algorithms to ensure accurate and secure title verification.
                </p>
              </div>
            </div>
            <div className="col-md-4 animated fadeInUp">
              <div className="feature-box p-4 border rounded shadow-sm">
                <div className="feature-icon mb-3">
                  <svg
                    className="text-success"
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3.293l4.146 4.147a.5.5 0 0 1-.708.708L8 4.707 4.854 8.146a.5.5 0 1 1-.708-.708L8 3.293z" />
                  </svg>
                </div>
                <h5 className="fw-bold">Faster Processing</h5>
                <p className="text-muted">
                  Complete title verification in under 2 seconds with our optimized process.
                </p>
              </div>
            </div>
            <div className="col-md-4 animated fadeInUp">
              <div className="feature-box p-4 border rounded shadow-sm">
                <div className="feature-icon mb-3">
                  <svg
                    className="text-danger"
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3.293l4.146 4.147a.5.5 0 0 1-.708.708L8 4.707 4.854 8.146a.5.5 0 1 1-.708-.708L8 3.293z" />
                  </svg>
                </div>
                <h5 className="fw-bold">Actionable Feedback</h5>
                <p className="text-muted">
                  Receive detailed feedback with suggestions to improve your title's chances of approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlight */}
      <Feature />

      {/* Step-by-step Process */}
      <Step />

      {/* Reviews Section */}
    

      {/* Stats Section */}
      <StatsSection />

      <Footer />
    </div>
  );
};

export default Home;
