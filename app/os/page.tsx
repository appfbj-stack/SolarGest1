"use client";

import { useState, useRef, useEffect } from "react";
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
  const [photos, setPhotos] = useState<string[]>([]);

  // Signature Canvas Logic
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && signature) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
      }
    }
  }, [signature]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

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
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg border border-slate-200 overflow-hidden group">
                <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <label className="aspect-square bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-amber-600 hover:border-amber-400 cursor-pointer transition-colors">
              <Camera className="w-8 h-8 mb-2" />
              <span className="text-xs font-medium text-center px-2">Capturar / Escolher</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
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
              <div className="flex flex-col items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={150}
                  className="border border-slate-300 bg-white rounded-lg shadow-inner touch-none cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={clearSignature}
                    className="text-sm px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={() => setSignature(false)}
                    className="text-sm px-4 py-2 border border-red-200 bg-red-50 rounded-md text-red-600 hover:bg-red-100"
                  >
                    Cancelar
                  </button>
                </div>
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
            <button
              onClick={() => alert("Rascunho da Ordem de Serviço salvo com sucesso!")}
              className="flex-1 bg-slate-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors focus:ring-4 focus:ring-slate-900/20"
            >
              Salvar Rascunho
            </button>
            <button
              onClick={() => {
                if (!hasSignature) {
                  alert("A assinatura do cliente é obrigatória para finalizar a OS.");
                  return;
                }
                alert("Ordem de Serviço finalizada com sucesso!");
                window.location.href = "/agenda";
              }}
              className="flex-1 bg-amber-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors focus:ring-4 focus:ring-amber-500/20"
            >
              Finalizar OS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
