import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const StatisticsPage = () => {
  // Example data for the charts and graphs
  const progressData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Title Verification Requests',
        data: [50, 200, 400, 600, 900, 1200],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const marketValueData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Market Value ($)',
        data: [50000, 120000, 200000, 350000, 500000],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1
      }
    ]
  };

  const impactData = {
    labels: ['North America', 'Europe', 'Asia', 'Africa', 'Australia'],
    datasets: [
      {
        label: 'User Growth (Thousands)',
        data: [50, 75, 200, 40, 20],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="mb-5">
          <Col xs={12} className="text-center">
            <h1 className="display-4 text-primary mb-3">Product Statistics & Impact</h1>
            <p className="lead text-muted">
              Discover the progress, market value, and global impact of our title verification system.
            </p>
          </Col>
        </Row>

        <Row>
          {/* Progress Chart */}
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary">Title Verification Requests Progress</Card.Title>
                <Bar data={progressData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Monthly Requests' } } }} />
              </Card.Body>
            </Card>
          </Col>

          {/* Market Value Chart */}
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary">Market Value Over Time</Card.Title>
                <Line data={marketValueData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Market Value ($)' } } }} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Impact on Regions Chart */}
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary">Global User Growth Impact</Card.Title>
                <Bar data={impactData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'User Growth by Region (Thousands)' } } }} />
              </Card.Body>
            </Card>
          </Col>

          {/* Action Section */}
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title className="text-primary">Join Our Growth</Card.Title>
                <Card.Text className="text-muted mb-3">
                  As our system grows, so does its impact on the market and users. Join us in expanding the title verification process globally.
                </Card.Text>
                <Button variant="primary" size="lg" href="/get-started">
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StatisticsPage;
