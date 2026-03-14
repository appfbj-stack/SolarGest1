"use client";

import { useState } from "react";
import {
  Camera,
  CheckSquare,
  FileSignature,
  MapPin,
  Phone,
  User,
  Wrench,
  Zap,
} from "lucide-react";

export default function OSPage() {
  const [signature, setSignature] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Ordem de Serviço
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            OS #2023-1054 • Instalação
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            Em Andamento
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Client Info */}
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-amber-600" />
            Dados do Cliente
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Nome</p>
              <p className="font-medium text-slate-900">Carlos Mendes</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Telefone</p>
              <p className="font-medium text-slate-900 flex items-center">
                <Phone className="w-4 h-4 mr-1 text-slate-400" />
                (11) 98765-4321
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-slate-500 mb-1">Endereço de Instalação</p>
              <p className="font-medium text-slate-900 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                Rua das Flores, 123 - Jardim Primavera, São Paulo - SP
              </p>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-amber-600" />
            Sistema a Instalar
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Potência</p>
              <p className="font-semibold text-slate-900">5.5 kWp</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Módulos</p>
              <p className="font-semibold text-slate-900">10x 550W</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Inversor</p>
              <p className="font-semibold text-slate-900">5kW Mono</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Telhado</p>
              <p className="font-semibold text-slate-900">Cerâmico</p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <CheckSquare className="w-5 h-5 mr-2 text-amber-600" />
            Checklist de Instalação
          </h2>
          <div className="space-y-3">
            {[
              "Verificação do local e segurança",
              "Fixação dos suportes e trilhos",
              "Instalação dos módulos fotovoltaicos",
              "Passagem de cabos CC e CA",
              "Instalação e fixação do inversor",
              "Conexão do quadro elétrico (String Box)",
              "Testes de tensão e corrente",
              "Configuração do monitoramento Wi-Fi",
              "Limpeza do local",
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-start p-3 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
                />
                <span className="ml-3 text-slate-700 font-medium">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Camera className="w-5 h-5 mr-2 text-amber-600" />
            Registro Fotográfico
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-amber-600 hover:border-amber-400 cursor-pointer transition-colors"
              >
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-xs font-medium">Adicionar Foto</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signature */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <FileSignature className="w-5 h-5 mr-2 text-amber-600" />
            Assinatura do Cliente
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            {signature ? (
              <div className="h-32 flex flex-col items-center justify-center">
                <span className="font-script text-3xl text-slate-800">
                  Carlos Mendes
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  Assinado em 15/10/2023 às 16:45
                </p>
                <button
                  onClick={() => setSignature(false)}
                  className="mt-4 text-sm text-red-600 hover:underline"
                >
                  Limpar
                </button>
              </div>
            ) : (
              <div
                className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg bg-white cursor-pointer hover:bg-slate-50"
                onClick={() => setSignature(true)}
              >
                <p className="text-slate-400 font-medium">Toque para assinar</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-slate-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors focus:ring-4 focus:ring-slate-900/20">
              Salvar Rascunho
            </button>
            <button className="flex-1 bg-amber-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors focus:ring-4 focus:ring-amber-500/20">
              Finalizar OS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
