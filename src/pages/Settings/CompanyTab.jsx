import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function CompanyTab() {
  return (
    <div className="nx-settings__section">
      <div className="nx-panel">
        <div className="nx-panel__header"><h4>Company details</h4></div>
        <div className="nx-field-grid">
          <Input label="Company name" defaultValue="Nexora Inc." />
          <Input label="Industry" defaultValue="Software" />
          <Input label="Website" defaultValue="https://nexora.com" />
          <Input label="Country" defaultValue="United States" />
        </div>
      </div>

      <div className="nx-panel">
        <div className="nx-panel__header"><h4>Regional settings</h4></div>
        <div className="nx-field-grid">
          <Input label="Currency" defaultValue="USD ($)" />
          <Input label="Timezone" defaultValue="(UTC-05:00) Eastern Time" />
        </div>
        <div style={{ marginTop: 'var(--space-5)' }}>
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
}
