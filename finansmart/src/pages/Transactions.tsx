import React, { useState } from 'react';
import type { Transaction, TransactionFilters, TransactionType, Category, TransactionStatus } from '../models/finance';
import { financeService } from '../services/financeService';
import { Header } from '../components/Layout';
import { Card } from '../components/Card';
import { Button, Input, Select } from '../components/Form';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../models/finance';

interface TransactionsPageProps {
  transactions: Transaction[];
  onAdd: (transaction: Transaction) => void;
  onUpdate: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({
  transactions,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [filters, setFilters] = useState<TransactionFilters>({});

  const filteredTransactions = financeService.filterTransactions(transactions, filters);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleFormSubmit = (transaction: Transaction) => {
    if (editingTransaction) {
      onUpdate(transaction);
      setEditingTransaction(undefined);
    } else {
      onAdd(transaction);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTransaction(undefined);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const categories = [
    ...EXPENSE_CATEGORIES,
    ...INCOME_CATEGORIES,
  ];

  return (
    <div>
      <Header
        title="Lançamentos"
        subtitle="Gerencie suas receitas e despesas"
      />

      <div className="p-8 space-y-6">
        {!showForm && (
          <>
            {/* Filtros */}
            <Card title="Filtros">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Input
                  label="Data Início"
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFilters({
                      ...filters,
                      startDate: e.target.value || undefined,
                    })
                  }
                />

                <Input
                  label="Data Fim"
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFilters({ ...filters, endDate: e.target.value || undefined })
                  }
                />

                <Select
                  label="Tipo"
                  options={[
                    { value: '', label: 'Todos' },
                    { value: 'receita', label: 'Receita' },
                    { value: 'despesa', label: 'Despesa' },
                  ]}
                  value={filters.type || ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFilters({
                      ...filters,
                      type: (e.target.value as TransactionType) || undefined,
                    })
                  }
                />

                <Select
                  label="Categoria"
                  options={[
                    { value: '', label: 'Todas' },
                    ...categories.map(cat => ({ value: cat, label: cat })),
                  ]}
                  value={filters.category || ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFilters({
                      ...filters,
                      category: (e.target.value as Category) || undefined,
                    })
                  }
                />

                <Select
                  label="Status"
                  options={[
                    { value: '', label: 'Todos' },
                    { value: 'pago', label: 'Pago' },
                    { value: 'pendente', label: 'Pendente' },
                  ]}
                  value={filters.status || ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFilters({
                      ...filters,
                      status: (e.target.value as TransactionStatus) || undefined,
                    })
                  }
                />

                <div className="flex gap-2 md:col-span-5 justify-end">
                  <Button
                    variant="secondary"
                    onClick={handleClearFilters}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </Card>

            {/* Botão Nova Transação */}
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setEditingTransaction(undefined);
                  setShowForm(true);
                }}
              >
                + Nova Transação
              </Button>
            </div>

            {/* Lista de Transações */}
            <Card title={`Transações (${filteredTransactions.length})`}>
              <TransactionList
                transactions={filteredTransactions}
                onEdit={handleEdit}
                onDelete={onDelete}
              />
            </Card>
          </>
        )}

        {showForm && (
          <Card title={editingTransaction ? 'Editar Transação' : 'Nova Transação'}>
            <TransactionForm
              transaction={editingTransaction}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </Card>
        )}
      </div>
    </div>
  );
};
