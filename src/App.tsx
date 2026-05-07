import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ResourcePage from './pages/ResourcePage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import { TrendingPage, SavedPage, CategoriesOverviewPage } from './pages/OtherPages';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="glow-orb" style={{ top: '-150px', left: '-150px' }} />
        <div className="glow-orb" style={{ top: '40%', right: '-250px', background: 'radial-gradient(circle, rgba(111,61,217,0.12) 0%, transparent 70%)' }} />
      </div>
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/categories" element={<CategoriesOverviewPage />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/:category/:subcategory" element={<CategoryPage />} />
          <Route path="/:category/:subcategory/:slug" element={<ResourcePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
