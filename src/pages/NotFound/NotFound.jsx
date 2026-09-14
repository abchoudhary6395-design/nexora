import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function NotFound() {
  return (
    <div
      className="nx-flex-col nx-items-center nx-justify-center"
      style={{ height: '100vh', gap: 'var(--space-3)', textAlign: 'center' }}
    >
      <span className="nx-eyebrow">Error 404</span>
      <h1>Page not found</h1>
      <p style={{ maxWidth: 380 }}>The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/dashboard">
        <Button style={{ marginTop: 'var(--space-2)' }}>Back to Dashboard</Button>
      </Link>
    </div>
  );
}
