"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { MoreHorizontal, Calendar, DollarSign, Plus, X, Trash2, Edit2 } from "lucide-react";

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
  const [addingToCol, setAddingToCol] = useState<string | null>(null);
  const [newTaskContent, setNewTaskContent] = useState("");

  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editColumnTitle, setEditColumnTitle] = useState("");
  const [editColumnColor, setEditColumnColor] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskContent, setEditTaskContent] = useState("");
  const [editTaskValue, setEditTaskValue] = useState("");
  const [editTaskDate, setEditTaskDate] = useState("");

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

  const openEditColumn = (columnId: string) => {
    const column = data.columns[columnId as keyof typeof data.columns];
    setEditColumnTitle(column.title);
    setEditColumnColor(column.color);
    setEditingColumnId(columnId);
  };

  const handleEditColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingColumnId || !editColumnTitle.trim()) return;

    const column = data.columns[editingColumnId as keyof typeof data.columns];

    setData({
      ...data,
      columns: {
        ...data.columns,
        [editingColumnId]: {
          ...column,
          title: editColumnTitle,
          color: editColumnColor,
        },
      },
    });

    setEditingColumnId(null);
  };

  const openEditTask = (taskId: string) => {
    const task = data.tasks[taskId as keyof typeof data.tasks];
    setEditTaskContent(task.content);
    setEditTaskValue(task.value);
    setEditTaskDate(task.date);
    setEditingTaskId(taskId);
  };

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTaskId || !editTaskContent.trim()) return;

    const task = data.tasks[editingTaskId as keyof typeof data.tasks];

    setData({
      ...data,
      tasks: {
        ...data.tasks,
        [editingTaskId]: {
          ...task,
          content: editTaskContent,
          value: editTaskValue,
          date: editTaskDate,
        },
      },
    });

    setEditingTaskId(null);
  };

  const handleAddTask = (columnId: string) => {
    if (!newTaskContent.trim()) {
      setAddingToCol(null);
      return;
    }

    const newTaskId = `task-${Date.now()}`;
    const newTask = {
      id: newTaskId,
      content: newTaskContent,
      value: "R$ 0",
      date: "Hoje",
    };

    const column = data.columns[columnId as keyof typeof data.columns];

    setData({
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        [columnId]: {
          ...column,
          taskIds: [...column.taskIds, newTaskId],
        },
      },
    });

    setNewTaskContent("");
    setAddingToCol(null);
  };

  const handleDeleteTask = (taskId: string, columnId: string) => {
    const column = data.columns[columnId as keyof typeof data.columns];
    const newTaskIds = column.taskIds.filter((id) => id !== taskId);

    const newTasks = { ...data.tasks };
    delete newTasks[taskId as keyof typeof newTasks];

    setData({
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
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
                    className={`px-4 py-3 border-b rounded-t-xl ${column.color} border-opacity-50 flex items-center justify-between group/col`}
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm uppercase tracking-wider">
                        {column.title}
                      </h3>
                      <button
                        onClick={() => openEditColumn(column.id)}
                        className="text-slate-500 hover:text-slate-800 opacity-0 group-hover/col:opacity-100 transition-opacity"
                        title="Editar Etapa"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-bold">
                      {tasks.length}
                    </span>
                  </div>

                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 p-3 overflow-y-auto transition-colors ${snapshot.isDraggingOver ? "bg-slate-200/50" : ""
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
                                className={`p-4 mb-3 bg-white border border-slate-200 rounded-lg shadow-sm group ${snapshot.isDragging
                                  ? "shadow-md ring-2 ring-amber-500 ring-opacity-50"
                                  : ""
                                  }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-slate-900">
                                    {task.content}
                                  </h4>
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => openEditTask(task.id)}
                                      className="text-slate-400 hover:text-slate-600"
                                      title="Editar Lead"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTask(task.id, column.id)}
                                      className="text-red-400 hover:text-red-600"
                                      title="Excluir"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
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
                        {addingToCol === column.id ? (
                          <div className="mt-2 p-3 bg-white border border-amber-300 rounded-lg shadow-sm">
                            <input
                              type="text"
                              autoFocus
                              placeholder="Nome do lead..."
                              value={newTaskContent}
                              onChange={(e) => setNewTaskContent(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleAddTask(column.id);
                                if (e.key === "Escape") setAddingToCol(null);
                              }}
                              className="w-full text-sm border-none focus:ring-0 p-0 mb-2 mt-1 focus:outline-none"
                            />
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() => handleAddTask(column.id)}
                                className="px-3 py-1.5 text-xs font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700"
                              >
                                Adicionar
                              </button>
                              <button
                                onClick={() => setAddingToCol(null)}
                                className="p-1.5 text-slate-400 hover:text-slate-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setAddingToCol(column.id)}
                            className="flex items-center w-full mt-2 p-2 text-sm text-slate-500 hover:bg-slate-200/50 hover:text-slate-700 rounded-md transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar lead
                          </button>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}

            {/* Add Column Button inside the board */}
            <div className="flex-shrink-0 w-80 h-full">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center w-full py-3 text-sm font-medium text-slate-500 bg-slate-100/50 border border-dashed border-slate-300 rounded-xl hover:bg-slate-100 hover:text-slate-700 hover:border-slate-400 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar outra etapa
              </button>
            </div>
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
                      className={`h-10 rounded-lg border-2 transition-all ${color.value.split(" ")[0]
                        } ${newColumnColor === color.value
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

      {/* Edit Column Modal */}
      {editingColumnId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Editar Etapa
              </h2>
              <button
                onClick={() => setEditingColumnId(null)}
                className="text-slate-400 hover:text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditColumn} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome da Etapa
                </label>
                <input
                  type="text"
                  required
                  value={editColumnTitle}
                  onChange={(e) => setEditColumnTitle(e.target.value)}
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
                      onClick={() => setEditColumnColor(color.value)}
                      className={`h-10 rounded-lg border-2 transition-all ${color.value.split(" ")[0]
                        } ${editColumnColor === color.value
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
                  onClick={() => setEditingColumnId(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg hover:bg-amber-700"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTaskId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Editar Lead
              </h2>
              <button
                onClick={() => setEditingTaskId(null)}
                className="text-slate-400 hover:text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditTask} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome do Lead
                </label>
                <input
                  type="text"
                  required
                  value={editTaskContent}
                  onChange={(e) => setEditTaskContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ex: Carlos Mendes"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Valor (R$)
                  </label>
                  <input
                    type="text"
                    value={editTaskValue}
                    onChange={(e) => setEditTaskValue(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Ex: R$ 25.000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Data
                  </label>
                  <input
                    type="text"
                    value={editTaskDate}
                    onChange={(e) => setEditTaskDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Ex: Hoje"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTaskId(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-lg hover:bg-amber-700"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
