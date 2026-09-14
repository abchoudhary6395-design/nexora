import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiPrinter, FiEdit3, FiSave } from 'react-icons/fi';
import { getReportById, buildExportBlob } from './reportConfig';
import Button from '../../components/common/Button';

export default function ReportDetail() {
  const { id } = useParams();
  const initialReport = useMemo(() => getReportById(id), [id]);

  const [report, setReport] = useState(initialReport);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: initialReport.name,
    category: initialReport.category,
    owner: initialReport.owner,
    period: initialReport.period,
    status: initialReport.status,
    summary: initialReport.summary,
    description: initialReport.description,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setReport((prev) => ({ ...prev, ...formData }));
    setIsEditing(false);
  };

  const exportReport = (format = 'pdf') => {
    const blob = buildExportBlob(report, format);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.replace(/\s+/g, '-').toLowerCase()}.${format.toLowerCase()}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Link to="/reports" className="nx-flex nx-items-center nx-gap-2 nx-text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          <FiArrowLeft size={14} /> Back to reports
        </Link>

        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <Button size="sm" variant="secondary" leftIcon={<FiDownload size={13} />} onClick={() => exportReport('pdf')}>PDF</Button>
          <Button size="sm" variant="secondary" leftIcon={<FiDownload size={13} />} onClick={() => exportReport('excel')}>Excel</Button>
          <Button size="sm" variant="ghost" leftIcon={<FiPrinter size={13} />} onClick={() => window.print()}>Print</Button>
        </div>
      </div>

      <div className="nx-card" style={{ padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
          <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Report detail
          </div>

          {!isEditing ? (
            <Button variant="secondary" leftIcon={<FiEdit3 size={14} />} onClick={() => setIsEditing(true)}>Edit</Button>
          ) : (
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button variant="ghost" onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: report.name,
                  category: report.category,
                  owner: report.owner,
                  period: report.period,
                  status: report.status,
                  summary: report.summary,
                  description: report.description,
                });
              }}>Cancel</Button>
              <Button leftIcon={<FiSave size={14} />} onClick={handleSave}>Save</Button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <div className="nx-field">
              <label className="nx-field__label">Report name</label>
              <input className="nx-input" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
              <div className="nx-field">
                <label className="nx-field__label">Category</label>
                <input className="nx-input" value={formData.category} onChange={(e) => handleChange('category', e.target.value)} />
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Owner</label>
                <input className="nx-input" value={formData.owner} onChange={(e) => handleChange('owner', e.target.value)} />
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Period</label>
                <input className="nx-input" value={formData.period} onChange={(e) => handleChange('period', e.target.value)} />
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Status</label>
                <input className="nx-input" value={formData.status} onChange={(e) => handleChange('status', e.target.value)} />
              </div>
            </div>

            <div className="nx-field">
              <label className="nx-field__label">Summary</label>
              <textarea className="nx-input" rows={5} value={formData.summary} onChange={(e) => handleChange('summary', e.target.value)} />
            </div>

            <div className="nx-field">
              <label className="nx-field__label">Description</label>
              <textarea className="nx-input" rows={4} value={formData.description} onChange={(e) => handleChange('description', e.target.value)} />
            </div>
          </div>
        ) : (
          <>
            <h2 style={{ margin: 'var(--space-2) 0 var(--space-4)', fontSize: 'var(--fs-2xl)' }}>{report.name}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
              <InfoCard label="Category" value={report.category} />
              <InfoCard label="Owner" value={report.owner} />
              <InfoCard label="Period" value={report.period} />
              <InfoCard label="Status" value={report.status} />
            </div>

            <div className="nx-card" style={{ marginTop: 'var(--space-5)', padding: 'var(--space-4)' }}>
              <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Summary
              </div>
              <p style={{ marginTop: 'var(--space-3)', lineHeight: 1.7 }}>{report.summary}</p>
            </div>

            <div className="nx-card" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)' }}>
              <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Description
              </div>
              <p style={{ marginTop: 'var(--space-3)', lineHeight: 1.7 }}>{report.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              {report.metrics.map((metric) => (
                <div key={metric.label} className="nx-card" style={{ padding: 'var(--space-3)' }}>
                  <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{metric.label}</div>
                  <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 700, marginTop: 8 }}>{metric.value}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="nx-card" style={{ padding: 'var(--space-3)', display: 'grid', gap: 'var(--space-2)' }}>
      <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}
