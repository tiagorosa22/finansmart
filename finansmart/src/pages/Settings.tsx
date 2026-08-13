import React from 'react';
import { Header } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Form';

interface SettingsPageProps {
  onClearData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onClearData }) => {
  const handleClearData = () => {
    if (
      window.confirm(
        'Tem certeza que deseja limpar TODOS os dados do FinanSmart? Esta ação não pode ser desfeita.'
      )
    ) {
      onClearData();
      alert('Todos os dados foram removidos com sucesso.');
    }
  };

  return (
    <div>
      <Header
        title="Configurações"
        subtitle="Gerenciar suas preferências"
      />

      <div className="p-8 space-y-6">
        {/* Informações do Aplicativo */}
        <Card title="Sobre o FinanSmart">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">Versão</h4>
              <p className="text-gray-600 text-sm">1.0.0</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Descrição</h4>
              <p className="text-gray-600 text-sm">
                FinanSmart é uma aplicação web moderna de controle financeiro pessoal.
                Desenvolvida com React, TypeScript, Tailwind CSS e Recharts.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Tecnologias</h4>
              <ul className="text-gray-600 text-sm list-disc list-inside">
                <li>React 18</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Recharts</li>
                <li>Lucide React</li>
                <li>Vite</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Armazenamento de Dados */}
        <Card title="Armazenamento de Dados">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">LocalStorage</h4>
              <p className="text-gray-600 text-sm mb-4">
                Seus dados são armazenados localmente no seu navegador e nunca são enviados para servidores externos.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 Dica: Todos os dados são salvos no localStorage do seu navegador. Se você limpar o cache/cookies,
                seus dados serão perdidos. Considere fazer backup regularmente.
              </p>
            </div>
          </div>
        </Card>

        {/* Recursos Futuros */}
        <Card title="Roadmap (Funcionalidades Planejadas)">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-gray-400">✓</span>
              <div>
                <p className="font-medium text-gray-900">Autenticação de Usuários</p>
                <p className="text-gray-600 text-sm">Login e registro de contas pessoais</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-gray-400">✓</span>
              <div>
                <p className="font-medium text-gray-900">Banco de Dados</p>
                <p className="text-gray-600 text-sm">Sincronização de dados em múltiplos dispositivos</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-gray-400">✓</span>
              <div>
                <p className="font-medium text-gray-900">Inteligência Artificial</p>
                <p className="text-gray-600 text-sm">Categorização automática e análise de hábitos</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-gray-400">✓</span>
              <div>
                <p className="font-medium text-gray-900">Contas Bancárias</p>
                <p className="text-gray-600 text-sm">Integração com instituições financeiras</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Zona de Perigo */}
        <Card title="Zona de Perigo" className="border-2 border-red-200">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-red-900">Limpar Todos os Dados</h4>
              <p className="text-red-700 text-sm mb-4">
                Esta ação removerá permanentemente todos os seus lançamentos e configurações.
                Esta ação NÃO pode ser desfeita.
              </p>
              <Button variant="danger" onClick={handleClearData}>
                🗑️ Limpar Todos os Dados
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
