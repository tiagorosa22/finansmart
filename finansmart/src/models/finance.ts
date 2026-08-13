// Tipos de transação
export type TransactionType = 'receita' | 'despesa';

// Status da transação
export type TransactionStatus = 'pago' | 'pendente';

// Formas de pagamento
export const PAYMENT_METHODS = [
  'Dinheiro',
  'PIX',
  'Débito',
  'Crédito',
  'Transferência',
  'Boleto',
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

// Categorias de despesas
export const EXPENSE_CATEGORIES = [
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
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

// Categorias de receitas
export const INCOME_CATEGORIES = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Outros',
] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];

// Tipo de categoria (union)
export type Category = ExpenseCategory | IncomeCategory;

// Interface de Transação
export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string; // ISO date string (YYYY-MM-DD)
  category: Category;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  observation?: string;
  createdAt: string; // ISO datetime
}

// Interface para resumo financeiro
export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  totalPendingExpenses: number;
  balance: number;
  incomeByCategory: Record<IncomeCategory, number>;
  expensesByCategory: Record<ExpenseCategory, number>;
}

// Interface para filtros
export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
  category?: Category;
  status?: TransactionStatus;
}
