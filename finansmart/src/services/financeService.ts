import type {
  Transaction,
  TransactionFilters,
  FinancialSummary,
  ExpenseCategory,
  IncomeCategory,
} from '../models/finance';

export const financeService = {
  /**
   * Filtrar transações
   */
  filterTransactions(
    transactions: Transaction[],
    filters: TransactionFilters
  ): Transaction[] {
    return transactions.filter(t => {
      if (filters.startDate && t.date < filters.startDate) return false;
      if (filters.endDate && t.date > filters.endDate) return false;
      if (filters.type && t.type !== filters.type) return false;
      if (filters.category && t.category !== filters.category) return false;
      if (filters.status && t.status !== filters.status) return false;
      return true;
    });
  },

  /**
   * Obter o mês/ano atual para filtros
   */
  getCurrentMonthRange(): { startDate: string; endDate: string } {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    return {
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-31`,
    };
  },

  /**
   * Calcular resumo financeiro
   */
  calculateFinancialSummary(transactions: Transaction[]): FinancialSummary {
    const summary: FinancialSummary = {
      totalIncome: 0,
      totalExpenses: 0,
      totalPendingExpenses: 0,
      balance: 0,
      incomeByCategory: {} as Record<IncomeCategory, number>,
      expensesByCategory: {} as Record<ExpenseCategory, number>,
    };

    // Inicializar categorias
    const incomeCategories: IncomeCategory[] = [
      'Salário',
      'Freelance',
      'Investimentos',
      'Outros',
    ];
    const expenseCategories: ExpenseCategory[] = [
      'Alimentação',
      'Moradia',
      'Transporte',
      'Saúde',
      'Educação',
      'Lazer',
      'Assinaturas',
      'Compras',
      'Contas',
      'Outros',
    ];

    incomeCategories.forEach(cat => {
      summary.incomeByCategory[cat] = 0;
    });

    expenseCategories.forEach(cat => {
      summary.expensesByCategory[cat] = 0;
    });

    // Processar transações
    transactions.forEach(transaction => {
      if (transaction.type === 'receita') {
        summary.totalIncome += transaction.amount;
        summary.incomeByCategory[transaction.category as IncomeCategory] +=
          transaction.amount;
      } else if (transaction.type === 'despesa') {
        if (transaction.status === 'pago') {
          summary.totalExpenses += transaction.amount;
        } else if (transaction.status === 'pendente') {
          summary.totalPendingExpenses += transaction.amount;
        }
        summary.expensesByCategory[transaction.category as ExpenseCategory] +=
          transaction.amount;
      }
    });

    summary.balance = summary.totalIncome - summary.totalExpenses;

    return summary;
  },

  /**
   * Formatar valor em Real brasileiro
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  },

  /**
   * Formatar data para pt-BR
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  },

  /**
   * Obter últimas transações
   */
  getLatestTransactions(
    transactions: Transaction[],
    limit: number = 5
  ): Transaction[] {
    return transactions
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, limit);
  },

  /**
   * Gerar ID único
   */
  generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },
};
