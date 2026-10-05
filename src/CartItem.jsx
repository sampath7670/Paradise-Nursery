import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem, selectCartItems, selectItemCount, selectTotalCents } from './CartSlice.jsx';
import { money } from './format.js';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectItemCount);
  const total = useSelector(selectTotalCents);
  const [checkout, setCheckout] = useState(false);
  return <div className="page-shell cart-page"><p className="eyebrow">YOUR LITTLE PATCH OF PARADISE</p><h1>Your <em>shopping cart.</em></h1><p className="cart-intro" aria-live="polite">Total items: {count} · {items.length} unique {items.length === 1 ? 'plant' : 'plants'}</p>
    {items.length === 0 ? <section className="empty-cart"><span aria-hidden="true">❧</span><h2>A little room to grow.</h2><p>Your cart is empty. Your next leafy companion is waiting.</p><p>Total cart amount: <strong>{money(total)}</strong></p><Link className="button" to="/plants">Continue Shopping <span aria-hidden="true">↗</span></Link></section> : <div className="cart-layout">
      <section className="cart-items" aria-label="Cart items">{items.map(item => <article className="cart-item" key={item.id} aria-label={item.name}>
        <img src={item.image} alt={item.name} width="140" height="140" />
        <div className="cart-item-details"><h2>{item.name}</h2><p>Unit price: {money(item.priceCents)}</p><div className="item-actions"><div className="quantity-controls" role="group" aria-label={`${item.name} quantity`}>
          <button aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity === 1} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
          <span aria-live="polite" aria-label={`${item.name} quantity`}>{item.quantity}</span>
          <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
        </div><button className="delete-button" aria-label={`Delete ${item.name}`} onClick={() => dispatch(removeItem(item.id))}>Delete</button></div></div>
        <div className="item-total"><small>Item total</small><strong>{money(item.priceCents * item.quantity)}</strong></div>
      </article>)}<Link className="back-link" to="/plants">← Continue Shopping</Link></section>
      <aside className="order-summary" aria-label="Order summary"><p className="eyebrow">READY TO PUT DOWN ROOTS?</p><h2>Order summary</h2><div><span>Total items</span><strong>{count}</strong></div><div><span>Total cart amount</span><strong>{money(total)}</strong></div><div className="grand-total" aria-live="polite"><span>Overall total cost</span><strong>{money(total)}</strong></div><button className="button" onClick={() => setCheckout(true)}>Checkout <span aria-hidden="true">↗</span></button>{checkout && <p className="checkout-message" role="status">Coming Soon! Online checkout is on its way. No order has been placed.</p>}<p className="summary-note">A little closer to your own indoor paradise.</p></aside>
    </div>}
  </div>;
}
