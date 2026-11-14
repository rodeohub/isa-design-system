// Renders the React components to HTML and checks the output. Needs react and react-dom:
//   npm install --no-save react react-dom && node scripts/test-react.mjs
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import { Button, Badge } from '../react/index.js';

const eq = (el, html) => assert.equal(render(el), html);

eq(h(Button, null, 'Save'), '<button class="isa-button" type="button">Save</button>');
eq(h(Button, { variant: 'danger', size: 'small', type: 'submit' }, 'Delete'), '<button class="isa-button isa-button--danger isa-button--small" type="submit">Delete</button>');
eq(h(Button, { href: '/events', variant: 'secondary' }, 'Events'), '<a href="/events" class="isa-button isa-button--secondary">Events</a>');
eq(h(Button, { disabled: true }, 'Save'), '<button class="isa-button" type="button" disabled="">Save</button>');
eq(h(Button, { loading: true }, 'Saving…'), '<button class="isa-button" type="button" aria-busy="true" aria-disabled="true">Saving…</button>');
eq(h(Button, { href: '/x', disabled: true }, 'Go'), '<a class="isa-button" aria-disabled="true">Go</a>');
eq(h(Button, { iconOnly: true, variant: 'ghost', 'aria-label': 'Close' }, 'x'), '<button aria-label="Close" class="isa-button isa-button--ghost isa-button--icon" type="button">x</button>');
const Link = ({ to, ...p }) => h('a', { href: to, ...p });
eq(h(Button, { as: Link, to: '/home', fullWidth: true }, 'Home'), '<a href="/home" class="isa-button isa-button--full">Home</a>');

eq(h(Badge, null, 'Youth'), '<span class="isa-badge">Youth</span>');
eq(h(Badge, { color: 'violet', variant: 'outline' }, 'Rigging'), '<span class="isa-badge isa-badge--violet isa-badge--outline">Rigging</span>');
eq(h(Badge, { color: 'danger', className: 'x' }, 'Cancelled'), '<span class="isa-badge isa-badge--danger x">Cancelled</span>');

console.log('React components: all checks passed.');
