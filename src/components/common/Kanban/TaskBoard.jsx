import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Badge from '../../common/Badge';
import { PRIORITY_TONE } from '../../../pages/Tasks/taskConfig';

const TASK_CARD_TYPE = 'TASK_CARD';

export function TaskCard({ task }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: TASK_CARD_TYPE,
    item: { id: task.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <Link to={`/tasks/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div ref={dragRef} className={clsx('nx-deal-card', isDragging && 'nx-deal-card--dragging')}>
        <div className="nx-deal-card__title">{task.title}</div>
        <div className="nx-deal-card__company">{task.assignee}</div>
        <div className="nx-deal-card__footer">
          <Badge tone={PRIORITY_TONE[task.priority]}>{task.priority}</Badge>
          <span className="nx-deal-card__prob">{task.dueDate}</span>
        </div>
      </div>
    </Link>
  );
}

export function TaskColumn({ status, tasks, onDropTask }) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: TASK_CARD_TYPE,
    drop: (item) => onDropTask(item.id, status.key),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div className="nx-kanban-col">
      <div className="nx-kanban-col__header">
        <span className="nx-kanban-col__title">
          <span className="nx-kanban-col__dot" style={{ background: status.color }} />
          {status.label}
        </span>
        <span className="nx-kanban-col__count">{tasks.length}</span>
      </div>
      <div ref={dropRef} className={clsx('nx-kanban-col__body', isOver && 'nx-kanban-col__body--over')}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
