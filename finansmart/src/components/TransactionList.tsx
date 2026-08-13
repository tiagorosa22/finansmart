import React from 'react';
import type { Transaction } from '../models/finance';
import { financeService } from '../services/financeService';
import { Edit2, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from './Form';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">Nenhuma transação encontrada</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Data</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Descrição</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Categoria</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Forma de Pagamento</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Valor</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {financeService.formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.paymentMethod}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === 'pago'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {transaction.status === 'pago' ? 'Pago' : 'Pendente'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right font-semibold">
                  <span
                    className={
                      transaction.type === 'receita'
                        ? 'text-green-600 flex items-center justify-end gap-1'
                        : 'text-red-600 flex items-center justify-end gap-1'
                    }
                  >
                    {transaction.type === 'receita' ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    {financeService.formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onEdit(transaction)}
                      className="gap-1"
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            'Tem certeza que deseja excluir esta transação?'
                          )
                        ) {
                          onDelete(transaction.id);
                        }
                      }}
                      className="gap-1"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
