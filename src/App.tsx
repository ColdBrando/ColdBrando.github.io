import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { Home } from './pages/Home';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <Link to="/" className="logo">
                <h1>My Blog</h1>
              </Link>
              <nav className="nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/blog" className="nav-link">Articles</Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>&copy; 2026. Built with React + TypeScript + Vite</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
