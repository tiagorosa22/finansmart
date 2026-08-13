import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface IncomeExpenseChartProps {
  income: number;
  expenses: number;
}

export const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({
  income,
  expenses,
}) => {
  const data = [
    { name: 'Receitas', value: income, fill: '#22c55e' },
    { name: 'Despesas', value: expenses, fill: '#ef4444' },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) =>
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value as number)
          }
        />
        <Bar dataKey="value" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface CategoryChartProps {
  data: Array<{ name: string; value: number }>;
  title: string;
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ data, title }) => {
  const COLORS = [
    '#22c55e',
    '#ef4444',
    '#3b82f6',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#f97316',
    '#6366f1',
    '#14b8a6',
  ];

  const filteredData = data.filter(item => item.value > 0);

  if (filteredData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Sem dados para exibir
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-4">{title}</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {filteredData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(value as number)
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
