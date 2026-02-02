
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: '首页', icon: 'home', path: '/' },
    { label: '领养', icon: 'favorite', path: '/progress' },
    { label: '发现', icon: 'explore', path: '/community' },
    { label: '消息', icon: 'chat_bubble', path: '/messages' },
    { label: '我的', icon: 'person', path: '/profile' }
  ];

  const hideNavPaths = ['/pet/', '/form', '/chat/'];
  const shouldHideNav = hideNavPaths.some(p => location.pathname.includes(p));

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl relative overflow-x-hidden">
      <main className={`flex-1 ${shouldHideNav ? '' : 'pb-24'}`}>
        {children}
      </main>

      {!shouldHideNav && (
        <nav className="fixed bottom-0 w-full max-w-md bg-white/90 dark:bg-surface-dark/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 z-50">
          <div className="flex items-center justify-around py-2 pb-6 px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
                >
                  <span className={`material-symbols-outlined text-[26px] ${isActive ? 'material-symbols-filled' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
