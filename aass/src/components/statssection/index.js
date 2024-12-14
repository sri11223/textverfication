import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Custom CSS for animations and smooth effects

const StatsSection = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="text-center mx-auto max-w-3xl">
        <h2 className="display-4 font-weight-bold text-dark fade-in">Revolutionizing Title Verification</h2>

        <p className="mt-4 text-muted lead fade-in">
          Our system ensures secure and accurate title verification, powered by cutting-edge AI and scalable performance for diverse industries.
        </p>
      </div>

      <div className="mt-6 row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 fade-in">
        <div className="col">
          <div className="card rounded-lg bg-light text-center p-4 scale-on-hover">
            <div className="card-body">
              <h3 className="card-title text-lg font-weight-normal text-muted">Titles Verified</h3>
              <p className="card-text display-3 font-weight-bold text-primary">1.2M</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card rounded-lg bg-light text-center p-4 scale-on-hover">
            <div className="card-body">
              <h3 className="card-title text-lg font-weight-normal text-muted">Industries Served</h3>
              <p className="card-text display-3 font-weight-bold text-primary">35</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card rounded-lg bg-light text-center p-4 scale-on-hover">
            <div className="card-body">
              <h3 className="card-title text-lg font-weight-normal text-muted">AI Models Trained</h3>
              <p className="card-text display-3 font-weight-bold text-primary">120+</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card rounded-lg bg-light text-center p-4 scale-on-hover">
            <div className="card-body">
              <h3 className="card-title text-lg font-weight-normal text-muted">Global Users</h3>
              <p className="card-text display-3 font-weight-bold text-primary">250k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
