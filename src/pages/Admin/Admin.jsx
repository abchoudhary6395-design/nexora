import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import DataTable from '../../components/common/DataTable';
import Input from '../../components/common/Input';
import { adminService } from '../../services/api/adminService';

const statusTone = {
  active: 'success',
  inactive: 'neutral',
  suspended: 'danger',
};

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role_id: '',
    },
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await adminService.listUsers({ per_page: 50 });
      setUsers(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not load team members');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const { data } = await adminService.listRoles();
      setRoles(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error('Role fetch failed', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const normalizedUsers = useMemo(
    () =>
      users.map((row) => ({
        ...row,
        role: row.roles?.[0]?.name || row.role || 'Member',
        status: row.status || 'inactive',
        lastActive: row.last_active_at ? new Date(row.last_active_at).toLocaleDateString() : 'Never',
      })),
    [users]
  );

  const columns = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (row) => (
        <div className="nx-table__cell-primary">
          <Avatar name={row.name} size="sm" />
          <div>
            <div>{row.name}</div>
            <div className="nx-text-muted" style={{ fontSize: 'var(--fs-2xs)' }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <Badge tone={statusTone[row.status] || 'neutral'}>{row.status}</Badge>,
    },
    { key: 'lastActive', label: 'Last Active' },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const nextStatus = row.status === 'active' ? 'inactive' : 'active';
            adminService.updateUserStatus(row.id, nextStatus)
              .then(() => {
                toast.success(`${row.name} marked ${nextStatus}`);
                fetchUsers();
              })
              .catch((error) => toast.error(error.response?.data?.message || 'Could not update user status'));
          }}
        >
          {row.status === 'active' ? 'Disable' : 'Enable'}
        </Button>
      ),
    },
  ];

  const onInviteUser = async (values) => {
    setInviting(true);

    try {
      const payload = {
        name: values.name,
        email: values.email,
        role_id: Number(values.role_id),
      };

      await adminService.inviteUser(payload);
      toast.success('User invited successfully');
      setIsInviteOpen(false);
      reset();
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not invite user');
    } finally {
      setInviting(false);
    }
  };

  return (
    <div>
      <div className="nx-page-header">
        <div className="nx-page-header__title">
          <h2>Administration</h2>
          <p style={{ margin: 0 }}>{normalizedUsers.length} team members</p>
        </div>
        <Button leftIcon={<FiUserPlus size={16} />} onClick={() => setIsInviteOpen(true)}>
          Invite User
        </Button>
      </div>

      <DataTable columns={columns} rows={normalizedUsers} pageSize={10} emptyTitle="No team members yet" emptyDescription="Invite your first team member to get started." />

      {isInviteOpen && (
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
          onClick={() => setIsInviteOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 540,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              padding: 'var(--space-6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div>
                <h3 style={{ margin: 0 }}>Invite Team Member</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)' }}>Create a user and assign a role.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 20, cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit(onInviteUser)} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <Input
                label="Full name"
                placeholder="Jane Smith"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />

              <Input
                label="Email"
                type="email"
                placeholder="jane@company.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
              />

              <div className="nx-field">
                <label className="nx-field__label" htmlFor="role_id">Role</label>
                <select
                  id="role_id"
                  className="nx-input"
                  defaultValue=""
                  {...register('role_id', { required: 'Role is required' })}
                >
                  <option value="" disabled>Select a role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {errors.role_id && <span className="nx-field__error">{errors.role_id.message}</span>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <Button type="button" variant="ghost" onClick={() => setIsInviteOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={inviting}>
                  Invite User
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
