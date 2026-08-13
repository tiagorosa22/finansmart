import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import type { Transaction } from './models/finance';
import { storageService } from './services/storageService';
import { Sidebar } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { TransactionsPage } from './pages/Transactions';
import { ReportsPage } from './pages/Reports';
import { SettingsPage } from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'transactions' | 'reports' | 'settings'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Carregar transações ao montar
  useEffect(() => {
    const loadedTransactions = storageService.getTransactions();
    setTransactions(loadedTransactions);
  }, []);

  // Salvar transações sempre que mudam
  useEffect(() => {
    storageService.saveTransactions(transactions);
  }, [transactions]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleClearData = () => {
    storageService.clearAll();
    setTransactions([]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            transactions={transactions}
            onEdit={() => setCurrentPage('transactions')}
            onDelete={handleDeleteTransaction}
          />
        );
      case 'transactions':
        return (
          <TransactionsPage
            transactions={transactions}
            onAdd={handleAddTransaction}
            onUpdate={handleUpdateTransaction}
            onDelete={handleDeleteTransaction}
          />
        );
      case 'reports':
        return <ReportsPage transactions={transactions} />;
      case 'settings':
        return <SettingsPage onClearData={handleClearData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 overflow-auto">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
