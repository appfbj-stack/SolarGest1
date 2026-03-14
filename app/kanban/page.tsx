"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { MoreHorizontal, Calendar, DollarSign, Plus, X } from "lucide-react";

const initialData = {
  columns: {
    "col-1": {
      id: "col-1",
      title: "Novo Lead",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      taskIds: ["task-1", "task-2"],
    },
    "col-2": {
      id: "col-2",
      title: "Contato Feito",
      color: "bg-cyan-100 text-cyan-800 border-cyan-200",
      taskIds: ["task-3"],
    },
    "col-3": {
      id: "col-3",
      title: "Proposta Enviada",
      color: "bg-orange-100 text-orange-800 border-orange-200",
      taskIds: ["task-4"],
    },
    "col-4": {
      id: "col-4",
      title: "Negociação",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      taskIds: ["task-5"],
    },
    "col-5": {
      id: "col-5",
      title: "Venda Fechada",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      taskIds: [],
    },
  },
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Carlos Mendes",
      value: "R$ 25.000",
      date: "Hoje",
    },
    "task-2": {
      id: "task-2",
      content: "Ana Souza",
      value: "R$ 18.500",
      date: "Ontem",
    },
    "task-3": {
      id: "task-3",
      content: "Mercado Silva",
      value: "R$ 85.000",
      date: "2 dias atrás",
    },
    "task-4": {
      id: "task-4",
      content: "Fazenda Esperança",
      value: "R$ 120.000",
      date: "1 semana atrás",
    },
    "task-5": {
      id: "task-5",
      content: "Padaria Central",
      value: "R$ 45.000",
      date: "3 dias atrás",
    },
  },
  columnOrder: ["col-1", "col-2", "col-3", "col-4", "col-5"],
};

const colorOptions = [
  { label: "Azul", value: "bg-blue-100 text-blue-800 border-blue-200" },
  { label: "Ciano", value: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  {
    label: "Laranja",
    value: "bg-orange-100 text-orange-800 border-orange-200",
  },
  { label: "Roxo", value: "bg-purple-100 text-purple-800 border-purple-200" },
  {
    label: "Verde",
    value: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  { label: "Vermelho", value: "bg-red-100 text-red-800 border-red-200" },
  { label: "Amarelo", value: "bg-amber-100 text-amber-800 border-amber-200" },
  { label: "Cinza", value: "bg-slate-100 text-slate-800 border-slate-200" },
];

export default function KanbanPage() {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnColor, setNewColumnColor] = useState(colorOptions[0].value);

  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnTitle.trim()) return;

    const newColumnId = `col-${Date.now()}`;
    const newColumn = {
      id: newColumnId,
      title: newColumnTitle,
      color: newColumnColor,
      taskIds: [],
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...data.columnOrder, newColumnId],
    });

    setNewColumnTitle("");
    setNewColumnColor(colorOptions[0].value);
    setIsModalOpen(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId as keyof typeof data.columns];
    const finish =
      data.columns[destination.droppableId as keyof typeof data.columns];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Funil de Vendas</h1>
          <p className="mt-1 text-sm text-slate-500">
            Acompanhe o progresso das suas negociações.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <Plus className="w-5 h-5 mr-2 -ml-1" />
            Nova Etapa
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex h-full gap-6 items-start">
            {data.columnOrder.map((columnId) => {
              const column =
                data.columns[columnId as keyof typeof data.columns];
              const tasks = column.taskIds.map(
                (taskId) => data.tasks[taskId as keyof typeof data.tasks],
              );

              return (
                <div
                  key={column.id}
                  className="flex flex-col flex-shrink-0 w-80 bg-slate-100/50 rounded-xl border border-slate-200 h-full"
                >
                  <div
                    className={`px-4 py-3 border-b rounded-t-xl ${column.color} border-opacity-50 flex items-center justify-between`}
                  >
                    <h3 className="font-semibold text-sm uppercase tracking-wider">
                      {column.title}
                    </h3>
                    <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-bold">
                      {tasks.length}
                    </span>
                  </div>

                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 p-3 overflow-y-auto transition-colors ${
                          snapshot.isDraggingOver ? "bg-slate-200/50" : ""
                        }`}
                      >
                        {tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-4 mb-3 bg-white border border-slate-200 rounded-lg shadow-sm group ${
                                  snapshot.isDragging
                                    ? "shadow-md ring-2 ring-amber-500 ring-opacity-50"
                                    : ""
                                }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-slate-900">
                                    {task.content}
                                  </h4>
                                  <button className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-600">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="flex items-center text-sm text-slate-500 mb-2">
                                  <DollarSign className="w-3.5 h-3.5 mr-1" />
                                  {task.value}
                                </div>
                                <div className="flex items-center text-xs text-slate-400">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {task.date}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>

      {/* New Column Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Nova Etapa do Funil
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddColumn} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome da Etapa
                </label>
                <input
                  type="text"
                  required
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ex: Em Análise"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cor da Etapa
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.label}
                      type="button"
                      onClick={() => setNewColumnColor(color.value)}
                      className={`h-10 rounded-lg border-2 transition-all ${
                        color.value.split(" ")[0]
                      } ${
                        newColumnColor === color.value
                          ? "border-slate-900 scale-105 shadow-sm"
                          : "border-transparent hover:scale-105"
                      }`}
                      title={color.label}
                    />
                  ))}
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
                  Criar Etapa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
