import React from 'react';
import { LayoutDashboard, FileText, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  currentPage: 'dashboard' | 'transactions' | 'reports' | 'settings';
  onPageChange: (page: 'dashboard' | 'transactions' | 'reports' | 'settings') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions' as const, label: 'Lançamentos', icon: FileText },
    { id: 'reports' as const, label: 'Relatórios', icon: BarChart3 },
    { id: 'settings' as const, label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-green-600 to-green-700 text-white min-h-screen p-6">
      <div className="mb-12">
        <h1 className="text-2xl font-bold">💰 FinanSmart</h1>
        <p className="text-green-100 text-sm mt-1">Controle financeiro pessoal</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-green-700'
                  : 'text-green-100 hover:bg-green-500'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-8 py-6">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};
