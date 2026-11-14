// Small built-in status icons (decorative).
import { createElement as h } from 'react';

const PATHS = {
  "info": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5M12 8h.01\"/>",
  "success": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8 12.5l3 3 5-6\"/>",
  "warning": "<path d=\"M12 4l9 16H3z\"/><path d=\"M12 10v4M12 17h.01\"/>",
  "danger": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v6M12 16h.01\"/>"
};

export function StatusIcon({ name }) {
  return h('svg', { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', dangerouslySetInnerHTML: { __html: PATHS[name] } });
}
