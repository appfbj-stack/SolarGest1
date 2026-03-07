"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Package,
  Zap,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";

const equipment = [
  {
    id: "EQ-001",
    name: "Módulo Solar 550W Monocristalino",
    brand: "Canadian Solar",
    type: "Painel Solar",
    power: "550W",
    stock: 145,
    price: "R$ 850,00",
    status: "Em Estoque",
  },
  {
    id: "EQ-002",
    name: "Inversor String 5kW Monofásico",
    brand: "Growatt",
    type: "Inversor",
    power: "5kW",
    stock: 12,
    price: "R$ 3.200,00",
    status: "Em Estoque",
  },
  {
    id: "EQ-003",
    name: "Inversor String 15kW Trifásico",
    brand: "WEG",
    type: "Inversor",
    power: "15kW",
    stock: 2,
    price: "R$ 8.500,00",
    status: "Estoque Baixo",
  },
  {
    id: "EQ-004",
    name: "Estrutura Telhado Cerâmico (4 Módulos)",
    brand: "SolarGroup",
    type: "Estrutura",
    power: "-",
    stock: 45,
    price: "R$ 350,00",
    status: "Em Estoque",
  },
  {
    id: "EQ-005",
    name: "Cabo Solar 6mm Preto (Rolo 100m)",
    brand: "Nexans",
    type: "Cabeamento",
    power: "-",
    stock: 0,
    price: "R$ 450,00",
    status: "Esgotado",
  },
];

export default function EquipamentosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas as Categorias");

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todas as Categorias" ||
      item.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Controle de Equipamentos
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie seu estoque de painéis, inversores e estruturas.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            <Plus className="w-5 h-5 mr-2 -ml-1" />
            Novo Equipamento
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
              <Package className="h-6 w-6 text-amber-600" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">
                  Total em Estoque
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-slate-900">
                    204 itens
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200 p-5">
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
                  Valor do Estoque
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-slate-900">
                    R$ 185.400
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
              <AlertTriangle
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">
                  Itens com Estoque Baixo
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-slate-900">
                    2 itens
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full py-2 pl-10 pr-3 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Buscar por nome, marca ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="block w-full py-2 pl-3 pr-10 text-base border-slate-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>Todas as Categorias</option>
            <option>Painel Solar</option>
            <option>Inversor</option>
            <option>Estrutura</option>
            <option>Cabeamento</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            Filtros
          </button>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white border rounded-xl shadow-sm border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Equipamento
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Categoria
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
                  Estoque
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Preço Custo
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
              {filteredEquipment.length > 0 ? (
                filteredEquipment.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 pl-6 pr-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                          {item.type === "Painel Solar" ? (
                            <Zap className="w-5 h-5" />
                          ) : (
                            <Package className="w-5 h-5" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.id} • {item.brand}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                      {item.power}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                      {item.stock} un
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                      {item.price}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === "Em Estoque"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "Estoque Baixo"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-sm text-slate-500"
                  >
                    Nenhum equipamento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
