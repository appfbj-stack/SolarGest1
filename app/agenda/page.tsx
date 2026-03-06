"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Wrench,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Instalação 5.5 kWp",
    client: "Carlos Mendes",
    address: "Rua das Flores, 123",
    time: "08:00 - 17:00",
    team: "Equipe Alpha",
    type: "Instalação",
    color: "bg-amber-100 border-amber-200 text-amber-800",
  },
  {
    id: 2,
    title: "Visita Técnica",
    client: "Padaria Pão Quente",
    address: "Av. Brasil, 456",
    time: "09:00 - 11:00",
    team: "João Silva",
    type: "Visita",
    color: "bg-blue-100 border-blue-200 text-blue-800",
  },
  {
    id: 3,
    title: "Manutenção Preventiva",
    client: "Residência Oliveira",
    address: "Rua das Árvores, 789",
    time: "14:00 - 16:00",
    team: "Equipe Beta",
    type: "Manutenção",
    color: "bg-emerald-100 border-emerald-200 text-emerald-800",
  },
];

export default function AgendaPage() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Agenda de Instalações
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie as visitas técnicas, instalações e manutenções.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Hoje
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700">
            Novo Agendamento
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
        {/* Calendar Sidebar */}
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Outubro 2023
            </h2>
            <div className="flex space-x-1">
              <button className="p-1 rounded-md hover:bg-slate-200 text-slate-600">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-1 rounded-md hover:bg-slate-200 text-slate-600">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 mb-2">
            <div>D</div>
            <div>S</div>
            <div>T</div>
            <div>Q</div>
            <div>Q</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm">
            {/* Empty cells for offset */}
            <div className="p-2 text-slate-300 text-center">24</div>
            <div className="p-2 text-slate-300 text-center">25</div>
            <div className="p-2 text-slate-300 text-center">26</div>
            <div className="p-2 text-slate-300 text-center">27</div>
            <div className="p-2 text-slate-300 text-center">28</div>
            <div className="p-2 text-slate-300 text-center">29</div>
            <div className="p-2 text-slate-300 text-center">30</div>

            {/* Actual days */}
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`p-2 text-center rounded-full cursor-pointer hover:bg-amber-100 ${
                  i + 1 === 15
                    ? "bg-amber-600 text-white hover:bg-amber-700 font-bold"
                    : "text-slate-700"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-slate-900 mb-3">Equipes</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-amber-600 focus:ring-amber-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-slate-600">
                  Equipe Alpha
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-amber-600 focus:ring-amber-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-slate-600">Equipe Beta</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-amber-600 focus:ring-amber-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-slate-600">
                  João Silva (Visitas)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-amber-600" />
              Terça-feira, 15 de Outubro
            </h2>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-xl border ${event.color} bg-opacity-50 hover:bg-opacity-100 transition-colors cursor-pointer`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{event.title}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 bg-white/50 rounded-md">
                    {event.type}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm opacity-90">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {event.client}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.address}
                  </div>
                  <div className="flex items-center">
                    <Wrench className="w-4 h-4 mr-2" />
                    {event.team}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
