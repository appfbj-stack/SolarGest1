"use client";

import { useState } from "react";
import { User, Bell, Shield, Key, Building, Settings, Save } from "lucide-react";

export default function ConfiguracoesPage() {
    const [activeTab, setActiveTab] = useState("perfil");

    const tabs = [
        { id: "perfil", name: "Perfil de Usuário", icon: User },
        { id: "empresa", name: "Dados da Empresa", icon: Building },
        { id: "notificacoes", name: "Notificações", icon: Bell },
        { id: "seguranca", name: "Segurança", icon: Shield },
        { id: "integracoes", name: "Integrações", icon: Key },
        { id: "sistema", name: "Sistema", icon: Settings },
    ];

    return (
        <div className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Gerencie as preferências da sua conta e configurações do sistema.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-3">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                        Cancelar
                    </button>
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Menu Lateral de Configurações */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? "bg-amber-50 text-amber-700"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <tab.icon
                                        className={`flex-shrink-0 w-5 h-5 mr-3 ${isActive ? "text-amber-600" : "text-slate-400"
                                            }`}
                                    />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Conteúdo das Configurações */}
                <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm">
                    {activeTab === "perfil" && (
                        <div className="p-6 space-y-6">
                            <h2 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-4">
                                Informações do Perfil
                            </h2>

                            <div className="flex items-center space-x-6">
                                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-2xl font-bold border-2 border-amber-200">
                                    JS
                                </div>
                                <div>
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                                        Alterar Foto
                                    </button>
                                    <p className="mt-2 text-xs text-slate-500">
                                        Formatos suportados: JPG, PNG ou GIF. Tamanho máximo: 2MB.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 block">
                                        Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="João Silva"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 block">
                                        Cargo / Função
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Gerente de Operações"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 block">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="joao.silva@solargest.com.br"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 block">
                                        Telefone
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="(11) 98765-4321"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "empresa" && (
                        <div className="p-6 space-y-6">
                            <h2 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-4">
                                Dados da Empresa
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 col-span-1 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700 block">
                                        Nome Fantasia
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="SolarGest Soluções Energéticas"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 block">
                                        Razão Social
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="SolarGest Energias Renováveis LTDA"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 block">
                                        CNPJ
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="00.000.000/0001-00"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab !== "perfil" && activeTab !== "empresa" && (
                        <div className="p-6 flex flex-col items-center justify-center text-center h-64 text-slate-500">
                            <Settings className="w-12 h-12 text-slate-300 mb-4" />
                            <p>Módulo em desenvolvimento.</p>
                            <p className="text-sm mt-1">Estas configurações estarão disponíveis em breve.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
