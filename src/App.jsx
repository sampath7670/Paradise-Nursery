import { useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AboutUs from './AboutUs.jsx';
import Navbar from './Navbar.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

function LandingPage() {
  return <><section className="landing-hero" aria-labelledby="hero-title"><div className="hero-content">
    <p className="eyebrow">WELCOME TO PARADISE NURSERY</p>
    <h1 id="hero-title">Bring a little<br /><em>paradise</em> home.</h1>
    <p>Beautiful plants. Happier spaces.<br />Find your next leafy companion and let your home grow.</p>
    <Link className="button button-light" to="/plants">Get Started <span aria-hidden="true">↗</span></Link>
    <span className="hero-note">18 HOUSEPLANTS · ENDLESS POSSIBILITIES</span>
  </div><div className="hero-caption">THE INDOOR GARDEN COLLECTION / 01</div></section><AboutUs /></>;
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main').focus(); }}>Skip to content</a><Navbar /><main id="main" tabIndex={-1}>
    <Routes><Route path="/" element={<LandingPage />} /><Route path="/plants" element={<ProductList />} /><Route path="/cart" element={<CartItem />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>
  </main><footer><span>❧ Paradise Nursery</span><p>Make room for something green.</p><small>Student project · Checkout coming soon</small></footer></>;
}
