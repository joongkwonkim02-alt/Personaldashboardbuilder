import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, Wallet, X, Check, ChevronDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, CartesianGrid,
} from "recharts";

type TxType = "income" | "expense";

interface Transaction {
  id: number;
  date: string;
  title: string;
  category: string;
  amount: number;
  type: TxType;
}

const CATEGORIES_EXPENSE = ["식비", "교통", "주거", "쇼핑", "문화/여가", "의료", "통신", "구독", "기타"];
const CATEGORIES_INCOME = ["급여", "부업", "배당", "이자", "기타"];

const initialTransactions: Transaction[] = [
  { id: 1, date: "2026-03-01", title: "편의점", category: "식비", amount: 8500, type: "expense" },
  { id: 2, date: "2026-03-02", title: "지하철", category: "교통", amount: 2800, type: "expense" },
  { id: 3, date: "2026-03-03", title: "점심식사", category: "식비", amount: 13000, type: "expense" },
  { id: 4, date: "2026-03-04", title: "스타벅스", category: "식비", amount: 6500, type: "expense" },
  { id: 5, date: "2026-03-05", title: "택시", category: "교통", amount: 12500, type: "expense" },
  { id: 6, date: "2026-03-06", title: "마트", category: "식비", amount: 45000, type: "expense" },
  { id: 7, date: "2026-03-08", title: "월세", category: "주거", amount: 650000, type: "expense" },
  { id: 8, date: "2026-03-10", title: "월급", category: "급여", amount: 3800000, type: "income" },
  { id: 9, date: "2026-03-11", title: "옷 구매", category: "쇼핑", amount: 89000, type: "expense" },
  { id: 10, date: "2026-03-12", title: "Netflix", category: "구독", amount: 17000, type: "expense" },
  { id: 11, date: "2026-03-13", title: "점심", category: "식비", amount: 11000, type: "expense" },
  { id: 12, date: "2026-03-14", title: "약국", category: "의료", amount: 23000, type: "expense" },
  { id: 13, date: "2026-03-15", title: "저축 이체", category: "기타", amount: 500000, type: "expense" },
  { id: 14, date: "2026-03-17", title: "저녁 외식", category: "식비", amount: 35000, type: "expense" },
  { id: 15, date: "2026-03-18", title: "친구 선물", category: "쇼핑", amount: 50000, type: "expense" },
  { id: 16, date: "2026-03-20", title: "유튜브 프리미엄", category: "구독", amount: 14900, type: "expense" },
  { id: 17, date: "2026-03-22", title: "부업 수입", category: "부업", amount: 450000, type: "income" },
  { id: 18, date: "2026-03-25", title: "마트 장보기", category: "식비", amount: 87000, type: "expense" },
  { id: 19, date: "2026-03-28", title: "배당금", category: "배당", amount: 45000, type: "income" },
];

const monthlyData = [
  { month: "10월", income: 3800000, expense: 2450000 },
  { month: "11월", income: 3800000, expense: 2780000 },
  { month: "12월", income: 4200000, expense: 3100000 },
  { month: "1월", income: 3800000, expense: 2200000 },
  { month: "2월", income: 3900000, expense: 2050000 },
  { month: "3월", income: 4295000, expense: 1564200 },
];

const categoryColors: Record<string, string> = {
  식비: "#f59e0b",
  교통: "#34d399",
  주거: "#818cf8",
  쇼핑: "#f87171",
  "문화/여가": "#a78bfa",
  의료: "#fb923c",
  통신: "#22d3ee",
  구독: "#e879f9",
  기타: "#6b7280",
  급여: "#34d399",
  부업: "#4ade80",
  배당: "#a3e635",
  이자: "#86efac",
};

export function BudgetPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [newTx, setNewTx] = useState({
    title: "",
    category: "식비",
    amount: "",
    type: "expense" as TxType,
    date: new Date().toISOString().slice(0, 10),
  });

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const filtered = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Category breakdown for expenses
  const catBreakdown: Record<string, number> = {};
  transactions.filter((t) => t.type === "expense").forEach((t) => {
    catBreakdown[t.category] = (catBreakdown[t.category] || 0) + t.amount;
  });
  const catData = Object.entries(catBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  const handleAdd = () => {
    if (!newTx.title || !newTx.amount) return;
    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        date: newTx.date,
        title: newTx.title,
        category: newTx.category,
        amount: Number(newTx.amount.replace(/,/g, "")),
        type: newTx.type,
      },
    ]);
    setNewTx({ title: "", category: "식비", amount: "", type: "expense", date: new Date().toISOString().slice(0, 10) });
    setShowModal(false);
  };

  const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "총 수입", value: totalIncome, icon: TrendingUp, color: "#34d399" },
          { label: "총 지출", value: totalExpense, icon: TrendingDown, color: "#f87171" },
          { label: "잔액", value: balance, icon: Wallet, color: "#818cf8" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-xl flex items-center justify-center" style={{ width: "36px", height: "36px", background: `${s.color}20` }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <span style={{ color: "#6b6b8a", fontSize: "12px" }}>{s.label}</span>
            </div>
            <div style={{ color: "#fff", fontSize: "22px", fontWeight: 700 }}>{fmt(s.value)}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
        {/* Monthly Comparison */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>월별 수입/지출</h3>
          <p style={{ color: "#6b6b8a", fontSize: "12px", marginBottom: "16px" }}>최근 6개월 비교</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barGap={2}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b6b8a", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                formatter={(v: number) => [`${(v / 10000).toFixed(0)}만원`]}
              />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#9ca3af" }} />
              <Bar dataKey="income" name="수입" fill="#34d399" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="지출" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>카테고리별 지출</h3>
          <p style={{ color: "#6b6b8a", fontSize: "12px", marginBottom: "16px" }}>이번 달</p>
          <div className="flex flex-col gap-3">
            {catData.map((item) => {
              const pct = Math.round((item.value / totalExpense) * 100);
              return (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span style={{ color: "#e8e8f0", fontSize: "12px" }}>{item.name}</span>
                    <span style={{ color: "#9ca3af", fontSize: "11px" }}>{fmt(item.value)}</span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: "5px", background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="rounded-full h-full"
                      style={{ width: `${pct}%`, background: categoryColors[item.name] || "#818cf8" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>거래 내역</h3>
            <p style={{ color: "#6b6b8a", fontSize: "12px" }}>2026년 3월</p>
          </div>
          <div className="flex items-center gap-2">
            {(["all", "income", "expense"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-xl text-xs transition-all"
                style={{
                  background: filter === f ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.08)",
                  color: filter === f ? "#fff" : "#6b6b8a",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: filter === f ? 600 : 400,
                }}
              >
                {f === "all" ? "전체" : f === "income" ? "수입" : "지출"}
              </button>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <Plus size={12} /> 추가
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
          {filtered.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-4 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  width: "36px", height: "36px",
                  background: tx.type === "income" ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                }}
              >
                {tx.type === "income"
                  ? <TrendingUp size={14} style={{ color: "#34d399" }} />
                  : <TrendingDown size={14} style={{ color: "#f87171" }} />}
              </div>
              <div className="flex-1">
                <div style={{ color: "#e8e8f0", fontSize: "13px", fontWeight: 500 }}>{tx.title}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{ background: `${categoryColors[tx.category] || "#818cf8"}20`, color: categoryColors[tx.category] || "#818cf8", fontSize: "10px" }}
                  >
                    {tx.category}
                  </span>
                  <span style={{ color: "#6b6b8a", fontSize: "11px" }}>{tx.date.slice(5).replace("-", "월 ")}일</span>
                </div>
              </div>
              <div style={{ color: tx.type === "income" ? "#34d399" : "#f87171", fontSize: "14px", fontWeight: 700 }}>
                {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.7)" }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="rounded-2xl p-6 w-full max-w-sm" style={{ background: "#13132a", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>거래 추가</h3>
              <button onClick={() => setShowModal(false)} style={{ color: "#6b6b8a", cursor: "pointer", background: "none", border: "none" }}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                {(["expense", "income"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setNewTx({ ...newTx, type: t, category: t === "expense" ? "식비" : "급여" })}
                    className="flex-1 py-2 rounded-xl text-sm transition-all"
                    style={{
                      background: newTx.type === t ? (t === "expense" ? "rgba(248,113,113,0.2)" : "rgba(52,211,153,0.2)") : "rgba(255,255,255,0.08)",
                      color: newTx.type === t ? (t === "expense" ? "#f87171" : "#34d399") : "#6b6b8a",
                      border: newTx.type === t ? `1px solid ${t === "expense" ? "#f87171" : "#34d399"}40` : "1px solid transparent",
                      cursor: "pointer", fontWeight: 600,
                    }}
                  >{t === "expense" ? "지출" : "수입"}</button>
                ))}
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>날짜</label>
                <input type="date" value={newTx.date} onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>내용</label>
                <input value={newTx.title} onChange={(e) => setNewTx({ ...newTx, title: e.target.value })} placeholder="거래 내용"
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>카테고리</label>
                <select value={newTx.category} onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{ background: "#1e1e36", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px", cursor: "pointer" }}>
                  {(newTx.type === "expense" ? CATEGORIES_EXPENSE : CATEGORIES_INCOME).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>금액</label>
                <input value={newTx.amount} onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })} placeholder="0"
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
              <button onClick={handleAdd}
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none" }}>
                <Check size={16} /> 추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
