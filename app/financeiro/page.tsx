"use client";

import { useState, useEffect } from "react";
import { ArrowDownRight, ArrowUpRight, DollarSign, Plus, Search } from "lucide-react";

interface Transaction {
  id: string;
  descricao: string;
  tipo: string;
  valor: number;
  categoria: string;
  status: string;
  data: string;
}

export default function FinanceiroPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTx, setNewTx] = useState({ description: "", amount: "", type: "income", category: "Vendas", status: "Recebido" });

  useEffect(() => {
    fetch("/api/financeiro").then(r => r.json()).then(setTransactions).finally(() => setLoading(false));
  }, []);

  const totalIncome = transactions.filter(t => t.tipo === "income").reduce((acc, t) => acc + Number(t.valor), 0);
  const totalExpense = transactions.filter(t => t.tipo === "expense").reduce((acc, t) => acc + Number(t.valor), 0);
  const balance = totalIncome - totalExpense;

  const formatCurrency = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/financeiro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTx),
    });
    const tx = await res.json();
    setTransactions([tx, ...transactions]);
    setIsModalOpen(false);
    setNewTx({ description: "", amount: "", type: "income", category: "Vendas", status: "Recebido" });
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Controle Financeiro</h1>
          <p className="mt-1 text-sm text-slate-500">Gerencie receitas, despesas e fluxo de caixa.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700">
            <Plus className="w-4 h-4 mr-2" /> Nova Transação
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white dark:bg-slate-800 overflow-hidden rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3"><ArrowUpRight className="h-6 w-6 text-emerald-600" /></div>
            <div className="ml-5">
              <p className="text-sm font-medium text-slate-500">Receitas</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(totalIncome)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 overflow-hidden rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-md p-3"><ArrowDownRight className="h-6 w-6 text-red-600" /></div>
            <div className="ml-5">
              <p className="text-sm font-medium text-slate-500">Despesas</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(totalExpense)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 overflow-hidden rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-amber-100 rounded-md p-3"><DollarSign className="h-6 w-6 text-amber-600" /></div>
            <div className="ml-5">
              <p className="text-sm font-medium text-slate-500">Saldo</p>
              <p className={`text-2xl font-semibold ${balance >= 0 ? "text-emerald-600" : "text-red-600"}`}>{formatCurrency(balance)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border rounded-xl shadow-sm border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Últimas Transações</h3>
          <div className="mt-3 sm:mt-0 relative rounded-md max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-4 w-4 text-slate-400" /></div>
            <input type="text" className="block w-full pl-10 sm:text-sm border border-slate-300 dark:border-slate-600 rounded-lg py-2 dark:bg-slate-700 dark:text-slate-100" placeholder="Buscar transação..." />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Valor</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
              {loading && <tr><td colSpan={5} className="py-8 text-center text-slate-500">Carregando...</td></tr>}
              {!loading && transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(t.data).toLocaleDateString("pt-BR")}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{t.descricao}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">{t.categoria}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.status === "Pago" || t.status === "Recebido" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{t.status}</span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${t.tipo === "income" ? "text-emerald-600" : "text-slate-900 dark:text-slate-100"}`}>
                    {t.tipo === "income" ? "+" : "-"} {formatCurrency(Number(t.valor))}
                  </td>
                </tr>
              ))}
              {!loading && transactions.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-slate-500">Nenhuma transação encontrada.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Nova Transação</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-500">✕</button>
            </div>
            <form onSubmit={handleAddTransaction} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição</label>
                <input type="text" required value={newTx.description} onChange={(e) => setNewTx({ ...newTx, description: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-700 dark:text-slate-100" placeholder="Ex: Pagamento Cliente X" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Valor</label>
                  <input type="number" step="0.01" required value={newTx.amount} onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-700 dark:text-slate-100" placeholder="Ex: 1500.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo</label>
                  <select value={newTx.type} onChange={(e) => setNewTx({ ...newTx, type: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100">
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
                  <input type="text" required value={newTx.category} onChange={(e) => setNewTx({ ...newTx, category: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100" placeholder="Ex: Vendas" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select value={newTx.status} onChange={(e) => setNewTx({ ...newTx, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100">
                    <option>Recebido</option><option>Pago</option><option>Pendente</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg hover:bg-amber-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
