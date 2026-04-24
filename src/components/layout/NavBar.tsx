"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplet, Zap, BarChart3, LineChart, Sun } from "lucide-react";

const navItems = [
  { name: "Agua", href: "/agua", icon: Droplet },
  { name: "Luz", href: "/luz", icon: Zap },
  { name: "Historial Agua", href: "/historial-agua", icon: BarChart3 },
  { name: "Historial Luz", href: "/historial-luz", icon: LineChart },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-slate-200 bg-white/70 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <Droplet className="w-5 h-5 text-blue-500" />
          Vámonos De Viaje
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition relative
                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-blue-600 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right button */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition">
          <Sun className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </header>
  );
}
