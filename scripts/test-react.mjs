// Renders the React components to HTML and checks the output. Needs react and react-dom:
//   npm install --no-save react react-dom && node scripts/test-react.mjs
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import { pageList } from '../react/Pagination.js';
import { initials } from '../react/Avatar.js';
import { Button, Badge, Alert, TextField, TextArea, SelectField, Checkbox, Radio, Fieldset, Tabs, Dialog, Card, CardGrid, Table, Spinner, Tooltip, Drawer, Avatar, Header, Nav, Footer, SkipLink, Pagination, Breadcrumbs, EmptyState, ToastProvider, useToast, Autocomplete, Filters, Page, Main, PageTitle, Hero } from '../react/index.js';

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

const has = (el, ...parts) => { const out = render(el); for (const p of parts) assert.ok(out.includes(p), `missing ${p} in ${out}`); };
const lacks = (el, part) => assert.ok(!render(el).includes(part));

has(h(Alert, null, 'Hi'), '<div role="status" class="isa-alert"><svg aria-hidden="true"', '<div class="isa-alert__body">Hi</div>');
has(h(Alert, { variant: 'danger', title: 'Failed' }, 'Try again'), 'role="alert"', 'isa-alert isa-alert--danger', '<strong class="isa-alert__title">Failed</strong>Try again');
lacks(h(Alert, { icon: false }, 'Hi'), '<svg');

has(h(TextField, { label: 'Email', id: 'e', type: 'email' }), '<div class="isa-field"><label class="isa-label" for="e">Email</label><input id="e" type="email" class="isa-input"/></div>');
has(h(TextField, { label: 'Email', id: 'e', help: 'We reply here', error: 'Enter an email' }),
  '<p class="isa-help" id="e-help">We reply here</p>', 'aria-describedby="e-help e-error"', 'aria-invalid="true"', '<p class="isa-error" id="e-error"><svg');
has(h(TextField, { label: 'Website', id: 'w', optional: true }), '<span class="isa-label__optional"> (optional)</span>');
has(h(TextArea, { label: 'Notes', id: 'n' }), '<textarea id="n" rows="3" class="isa-input"></textarea>');
has(h(SelectField, { label: 'Country', id: 'c' }, h('option', null, 'CH')), '<span class="isa-select"><select id="c"><option>CH</option></select></span>');
eq(h(Checkbox, { label: 'Agree', name: 'a' }), '<label class="isa-check"><input type="checkbox" name="a"/><span>Agree</span></label>');
eq(h(Radio, { name: 'g', value: 'w' }, 'Women'), '<label class="isa-check"><input type="radio" name="g" value="w"/><span>Women</span></label>');
has(h(Fieldset, { legend: 'Category', id: 'f', error: 'Choose one' }), '<fieldset id="f" class="isa-fieldset" aria-describedby="f-error"><legend class="isa-label">Category</legend>', 'id="f-error"');
const auto = render(h(TextField, { label: 'Auto' }));
assert.equal(auto.match(/for="([^"]+)"/)[1], auto.match(/<input id="([^"]+)"/)[1]);

const tabs = render(h(Tabs, { 'aria-label': 'Sections', tabs: [{ id: 'a', label: 'A', content: 'Panel A' }, { id: 'b', label: 'B', content: 'Panel B' }, { id: 'c', label: 'C', disabled: true }] }));
for (const part of ['role="tablist"', 'class="isa-tabs"', 'aria-label="Sections"', 'aria-selected="true"', 'tabindex="-1"', 'role="tabpanel"', 'hidden=""', 'Panel B', 'disabled=""']) assert.ok(tabs.includes(part), `Tabs: missing ${part}`);
assert.equal((tabs.match(/aria-selected="true"/g) || []).length, 1);
has(h(Tabs, { 'aria-label': 'Cat', variant: 'pill', size: 'large', value: 'm', tabs: [{ id: 'w', label: 'Women' }, { id: 'm', label: 'Men' }] }), 'class="isa-tabs isa-tabs--pill isa-tabs--large"');
lacks(h(Tabs, { 'aria-label': 'Cat', tabs: [{ id: 'w', label: 'Women' }] }), 'tabpanel');

eq(h(Dialog, { open: false, onClose() {}, title: 'Edit' }, 'Body'), render(h('dialog', { className: 'isa-dialog', 'aria-labelledby': render(h(Dialog, { open: false, onClose() {}, title: 'Edit' })).match(/aria-labelledby="([^"]+)"/)[1] })));
has(h(Dialog, { open: true, onClose() {}, title: 'Edit profile', actions: h(Button, null, 'Save') }, 'Body'),
  '<h2 class="isa-dialog__title"', 'Edit profile</h2>', 'aria-label="Close"', '<div class="isa-dialog__body">Body</div>', '<div class="isa-dialog__footer"><button class="isa-button" type="button">Save</button></div>');

has(h(Card, { title: 'Open', href: '/e/1', meta: 'Bern', image: { src: '/a.jpg', alt: 'Highliner' }, footer: h(Badge, null, 'New') }, h('p', null, 'Text')),
  '<article class="isa-card">', '<div class="isa-card__media"><img loading="lazy" src="/a.jpg" alt="Highliner"/></div>', '<h3 class="isa-card__title"><a class="isa-card__link" href="/e/1">Open</a></h3>', '<p class="isa-card__meta">Bern</p>', '<p>Text</p>', '<div class="isa-card__footer">');
has(h(Card, { title: 'Plain', layout: 'horizontal', elevated: true, titleAs: 'h2' }), 'class="isa-card isa-card--horizontal isa-card--elevated"', '<h2 class="isa-card__title">Plain</h2>');
lacks(h(Card, { title: 'Plain' }), 'isa-card__media');
eq(h(CardGrid, null, h(Card, { title: 'A' }), h(Card, { title: 'B' })), '<ul class="isa-card-grid"><li><article class="isa-card"><div class="isa-card__body"><h3 class="isa-card__title">A</h3></div></article></li><li><article class="isa-card"><div class="isa-card__body"><h3 class="isa-card__title">B</h3></div></article></li></ul>');

const table = render(h(Table, { caption: 'Ranking', sort: { key: 'rank', direction: 'ascending' }, columns: [{ key: 'rank', header: 'Rank', align: 'right', sortable: true }, { key: 'name', header: 'Athlete', rowHeader: true }, { key: 'pts', header: 'Points', align: 'right', sortable: true, render: (r) => r.pts * 2 }], rows: [{ rank: 1, name: 'A', pts: 5 }] }));
for (const part of ['class="isa-table-wrap" role="region" tabindex="0"', '<caption', 'Ranking</caption>', '<th scope="col" class="isa-table__num" aria-sort="ascending"><button type="button" class="isa-table__sort">Rank<svg', 'aria-sort="none"', '<th scope="row">A</th>', '<td class="isa-table__num">10</td>']) assert.ok(table.includes(part), `Table: missing ${part} in ${table}`);
has(h(Table, { caption: 'X', captionHidden: true, compact: true, stickyFirst: true, columns: [], rows: [] }), 'class="isa-table isa-table--compact isa-table--sticky-first"', 'class="isa-visually-hidden"');

eq(h(Spinner, null), '<span role="status" class="isa-spinner"><span class="isa-visually-hidden">Loading</span></span>');
eq(h(Spinner, { size: 'large', inherit: true, label: 'Saving' }), '<span role="status" class="isa-spinner isa-spinner--large isa-spinner--inherit"><span class="isa-visually-hidden">Saving</span></span>');

const tip = render(h(Tooltip, { content: 'Help', placement: 'bottom', align: 'start' }));
for (const part of ['class="isa-tooltip isa-tooltip--bottom isa-tooltip--start"', 'aria-label="More information"', 'role="tooltip"', '>Help</span>']) assert.ok(tip.includes(part), `Tooltip: missing ${part}`);
assert.equal(tip.match(/aria-describedby="([^"]+)"/)[1], tip.match(/role="tooltip" id="([^"]+)"/)[1]);
has(h(Tooltip, { content: 'Downloads CSV' }, h(Button, { variant: 'neutral' }, 'Export')), '<button aria-describedby="', 'class="isa-button isa-button--neutral" type="button">Export</button>');

has(h(Drawer, { open: true, onClose() {}, title: 'Menu', side: 'start' }, 'Body'), '<dialog class="isa-drawer isa-drawer--start"', '<h2 class="isa-drawer__title"', 'Menu</h2>', 'aria-label="Close"', '<div class="isa-drawer__body">Body</div>');
lacks(h(Drawer, { open: false, onClose() {}, title: 'Menu' }, 'Body'), 'Body');

assert.equal(initials('Lena Maria Example'), 'LE'); assert.equal(initials('lena'), 'L'); assert.equal(initials(''), '');
eq(h(Avatar, { name: 'Lena Example' }), '<span class="isa-avatar" role="img" aria-label="Lena Example">LE</span>');
eq(h(Avatar, { name: 'Lena Example', src: '/l.jpg', size: 'large', square: true }), '<span class="isa-avatar isa-avatar--large isa-avatar--square"><img loading="lazy" src="/l.jpg" alt="Lena Example"/></span>');
eq(h(Avatar, { name: 'Lena Example', size: 'small', decorative: true }), '<span class="isa-avatar isa-avatar--small" aria-hidden="true">LE</span>');

const items = [{ href: '/', label: 'Home' }, { href: '/rankings', label: 'Rankings', current: true }];
eq(h(Nav, { items, 'aria-label': 'Main' }), '<nav aria-label="Main"><ul class="isa-nav"><li><a class="isa-nav__link" href="/">Home</a></li><li><a class="isa-nav__link" href="/rankings" aria-current="page">Rankings</a></li></ul></nav>');
const header = render(h(Header, { brand: 'Sport Hub', items, actions: h(Button, { variant: 'secondary', size: 'small' }, 'Sign in') }));
for (const part of ['<header class="isa-header" data-isa-surface="brand">', '<a class="isa-header__brand" href="/">Sport Hub</a>', '<nav aria-label="Main" class="isa-header__nav">', 'class="isa-header__menu-button" aria-label="Menu" aria-haspopup="dialog"', '<dialog class="isa-drawer"', 'Sign in</button>']) assert.ok(header.includes(part), `Header: missing ${part} in ${header}`);
eq(h(Footer, { links: [{ href: '/faq', label: 'FAQ' }], note: 'ISA' }), '<footer class="isa-footer"><nav aria-label="Footer"><ul class="isa-footer__links"><li><a href="/faq">FAQ</a></li></ul></nav><p class="isa-footer__note">ISA</p></footer>');
eq(h(SkipLink, null), '<a class="isa-skip-link" href="#main">Skip to content</a>');

assert.deepEqual(pageList(5, 12), [1, null, 4, 5, 6, null, 12]);
assert.deepEqual(pageList(1, 3), [1, 2, 3]);
assert.deepEqual(pageList(2, 5), [1, 2, 3, 4, 5]);
assert.deepEqual(pageList(1, 1), [1]);
const pag = render(h(Pagination, { page: 1, pageCount: 12, onPageChange() {} }));
for (const part of ['<nav aria-label="Pagination" class="isa-pagination">', 'aria-label="Previous page" type="button" class="isa-pagination__item" disabled=""', 'aria-label="Page 1" aria-current="page"', 'class="isa-pagination__gap"', 'aria-label="Page 12"', 'aria-label="Next page"']) assert.ok(pag.includes(part), `Pagination: missing ${part} in ${pag}`);
has(h(Pagination, { page: 2, pageCount: 3, getHref: (p) => `?page=${p}` }), '<a aria-label="Page 3" class="isa-pagination__item" href="?page=3">3</a>', 'href="?page=1"');
eq(h(Pagination, { page: 1, pageCount: 1 }), '');

eq(h(Breadcrumbs, { items: [{ href: '/', label: 'Home' }, { href: '/events', label: 'Competitions' }, { label: 'Results' }] }),
  '<nav aria-label="Breadcrumb" class="isa-breadcrumbs"><ol><li><a href="/">Home</a></li><li><a href="/events">Competitions</a></li><li><span aria-current="page">Results</span></li></ol></nav>');
eq(h(EmptyState, { title: 'No events yet', actions: h(Button, null, 'Register an event') }, 'Events appear here.'),
  '<div class="isa-empty"><h3 class="isa-empty__title">No events yet</h3><p class="isa-empty__text">Events appear here.</p><div class="isa-empty__actions"><button class="isa-button" type="button">Register an event</button></div></div>');
eq(h(EmptyState, { title: 'Nothing', plain: true, titleAs: 'h2' }), '<div class="isa-empty isa-empty--plain"><h2 class="isa-empty__title">Nothing</h2></div>');
const Probe = () => { useToast(); return 'ok'; };
eq(h(ToastProvider, null, h(Probe)), 'ok<div class="isa-toast-region" role="region" aria-label="Notifications" aria-live="polite"></div>');
assert.throws(() => render(h(Probe)), /ToastProvider/);

{
  const out = render(h(Autocomplete, { label: 'Country', id: 'c', name: 'country', value: 'SUI', options: [{ value: 'SUI', label: 'Switzerland' }, { value: 'BRA', label: 'Brazil' }] }));
  for (const part of ['<label class="isa-label" for="c">Country</label>', 'role="combobox"', 'aria-expanded="false"', 'aria-controls="c-list"', 'value="Switzerland"', '<input type="hidden" name="country" value="SUI"/>', 'role="listbox"', 'id="c-list-0" role="option" aria-selected="true"', '<p class="isa-autocomplete__empty" role="status" hidden="">No matches</p>'])
    assert.ok(out.includes(part), `Autocomplete: missing ${part}\n${out}`);
}
{
  const out = render(h(Filters, { label: 'Filter athletes', onReset() {}, activeCount: 2 }, h(TextField, { label: 'Name', id: 'n' })));
  for (const part of ['class="isa-button isa-button--neutral isa-filters__toggle" aria-expanded="false"', 'Filters (2)', 'role="group" aria-label="Filter athletes"', '<button type="button" class="isa-button isa-button--ghost">Reset</button>'])
    assert.ok(out.includes(part), `Filters: missing ${part}\n${out}`);
}
eq(h(Page, null, h(Main, { narrow: true }, h(PageTitle, { title: 'Results' }, 'Lead'), h(Hero, { src: '/a.jpg', alt: '', caption: 'Photo: X' }))),
  '<link rel="preload" as="image" href="/a.jpg"/><div class="isa-page"><main id="main" class="isa-main isa-main--narrow"><div class="isa-page-title"><h1>Results</h1><p>Lead</p></div><figure class="isa-hero"><img src="/a.jpg" alt=""/><figcaption>Photo: X</figcaption></figure></main></div>');

console.log('React components: all checks passed.');
