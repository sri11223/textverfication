export default function handler(_req, res) {
  res.status(200).json({
    items: [
      {
        id: 'rep_001',
        title: 'AI-assisted diagnostics in radiology',
        score: 82,
        status: 'Complete',
      },
      {
        id: 'rep_002',
        title: 'Graph neural networks for fraud detection',
        score: 76,
        status: 'Queued',
      },
    ],
  });
}
