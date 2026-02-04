import Layout from '../components/Layout';
import FeatureCard from '../components/FeatureCard';

const features = [
  {
    title: 'AI Title Scoring',
    description: 'Quality scoring with breakdowns for clarity, novelty, and specificity.',
  },
  {
    title: 'Similarity Detection',
    description: 'Vector search across journals and preprints to flag overlaps.',
  },
  {
    title: 'Journal Fit',
    description: 'Predict journal matches and domain fit confidence.',
  },
];

export default function Home() {
  return (
    <Layout>
      <section className="hero">
        <h1>Production-grade Title Verification</h1>
        <p>
          Ship research-ready AI workflows with scoring, similarity detection, and
          exportable reports.
        </p>
        <button className="button">Request early access</button>
      </section>

      <section className="section">
        <h2>Platform highlights</h2>
        <div className="grid">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
