"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Download,
  Filter,
  Plus,
  Search,
} from "lucide-react";

const transactions = [
  {
    id: "TRX-1001",
    date: "15 Out 2023",
    description: "Sinal - Projeto Carlos Mendes",
    category: "Vendas",
    type: "income",
    amount: "R$ 12.500,00",
    status: "Recebido",
  },
  {
    id: "TRX-1002",
    date: "14 Out 2023",
    description: "Compra Inversores WEG",
    category: "Equipamentos",
    type: "expense",
    amount: "R$ 35.800,00",
    status: "Pago",
  },
  {
    id: "TRX-1003",
    date: "12 Out 2023",
    description: "Parcela 2/3 - Padaria Pão Quente",
    category: "Vendas",
    type: "income",
    amount: "R$ 28.333,33",
    status: "Pendente",
  },
  {
    id: "TRX-1004",
    date: "10 Out 2023",
    description: "Comissão Vendas - Setembro",
    category: "Comissões",
    type: "expense",
    amount: "R$ 8.450,00",
    status: "Pago",
  },
  {
    id: "TRX-1005",
    date: "08 Out 2023",
    description: "Manutenção Frota",
    category: "Despesas Operacionais",
    type: "expense",
    amount: "R$ 1.200,00",
    status: "Pago",
  },
];

export default function FinanceiroPage() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Controle Financeiro
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie receitas, despesas e fluxo de caixa da sua empresa solar.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
                <ArrowUpRight
                  className="h-6 w-6 text-emerald-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Receitas (Mês)
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-slate-900">
                      R$ 142.300
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-emerald-600">
                      +12.5%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <ArrowDownRight
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Despesas (Mês)
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-slate-900">
                      R$ 84.500
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      +4.1%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                <DollarSign
                  className="h-6 w-6 text-amber-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Saldo Previsto
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-slate-900">
                      R$ 57.800
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border rounded-xl shadow-sm border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold leading-6 text-slate-900">
            Últimas Transações
          </h3>
          <div className="mt-3 sm:mt-0 sm:ml-4 flex gap-2">
            <div className="relative rounded-md shadow-sm max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-2 border"
                placeholder="Buscar transação..."
              />
            </div>
            <button className="inline-flex items-center px-3 py-2 border border-slate-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              <Filter className="h-4 w-4 mr-2 text-slate-400" />
              Filtrar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Data
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Descrição
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Categoria
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">
                      {transaction.description}
                    </div>
                    <div className="text-xs text-slate-500">
                      {transaction.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === "Pago" ||
                        transaction.status === "Recebido"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                      transaction.type === "income"
                        ? "text-emerald-600"
                        : "text-slate-900"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}{" "}
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
