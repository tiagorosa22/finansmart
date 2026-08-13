import React from 'react';
import type { Transaction } from '../models/finance';
import { financeService } from '../services/financeService';
import { Card, StatCard } from '../components/Card';
import { Header } from '../components/Layout';
import { TransactionList } from '../components/TransactionList';
import { IncomeExpenseChart, CategoryChart } from '../components/Charts';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  const monthRange = financeService.getCurrentMonthRange();
  const monthTransactions = financeService.filterTransactions(transactions, monthRange);
  const summary = financeService.calculateFinancialSummary(monthTransactions);

  const latestTransactions = financeService.getLatestTransactions(transactions, 5);

  // Preparar dados para gráficos
  const expenseByCategoryData = Object.entries(summary.expensesByCategory)
    .filter(([, value]) => value > 0)
    .map(([category, value]) => ({
      name: category,
      value,
    }));

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Visão geral das suas finanças"
      />

      <div className="p-8 space-y-8">
        {/* Cards de Indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="Saldo"
            value={financeService.formatCurrency(summary.balance)}
            icon={<DollarSign />}
            color={summary.balance >= 0 ? 'green' : 'red'}
          />
          <StatCard
            label="Receitas (Mês)"
            value={financeService.formatCurrency(summary.totalIncome)}
            icon={<TrendingUp />}
            color="green"
          />
          <StatCard
            label="Despesas Pagas (Mês)"
            value={financeService.formatCurrency(summary.totalExpenses)}
            icon={<TrendingDown />}
            color="red"
          />
          <StatCard
            label="Despesas Pendentes"
            value={financeService.formatCurrency(summary.totalPendingExpenses)}
            icon={<TrendingDown />}
            color="blue"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Receitas x Despesas (Mês)">
            <IncomeExpenseChart
              income={summary.totalIncome}
              expenses={summary.totalExpenses}
            />
          </Card>

          <Card title="Despesas por Categoria">
            <CategoryChart
              data={expenseByCategoryData}
              title="Distribuição de Despesas"
            />
          </Card>
        </div>

        {/* Últimas Transações */}
        <Card title="Últimas Transações">
          <TransactionList
            transactions={latestTransactions}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </div>
    </div>
  );
};
