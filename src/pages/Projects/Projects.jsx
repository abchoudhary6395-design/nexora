import { Link } from 'react-router-dom';
import { FiPlus, FiUsers, FiCalendar } from 'react-icons/fi';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { generateMockProjects } from './mockProjects';

const STATUS_TONE = {
  'On Track': 'success',
  'At Risk': 'warning',
  Delayed: 'danger',
  Completed: 'neutral',
};

// Swap for `projectService.list()` once the Laravel API is running.
const projects = generateMockProjects(8);

export default function Projects() {
  return (
    <div>
      <div className="nx-page-header">
        <div className="nx-page-header__title">
          <h2>Projects</h2>
          <p style={{ margin: 0 }}>{projects.length} active workspaces</p>
        </div>
        <Button leftIcon={<FiPlus size={16} />}>New Project</Button>
      </div>

      <div className="nx-project-grid">
        {projects.map((p) => (
          <Link to={`/projects/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="nx-project-card">
              <div className="nx-project-card__header">
                <div>
                  <h4>{p.name}</h4>
                  <div className="nx-project-card__client">{p.client}</div>
                </div>
                <Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge>
              </div>

            <div>
              <div className="nx-flex nx-justify-between" style={{ marginBottom: 6, fontSize: 'var(--fs-xs)' }}>
                <span className="nx-text-muted">Progress</span>
                <span className="nx-numeric">{p.progress}%</span>
              </div>
              <div className="nx-progress-bar">
                <div className="nx-progress-bar__fill" style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <div className="nx-project-card__meta">
              <span className="nx-flex nx-items-center nx-gap-1">
                <FiUsers size={13} /> {p.membersCount} members
              </span>
              <span className="nx-flex nx-items-center nx-gap-1">
                <FiCalendar size={13} /> {p.dueDate}
              </span>
            </div>

              <div className="nx-numeric" style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>
                ${p.budget.toLocaleString()} budget
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
