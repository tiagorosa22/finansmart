import React from 'react';
import type { Transaction } from '../models/finance';
import { financeService } from '../services/financeService';
import { Header } from '../components/Layout';
import { Card, StatCard } from '../components/Card';
import { CategoryChart, IncomeExpenseChart } from '../components/Charts';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface ReportsPageProps {
  transactions: Transaction[];
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ transactions }) => {
  const summary = financeService.calculateFinancialSummary(transactions);

  const expenseByCategoryData = Object.entries(summary.expensesByCategory)
    .map(([category, value]) => ({
      name: category,
      value,
    }));

  const incomeByCategoryData = Object.entries(summary.incomeByCategory)
    .map(([category, value]) => ({
      name: category,
      value,
    }));

  return (
    <div>
      <Header
        title="Relatórios"
        subtitle="Análise completa das suas finanças"
      />

      <div className="p-8 space-y-8">
        {/* Resumo Geral */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Geral</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              label="Saldo Total"
              value={financeService.formatCurrency(summary.balance)}
              icon={<DollarSign />}
              color={summary.balance >= 0 ? 'green' : 'red'}
            />
            <StatCard
              label="Total de Receitas"
              value={financeService.formatCurrency(summary.totalIncome)}
              icon={<TrendingUp />}
              color="green"
            />
            <StatCard
              label="Total de Despesas"
              value={financeService.formatCurrency(summary.totalExpenses + summary.totalPendingExpenses)}
              icon={<TrendingDown />}
              color="red"
            />
            <StatCard
              label="Pendentes"
              value={financeService.formatCurrency(summary.totalPendingExpenses)}
              icon={<TrendingDown />}
              color="blue"
            />
          </div>
        </div>

        {/* Gráficos Detalhados */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Receitas x Despesas">
            <IncomeExpenseChart
              income={summary.totalIncome}
              expenses={summary.totalExpenses}
            />
          </Card>

          <Card>
            <CategoryChart
              data={incomeByCategoryData}
              title="Receitas por Categoria"
            />
          </Card>

          <Card>
            <CategoryChart
              data={expenseByCategoryData}
              title="Despesas por Categoria"
            />
          </Card>

          {/* Resumo por Categoria */}
          <Card title="Resumo Detalhado">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Receitas</h4>
                {Object.entries(summary.incomeByCategory).map(([category, value]) => (
                  value > 0 && (
                    <div
                      key={category}
                      className="flex justify-between items-center py-1 text-sm"
                    >
                      <span className="text-gray-700">{category}</span>
                      <span className="font-medium text-green-600">
                        {financeService.formatCurrency(value)}
                      </span>
                    </div>
                  )
                ))}
              </div>

              <hr className="my-4" />

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Despesas</h4>
                {Object.entries(summary.expensesByCategory).map(([category, value]) => (
                  value > 0 && (
                    <div
                      key={category}
                      className="flex justify-between items-center py-1 text-sm"
                    >
                      <span className="text-gray-700">{category}</span>
                      <span className="font-medium text-red-600">
                        {financeService.formatCurrency(value)}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
