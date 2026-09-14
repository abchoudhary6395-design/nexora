import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileTab() {
  const { user } = useAuth();

  return (
    <div className="nx-settings__section">
      <div className="nx-panel">
        <div className="nx-flex nx-items-center nx-gap-4" style={{ marginBottom: 'var(--space-5)' }}>
          <Avatar name={user?.name || 'Guest User'} size="lg" />
          <div>
            <Button size="sm" variant="secondary">Change photo</Button>
          </div>
        </div>
        <div className="nx-field-grid">
          <Input label="First name" defaultValue={user?.name?.split(' ')[0] || ''} />
          <Input label="Last name" defaultValue={user?.name?.split(' ')[1] || ''} />
          <Input label="Email address" type="email" defaultValue={user?.email || ''} />
          <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
        </div>
        <div style={{ marginTop: 'var(--space-5)' }}>
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
}
