import { useParams, Link } from 'react-router-dom';
import { FiPrinter, FiDownload, FiArrowLeft } from 'react-icons/fi';
import Button from '../../components/common/Button';
import InvoiceStatusBadge from '../../components/Invoices/InvoiceStatusBadge';
import { generateMockInvoices } from './mockInvoices';

// Swap for `invoiceService.get(id)` once the Laravel API is running.
const allInvoices = generateMockInvoices(18);

export default function InvoiceDetail() {
  const { id } = useParams();
  const invoice = allInvoices.find((inv) => inv.id === id) || allInvoices[0];

  return (
    <div>
      <Link to="/invoices" className="nx-flex nx-items-center nx-gap-2 nx-text-secondary" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-sm)' }}>
        <FiArrowLeft size={14} /> Back to invoices
      </Link>

      <div className="nx-invoice__actions">
        <Button variant="secondary" leftIcon={<FiDownload size={15} />}>Export PDF</Button>
        <Button leftIcon={<FiPrinter size={15} />} onClick={() => window.print()}>Print</Button>
      </div>

      <div className="nx-invoice">
        <div className="nx-invoice__header">
          <div className="nx-invoice__brand">
            <span className="nx-auth__mark" style={{ width: 40, height: 40 }}>N</span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-lg)' }}>Nexora</div>
              <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Business Operating System</div>
            </div>
          </div>
          <div className="nx-invoice__meta">
            <div className="nx-invoice__id">{invoice.id}</div>
            <InvoiceStatusBadge status={invoice.status} />
          </div>
        </div>

        <div className="nx-invoice__parties">
          <div>
            <div className="nx-invoice__party-label">Billed To</div>
            <div style={{ fontWeight: 600 }}>{invoice.customer}</div>
            <div className="nx-text-muted" style={{ fontSize: 'var(--fs-sm)' }}>billing@{invoice.customer.split(' ')[0].toLowerCase()}.com</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="nx-invoice__party-label">Dates</div>
            <div style={{ fontSize: 'var(--fs-sm)' }}>Issued {invoice.issueDate}</div>
            <div style={{ fontSize: 'var(--fs-sm)' }}>Due {invoice.dueDate}</div>
          </div>
        </div>

        <table className="nx-invoice__table">
          <thead>
            <tr>
              <th>Description</th>
              <th style={{ textAlign: 'right' }}>Qty</th>
              <th style={{ textAlign: 'right' }}>Price</th>
              <th style={{ textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((li, idx) => (
              <tr key={idx}>
                <td>{li.name}</td>
                <td className="nx-numeric" style={{ textAlign: 'right' }}>{li.qty}</td>
                <td className="nx-numeric" style={{ textAlign: 'right' }}>${li.price.toLocaleString()}</td>
                <td className="nx-numeric" style={{ textAlign: 'right' }}>${li.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="nx-invoice__totals">
          <div className="nx-invoice__totals-row">
            <span className="nx-text-muted">Subtotal</span>
            <span className="nx-numeric">${invoice.subtotal.toLocaleString()}</span>
          </div>
          <div className="nx-invoice__totals-row">
            <span className="nx-text-muted">Tax (8%)</span>
            <span className="nx-numeric">${invoice.tax.toLocaleString()}</span>
          </div>
          <div className="nx-invoice__totals-row nx-invoice__totals-row--grand">
            <span>Total Due</span>
            <span className="nx-numeric">${invoice.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
