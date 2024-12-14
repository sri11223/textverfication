import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Feature = () => {
  return (
    <div className="container py-16">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="row gy-5">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-lg rounded-xl hover:scale-105 transition-all duration-500 group hover:shadow-2xl hover:border-primary">
                <div className="card-body p-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-container bg-primary p-3 rounded-circle me-3">
                      <svg
                        className="w-8 h-8 text-white"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-dark">Efficient Title Verification</h5>
                  </div>
                  <p className="text-muted">
                    Our intelligent system ensures fast and accurate title verification by identifying duplicates, inappropriate prefixes, and disallowed combinations within seconds.
                  </p>
                  <a
                    href="/"
                    aria-label="Learn more"
                    className="text-primary font-semibold hover:text-dark transition-colors duration-300"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-lg rounded-xl hover:scale-105 transition-all duration-500 group hover:shadow-2xl hover:border-success">
                <div className="card-body p-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-container bg-success p-3 rounded-circle me-3">
                      <svg
                        className="w-8 h-8 text-white"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-dark">AI-Driven Linguistic Analysis</h5>
                  </div>
                  <p className="text-muted">
                    Using AI, we analyze linguistic meaning across multiple languages to ensure title uniqueness and appropriateness, offering enhanced accuracy.
                  </p>
                  <a
                    href="/"
                    aria-label="Learn more"
                    className="text-success font-semibold hover:text-dark transition-colors duration-300"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-lg rounded-xl hover:scale-105 transition-all duration-500 group hover:shadow-2xl hover:border-danger">
                <div className="card-body p-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-container bg-danger p-3 rounded-circle me-3">
                      <svg
                        className="w-8 h-8 text-white"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-dark">Fast, Scalable & Secure</h5>
                  </div>
                  <p className="text-muted">
                    Our system handles multiple requests simultaneously, ensuring fast, scalable performance while maintaining the security and privacy of user data.
                  </p>
                  <a
                    href="/"
                    aria-label="Learn more"
                    className="text-danger font-semibold hover:text-dark transition-colors duration-300"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
