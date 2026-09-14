import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import clsx from 'clsx';

export default function Pagination({ page, totalPages, onChange, total, pageSize }) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const pageNumbers = (() => {
    const nums = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, start + 2);
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  })();

  return (
    <div className="nx-pagination">
      <span>
        {from}–{to} of {total}
      </span>
      <div className="nx-pagination__pages">
        <button
          className="nx-pagination__btn"
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <FiChevronLeft size={14} />
        </button>
        {pageNumbers.map((n) => (
          <button
            key={n}
            className={clsx('nx-pagination__btn', n === page && 'nx-pagination__btn--active')}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          className="nx-pagination__btn"
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <FiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
