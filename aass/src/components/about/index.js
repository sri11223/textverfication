import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Custom CSS for additional styling
import Header from "../Header";
import App from "../Footer";

const AboutPage = () => {
  return (
    <div className="about-container">
      <Header />

      {/* Hero Section */}
      <div className="hero-section bg-light text-center py-5">
        <h1 className="display-4 text-primary mb-3 fade-in">About Us</h1>
        <p className="lead text-muted fade-in-delayed">
          Our title verification platform ensures accuracy, uniqueness, and security across various industries. By leveraging cutting-edge AI, machine learning, and NLP, we analyze titles, detect duplicates, and provide actionable insights.
        </p>
      </div>

      {/* Features Section */}
      <div className="features-section container py-5">
        <div className="row text-center g-4">
          {/* Feature 1 */}
          <div className="col-md-4 fade-in">
            <div className="card feature-card shadow-sm">
              <img src="https://cdn.prod.website-files.com/64035b5f27be9bd2bfb64a75/6684ba381820217f2758767f_Enhance%20Your%20Risk%20Insurance%20Strategy%20(2).jpg" alt="AI-powered" className="card-img-top rounded-top" />
              <div className="card-body">
                <h5 className="card-title text-primary">AI-Powered Verification</h5>
                <p className="card-text">
                  Advanced AI algorithms ensure title uniqueness, detecting duplicates or inappropriate combinations across multiple languages.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="col-md-4 fade-in-delayed">
            <div className="card feature-card shadow-sm">
              <img src="https://www.fortinet.com/blog/business-and-technology/fast-secure-2020-digital-edition/_jcr_content/root/responsivegrid/image.img.png/1591911897973/picture1.png" alt="Secure and Fast" className="card-img-top rounded-top" />
              <div className="card-body">
                <h5 className="card-title text-primary">Fast & Secure</h5>
                <p className="card-text">
                  Achieve title verification in under two seconds, ensuring privacy, security, and data protection at every step.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="col-md-4 fade-in-long">
            <div className="card feature-card shadow-sm">
              <img src="https://cdn.prod.website-files.com/6734e78d4ffb0feb6cffde8c/6734e78e4ffb0feb6cffe5e9_key-characteristics-actionable-feedback.webp" alt="Actionable Insights" className="card-img-top rounded-top" />
              <div className="card-body">
                <h5 className="card-title text-primary">Actionable Feedback</h5>
                <p className="card-text">
                  Detailed feedback and actionable suggestions ensure title accuracy and compliance with industry standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section py-5 bg-light text-center">
        <h2 className="text-primary fade-in">What Our Users Say</h2>
        <div className="container mt-4">
          <div className="row g-4">
            <div className="col-md-4 fade-in">
              <blockquote className="blockquote">
                <p className="mb-3">"The platform is incredibly fast and accurate. It has streamlined our title verification process immensely!"</p>
                <footer className="blockquote-footer">John Doe, Business Owner</footer>
              </blockquote>
            </div>

            <div className="col-md-4 fade-in-delayed">
              <blockquote className="blockquote">
                <p className="mb-3">"I was amazed at how easy it was to verify titles with this system. Highly recommended!"</p>
                <footer className="blockquote-footer">Jane Smith, Freelancer</footer>
              </blockquote>
            </div>

            <div className="col-md-4 fade-in-long">
              <blockquote className="blockquote">
                <p className="mb-3">"The AI-powered insights have helped us maintain the quality and uniqueness of our titles."</p>
                <footer className="blockquote-footer">Michael Lee, Developer</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      {/* Testimonials Section */}
<div className="testimonials-section py-5 bg-light text-center">
  <h2 className="text-primary fade-in">What Our Users Say</h2>
  <div className="container mt-4">
    <div className="row g-4">
      <div className="col-md-4 fade-in">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://via.placeholder.com/80"
              alt="User 1"
              className="rounded-circle mb-3"
              style={{ width: "80px", height: "80px" }}
            />
            <blockquote className="blockquote text-center">
              <p className="mb-3 fst-italic">
                "The platform is incredibly fast and accurate. It has streamlined our title verification process immensely!"
              </p>
              <footer className="blockquote-footer">John Doe, Business Owner</footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="col-md-4 fade-in-delayed">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://via.placeholder.com/80"
              alt="User 2"
              className="rounded-circle mb-3"
              style={{ width: "80px", height: "80px" }}
            />
            <blockquote className="blockquote text-center">
              <p className="mb-3 fst-italic">
                "I was amazed at how easy it was to verify titles with this system. Highly recommended!"
              </p>
              <footer className="blockquote-footer">Jane Smith, Freelancer</footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="col-md-4 fade-in-long">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://via.placeholder.com/80"
              alt="User 3"
              className="rounded-circle mb-3"
              style={{ width: "80px", height: "80px" }}
            />
            <blockquote className="blockquote text-center">
              <p className="mb-3 fst-italic">
                "The AI-powered insights have helped us maintain the quality and uniqueness of our titles."
              </p>
              <footer className="blockquote-footer">Michael Lee, Developer</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      <App />
    </div>
  );
};

export default AboutPage;
