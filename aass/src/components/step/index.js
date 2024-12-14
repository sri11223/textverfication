import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Custom CSS for advanced styling and animations

export const Step = () => {
  return (
    <div className="container py-5">
      {/* Section Header */}
      <div className="text-center mb-5">
        <div>
          <p className="section-tagline text-uppercase py-2 px-3">
            Make history
          </p>
        </div>
        <h2 className="display-4 font-weight-bold text-dark mb-4">
          <span className="text-primary">Let’s</span> launch a rocket into outer space
        </h2>
        <p className="text-muted lead">
          Discover the journey of launching rockets with a detailed step-by-step guide crafted for enthusiasts and dreamers.
        </p>
      </div>

      {/* Steps Section */}
      <div className="row text-center">
        {/* Step 1 */}
        <div className="col-md-4 mb-4">
          <div className="card step-card shadow-sm">
            <div className="step-number mb-3">1</div>
            <h5 className="font-weight-bold">Fill her up</h5>
            <p className="text-muted">
              Load the rocket with fuel and double-check every system to ensure a smooth journey.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="col-md-4 mb-4">
          <div className="card step-card shadow-sm">
            <div className="step-number mb-3">2</div>
            <h5 className="font-weight-bold">Light it</h5>
            <p className="text-muted">
              Ignite the engines with precision and control as the rocket prepares for liftoff.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="col-md-4 mb-4">
          <div className="card step-card shadow-sm">
            <div className="step-number mb-3">3</div>
            <h5 className="font-weight-bold">Shoot for the stars</h5>
            <p className="text-muted">
              Propel through the atmosphere and aim for the stars with a thrilling adventure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
