"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  Users,
  Zap,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";

const salesData = [
  { name: "Jan", vendas: 4000, lucro: 2400 },
  { name: "Fev", vendas: 3000, lucro: 1398 },
  { name: "Mar", vendas: 2000, lucro: 9800 },
  { name: "Abr", vendas: 2780, lucro: 3908 },
  { name: "Mai", vendas: 1890, lucro: 4800 },
  { name: "Jun", vendas: 2390, lucro: 3800 },
  { name: "Jul", vendas: 3490, lucro: 4300 },
];

const stats = [
  {
    name: "Faturamento Mensal",
    value: "R$ 142.300",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Novos Leads",
    value: "48",
    change: "+5.4%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Potência Vendida",
    value: "124 kWp",
    change: "-2.1%",
    trend: "down",
    icon: Zap,
  },
  {
    name: "Conversão de Vendas",
    value: "24.5%",
    change: "+4.3%",
    trend: "up",
    icon: TrendingUp,
  },
];

const recentInstalls = [
  {
    id: 1,
    client: "Supermercado Silva",
    date: "12 Out 2023",
    status: "Em andamento",
    kwp: "45 kWp",
  },
  {
    id: 2,
    client: "Residência Oliveira",
    date: "14 Out 2023",
    status: "Agendado",
    kwp: "8 kWp",
  },
  {
    id: 3,
    client: "Padaria Central",
    date: "15 Out 2023",
    status: "Agendado",
    kwp: "15 kWp",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard Inteligente
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Visão geral do seu negócio solar hoje.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            Novo Orçamento
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden bg-white rounded-xl shadow-sm border border-slate-200 p-5"
          >
            <dt>
              <div className="absolute p-3 bg-amber-50 rounded-lg">
                <item.icon
                  className="w-6 h-6 text-amber-600"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-16 text-sm font-medium text-slate-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="flex items-baseline pb-1 ml-16 sm:pb-2">
              <p className="text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.trend === "up" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {item.trend === "up" ? (
                  <ArrowUpRight className="self-center flex-shrink-0 w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="self-center flex-shrink-0 w-4 h-4 text-red-500" />
                )}
                <span className="sr-only">
                  {item.trend === "up" ? "Aumentou" : "Diminuiu"} por
                </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 1 */}
        <div className="p-6 bg-white border rounded-xl shadow-sm border-slate-200">
          <h3 className="text-base font-semibold leading-6 text-slate-900 mb-4">
            Faturamento vs Lucro
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="vendas"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  name="Vendas"
                />
                <Bar
                  dataKey="lucro"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  name="Lucro"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="p-6 bg-white border rounded-xl shadow-sm border-slate-200">
          <h3 className="text-base font-semibold leading-6 text-slate-900 mb-4">
            Crescimento de Leads
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="vendas"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6" }}
                  name="Leads"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Installs Table */}
      <div className="bg-white border rounded-xl shadow-sm border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-semibold leading-6 text-slate-900">
            Próximas Instalações
          </h3>
          <button className="text-sm font-medium text-amber-600 hover:text-amber-500">
            Ver agenda completa
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Potência
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Data
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {recentInstalls.map((install) => (
                <tr
                  key={install.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 pl-6 pr-3 text-sm font-medium text-slate-900 whitespace-nowrap">
                    {install.client}
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {install.kwp}
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    {install.date}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        install.status === "Em andamento"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {install.status}
                    </span>
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
