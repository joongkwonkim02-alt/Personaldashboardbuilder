import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Check } from "lucide-react";

type EventType = "income" | "expense" | "personal" | "investment" | "goal";

interface CalendarEvent {
  id: number;
  date: string;
  title: string;
  type: EventType;
  amount?: string;
}

const typeConfig: Record<EventType, { label: string; color: string; bg: string }> = {
  income: { label: "수입", color: "#34d399", bg: "rgba(52,211,153,0.15)" },
  expense: { label: "지출", color: "#f87171", bg: "rgba(248,113,113,0.15)" },
  personal: { label: "개인", color: "#818cf8", bg: "rgba(129,140,248,0.15)" },
  investment: { label: "투자", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  goal: { label: "목표", color: "#a78bfa", bg: "rgba(167,139,250,0.15)" },
};

const initialEvents: CalendarEvent[] = [
  { id: 1, date: "2026-03-05", title: "스타벅스", type: "expense", amount: "6,500원" },
  { id: 2, date: "2026-03-06", title: "점심 식사", type: "expense", amount: "12,000원" },
  { id: 3, date: "2026-03-08", title: "월세 납부", type: "expense", amount: "650,000원" },
  { id: 4, date: "2026-03-10", title: "급여 입금", type: "income", amount: "+3,800,000원" },
  { id: 5, date: "2026-03-12", title: "삼성전자 매수", type: "investment", amount: "500,000원" },
  { id: 6, date: "2026-03-14", title: "헬스장 등록", type: "personal" },
  { id: 7, date: "2026-03-15", title: "저축 이체", type: "goal", amount: "500,000원" },
  { id: 8, date: "2026-03-18", title: "친구 생일", type: "personal" },
  { id: 9, date: "2026-03-20", title: "Netflix", type: "expense", amount: "17,000원" },
  { id: 10, date: "2026-03-22", title: "ETF 매수", type: "investment", amount: "300,000원" },
  { id: 11, date: "2026-03-25", title: "마트 장보기", type: "expense", amount: "87,000원" },
  { id: 12, date: "2026-03-28", title: "배당금 수령", type: "income", amount: "+45,000원" },
];

const DAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", type: "personal" as EventType, amount: "" });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const formatDate = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const getEventsForDate = (day: number) =>
    events.filter((e) => e.date === formatDate(day));

  const todayStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;

  const selectedEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : [];

  const handleAddEvent = () => {
    if (!newEvent.title || !selectedDate) return;
    setEvents([
      ...events,
      {
        id: Date.now(),
        date: selectedDate,
        title: newEvent.title,
        type: newEvent.type,
        amount: newEvent.amount || undefined,
      },
    ]);
    setNewEvent({ title: "", type: "personal", amount: "" });
    setShowModal(false);
  };

  return (
    <div className="flex gap-6" style={{ height: "calc(100vh - 120px)" }}>
      {/* Calendar */}
      <div
        className="flex-1 rounded-2xl p-6 flex flex-col"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>
            {year}년 {month + 1}월
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="flex items-center justify-center rounded-xl transition-all hover:opacity-80"
              style={{
                width: "34px", height: "34px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#9ca3af", cursor: "pointer",
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextMonth}
              className="flex items-center justify-center rounded-xl transition-all hover:opacity-80"
              style={{
                width: "34px", height: "34px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#9ca3af", cursor: "pointer",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS_KO.map((d, i) => (
            <div
              key={d}
              className="text-center py-2"
              style={{
                color: i === 0 ? "#f87171" : i === 6 ? "#818cf8" : "#6b6b8a",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1 gap-1">
          {cells.map((day, idx) => {
            const dateStr = day ? formatDate(day) : null;
            const dayEvents = day ? getEventsForDate(day) : [];
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;
            const dayOfWeek = idx % 7;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedDate(dateStr)}
                className="rounded-xl p-2 flex flex-col gap-1 transition-all duration-150 cursor-pointer"
                style={{
                  background: isSelected
                    ? "rgba(129,140,248,0.15)"
                    : isToday
                    ? "rgba(129,140,248,0.08)"
                    : "transparent",
                  border: isSelected
                    ? "1px solid rgba(129,140,248,0.4)"
                    : isToday
                    ? "1px solid rgba(129,140,248,0.2)"
                    : "1px solid transparent",
                  opacity: day ? 1 : 0,
                  minHeight: "70px",
                }}
              >
                {day && (
                  <>
                    <div
                      className="text-right"
                      style={{
                        fontSize: "12px",
                        fontWeight: isToday ? 700 : 400,
                        color: isToday
                          ? "#818cf8"
                          : isWeekend
                          ? dayOfWeek === 0
                            ? "#f87171"
                            : "#818cf8"
                          : "#9ca3af",
                      }}
                    >
                      {day}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className="rounded px-1 truncate"
                          style={{
                            background: typeConfig[ev.type].bg,
                            color: typeConfig[ev.type].color,
                            fontSize: "10px",
                            padding: "1px 4px",
                          }}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div style={{ color: "#6b6b8a", fontSize: "10px" }}>
                          +{dayEvents.length - 2}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar Panel */}
      <div className="flex flex-col gap-4" style={{ width: "280px" }}>
        {/* Selected Date Events */}
        <div
          className="rounded-2xl p-5 flex-1 overflow-y-auto"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>
                {selectedDate
                  ? `${selectedDate.slice(5).replace("-", "월 ")}일`
                  : "날짜를 선택하세요"}
              </h3>
              <p style={{ color: "#6b6b8a", fontSize: "11px" }}>
                {selectedEvents.length}개 일정
              </p>
            </div>
            {selectedDate && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center rounded-xl transition-all hover:opacity-80"
                style={{
                  width: "30px", height: "30px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  cursor: "pointer", border: "none",
                }}
              >
                <Plus size={14} color="white" />
              </button>
            )}
          </div>

          {selectedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div style={{ color: "#6b6b8a", fontSize: "12px", textAlign: "center" }}>
                {selectedDate ? "일정이 없습니다" : "날짜를 선택해\n일정을 확인하세요"}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-start gap-3 rounded-xl p-3"
                  style={{
                    background: typeConfig[ev.type].bg,
                    border: `1px solid ${typeConfig[ev.type].color}30`,
                  }}
                >
                  <div
                    className="rounded-lg flex-shrink-0 mt-0.5"
                    style={{ width: "8px", height: "8px", borderRadius: "50%", background: typeConfig[ev.type].color, marginTop: "6px" }}
                  />
                  <div className="flex-1">
                    <div style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>{ev.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{ background: `${typeConfig[ev.type].color}20`, color: typeConfig[ev.type].color, fontSize: "10px" }}
                      >
                        {typeConfig[ev.type].label}
                      </span>
                      {ev.amount && (
                        <span style={{ color: typeConfig[ev.type].color, fontSize: "11px" }}>{ev.amount}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 style={{ color: "#9ca3af", fontSize: "12px", marginBottom: "10px" }}>일정 유형</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(typeConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="rounded-full" style={{ width: "8px", height: "8px", background: cfg.color, flexShrink: 0 }} />
                <span style={{ color: "#9ca3af", fontSize: "11px" }}>{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-sm"
            style={{
              background: "#13132a",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>일정 추가</h3>
              <button onClick={() => setShowModal(false)} style={{ color: "#6b6b8a", cursor: "pointer", background: "none", border: "none" }}>
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>제목</label>
                <input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="일정 제목 입력"
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                />
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>유형</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as EventType })}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{
                    background: "#1e1e36",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  {Object.entries(typeConfig).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>금액 (선택)</label>
                <input
                  value={newEvent.amount}
                  onChange={(e) => setNewEvent({ ...newEvent, amount: e.target.value })}
                  placeholder="예: 50,000원"
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                />
              </div>
              <button
                onClick={handleAddEvent}
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <Check size={16} />
                일정 추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
