import { useDrop } from 'react-dnd';
import clsx from 'clsx';
import { DEAL_CARD_TYPE } from './DealCard';
import DealCard from './DealCard';

export default function KanbanColumn({ stage, deals, onDropDeal }) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: DEAL_CARD_TYPE,
    drop: (item) => onDropDeal(item.id, stage.key),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  const total = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="nx-kanban-col">
      <div className="nx-kanban-col__header">
        <span className="nx-kanban-col__title">
          <span className="nx-kanban-col__dot" style={{ background: stage.color }} />
          {stage.label}
        </span>
        <span className="nx-kanban-col__count">{deals.length}</span>
      </div>
      <div className="nx-kanban-col__total">${total.toLocaleString()}</div>
      <div ref={dropRef} className={clsx('nx-kanban-col__body', isOver && 'nx-kanban-col__body--over')}>
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
}
