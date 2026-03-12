"use client";
import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Layout, ListTodo, Calendar, Trash2 } from 'lucide-react';

export default function AgentPM() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Planejar interface", status: "todo" },
    { id: 2, text: "Configurar banco de dados", status: "doing" },
    { id: 3, text: "Enviar para o Render", status: "done" }
  ]);
  const [input, setInput] = useState("");

  const addTask = (status) => {
    if (!input) return;
    setTasks([...tasks, { id: Date.now(), text: input, status }]);
    setInput("");
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const Column = ({ title, status, color }) => (
    <div className="flex-1 min-w-[300px] bg-gray-50/50 rounded-xl p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-gray-700 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`}></div>
          {title}
        </h2>
        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
          {tasks.filter(t => t.status === status).length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.filter(t => t.status === status).map(task => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 group hover:border-blue-400 transition-all">
            <p className="text-sm text-gray-600 mb-3">{task.text}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {status !== 'todo' && <button onClick={() => moveTask(task.id, 'todo')} className="text-[10px] bg-gray-100 px-2 py-1 rounded">To Do</button>}
                {status !== 'doing' && <button onClick={() => moveTask(task.id, 'doing')} className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded">Doing</button>}
                {status !== 'done' && <button onClick={() => moveTask(task.id, 'done')} className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded">Done</button>}
              </div>
              <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-red-400"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <input 
            className="w-full p-2 text-xs border rounded-md mb-2 outline-none focus:border-blue-500"
            placeholder="Nova tarefa..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => addTask(status)} className="w-full py-2 bg-white border border-dashed border-gray-300 rounded-md text-gray-500 text-xs hover:bg-gray-50 flex items-center justify-center gap-2">
            <Plus size={14}/> Adicionar Card
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-black text-blue-600 tracking-tighter">AGENT PM</h1>
          <div className="flex gap-4 text-sm font-medium text-gray-500">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-4">Quadro</a>
            <a href="#" className="pb-4">Lista</a>
            <a href="#" className="pb-4">Calendário</a>
          </div>
        </div>
      </nav>

      <main className="p-8">
        <div className="flex flex-wrap gap-6">
          <Column title="A Fazer" status="todo" color="bg-gray-400" />
          <Column title="Em Execução" status="doing" color="bg-blue-500" />
          <Column title="Concluído" status="done" color="bg-green-500" />
        </div>
      </main>
    </div>
  );
}
