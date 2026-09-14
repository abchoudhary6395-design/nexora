import { useMemo, useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { usePagination } from '../../../hooks/usePagination';
import Pagination from '../Pagination';
import EmptyState from '../EmptyState';

/**
 * DataTable — the single table implementation reused across every
 * CRM/Task/Invoice list in the app.
 *
 * columns: [{ key, label, sortable, render?(row), align? }]
 * rows: array of plain objects, each needs a unique `id`
 */
export default function DataTable({
  columns,
  rows,
  pageSize = 8,
  emptyTitle = 'No records yet',
  emptyDescription = 'Records will appear here once created.',
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === bv) return 0;
      const result = av > bv ? 1 : -1;
      return sortDir === 'asc' ? result : -result;
    });
  }, [rows, sortKey, sortDir]);

  const { page, setPage, totalPages, paged, total } = usePagination(sortedRows, pageSize);

  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    }
  };

  if (rows.length === 0) {
    return (
      <div className="nx-table-wrap">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className="nx-table-wrap">
      <div style={{ overflowX: 'auto' }}>
        <table className="nx-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{ textAlign: col.align || 'left' }}>
                  {col.sortable ? (
                    <span className="nx-table__sort-btn" onClick={() => toggleSort(col.key)}>
                      {col.label}
                      {sortKey === col.key &&
                        (sortDir === 'asc' ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />)}
                    </span>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key} data-label={col.label} style={{ textAlign: col.align || 'left' }}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} pageSize={pageSize} />
    </div>
  );
}
