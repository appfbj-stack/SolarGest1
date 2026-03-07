"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  Calculator,
  Briefcase,
  CalendarDays,
  Wrench,
  CircleDollarSign,
  Package,
  Settings,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "CRM (Leads)", href: "/crm", icon: Users },
  { name: "Funil de Vendas", href: "/kanban", icon: KanbanSquare },
  { name: "Orçamentos", href: "/orcamentos", icon: Calculator },
  { name: "Projetos", href: "/projetos", icon: Briefcase },
  { name: "Agenda", href: "/agenda", icon: CalendarDays },
  { name: "Ordem de Serviço", href: "/os", icon: Wrench },
  { name: "Financeiro", href: "/financeiro", icon: CircleDollarSign },
  { name: "Equipamentos", href: "/equipamentos", icon: Package },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isMobileOpen ? 0 : 0 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 lg:static transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <Sun className="w-8 h-8 text-amber-500 mr-2" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              SolarGest
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-1 py-4 overflow-y-auto">
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive
                    ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
                    }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? "text-amber-600 dark:text-amber-500" : "text-slate-400 dark:text-slate-500"
                      }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 mt-auto mb-4 space-y-1">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              {mounted && theme === "dark" ? (
                <>
                  <Sun className="w-5 h-5 mr-3 text-amber-500" />
                  Modo Claro
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 mr-3 text-slate-400" />
                  Modo Escuro
                </>
              )}
            </button>
            <Link
              href="/configuracoes"
              className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <Settings className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
              Configurações
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between h-16 px-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 -ml-2 text-slate-500 dark:text-slate-400 rounded-md lg:hidden hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center justify-end flex-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm border border-amber-200">
                  JS
                </div>
                <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-200 hidden sm:block">
                  João Silva
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 transition-colors">
          <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
