import { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Switch from '../../components/common/Switch';

export default function SecurityTab() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="nx-settings__section">
      <div className="nx-panel">
        <div className="nx-panel__header"><h4>Change password</h4></div>
        <div className="nx-flex-col nx-gap-4">
          <Input label="Current password" type="password" />
          <Input label="New password" type="password" />
          <Input label="Confirm new password" type="password" />
        </div>
        <div style={{ marginTop: 'var(--space-5)' }}>
          <Button>Update password</Button>
        </div>
      </div>

      <div className="nx-panel">
        <div className="nx-settings__row">
          <div>
            <div className="nx-settings__row-label">Two-factor authentication</div>
            <div className="nx-settings__row-hint">Require a verification code at sign-in.</div>
          </div>
          <Switch checked={twoFactor} onChange={setTwoFactor} />
        </div>
        <div className="nx-settings__row">
          <div>
            <div className="nx-settings__row-label">Active sessions</div>
            <div className="nx-settings__row-hint">You're signed in on 1 device.</div>
          </div>
          <Button variant="ghost" size="sm">Manage</Button>
        </div>
      </div>
    </div>
  );
}
