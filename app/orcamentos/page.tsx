"use client";

import { useState } from "react";
import {
  Calculator,
  FileText,
  Send,
  Save,
  Zap,
  Sun,
  Battery,
} from "lucide-react";

export default function OrcamentosPage() {
  const [consumption, setConsumption] = useState("");
  const [tariff, setTariff] = useState("0.95");
  const [city, setCity] = useState("");
  const [roofType, setRoofType] = useState("Cerâmico");

  const [result, setResult] = useState<{
    power: number;
    panels: number;
    inverter: string;
    savings: number;
    payback: number;
  } | null>(null);

  const calculateSystem = (e: React.FormEvent) => {
    e.preventDefault();
    const cons = parseFloat(consumption);
    const tar = parseFloat(tariff);

    if (isNaN(cons) || isNaN(tar)) return;

    // Simplified calculation logic for demonstration
    const dailyGenerationNeeded = cons / 30;
    // Assuming average 4.5 hours of full sun
    const powerNeeded = dailyGenerationNeeded / 4.5;

    // Assuming 550W panels
    const panelPower = 0.55;
    const numPanels = Math.ceil(powerNeeded / panelPower);

    const actualPower = numPanels * panelPower;

    const monthlySavings = cons * tar;
    const estimatedCost = actualPower * 4000; // R$ 4000 per kWp roughly
    const paybackMonths = estimatedCost / monthlySavings;

    setResult({
      power: Number(actualPower.toFixed(2)),
      panels: numPanels,
      inverter:
        actualPower <= 5
          ? "5kW Monofásico"
          : actualPower <= 10
            ? "10kW Trifásico"
            : "15kW Trifásico",
      savings: Number(monthlySavings.toFixed(2)),
      payback: Number((paybackMonths / 12).toFixed(1)),
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Gerador de Orçamento Solar
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Calcule o dimensionamento do sistema e gere propostas automaticamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-amber-600" />
            Dados do Cliente
          </h2>

          <form onSubmit={calculateSystem} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Consumo Médio Mensal (kWh)
              </label>
              <input
                type="number"
                required
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                placeholder="Ex: 450"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tarifa de Energia (R$/kWh)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={tariff}
                onChange={(e) => setTariff(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Cidade / Estado
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                placeholder="Ex: São Paulo - SP"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tipo de Telhado
              </label>
              <select
                value={roofType}
                onChange={(e) => setRoofType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              >
                <option>Cerâmico</option>
                <option>Metálico</option>
                <option>Fibrocimento</option>
                <option>Laje</option>
                <option>Solo</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-amber-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-amber-700 transition-colors focus:ring-4 focus:ring-amber-500/20"
            >
              Calcular Sistema
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {result ? (
            <>
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-amber-600" />
                  Dimensionamento Recomendado
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">Potência</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {result.power}{" "}
                      <span className="text-sm font-normal text-slate-500">
                        kWp
                      </span>
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">
                      Módulos (550W)
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {result.panels}{" "}
                      <span className="text-sm font-normal text-slate-500">
                        un
                      </span>
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">Inversor</p>
                    <p className="text-lg font-bold text-slate-900 mt-1">
                      {result.inverter}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">Área Mínima</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {result.panels * 2.5}{" "}
                      <span className="text-sm font-normal text-slate-500">
                        m²
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative overflow-hidden rounded-xl bg-emerald-50 border border-emerald-100 p-6">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-200 rounded-full opacity-50 blur-2xl"></div>
                    <h3 className="text-emerald-800 font-medium mb-2">
                      Economia Mensal Estimada
                    </h3>
                    <p className="text-4xl font-bold text-emerald-600">
                      R${" "}
                      {result.savings.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-emerald-700 mt-2">
                      ~ R${" "}
                      {(result.savings * 12).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      por ano
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-xl bg-blue-50 border border-blue-100 p-6">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-2xl"></div>
                    <h3 className="text-blue-800 font-medium mb-2">
                      Retorno do Investimento (Payback)
                    </h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {result.payback} <span className="text-2xl">anos</span>
                    </p>
                    <p className="text-sm text-blue-700 mt-2">
                      Tempo estimado para o sistema se pagar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Rascunho
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-900 border border-transparent rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
                  <FileText className="w-4 h-4 mr-2" />
                  Gerar PDF
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Proposta
                </button>
              </div>
            </>
          ) : (
            <div className="h-full min-h-[400px] bg-white border border-slate-200 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Sun className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">
                Nenhum cálculo realizado
              </h3>
              <p className="text-slate-500 max-w-sm">
                Preencha os dados do cliente ao lado e clique em calcular para
                ver o dimensionamento e a economia estimada.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
