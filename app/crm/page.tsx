"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Phone, Mail, MapPin, X, Trash2 } from "lucide-react";

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  cidade: string;
  tipo: string;
  consumo: string;
  status: string;
}

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newLead, setNewLead] = useState({
    nome: "", telefone: "", email: "", cidade: "",
    tipo: "Residencial", consumo: "",
  });

  useEffect(() => {
    fetch("/api/clientes").then(r => r.json()).then(setLeads).finally(() => setLoading(false));
  }, []);

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newLead, consumo: newLead.consumo ? `${newLead.consumo} kWh` : "0 kWh", status: "Novo Lead" }),
    });
    const lead = await res.json();
    setLeads([lead, ...leads]);
    setIsModalOpen(false);
    setNewLead({ nome: "", telefone: "", email: "", cidade: "", tipo: "Residencial", consumo: "" });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/clientes/${id}`, { method: "DELETE" });
    setLeads(leads.filter(l => l.id !== id));
  };

  const filteredLeads = leads.filter(lead =>
    lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.cidade || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">CRM de Leads</h1>
          <p className="mt-1 text-sm text-slate-500">Gerencie seus contatos e oportunidades de negócio.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700">
            <Plus className="w-5 h-5 mr-2 -ml-1" /> Novo Lead
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input type="text" className="block w-full py-2 pl-10 pr-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 sm:text-sm dark:bg-slate-700 dark:text-slate-100" placeholder="Buscar por nome, email ou cidade..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border rounded-xl shadow-sm border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cliente</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contato</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Local / Tipo</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Consumo</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-6"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
              {loading && <tr><td colSpan={6} className="py-8 text-center text-slate-500">Carregando...</td></tr>}
              {!loading && filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="py-4 pl-6 pr-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">{lead.nome.charAt(0)}</div>
                      <div className="ml-4 text-sm font-medium text-slate-900 dark:text-slate-100">{lead.nome}</div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-slate-100 flex items-center"><Phone className="w-4 h-4 mr-2 text-slate-400" />{lead.telefone}</div>
                    <div className="text-sm text-slate-500 flex items-center mt-1"><Mail className="w-4 h-4 mr-2 text-slate-400" />{lead.email}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-slate-100 flex items-center"><MapPin className="w-4 h-4 mr-2 text-slate-400" />{lead.cidade}</div>
                    <div className="text-sm text-slate-500 mt-1">{lead.tipo}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-700 dark:text-slate-300">{lead.consumo}</span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.status === "Novo Lead" ? "bg-blue-100 text-blue-800" : lead.status === "Em Negociação" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 pl-3 pr-6 text-right whitespace-nowrap">
                    <button onClick={() => handleDelete(lead.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {!loading && filteredLeads.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Nenhum lead encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Novo Lead</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-500"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleAddLead} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
                <input type="text" required value={newLead.nome} onChange={(e) => setNewLead({ ...newLead, nome: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-700 dark:text-slate-100" placeholder="Ex: João da Silva" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Telefone / WhatsApp</label>
                <input type="text" required value={newLead.telefone} onChange={(e) => setNewLead({ ...newLead, telefone: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-700 dark:text-slate-100" placeholder="Ex: (11) 99999-9999" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input type="email" value={newLead.email} onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-700 dark:text-slate-100" placeholder="Ex: joao@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cidade - Estado</label>
                <input type="text" required value={newLead.cidade} onChange={(e) => setNewLead({ ...newLead, cidade: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-700 dark:text-slate-100" placeholder="Ex: São Paulo - SP" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de Imóvel</label>
                  <select value={newLead.tipo} onChange={(e) => setNewLead({ ...newLead, tipo: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-700 dark:text-slate-100">
                    <option>Residencial</option><option>Comercial</option><option>Rural</option><option>Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Consumo (kWh)</label>
                  <input type="number" value={newLead.consumo} onChange={(e) => setNewLead({ ...newLead, consumo: e.target.value })} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-700 dark:text-slate-100" placeholder="Ex: 450" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg hover:bg-amber-700">Salvar Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
