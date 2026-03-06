"use client";

import { useState } from "react";
import { Search, Plus, MoreVertical, Phone, Mail, MapPin, X } from "lucide-react";

const initialLeads = [
  {
    id: 1,
    name: "Carlos Mendes",
    phone: "(11) 98765-4321",
    email: "carlos.mendes@email.com",
    city: "São Paulo - SP",
    type: "Residencial",
    consumption: "450 kWh",
    status: "Novo Lead",
  },
  {
    id: 2,
    name: "Padaria Pão Quente",
    phone: "(11) 3456-7890",
    email: "contato@paoquente.com.br",
    city: "Campinas - SP",
    type: "Comercial",
    consumption: "1200 kWh",
    status: "Em Negociação",
  },
  {
    id: 3,
    name: "Fazenda Boa Esperança",
    phone: "(16) 99999-1111",
    email: "adm@boaesperanca.com",
    city: "Ribeirão Preto - SP",
    type: "Rural",
    consumption: "3500 kWh",
    status: "Proposta Enviada",
  },
];

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState(initialLeads);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    type: "Residencial",
    consumption: "",
  });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const lead = {
      ...newLead,
      id: leads.length + 1,
      status: "Novo Lead",
      consumption: newLead.consumption ? `${newLead.consumption} kWh` : "0 kWh",
    };
    setLeads([lead, ...leads]);
    setIsModalOpen(false);
    setNewLead({
      name: "",
      phone: "",
      email: "",
      city: "",
      type: "Residencial",
      consumption: "",
    });
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">CRM de Leads</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie seus contatos e oportunidades de negócio.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <Plus className="w-5 h-5 mr-2 -ml-1" />
            Novo Lead
          </button>
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
            placeholder="Buscar por nome, email ou cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="block w-full py-2 pl-3 pr-10 text-base border-slate-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-lg">
            <option>Todos os Status</option>
            <option>Novo Lead</option>
            <option>Contato Feito</option>
            <option>Proposta Enviada</option>
            <option>Em Negociação</option>
          </select>
          <select className="block w-full py-2 pl-3 pr-10 text-base border-slate-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-lg">
            <option>Tipo de Imóvel</option>
            <option>Residencial</option>
            <option>Comercial</option>
            <option>Rural</option>
            <option>Industrial</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border rounded-xl shadow-sm border-slate-200 overflow-hidden">
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
                  Contato
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Local / Tipo
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Consumo
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-6">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-4 pl-6 pr-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {lead.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-slate-400" />
                      {lead.phone}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center mt-1">
                      <Mail className="w-4 h-4 mr-2 text-slate-400" />
                      {lead.email}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                      {lead.city}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {lead.type}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
                      {lead.consumption}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === "Novo Lead"
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "Em Negociação"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 pl-3 pr-6 text-right whitespace-nowrap text-sm font-medium">
                    <button className="text-slate-400 hover:text-slate-500">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              Nenhum lead encontrado.
            </div>
          )}
        </div>
      </div>

      {/* New Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Novo Lead</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddLead} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ex: João da Silva"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  required
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ex: (11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ex: joao@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Cidade - Estado
                </label>
                <input
                  type="text"
                  required
                  value={newLead.city}
                  onChange={(e) => setNewLead({ ...newLead, city: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ex: São Paulo - SP"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Tipo de Imóvel
                  </label>
                  <select
                    value={newLead.type}
                    onChange={(e) => setNewLead({ ...newLead, type: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option>Residencial</option>
                    <option>Comercial</option>
                    <option>Rural</option>
                    <option>Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Consumo (kWh)
                  </label>
                  <input
                    type="number"
                    value={newLead.consumption}
                    onChange={(e) => setNewLead({ ...newLead, consumption: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Ex: 450"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg hover:bg-amber-700"
                >
                  Salvar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
