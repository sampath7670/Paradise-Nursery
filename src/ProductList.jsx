import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice.jsx';
import { categories } from './plants.js';
import { money } from './format.js';

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const [filter, setFilter] = useState('all');
  const [announcement, setAnnouncement] = useState('');
  function add(plant) { dispatch(addItem(plant)); setAnnouncement(`${plant.name} added to your cart.`); }
  return <div className="page-shell">
    <div className="collection-heading"><div><p className="eyebrow">FIND YOUR GREEN</p><h1>Good things <em>grow here.</em></h1><p>A plant for every corner, and every kind of plant person.</p></div><span className="collection-number">18<br /><small>LEAFY COMPANIONS</small></span></div>
    <div className="filters" role="group" aria-label="Filter plant categories">
      <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All plants</button>
      {categories.map(category => <button key={category.id} aria-pressed={filter === category.id} onClick={() => setFilter(category.id)}>{category.name}</button>)}
    </div>
    <p className="sr-only" role="status">{announcement}</p>
    {categories.filter(category => filter === 'all' || filter === category.id).map((category, index) => <section className="category" key={category.id} aria-labelledby={category.id}>
      <div className="category-heading"><div><p className="eyebrow">THE COLLECTION / {String(index + 1).padStart(2, '0')}</p><h2 id={category.id}>{category.name}</h2><p>{category.description}</p></div><span>6 plants</span></div>
      <div className="product-grid">{category.plants.map(plant => {
        const added = items.some(item => item.id === plant.id);
        return <article className="plant-card" key={plant.id} aria-label={plant.name}>
          <div className="plant-image"><img src={plant.image} alt={plant.name} width="400" height="400" loading="lazy" /><span className="plant-label">HOUSEPLANT</span></div>
          <div className="plant-info"><div className="plant-title"><h3>{plant.name}</h3><strong>{money(plant.priceCents)}</strong></div><p>{plant.description}</p><small className="care">☼ {plant.care}</small>
          <button className="button add-button" disabled={added} onClick={() => add(plant)} aria-label={added ? `${plant.name} added to cart` : `Add ${plant.name} to cart`}>{added ? '✓ Added to Cart' : 'Add to Cart'}{!added && <span aria-hidden="true">+</span>}</button></div>
        </article>;
      })}</div>
    </section>)}
  </div>;
}
