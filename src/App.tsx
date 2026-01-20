import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import './App.css';

// Code splitting - lazy load pages
const Home = lazy(() => import('./pages/Home'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Loading fallback component
function PageLoader() {
  const { t } = useTranslation();
  return <div className="page-loader">{t('nav.loading')}</div>;
}

function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <Link to="/" className="logo">
                <h1>{t('nav.siteName')}</h1>
              </Link>
              <nav className="nav">
                <Link to="/" className="nav-link">{t('nav.home')}</Link>
                <Link to="/blog" className="nav-link">{t('nav.articles')}</Link>
                <LanguageSwitcher />
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="app-main">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogPost />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="app-footer">
            <p>&copy; 2026. {t('footer.copyright')}</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
