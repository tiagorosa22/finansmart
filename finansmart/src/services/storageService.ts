import type { Transaction } from '../models/finance';

const STORAGE_KEY = 'finansmart_transactions';

export const storageService = {
  /**
   * Obter todas as transações do localStorage
   */
  getTransactions(): Transaction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao recuperar transações:', error);
      return [];
    }
  },

  /**
   * Salvar transações no localStorage
   */
  saveTransactions(transactions: Transaction[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Erro ao salvar transações:', error);
    }
  },

  /**
   * Adicionar uma nova transação
   */
  addTransaction(transaction: Transaction): Transaction {
    const transactions = this.getTransactions();
    transactions.push(transaction);
    this.saveTransactions(transactions);
    return transaction;
  },

  /**
   * Atualizar uma transação
   */
  updateTransaction(id: string, updates: Partial<Transaction>): Transaction | null {
    const transactions = this.getTransactions();
    const index = transactions.findIndex(t => t.id === id);

    if (index === -1) {
      console.error(`Transação com ID ${id} não encontrada`);
      return null;
    }

    const updatedTransaction = { ...transactions[index], ...updates };
    transactions[index] = updatedTransaction;
    this.saveTransactions(transactions);
    return updatedTransaction;
  },

  /**
   * Deletar uma transação
   */
  deleteTransaction(id: string): boolean {
    const transactions = this.getTransactions();
    const index = transactions.findIndex(t => t.id === id);

    if (index === -1) {
      console.error(`Transação com ID ${id} não encontrada`);
      return false;
    }

    transactions.splice(index, 1);
    this.saveTransactions(transactions);
    return true;
  },

  /**
   * Limpar todas as transações
   */
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
