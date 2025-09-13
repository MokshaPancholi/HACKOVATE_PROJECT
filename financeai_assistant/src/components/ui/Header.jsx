import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'AI Assistant', path: '/ai-chat-interface', icon: 'MessageSquare' },
    { label: 'Financial Data', path: '/financial-data-overview', icon: 'PieChart' },
    { label: 'Privacy Settings', path: '/privacy-permissions', icon: 'Shield' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border nav-shadow">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">FinanceAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 px-3 py-2"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="text-sm font-medium">John Doe</span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg modal-shadow">
                  <div className="py-1">
                    <Link
                      to="/privacy-permissions"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">John Doe</div>
                    <div className="text-xs text-muted-foreground">john@example.com</div>
                  </div>
                </div>
                
                <Link
                  to="/privacy-permissions"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="Settings" size={20} />
                  <span>Settings</span>
                </Link>
                
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="LogOut" size={20} />
                  <span>Sign Out</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;