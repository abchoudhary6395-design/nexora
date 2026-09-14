import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import ViewToggle from '../../components/common/ViewToggle';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import { TaskColumn } from '../../components/common/Kanban/TaskBoard';
import { taskService } from '../../services/api/taskService';
import { TASK_STATUSES, PRIORITY_TONE, generateMockTasks } from './taskConfig';

const VIEWS = [
  { key: 'list', label: 'List' },
  { key: 'board', label: 'Board' },
];

export default function Tasks() {
  const [view, setView] = useState('board');
  const [tasks, setTasks] = useState(() => generateMockTasks(20));
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '', priority: 'Medium', due_date: '', description: '' },
  });

  const handleDrop = (taskId, newStatus) => {
    setTasks((prev) => {
      const moved = prev.find((t) => t.id === taskId);
      if (!moved || moved.status === newStatus) return prev;
      toast.success(`Moved to ${TASK_STATUSES.find((s) => s.key === newStatus).label}`);
      return prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
    });
  };

  const columns = [
    {
      key: 'title',
      label: 'Task',
      sortable: true,
      render: (row) => (
        <Link to={`/tasks/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {row.title}
        </Link>
      ),
    },
    { key: 'assignee', label: 'Assignee', sortable: true },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (row) => <Badge tone={PRIORITY_TONE[row.priority]}>{row.priority}</Badge>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => TASK_STATUSES.find((s) => s.key === row.status)?.label,
    },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <Link to={`/tasks/${row.id}`} className="nx-btn nx-btn--ghost nx-btn--sm">
          View
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="nx-page-header">
        <div className="nx-page-header__title">
          <h2>Tasks</h2>
          <p style={{ margin: 0 }}>{tasks.length} tasks across the team</p>
        </div>
        <div className="nx-flex nx-items-center nx-gap-3">
          <ViewToggle views={VIEWS} active={view} onChange={setView} />
          <Button leftIcon={<FiPlus size={16} />} onClick={() => setIsCreateOpen(true)}>New Task</Button>
        </div>
      </div>

      {view === 'list' ? (
        <DataTable columns={columns} rows={tasks} pageSize={10} />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className="nx-kanban">
            {TASK_STATUSES.map((status) => (
              <TaskColumn
                key={status.key}
                status={status}
                tasks={tasks.filter((t) => t.status === status.key)}
                onDropTask={handleDrop}
              />
            ))}
          </div>
        </DndProvider>
      )}

      {isCreateOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,25,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }} onClick={() => setIsCreateOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 520, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div><h3 style={{ margin: 0 }}>Add New Task</h3><p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)' }}>Create a work item for the team.</p></div>
              <button type="button" onClick={() => setIsCreateOpen(false)} style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleSubmit(async (values) => {
              setCreating(true);
              try {
                await taskService.create({
                  title: values.title,
                  description: values.description || null,
                  priority: values.priority,
                  status: 'todo',
                  due_date: values.due_date || null,
                });
                toast.success('Task created successfully');
                setIsCreateOpen(false);
                reset();
              } catch (error) {
                toast.error(error.response?.data?.message || 'Could not create task');
              } finally {
                setCreating(false);
              }
            })} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <Input label="Title" placeholder="Prepare Q3 proposal" error={errors.title?.message} {...register('title', { required: 'Title is required' })} />
              <Input label="Description" placeholder="Summary and next steps..." error={errors.description?.message} {...register('description')} />
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
                <Input label="Due date" type="date" error={errors.due_date?.message} {...register('due_date')} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" loading={creating}>Save Task</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
