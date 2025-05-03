import { ChevronDown, LayoutDashboard, LogOut, Menu, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../ThemeToggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, userProfile, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Close mobile menu if open
    setIsMenuOpen(false);
    // Toggle profile dropdown
    setIsProfileOpen(!isProfileOpen);
  };

  // Check if navbar should change style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Close profile dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (isProfileOpen && e.target instanceof Node) {
        const dropdown = document.getElementById('profile-dropdown');
        const button = document.getElementById('profile-button');
        if (dropdown && button && !dropdown.contains(e.target) && !button.contains(e.target)) {
          setIsProfileOpen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Close menus when auth state changes
  useEffect(() => {
    if (!isAuthenticated) {
      setIsMenuOpen(false);
      setIsProfileOpen(false);
    }
  }, [isAuthenticated]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'SDE Sheet', path: '/sheet/sde', description: '191 Handpicked Questions' },
    { name: 'Basic to Advanced', path: '/sheet/advanced', description: '491 Questions for Complete DSA' },
    { name: 'Interview Questions', path: '/sheet/interview', description: 'Real Interview Questions' },
    { name: 'About Us', path: '/about', description: 'Learn more about us' },
    { name: 'Contact', path: '/contact', description: 'Get in touch with us' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm'
          : 'bg-background'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/drive-your-self-logo.svg"
              alt="Drive Your Self Logo"
              className="w-12 h-12 drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-tight">Drive Your Self</span>
              <span className="text-xs text-muted-foreground">Master DSA with Confidence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons or User Profile */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="profile-button"
                  className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                  onClick={toggleProfile}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User size={16} className="text-primary" />
                    </div>
                    <span className="font-medium">{userProfile?.username || 'User'}</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div id="profile-dropdown" className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg py-2 z-50 border border-border">
                    <div className="py-2">
                      <div className="px-4 mb-2">
                        <p className="text-sm font-medium truncate">{userProfile?.username || 'User'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                      <div className="h-px bg-border" />
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-secondary transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LayoutDashboard size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        type="button"
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          // Immediately close all menus
                          setIsProfileOpen(false);
                          setIsMenuOpen(false);

                          // Execute logout
                          try {
                            await logout();
                          } catch (error: unknown) {
                            if (error instanceof Error) {
                              console.error('Error logging out:', error.message);
                            }
                          }
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-secondary w-full text-left transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors duration-200"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background shadow-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base py-2 ${
                    isActive(link.path)
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-border my-2"></div>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 py-2 text-foreground"
                  >
                    <User size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 py-2 text-foreground w-full text-left"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    to="/login"
                    className="w-full py-2 text-center text-foreground border border-border rounded-lg"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-2 text-center bg-primary text-primary-foreground rounded-lg"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;