// ISA Design System: Table (React). Needs isa-design-system/components.css loaded.
// Docs: docs/components/table.md
// Presentation only: sorting, filtering and paging of the data are done by the project
// (plain code or a library such as TanStack Table); this component shows the result.
import { createElement as h, useId } from 'react';

const cx = (...parts) => parts.filter(Boolean).join(' ');
const sortIcon = h(
  'svg',
  { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
  h('path', { d: 'M12 19V5M6 11l6-6 6 6' }),
);

export function Table({ columns, rows, caption, captionHidden = false, sort, onSortChange, rowKey, compact = false, stickyFirst = false, className, ...rest }) {
  const captionId = useId();
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && !caption && !rest['aria-label'] && !rest['aria-labelledby']) {
    console.error('[isa] Table: give the table a caption (or aria-label).');
  }
  const nextSort = (key) => onSortChange && onSortChange({ key, direction: sort && sort.key === key && sort.direction === 'ascending' ? 'descending' : 'ascending' });
  const cellClass = (col) => (col.align === 'right' ? 'isa-table__num' : undefined);

  return h(
    'div',
    { className: 'isa-table-wrap', role: 'region', tabIndex: 0, 'aria-labelledby': caption ? captionId : rest['aria-labelledby'], 'aria-label': caption ? undefined : rest['aria-label'] },
    h(
      'table',
      { className: cx('isa-table', compact && 'isa-table--compact', stickyFirst && 'isa-table--sticky-first', className) },
      caption ? h('caption', { id: captionId, className: captionHidden ? 'isa-visually-hidden' : undefined }, caption) : null,
      h(
        'thead',
        null,
        h(
          'tr',
          null,
          columns.map((col) =>
            h(
              'th',
              { key: col.key, scope: 'col', className: cellClass(col), 'aria-sort': col.sortable ? (sort && sort.key === col.key ? sort.direction : 'none') : undefined },
              col.sortable ? h('button', { type: 'button', className: 'isa-table__sort', onClick: () => nextSort(col.key) }, col.header, sortIcon) : col.header,
            ),
          ),
        ),
      ),
      h(
        'tbody',
        null,
        rows.map((row, index) =>
          h(
            'tr',
            { key: rowKey ? rowKey(row, index) : index },
            columns.map((col) => {
              const content = col.render ? col.render(row, index) : row[col.key];
              return col.rowHeader ? h('th', { key: col.key, scope: 'row', className: cellClass(col) }, content) : h('td', { key: col.key, className: cellClass(col) }, content);
            }),
          ),
        ),
      ),
    ),
  );
}
