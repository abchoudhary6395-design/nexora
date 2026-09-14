import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiUsers, FiCalendar, FiDollarSign, FiCheckCircle, FiEdit3, FiSave } from 'react-icons/fi';
import { generateMockProjects } from './mockProjects';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const STATUS_TONE = {
  'On Track': 'success',
  'At Risk': 'warning',
  Delayed: 'danger',
  Completed: 'neutral',
};

const allProjects = generateMockProjects(8);

export default function ProjectDetail() {
  const { id } = useParams();

  const initialProject = useMemo(() => {
    return allProjects.find((item) => item.id === id) || allProjects[0];
  }, [id]);

  const [project, setProject] = useState(initialProject);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: initialProject.name,
    client: initialProject.client,
    status: initialProject.status,
    progress: initialProject.progress,
    budget: initialProject.budget,
    membersCount: initialProject.membersCount,
    dueDate: initialProject.dueDate,
    description: initialProject.description || '',
  });

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setProject((prev) => ({ ...prev, ...formData }));
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Link to="/projects" className="nx-flex nx-items-center nx-gap-2 nx-text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          <FiArrowLeft size={14} /> Back to projects
        </Link>

        <Badge tone={STATUS_TONE[project.status]}>{project.status}</Badge>
      </div>

      <div className="nx-card" style={{ padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
          <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Project overview
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
                  name: project.name,
                  client: project.client,
                  status: project.status,
                  progress: project.progress,
                  budget: project.budget,
                  membersCount: project.membersCount,
                  dueDate: project.dueDate,
                  description: project.description || '',
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
              <label className="nx-field__label">Project name</label>
              <input className="nx-input" value={formData.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
              <div className="nx-field">
                <label className="nx-field__label">Client</label>
                <input className="nx-input" value={formData.client} onChange={(e) => handleFieldChange('client', e.target.value)} />
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Status</label>
                <select className="nx-input" value={formData.status} onChange={(e) => handleFieldChange('status', e.target.value)}>
                  <option value="On Track">On Track</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Progress</label>
                <input className="nx-input" type="number" min="0" max="100" value={formData.progress} onChange={(e) => handleFieldChange('progress', Number(e.target.value))} />
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Due date</label>
                <input className="nx-input" type="date" value={formData.dueDate} onChange={(e) => handleFieldChange('dueDate', e.target.value)} />
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Budget</label>
                <input className="nx-input" type="number" value={formData.budget} onChange={(e) => handleFieldChange('budget', Number(e.target.value))} />
              </div>
              <div className="nx-field">
                <label className="nx-field__label">Team members</label>
                <input className="nx-input" type="number" value={formData.membersCount} onChange={(e) => handleFieldChange('membersCount', Number(e.target.value))} />
              </div>
            </div>

            <div className="nx-field">
              <label className="nx-field__label">Description</label>
              <textarea className="nx-input" rows={6} value={formData.description} onChange={(e) => handleFieldChange('description', e.target.value)} />
            </div>
          </div>
        ) : (
          <>
            <h2 style={{ margin: 'var(--space-2) 0 var(--space-4)', fontSize: 'var(--fs-2xl)' }}>{project.name}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
              <InfoItem icon={<FiUsers size={15} />} label="Client" value={project.client} />
              <InfoItem icon={<FiCalendar size={15} />} label="Due date" value={project.dueDate} />
              <InfoItem icon={<FiDollarSign size={15} />} label="Budget" value={`$${Number(project.budget || 0).toLocaleString()}`} />
              <InfoItem icon={<FiCheckCircle size={15} />} label="Progress" value={`${project.progress}%`} />
            </div>

            <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
              <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Description
              </div>
              <p style={{ marginTop: 'var(--space-3)', lineHeight: 1.7 }}>
                {project.description || 'No project description yet.'}
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
