"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Wrench,
  Package,
  AlertCircle,
  Calendar,
  MapPin,
  Zap,
} from "lucide-react";

const projects = [
  {
    id: "PRJ-001",
    client: "Carlos Mendes",
    power: "5.5 kWp",
    address: "Rua das Flores, 123 - São Paulo, SP",
    date: "15/10/2023",
    status: "Instalando",
    progress: 75,
  },
  {
    id: "PRJ-002",
    client: "Padaria Pão Quente",
    power: "15.0 kWp",
    address: "Av. Brasil, 456 - Campinas, SP",
    date: "20/10/2023",
    status: "Material Comprado",
    progress: 40,
  },
  {
    id: "PRJ-003",
    client: "Residência Oliveira",
    power: "8.2 kWp",
    address: "Rua das Árvores, 789 - Sorocaba, SP",
    date: "25/10/2023",
    status: "Projeto Aprovado",
    progress: 20,
  },
  {
    id: "PRJ-004",
    client: "Supermercado Silva",
    power: "45.0 kWp",
    address: "Rodovia SP-300, Km 12 - Jundiaí, SP",
    date: "10/10/2023",
    status: "Concluído",
    progress: 100,
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "Projeto Aprovado":
      return {
        icon: CheckCircle2,
        color: "text-blue-600",
        bg: "bg-blue-100",
        border: "border-blue-200",
      };
    case "Material Comprado":
      return {
        icon: Package,
        color: "text-purple-600",
        bg: "bg-purple-100",
        border: "border-purple-200",
      };
    case "Instalação Agendada":
      return {
        icon: Calendar,
        color: "text-orange-600",
        bg: "bg-orange-100",
        border: "border-orange-200",
      };
    case "Instalando":
      return {
        icon: Wrench,
        color: "text-amber-600",
        bg: "bg-amber-100",
        border: "border-amber-200",
      };
    case "Concluído":
      return {
        icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-100",
        border: "border-emerald-200",
      };
    default:
      return {
        icon: AlertCircle,
        color: "text-slate-600",
        bg: "bg-slate-100",
        border: "border-slate-200",
      };
  }
};

export default function ProjetosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Gestão de Projetos
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Acompanhe o andamento das instalações após a venda.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full py-2 pl-10 pr-3 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Buscar projeto ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
          <Filter className="w-4 h-4 mr-2 text-slate-400" />
          Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => {
          const statusConfig = getStatusConfig(project.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={project.id}
              className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 mb-2">
                      {project.id}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {project.client}
                    </h3>
                  </div>
                  <div
                    className={`p-2 rounded-lg ${statusConfig.bg} ${statusConfig.color}`}
                  >
                    <StatusIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="font-medium text-slate-900">
                      {project.power}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{project.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-slate-400" />
                    <span>Previsão: {project.date}</span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${statusConfig.color}`}
                  >
                    {project.status}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${project.progress === 100 ? "bg-emerald-500" : "bg-amber-500"}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
