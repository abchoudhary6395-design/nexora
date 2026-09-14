import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiCalendar, FiAlertCircle, FiSave, FiEdit3 } from 'react-icons/fi';
import { generateMockTasks, TASK_STATUSES, PRIORITY_TONE } from './taskConfig';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const allTasks = generateMockTasks(20);

export default function TaskDetail() {
  const { id } = useParams();

  const initialTask = useMemo(() => {
    return allTasks.find((item) => item.id === id) || allTasks[0];
  }, [id]);

  const [task, setTask] = useState(initialTask);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: initialTask.title,
    assignee: initialTask.assignee,
    priority: initialTask.priority,
    status: initialTask.status,
    dueDate: initialTask.dueDate,
    description: initialTask.description || '',
  });

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setTask((prev) => ({ ...prev, ...formData }));
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Link to="/tasks" className="nx-flex nx-items-center nx-gap-2 nx-text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          <FiArrowLeft size={14} /> Back to tasks
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Badge tone={PRIORITY_TONE[task.priority]}>{task.priority}</Badge>
          <span className="nx-badge nx-badge--neutral">{TASK_STATUSES.find((s) => s.key === task.status)?.label}</span>
        </div>
      </div>

      <div className="nx-card" style={{ padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
          <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Task details
          </div>

          {!isEditing ? (
            <Button variant="secondary" leftIcon={<FiEdit3 size={14} />} onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button variant="ghost" onClick={() => {
                setIsEditing(false);
                setFormData({
                  title: task.title,
                  assignee: task.assignee,
                  priority: task.priority,
                  status: task.status,
                  dueDate: task.dueDate,
                  description: task.description || '',
                });
              }}>
                Cancel
              </Button>
              <Button leftIcon={<FiSave size={14} />} onClick={handleSave}>Save</Button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <div className="nx-field">
              <label className="nx-field__label">Task title</label>
              <input className="nx-input" value={formData.title} onChange={(e) => handleFieldChange('title', e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
              <div className="nx-field">
                <label className="nx-field__label">Assignee</label>
                <input className="nx-input" value={formData.assignee} onChange={(e) => handleFieldChange('assignee', e.target.value)} />
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Due date</label>
                <input className="nx-input" type="date" value={formData.dueDate} onChange={(e) => handleFieldChange('dueDate', e.target.value)} />
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Priority</label>
                <select className="nx-input" value={formData.priority} onChange={(e) => handleFieldChange('priority', e.target.value)}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Status</label>
                <select className="nx-input" value={formData.status} onChange={(e) => handleFieldChange('status', e.target.value)}>
                  {TASK_STATUSES.map((status) => (
                    <option key={status.key} value={status.key}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="nx-field">
              <label className="nx-field__label">Description</label>
              <textarea
                className="nx-input"
                rows={6}
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
              />
            </div>
          </div>
        ) : (
          <>
            <h2 style={{ margin: 'var(--space-2) 0 var(--space-4)', fontSize: 'var(--fs-2xl)' }}>{task.title}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
              <InfoItem icon={<FiUser size={15} />} label="Assignee" value={task.assignee} />
              <InfoItem icon={<FiCalendar size={15} />} label="Due date" value={task.dueDate} />
              <InfoItem icon={<FiAlertCircle size={15} />} label="Status" value={TASK_STATUSES.find((s) => s.key === task.status)?.label} />
            </div>

            <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
              <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Description
              </div>
              <p style={{ marginTop: 'var(--space-3)', lineHeight: 1.7 }}>
                {task.description || 'No description provided for this task yet.'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="nx-card" style={{ padding: 'var(--space-3)', display: 'grid', gap: 'var(--space-2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)' }}>
        {icon}
        <span className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      </div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}
