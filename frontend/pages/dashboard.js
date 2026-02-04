import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { fetchReports } from '../lib/api';

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports()
      .then((data) => setReports(data.items))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <Layout>
      <section className="section">
        <h2>AI Report History</h2>
        <p>Track your latest title analyses and export reports.</p>

        {error ? <p>{error}</p> : null}

        <table className="table">
          <thead>
            <tr>
              <th>Report</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.title}</td>
                <td>{report.score}</td>
                <td>{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
