import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import DataTable from '../../components/common/DataTable';
import Input from '../../components/common/Input';
import TagBadge from '../../components/CRM/TagBadge';
import { customerService } from '../../services/api/customerService';
import { generateMockCustomers } from './mockCustomers';

// Swap for `customerService.list()` once the Laravel API is running.
const allCustomers = generateMockCustomers(26);

export default function Customers() {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState(allCustomers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
    },
  });

  const filtered = useMemo(() => {
    if (!search) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || (c.company || '').toLowerCase().includes(q)
    );
  }, [customers, search]);

  const columns = [
    {
      key: 'name',
      label: 'Customer',
      sortable: true,
      render: (row) => (
        <Link to={`/customers/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="nx-table__cell-primary">
            <Avatar name={row.name} size="sm" />
            <div>
              <div>{row.name}</div>
              <div className="nx-text-muted" style={{ fontSize: 'var(--fs-2xs)' }}>{row.company || '—'}</div>
            </div>
          </div>
        </Link>
      ),
    },
    { key: 'industry', label: 'Industry', sortable: true },
    {
      key: 'lifetimeValue',
      label: 'Lifetime Value',
      sortable: true,
      align: 'right',
      render: (row) => <span className="nx-numeric">${Number(row.lifetimeValue || 0).toLocaleString()}</span>,
    },
    {
      key: 'openInvoices',
      label: 'Open Invoices',
      sortable: true,
      align: 'right',
      render: (row) => <span className="nx-numeric">{row.openInvoices || 0}</span>,
    },
    {
      key: 'tag',
      label: 'Tag',
      render: (row) => <TagBadge tag={row.tag || 'New'} />,
    },
    { key: 'lastActivity', label: 'Last Activity', sortable: true },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <Link to={`/customers/${row.id}`} className="nx-btn nx-btn--ghost nx-btn--sm">
          View
        </Link>
      ),
    },
  ];

  const onCreateCustomer = async (values) => {
    setCreating(true);

    try {
      const payload = {
        name: values.name,
        email: values.email || null,
        phone: values.phone || null,
        company: values.company || null,
        industry: values.industry || null,
      };

      const { data } = await customerService.create(payload);
      const createdCustomer = {
        id: data?.id || `CU-${Date.now()}`,
        name: data?.name || values.name,
        company: data?.company?.name || values.company || 'New company',
        email: data?.email || values.email || '',
        industry: data?.industry || values.industry || 'General',
        lifetimeValue: 0,
        openInvoices: 0,
        tag: 'New',
        lastActivity: new Date().toISOString().slice(0, 10),
      };

      setCustomers((prev) => [createdCustomer, ...prev]);
      setIsCreateOpen(false);
      reset();
      toast.success('Customer created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create customer');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="nx-page-header">
        <div className="nx-page-header__title">
          <h2>Customers</h2>
          <p style={{ margin: 0 }}>{filtered.length} of {customers.length} customers</p>
        </div>
        <Button leftIcon={<FiPlus size={16} />} onClick={() => setIsCreateOpen(true)}>
          New Customer
        </Button>
      </div>

      <div className="nx-table-toolbar__search" style={{ maxWidth: 320, marginBottom: 'var(--space-4)' }}>
        <FiSearch size={14} />
        <input
          placeholder="Search customers or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        rows={filtered}
        pageSize={8}
        emptyTitle="No customers match your search"
        emptyDescription="Try a different search term, or add a new customer."
      />

      {isCreateOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 14, 25, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 560,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              padding: 'var(--space-6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div>
                <h3 style={{ margin: 0 }}>Add New Customer</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)' }}>Create a new customer profile.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--color-text-muted)',
                  fontSize: 20,
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit(onCreateCustomer)} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <Input
                label="Full name"
                placeholder="John Smith"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="john@company.com"
                  error={errors.email?.message}
                  {...register('email', {
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                />
                <Input
                  label="Phone"
                  placeholder="+1 555 000 0000"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <Input
                  label="Company"
                  placeholder="Acme Inc."
                  error={errors.company?.message}
                  {...register('company')}
                />
                <Input
                  label="Industry"
                  placeholder="SaaS"
                  error={errors.industry?.message}
                  {...register('industry')}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={creating}>
                  Save Customer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
