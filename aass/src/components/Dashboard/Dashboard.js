import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Dashboard.css"; // Link to your custom CSS
import Cookies from "js-cookie";
import GrammarCheck from "../grammerchecker"; // Ensure this component is implemented correctly
import TitleReview from "../Titlecheckform";
function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false); // State to track logout

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const token = Cookies.get("authToken");
  if (!token || isLoggedOut) {
    return <Navigate to="/" />; // Redirect to home page if not logged in or logged out
  }

  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove JWT token from cookies
    setIsLoggedOut(true); // Set the logged-out state to trigger redirection
  };

  const handleSubmitTitle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFeedback(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/titles?title=${encodeURIComponent(title)}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();

      // Check and parse feedback response
      if (data && data.feedback) {
        setFeedback({
          queriedTitle: data.feedback.queried_title || "No queried title provided",
          similarityAssessment: data.feedback.similarityAssessment || "Not available",
          issues: data.feedback.issues || "No issues identified",
          disallowedCombinations:
            data.feedback.disallowed_combinations || "No disallowed combinations found",
          suggestions: data.feedback.suggestions || [],
          approvalProbability: data.feedback.approvalProbability || 0,
        });
      } else {
        setError("Invalid feedback format from the API.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white ${isSidebarCollapsed ? "collapsed" : ""}`}
        style={{ height: "100vh" }}
      >
        <div className="d-flex justify-content-between align-items-center p-3">
          <h3 className={`text-center ${isSidebarCollapsed ? "d-none" : ""}`}>Dashboard</h3>
          <button onClick={toggleSidebar} className="btn text-white toggle-btn">
            <i className={`bi ${isSidebarCollapsed ? "bi-arrow-right" : "bi-arrow-left"}`}></i>
          </button>
        </div>
        <nav>
          <ul className="list-unstyled">
            <li>
              <Link to="/history" className="nav-link text-white d-block py-2 px-3">
                <i className="bi bi-clock"></i> {isSidebarCollapsed ? "" : "History"}
              </Link>
            </li>
            <li>
              <Link to="/settings" className="nav-link text-white d-block py-2 px-3">
                <i className="bi bi-gear"></i> {isSidebarCollapsed ? "" : "Settings"}
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav-link text-white d-block py-2 px-3">
                <i className="bi bi-person"></i> {isSidebarCollapsed ? "" : "Profile"}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link text-white w-100 py-2 px-3">
                <i className="bi bi-box-arrow-right"></i> {isSidebarCollapsed ? "" : "Logout"}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="content p-4" style={{ width: "100%" }}>
        <div className="container">
          <div className="row">
            {/* Title Feedback Section */}
            <TitleReview/>

            {/* Grammar Checker Section */}
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
