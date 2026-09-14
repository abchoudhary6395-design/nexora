import { Link } from 'react-router-dom';
import { FiFileText, FiDownload, FiPrinter } from 'react-icons/fi';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { REPORTS, buildExportBlob } from './reportConfig';

export default function Reports() {
  const handleExport = (name, format) => {
    const report = REPORTS.find((item) => item.name === name) || REPORTS[0];
    const blob = buildExportBlob(report, format);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.replace(/\s+/g, '-').toLowerCase()}.${format.toLowerCase()}`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Exporting "${name}" as ${format}...`);
  };

  return (
    <div>
      <div className="nx-page-header">
        <h2>Reports</h2>
      </div>

      <div className="nx-project-grid">
        {REPORTS.map((r) => (
          <Link to={`/reports/${r.id}`} key={r.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="nx-project-card">
              <div className="nx-flex nx-items-center nx-gap-3">
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 'var(--radius-md)',
                    background: 'var(--color-primary-soft)', color: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  <FiFileText size={18} />
                </div>
                <h4 style={{ margin: 0 }}>{r.name}</h4>
              </div>
              <p style={{ fontSize: 'var(--fs-sm)' }}>{r.description}</p>
              <div className="nx-flex nx-gap-2" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" variant="secondary" leftIcon={<FiDownload size={13} />} onClick={() => handleExport(r.name, 'PDF')}>
                  PDF
                </Button>
                <Button size="sm" variant="secondary" leftIcon={<FiDownload size={13} />} onClick={() => handleExport(r.name, 'Excel')}>
                  Excel
                </Button>
                <Button size="sm" variant="ghost" leftIcon={<FiPrinter size={13} />} onClick={() => window.print()}>
                  Print
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
