import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItemCount } from './CartSlice.jsx';

export default function Navbar() {
  const count = useSelector(selectItemCount);
  return <header className="site-header"><div className="nav-wrap">
    <Link className="brand" to="/" aria-label="Paradise Nursery home"><span className="brand-mark" aria-hidden="true">❧</span><span>Paradise Nursery<small>A little closer to nature</small></span></Link>
    <nav aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink><NavLink to="/plants">Plants</NavLink>
      <NavLink className="cart-link" to="/cart" aria-label={`Cart, ${count} items`}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 3h2l3 12h11l2-8H6M9 19h.01M18 19h.01" strokeLinecap="round"/><circle cx="9" cy="19" r="1"/><circle cx="18" cy="19" r="1"/></svg>
        Cart <span className="cart-count" aria-live="polite">{count}</span>
      </NavLink>
    </nav>
  </div></header>;
}
