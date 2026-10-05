import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.jsx';
import { createAppStore } from '../store.js';
import { categories } from '../plants.js';
import { addItem, incrementQuantity, decrementQuantity, updateQuantity, removeItem, selectItemCount, selectTotalCents } from '../CartSlice.jsx';

function setup(route = '/') {
  const store = createAppStore();
  render(<Provider store={store}><MemoryRouter initialEntries={[route]}><App /></MemoryRouter></Provider>);
  return { store, user: userEvent.setup() };
}

describe('Rubric coverage', () => {
  it('updates quantities through the required reducer and rejects invalid quantities', () => {
    const store = createAppStore();
    const plant = categories[0].plants[0];
    store.dispatch(addItem(plant));
    store.dispatch(updateQuantity({ id: plant.id, quantity: 3 }));
    expect(selectItemCount(store.getState())).toBe(3);
    expect(selectTotalCents(store.getState())).toBe(5400);
    for (const quantity of [0, -1, 1.5, NaN, Infinity, '2']) {
      store.dispatch(updateQuantity({ id: plant.id, quantity }));
      expect(selectItemCount(store.getState())).toBe(3);
    }
    store.dispatch(updateQuantity({ id: 'missing', quantity: 2 }));
    expect(selectItemCount(store.getState())).toBe(3);
    store.dispatch(updateQuantity({ id: plant.id, quantity: 1 }));
    expect(selectTotalCents(store.getState())).toBe(1800);
  });
  it('has three categories of six unique plants with images, descriptions and prices', () => {
    expect(categories).toHaveLength(3);
    const plants = categories.flatMap(c => c.plants);
    categories.forEach(c => expect(c.plants).toHaveLength(6));
    expect(new Set(plants.map(p => p.id)).size).toBe(18);
    expect(new Set(plants.map(p => p.name)).size).toBe(18);
    plants.forEach(p => { expect(p.image).toMatch(/\.svg$/); expect(p.priceCents).toBeGreaterThan(0); expect(p.description).toBeTruthy(); });
  });
  it('handles duplicate adds, quantity floor, unknown IDs, deletion and exact totals', () => {
    const store = createAppStore();
    const [a,b] = categories[0].plants;
    store.dispatch(addItem(a)); store.dispatch(addItem(a)); store.dispatch(addItem(b));
    expect(selectItemCount(store.getState())).toBe(2);
    store.dispatch(incrementQuantity(a.id));
    expect(selectTotalCents(store.getState())).toBe(6000);
    store.dispatch(decrementQuantity(a.id)); store.dispatch(decrementQuantity(a.id));
    store.dispatch(incrementQuantity('missing')); store.dispatch(decrementQuantity('missing')); store.dispatch(removeItem('missing'));
    expect(selectItemCount(store.getState())).toBe(2);
    store.dispatch(removeItem(b.id));
    expect(selectTotalCents(store.getState())).toBe(1800);
  });
  it('supports the complete shopping flow and keeps navigation counts in sync', async () => {
    const { user } = setup();
    expect(screen.getByRole('heading', {name:/bring a little paradise home/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name:/a little green/i})).toBeInTheDocument();
    await user.click(screen.getByRole('link', {name:/Get Started/i}));
    expect(screen.getAllByRole('article')).toHaveLength(18);
    await user.click(screen.getByRole('button', {name:'Add Snake Plant to cart'}));
    expect(screen.getByRole('button', {name:'Snake Plant added to cart'})).toBeDisabled();
    await user.click(screen.getByRole('button', {name:'Add ZZ Plant to cart'}));
    await user.click(screen.getByRole('link', {name:'Cart, 2 items'}));
    expect(screen.getByText('Total items: 2 · 2 unique plants')).toBeInTheDocument();
    expect(screen.getByRole('button', {name:'Decrease Snake Plant quantity'})).toBeDisabled();
    await user.click(screen.getByRole('button', {name:'Increase Snake Plant quantity'}));
    expect(screen.getByRole('link', {name:'Cart, 3 items'})).toBeInTheDocument();
    const snake = screen.getByRole('article', {name:'Snake Plant'});
    expect(within(snake).getByText('$36.00')).toBeInTheDocument();
    expect(within(screen.getByRole('complementary')).getAllByText('$60.00')).toHaveLength(2);
    await user.click(screen.getByRole('button', {name:'Decrease Snake Plant quantity'}));
    expect(screen.getByRole('link', {name:'Cart, 2 items'})).toBeInTheDocument();
    await user.click(screen.getByRole('button', {name:/Checkout/}));
    expect(screen.getByRole('status')).toHaveTextContent('Coming Soon!');
    await user.click(screen.getByRole('button', {name:'Delete Snake Plant'}));
    expect(screen.getByRole('link', {name:'Cart, 1 items'})).toBeInTheDocument();
    await user.click(screen.getByRole('link', {name:/Continue Shopping/}));
    expect(screen.getByRole('button', {name:'Add Snake Plant to cart'})).toBeEnabled();
    expect(screen.getByRole('button', {name:'ZZ Plant added to cart'})).toBeDisabled();
    await user.click(screen.getByRole('link', {name:'Cart, 1 items'}));
    await user.click(screen.getByRole('button', {name:'Delete ZZ Plant'}));
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.queryByRole('button', {name:/Checkout/})).not.toBeInTheDocument();
    await user.click(screen.getByRole('link', {name:'Home',exact:true}));
    expect(screen.getByRole('link', {name:/Get Started/})).toBeInTheDocument();
  });
  it('supports direct cart routes and category filtering', async () => {
    const { user } = setup('/cart');
    expect(screen.getByText(/Your cart is empty/)).toBeInTheDocument();
    await user.click(screen.getByRole('link', {name:/Continue Shopping/}));
    await user.click(screen.getByRole('button', {name:'Color & texture'}));
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getByRole('heading', {name:'Peace Lily'})).toBeInTheDocument();
    await user.click(screen.getByRole('button', {name:'All plants'}));
    expect(screen.getAllByRole('article')).toHaveLength(18);
  });
  it('redirects unknown routes to the landing page', () => {
    setup('/missing');
    expect(screen.getByRole('link', {name:/Get Started/})).toBeInTheDocument();
  });
});
