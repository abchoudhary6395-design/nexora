import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiSearch, FiPlus, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import DataTable from '../../components/common/DataTable';
import Input from '../../components/common/Input';
import { LeadStatusBadge, LeadScore } from '../../components/CRM/StatusBadges';
import { leadService } from '../../services/api/leadService';
import { generateMockLeads } from './mockLeads';

const STATUS_FILTERS = ['All', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];

const allLeads = generateMockLeads(32);

export default function Leads() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [leads, setLeads] = useState(allLeads);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', company_name: '', email: '', phone: '', priority: 'Medium', lead_status_id: '1' },
  });

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesSearch =
        !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter, leads]);

  const columns = [
    {
      key: 'name',
      label: 'Lead',
      sortable: true,
      render: (row) => (
        <Link to={`/leads/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="nx-table__cell-primary">
            <Avatar name={row.name} size="sm" />
            <div>
              <div>{row.name}</div>
              <div className="nx-text-muted" style={{ fontSize: 'var(--fs-2xs)' }}>{row.company}</div>
            </div>
          </div>
        </Link>
      ),
    },
    { key: 'source', label: 'Source', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <LeadStatusBadge status={row.status} />,
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (row) => <LeadScore score={row.score} />,
    },
    {
      key: 'revenue',
      label: 'Expected Revenue',
      sortable: true,
      align: 'right',
      render: (row) => <span className="nx-numeric">${row.revenue.toLocaleString()}</span>,
    },
    {
      key: 'owner',
      label: 'Owner',
      render: (row) => (
        <span className="nx-flex nx-items-center nx-gap-2">
          <FiUser size={13} className="nx-text-muted" /> {row.owner}
        </span>
      ),
    },
    { key: 'createdAt', label: 'Created', sortable: true },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <Link to={`/leads/${row.id}`} className="nx-btn nx-btn--ghost nx-btn--sm">
          View
        </Link>
      ),
    },
  ];

  const onCreateLead = async (values) => {
    setCreating(true);
    try {
      const payload = {
        name: values.name,
        company_name: values.company_name || null,
        email: values.email || null,
        phone: values.phone || null,
        priority: values.priority,
        lead_status_id: Number(values.lead_status_id),
      };

      const { data } = await leadService.create(payload);
      const createdLead = {
        id: data?.id || `LD-${Date.now()}`,
        name: data?.name || values.name,
        company: data?.company_name || values.company_name || 'New company',
        status: 'New',
        source: 'Manual Entry',
        score: 50,
        revenue: Number(data?.expected_revenue || 0),
        owner: 'You',
        createdAt: new Date().toISOString().slice(0, 10),
      };

      setLeads((prev) => [createdLead, ...prev]);
      setIsCreateOpen(false);
      reset();
      toast.success('Lead created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create lead');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="nx-page-header">
        <div className="nx-page-header__title">
          <h2>Leads</h2>
          <p style={{ margin: 0 }}>{filtered.length} of {leads.length} leads</p>
        </div>
        <Button leftIcon={<FiPlus size={16} />} onClick={() => setIsCreateOpen(true)}>New Lead</Button>
      </div>

      <div className="nx-table-toolbar__search" style={{ maxWidth: 320, marginBottom: 'var(--space-4)' }}>
        <FiSearch size={14} />
        <input
          placeholder="Search leads or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="nx-filter-bar">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            className={`nx-filter-chip ${statusFilter === status ? 'nx-filter-chip--active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={filtered}
        pageSize={8}
        emptyTitle="No leads match your filters"
        emptyDescription="Try a different status or search term, or create a new lead."
      />

      {isCreateOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,25,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }} onClick={() => setIsCreateOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div><h3 style={{ margin: 0 }}>Add New Lead</h3><p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)' }}>Create a new sales lead.</p></div>
              <button type="button" onClick={() => setIsCreateOpen(false)} style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleSubmit(onCreateLead)} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <Input label="Full name" placeholder="Jane Smith" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <Input label="Company" placeholder="Acme Inc." error={errors.company_name?.message} {...register('company_name')} />
                <Input label="Phone" placeholder="+1 555 000 0000" error={errors.phone?.message} {...register('phone')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <Input label="Email" type="email" placeholder="jane@company.com" error={errors.email?.message} {...register('email', { pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} />
                <div className="nx-field">
                  <label className="nx-field__label" htmlFor="lead_status_id">Status</label>
                  <select id="lead_status_id" className="nx-input" defaultValue="1" {...register('lead_status_id')}>
                    <option value="1">New</option>
                    <option value="2">Contacted</option>
                    <option value="3">Qualified</option>
                    <option value="4">Proposal Sent</option>
                    <option value="5">Negotiation</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <div className="nx-field">
                  <label className="nx-field__label" htmlFor="priority">Priority</label>
                  <select id="priority" className="nx-input" defaultValue="Medium" {...register('priority')}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <Input label="Expected revenue" type="number" placeholder="25000" {...register('expected_revenue')} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" loading={creating}>Save Lead</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
