import React, { useState } from 'react';
import type {
  Transaction,
  TransactionType,
} from '../models/finance';
import {
  PAYMENT_METHODS,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from '../models/finance';
import { financeService } from '../services/financeService';
import { Button, Input, Select, TextArea } from './Form';

interface TransactionFormProps {
  transaction?: Transaction;
  onSubmit: (transaction: Transaction) => void;
  onCancel: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  transaction,
  onSubmit,
  onCancel,
}) => {
  const [type, setType] = useState<TransactionType>(transaction?.type || 'despesa');
  const [description, setDescription] = useState(transaction?.description || '');
  const [amount, setAmount] = useState(transaction?.amount.toString() || '');
  const [date, setDate] = useState(transaction?.date || new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(transaction?.category || '');
  const [paymentMethod, setPaymentMethod] = useState(transaction?.paymentMethod || 'PIX');
  const [status, setStatus] = useState(transaction?.status || 'pago');
  const [observation, setObservation] = useState(transaction?.observation || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = type === 'receita' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Valor deve ser maior que zero';
    if (!date) newErrors.date = 'Data é obrigatória';
    if (!category) newErrors.category = 'Categoria é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const transactionData: Transaction = {
      id: transaction?.id || financeService.generateId(),
      type,
      description,
      amount: parseFloat(amount),
      date,
      category: category as any,
      paymentMethod: paymentMethod as any,
      status: status as any,
      observation,
      createdAt: transaction?.createdAt || new Date().toISOString(),
    };

    onSubmit(transactionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tipo */}
        <Select
          label="Tipo"
          value={type}
          onChange={(e) => {
            setType(e.target.value as TransactionType);
            setCategory(''); // Reset categoria ao mudar tipo
          }}
          options={[
            { value: 'receita', label: 'Receita' },
            { value: 'despesa', label: 'Despesa' },
          ]}
        />

        {/* Status */}
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'pago' | 'pendente')}
          options={[
            { value: 'pago', label: 'Pago' },
            { value: 'pendente', label: 'Pendente' },
          ]}
        />

        {/* Descrição */}
        <Input
          label="Descrição"
          type="text"
          placeholder="Ex: Compra no mercado"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          className="md:col-span-2"
        />

        {/* Valor */}
        <Input
          label="Valor (R$)"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
        />

        {/* Data */}
        <Input
          label="Data"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
        />

        {/* Categoria */}
        <Select
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          error={errors.category}
          options={[
            { value: '', label: 'Selecione uma categoria' },
            ...categories.map(cat => ({ value: cat, label: cat })),
          ]}
        />

        {/* Forma de Pagamento */}
        <Select
          label="Forma de Pagamento"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as any)}
          options={PAYMENT_METHODS.map(method => ({ value: method, label: method }))}
        />
      </div>

      {/* Observação */}
      <TextArea
        label="Observação"
        placeholder="Adicione uma observação (opcional)"
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        rows={4}
      />

      {/* Botões */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {transaction ? 'Atualizar' : 'Adicionar'} Transação
        </Button>
      </div>
    </form>
  );
};
