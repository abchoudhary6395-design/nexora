import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiSearch, FiPlus, FiUsers } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import DataTable from '../../components/common/DataTable';
import Input from '../../components/common/Input';
import { companyService } from '../../services/api/companyService';
import { generateMockCompanies } from './mockCompanies';

const allCompanies = generateMockCompanies(14);

export default function Companies() {
  const [search, setSearch] = useState('');
  const [companies, setCompanies] = useState(allCompanies);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', industry: '', country: '', city: '', website: '', employees: '', annual_revenue: '' },
  });

  const filtered = useMemo(() => {
    if (!search) return companies;
    const q = search.toLowerCase();
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [search, companies]);

  const columns = [
    {
      key: 'name',
      label: 'Company',
      sortable: true,
      render: (row) => (
        <Link to={`/companies/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="nx-table__cell-primary">
            <Avatar name={row.name} size="sm" />
            <div>{row.name}</div>
          </div>
        </Link>
      ),
    },
    { key: 'industry', label: 'Industry', sortable: true },
    { key: 'country', label: 'Country', sortable: true },
    {
      key: 'employees',
      label: 'Employees',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span className="nx-numeric nx-flex nx-items-center nx-gap-1" style={{ justifyContent: 'flex-end' }}>
          <FiUsers size={12} className="nx-text-muted" /> {row.employees.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'annualRevenue',
      label: 'Annual Revenue',
      sortable: true,
      align: 'right',
      render: (row) => <span className="nx-numeric">${row.annualRevenue.toLocaleString()}</span>,
    },
    {
      key: 'openDeals',
      label: 'Open Deals',
      sortable: true,
      align: 'right',
      render: (row) => <span className="nx-numeric">{row.openDeals}</span>,
    },
    { key: 'owner', label: 'Owner' },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <Link to={`/companies/${row.id}`} className="nx-btn nx-btn--ghost nx-btn--sm">
          View
        </Link>
      ),
    },
  ];

  const onCreateCompany = async (values) => {
    setCreating(true);
    try {
      const payload = {
        name: values.name,
        industry: values.industry || null,
        country: values.country || null,
        city: values.city || null,
        website: values.website || null,
        employees: values.employees ? Number(values.employees) : null,
        annual_revenue: values.annual_revenue ? Number(values.annual_revenue) : null,
      };

      const { data } = await companyService.create(payload);
      const created = {
        id: data?.id || `CO-${Date.now()}`,
        name: data?.name || values.name,
        industry: data?.industry || values.industry || 'General',
        country: data?.country || values.country || 'Unknown',
        employees: Number(data?.employees || values.employees || 0),
        annualRevenue: Number(data?.annual_revenue || values.annual_revenue || 0),
        openDeals: 0,
        owner: 'You',
      };

      setCompanies((prev) => [created, ...prev]);
      setIsCreateOpen(false);
      reset();
      toast.success('Company created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create company');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="nx-page-header">
        <div className="nx-page-header__title">
          <h2>Companies</h2>
          <p style={{ margin: 0 }}>{filtered.length} of {companies.length} companies</p>
        </div>
        <Button leftIcon={<FiPlus size={16} />} onClick={() => setIsCreateOpen(true)}>New Company</Button>
      </div>

      <div className="nx-table-toolbar__search" style={{ maxWidth: 320, marginBottom: 'var(--space-4)' }}>
        <FiSearch size={14} />
        <input
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        rows={filtered}
        pageSize={8}
        emptyTitle="No companies match your search"
        emptyDescription="Try a different search term, or add a new company."
      />

      {isCreateOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,25,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }} onClick={() => setIsCreateOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div><h3 style={{ margin: 0 }}>Add New Company</h3><p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)' }}>Create a new company profile.</p></div>
              <button type="button" onClick={() => setIsCreateOpen(false)} style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleSubmit(onCreateCompany)} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <Input label="Company name" placeholder="Acme Inc." error={errors.name?.message} {...register('name', { required: 'Company name is required' })} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <Input label="Industry" placeholder="SaaS" error={errors.industry?.message} {...register('industry')} />
                <Input label="Website" placeholder="https://acme.com" error={errors.website?.message} {...register('website')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <Input label="Country" placeholder="USA" error={errors.country?.message} {...register('country')} />
                <Input label="City" placeholder="New York" error={errors.city?.message} {...register('city')} />
                <Input label="Employees" type="number" placeholder="120" error={errors.employees?.message} {...register('employees')} />
              </div>
              <Input label="Annual revenue" type="number" placeholder="500000" error={errors.annual_revenue?.message} {...register('annual_revenue')} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" loading={creating}>Save Company</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
