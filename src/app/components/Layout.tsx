import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  CalendarDays,
  Wallet,
  TrendingUp,
  Search,
  Target,
  ChevronLeft,
  ChevronRight,
  Bell,
  Settings,
  User,
  Sparkles,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "대시보드", end: true },
  { to: "/calendar", icon: CalendarDays, label: "캘린더" },
  { to: "/budget", icon: Wallet, label: "가계부" },
  { to: "/portfolio", icon: TrendingUp, label: "투자 포트폴리오" },
  { to: "/research", icon: Search, label: "투자 조사" },
  { to: "/goals", icon: Target, label: "인생 계획" },
];

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const currentPage = navItems.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#080812", color: "#e8e8f0" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col transition-all duration-300 relative z-20"
        style={{
          width: collapsed ? "72px" : "240px",
          background: "linear-gradient(180deg, #0d0d1a 0%, #0a0a14 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}
          >
            <Sparkles size={20} color="white" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.3px" }}>
                MY WORLD
              </div>
              <div style={{ color: "#6b6b8a", fontSize: "11px" }}>나만의 세상</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="flex items-center gap-3 rounded-xl transition-all duration-200 relative group"
                style={{
                  padding: collapsed ? "10px 16px" : "10px 14px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))"
                    : "transparent",
                  color: isActive ? "#a5a8ff" : "#6b6b8a",
                  border: isActive ? "1px solid rgba(99,102,241,0.25)" : "1px solid transparent",
                }}
              >
                <item.icon
                  size={18}
                  style={{ flexShrink: 0, color: isActive ? "#818cf8" : "#6b6b8a" }}
                />
                {!collapsed && (
                  <span style={{ fontSize: "13px", fontWeight: isActive ? 600 : 400 }}>
                    {item.label}
                  </span>
                )}
                {isActive && (
                  <div
                    className="absolute right-2"
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#818cf8",
                      display: collapsed ? "none" : "block",
                    }}
                  />
                )}
                {/* Tooltip for collapsed */}
                {collapsed && (
                  <div
                    className="absolute left-full ml-3 px-2 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                    style={{ background: "#1a1a2e", color: "#e8e8f0", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom User */}
        <div
          className="px-3 py-4 flex flex-col gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                <User size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ color: "#e8e8f0", fontSize: "13px", fontWeight: 600 }}>나의 세상</div>
                <div style={{ color: "#6b6b8a", fontSize: "11px" }}>My Universe</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center rounded-xl transition-all duration-200 hover:opacity-80"
            style={{
              padding: "8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#6b6b8a",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{
            background: "rgba(8,8,18,0.8)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <h1 style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>
              {currentPage?.label ?? "대시보드"}
            </h1>
            <p style={{ color: "#6b6b8a", fontSize: "12px" }}>
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center justify-center rounded-xl transition-all duration-200 hover:opacity-80 relative"
              style={{
                width: "38px",
                height: "38px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#6b6b8a",
                cursor: "pointer",
              }}
            >
              <Bell size={16} />
              <span
                className="absolute top-2 right-2 rounded-full"
                style={{ width: "6px", height: "6px", background: "#818cf8" }}
              />
            </button>
            <button
              className="flex items-center justify-center rounded-xl transition-all duration-200 hover:opacity-80"
              style={{
                width: "38px",
                height: "38px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#6b6b8a",
                cursor: "pointer",
              }}
            >
              <Settings size={16} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto" style={{ padding: "24px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
