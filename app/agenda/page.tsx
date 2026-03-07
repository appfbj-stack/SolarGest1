"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, User, Wrench, Plus } from "lucide-react";

interface Evento {
  id: string;
  titulo: string;
  cliente: string;
  endereco: string;
  horario: string;
  equipe: string;
  tipo: string;
}

const colorMap: Record<string, string> = {
  "Instalação": "bg-amber-100 border-amber-200 text-amber-800",
  "Visita": "bg-blue-100 border-blue-200 text-blue-800",
  "Manutenção": "bg-emerald-100 border-emerald-200 text-emerald-800",
};

export default function AgendaPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ titulo: "", cliente: "", endereco: "", horario: "", equipe: "Equipe Alpha", tipo: "Instalação" });

  useEffect(() => {
    fetch("/api/agenda").then(r => r.json()).then(setEventos).finally(() => setLoading(false));
  }, []);

  const openNew = () => { setEditingId(null); setForm({ titulo: "", cliente: "", endereco: "", horario: "", equipe: "Equipe Alpha", tipo: "Instalação" }); setIsModalOpen(true); };
  const openEdit = (e: Evento) => { setEditingId(e.id); setForm({ titulo: e.titulo, cliente: e.cliente, endereco: e.endereco, horario: e.horario, equipe: e.equipe, tipo: e.tipo }); setIsModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const res = await fetch(`/api/agenda/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const updated = await res.json();
      setEventos(eventos.map(ev => ev.id === editingId ? updated : ev));
    } else {
      const res = await fetch("/api/agenda", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const novo = await res.json();
      setEventos([novo, ...eventos]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Agenda de Instalações</h1>
          <p className="mt-1 text-sm text-slate-500">Gerencie visitas técnicas, instalações e manutenções.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button onClick={openNew} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700">
            <Plus className="w-4 h-4 mr-2" /> Novo Agendamento
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center mb-4">
            <CalendarIcon className="w-5 h-5 mr-2 text-amber-600" /> Agendamentos
          </h2>
          {loading && <p className="text-center text-slate-500 py-8">Carregando...</p>}
          <div className="space-y-4">
            {!loading && eventos.map((evento) => (
              <div key={evento.id} onClick={() => openEdit(evento)} className={`p-4 rounded-xl border ${colorMap[evento.tipo] || "bg-slate-100 border-slate-200 text-slate-800"} hover:opacity-90 transition-opacity cursor-pointer`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{evento.titulo}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 bg-white/50 rounded-md">{evento.tipo}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm opacity-90">
                  <div className="flex items-center"><User className="w-4 h-4 mr-2" />{evento.cliente}</div>
                  <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{evento.horario}</div>
                  <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{evento.endereco}</div>
                  <div className="flex items-center"><Wrench className="w-4 h-4 mr-2" />{evento.equipe}</div>
                </div>
              </div>
            ))}
            {!loading && eventos.length === 0 && <p className="text-slate-500 text-sm text-center py-8">Nenhum evento agendado.</p>}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{editingId ? "Editar" : "Novo"} Agendamento</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Título</label>
                <input required type="text" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Ex: Instalação 5kWp" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cliente</label>
                  <input required type="text" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100" value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} placeholder="Nome do cliente" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo</label>
                  <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                    <option>Instalação</option><option>Visita</option><option>Manutenção</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Endereço</label>
                <input required type="text" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100" value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} placeholder="Endereço completo" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Horário</label>
                  <input required type="text" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100" value={form.horario} onChange={(e) => setForm({ ...form, horario: e.target.value })} placeholder="Ex: 09:00 - 12:00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Equipe</label>
                  <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100" value={form.equipe} onChange={(e) => setForm({ ...form, equipe: e.target.value })}>
                    <option>Equipe Alpha</option><option>Equipe Beta</option><option>João Silva</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
