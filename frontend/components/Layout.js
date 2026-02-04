import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <div>
          <div className="badge">Text Verification SaaS</div>
        </div>
        <nav>
          <Link href="/">Home</Link>
          {' | '}
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
