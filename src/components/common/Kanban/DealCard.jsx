import { useDrag } from 'react-dnd';
import clsx from 'clsx';

export const DEAL_CARD_TYPE = 'DEAL_CARD';

export default function DealCard({ deal }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DEAL_CARD_TYPE,
    item: { id: deal.id, stage: deal.stage },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div ref={dragRef} className={clsx('nx-deal-card', isDragging && 'nx-deal-card--dragging')}>
      <div className="nx-deal-card__title">{deal.title}</div>
      <div className="nx-deal-card__company">{deal.company}</div>
      <div className="nx-deal-card__footer">
        <span className="nx-deal-card__value">${deal.value.toLocaleString()}</span>
        <span className="nx-deal-card__prob">{deal.probability}%</span>
      </div>
    </div>
  );
}
