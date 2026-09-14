import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import DataTable from '../../components/common/DataTable';
import InvoiceStatusBadge from '../../components/Invoices/InvoiceStatusBadge';
import { invoiceService } from '../../services/api/invoiceService';
import { generateMockInvoices } from './mockInvoices';

const allInvoices = generateMockInvoices(18);

export default function Invoices() {
  const [search, setSearch] = useState('');
  const [invoices, setInvoices] = useState(allInvoices);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { customer_id: '', issue_date: '', due_date: '', total: '', notes: '' },
  });

  const filtered = useMemo(() => {
    if (!search) return allInvoices;
    const q = search.toLowerCase();
    return allInvoices.filter(
      (inv) => inv.id.toLowerCase().includes(q) || inv.customer.toLowerCase().includes(q)
    );
  }, [search]);

  const columns = [
    {
      key: 'id',
      label: 'Invoice',
      sortable: true,
      render: (row) => (
        <Link to={`/invoices/${row.id}`} className="nx-numeric" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
          {row.id}
        </Link>
      ),
    },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'issueDate', label: 'Issued', sortable: true },
    { key: 'dueDate', label: 'Due', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <InvoiceStatusBadge status={row.status} />,
    },
    {
      key: 'total',
      label: 'Amount',
      sortable: true,
      align: 'right',
      render: (row) => <span className="nx-numeric" style={{ fontWeight: 600 }}>${row.total.toLocaleString()}</span>,
    },
  ];

  const totalOutstanding = invoices
    .filter((i) => i.status === 'Pending' || i.status === 'Overdue')
    .reduce((s, i) => s + i.total, 0);

  const onCreateInvoice = async (values) => {
    setCreating(true);
    try {
      await invoiceService.create({
        customer_id: Number(values.customer_id || 1),
        issue_date: values.issue_date,
        due_date: values.due_date,
        notes: values.notes || null,
        items: [{ description: 'Service', quantity: 1, unit_price: Number(values.total || 0) }],
      });
      toast.success('Invoice created successfully');
      setIsCreateOpen(false);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create invoice');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="nx-page-header">
        <div className="nx-page-header__title">
          <h2>Invoices</h2>
          <p style={{ margin: 0 }}>
            {invoices.length} invoices · <span className="nx-numeric">${totalOutstanding.toLocaleString()}</span> outstanding
          </p>
        </div>
        <Button leftIcon={<FiPlus size={16} />} onClick={() => setIsCreateOpen(true)}>New Invoice</Button>
      </div>

      <div className="nx-table-toolbar__search" style={{ maxWidth: 320, marginBottom: 'var(--space-4)' }}>
        <FiSearch size={14} />
        <input
          placeholder="Search invoice # or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable columns={columns} rows={filtered} pageSize={8} />

      {isCreateOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,25,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }} onClick={() => setIsCreateOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 520, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div><h3 style={{ margin: 0 }}>Create Invoice</h3><p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)' }}>Generate a new invoice.</p></div>
              <button type="button" onClick={() => setIsCreateOpen(false)} style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleSubmit(onCreateInvoice)} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <Input label="Customer ID" type="number" placeholder="1" error={errors.customer_id?.message} {...register('customer_id', { required: 'Customer ID is required', valueAsNumber: true })} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <Input label="Issue date" type="date" error={errors.issue_date?.message} {...register('issue_date', { required: 'Issue date is required' })} />
                <Input label="Due date" type="date" error={errors.due_date?.message} {...register('due_date', { required: 'Due date is required' })} />
              </div>
              <Input label="Amount" type="number" placeholder="1500" error={errors.total?.message} {...register('total', { required: 'Amount is required', valueAsNumber: true })} />
              <Input label="Notes" placeholder="Invoice details..." error={errors.notes?.message} {...register('notes')} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" loading={creating}>Save Invoice</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
