import { useState } from "react";
import { TrendingUp, TrendingDown, Plus, X, Check, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

interface Holding {
  id: number;
  ticker: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  sector: string;
  type: "국내주식" | "해외주식" | "ETF" | "현금";
}

const initialHoldings: Holding[] = [
  { id: 1, ticker: "005930", name: "삼성전자", quantity: 50, avgPrice: 68000, currentPrice: 74500, sector: "반도체", type: "국내주식" },
  { id: 2, ticker: "000660", name: "SK하이닉스", quantity: 15, avgPrice: 180000, currentPrice: 198000, sector: "반도체", type: "국내주식" },
  { id: 3, ticker: "035420", name: "NAVER", quantity: 10, avgPrice: 210000, currentPrice: 195000, sector: "인터넷", type: "국내주식" },
  { id: 4, ticker: "AAPL", name: "Apple Inc.", quantity: 20, avgPrice: 165, currentPrice: 178, sector: "기술", type: "해외주식" },
  { id: 5, ticker: "MSFT", name: "Microsoft", quantity: 10, avgPrice: 380, currentPrice: 415, sector: "기술", type: "해외주식" },
  { id: 6, ticker: "NVDA", name: "NVIDIA", quantity: 8, avgPrice: 650, currentPrice: 875, sector: "반도체", type: "해외주식" },
  { id: 7, ticker: "379800", name: "KODEX 미국S&P500", quantity: 100, avgPrice: 14500, currentPrice: 16200, sector: "ETF", type: "ETF" },
  { id: 8, ticker: "069500", name: "KODEX 200", quantity: 50, avgPrice: 32000, currentPrice: 33500, sector: "ETF", type: "ETF" },
];

const portfolioHistory = [
  { date: "10월", value: 12000000 },
  { date: "11월", value: 13200000 },
  { date: "12월", value: 12800000 },
  { date: "1월", value: 14500000 },
  { date: "2월", value: 15800000 },
  { date: "3월", value: 17200000 },
];

const typeColors: Record<string, string> = {
  "국내주식": "#818cf8",
  "해외주식": "#34d399",
  "ETF": "#f59e0b",
  "현금": "#6b7280",
};

const USD_KRW = 1340;

export function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);
  const [showModal, setShowModal] = useState(false);
  const [activeType, setActiveType] = useState<string>("전체");
  const [newH, setNewH] = useState({ ticker: "", name: "", quantity: "", avgPrice: "", currentPrice: "", sector: "", type: "국내주식" as Holding["type"] });

  const getValue = (h: Holding) => {
    const isKRW = h.type === "국내주식" || h.type === "ETF";
    return h.currentPrice * h.quantity * (isKRW ? 1 : USD_KRW);
  };
  const getCost = (h: Holding) => {
    const isKRW = h.type === "국내주식" || h.type === "ETF";
    return h.avgPrice * h.quantity * (isKRW ? 1 : USD_KRW);
  };

  const totalValue = holdings.reduce((s, h) => s + getValue(h), 0);
  const totalCost = holdings.reduce((s, h) => s + getCost(h), 0);
  const totalPnl = totalValue - totalCost;
  const totalPnlPct = ((totalPnl / totalCost) * 100).toFixed(2);

  // Type allocation
  const typeAlloc: Record<string, number> = {};
  holdings.forEach((h) => {
    typeAlloc[h.type] = (typeAlloc[h.type] || 0) + getValue(h);
  });
  const allocData = Object.entries(typeAlloc).map(([name, value]) => ({ name, value: Math.round((value / totalValue) * 100) }));

  const filtered = activeType === "전체" ? holdings : holdings.filter((h) => h.type === activeType);

  const handleAdd = () => {
    if (!newH.ticker || !newH.name || !newH.quantity || !newH.avgPrice || !newH.currentPrice) return;
    setHoldings([...holdings, { id: Date.now(), ticker: newH.ticker, name: newH.name, quantity: Number(newH.quantity), avgPrice: Number(newH.avgPrice), currentPrice: Number(newH.currentPrice), sector: newH.sector, type: newH.type }]);
    setNewH({ ticker: "", name: "", quantity: "", avgPrice: "", currentPrice: "", sector: "", type: "국내주식" });
    setShowModal(false);
  };

  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR") + "원";
  const fmtM = (n: number) => (n / 10000).toFixed(0) + "만원";

  return (
    <div className="flex flex-col gap-6">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "총 평가금액", value: fmtM(totalValue), color: "#818cf8" },
          { label: "총 투자금액", value: fmtM(totalCost), color: "#9ca3af" },
          { label: "평가 손익", value: `${totalPnl >= 0 ? "+" : ""}${fmtM(totalPnl)}`, color: totalPnl >= 0 ? "#34d399" : "#f87171" },
          { label: "수익률", value: `${Number(totalPnlPct) >= 0 ? "+" : ""}${totalPnlPct}%`, color: Number(totalPnlPct) >= 0 ? "#34d399" : "#f87171" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ color: "#6b6b8a", fontSize: "12px", marginBottom: "8px" }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: "22px", fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <div className="rounded-2xl p-5"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>포트폴리오 성장 추이</h3>
          <p style={{ color: "#6b6b8a", fontSize: "12px", marginBottom: "16px" }}>최근 6개월</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={portfolioHistory}>
              <defs>
                <linearGradient id="pfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#6b6b8a", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                formatter={(v: number) => [`${(v / 10000).toFixed(0)}만원`]} />
              <Area type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} fill="url(#pfGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>자산 배분</h3>
          <p style={{ color: "#6b6b8a", fontSize: "12px", marginBottom: "8px" }}>유형별 비중</p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={allocData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                {allocData.map((entry, i) => (
                  <Cell key={i} fill={typeColors[entry.name] || "#818cf8"} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                formatter={(v: number) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {allocData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full" style={{ width: "8px", height: "8px", background: typeColors[item.name], flexShrink: 0 }} />
                  <span style={{ color: "#9ca3af", fontSize: "11px" }}>{item.name}</span>
                </div>
                <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="rounded-2xl p-5"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>보유 종목</h3>
            <p style={{ color: "#6b6b8a", fontSize: "12px" }}>{holdings.length}개 종목</p>
          </div>
          <div className="flex items-center gap-2">
            {["전체", "국내주식", "해외주식", "ETF"].map((t) => (
              <button key={t} onClick={() => setActiveType(t)}
                className="px-3 py-1.5 rounded-xl text-xs transition-all"
                style={{
                  background: activeType === t ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.08)",
                  color: activeType === t ? "#fff" : "#6b6b8a",
                  border: "none", cursor: "pointer", fontWeight: activeType === t ? 600 : 400,
                }}>{t}</button>
            ))}
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>
              <Plus size={12} /> 추가
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}>
            <thead>
              <tr>
                {["종목", "유형", "수량", "평균단가", "현재가", "평가금액", "손익", "수익률"].map((h) => (
                  <th key={h} style={{ color: "#6b6b8a", fontSize: "11px", textAlign: h === "종목" ? "left" : "right", padding: "4px 12px", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => {
                const val = getValue(h);
                const cost = getCost(h);
                const pnl = val - cost;
                const pct = ((pnl / cost) * 100).toFixed(2);
                const isKRW = h.type === "국내주식" || h.type === "ETF";
                const priceUnit = isKRW ? "원" : "$";
                return (
                  <tr key={h.id}
                    style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                    <td style={{ padding: "12px 12px", borderRadius: "12px 0 0 12px" }}>
                      <div style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>{h.ticker}</div>
                      <div style={{ color: "#6b6b8a", fontSize: "11px" }}>{h.name}</div>
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      <span className="px-2 py-0.5 rounded-full" style={{ background: `${typeColors[h.type]}20`, color: typeColors[h.type], fontSize: "10px" }}>{h.type}</span>
                    </td>
                    <td style={{ color: "#e8e8f0", fontSize: "13px", textAlign: "right", padding: "12px" }}>{h.quantity}</td>
                    <td style={{ color: "#9ca3af", fontSize: "12px", textAlign: "right", padding: "12px" }}>{h.avgPrice.toLocaleString()}{priceUnit}</td>
                    <td style={{ color: "#fff", fontSize: "12px", textAlign: "right", padding: "12px" }}>{h.currentPrice.toLocaleString()}{priceUnit}</td>
                    <td style={{ color: "#e8e8f0", fontSize: "12px", fontWeight: 600, textAlign: "right", padding: "12px" }}>{fmtM(val)}</td>
                    <td style={{ textAlign: "right", padding: "12px" }}>
                      <div className="flex items-center justify-end gap-1">
                        {pnl >= 0 ? <ArrowUpRight size={12} style={{ color: "#34d399" }} /> : <ArrowDownRight size={12} style={{ color: "#f87171" }} />}
                        <span style={{ color: pnl >= 0 ? "#34d399" : "#f87171", fontSize: "12px" }}>
                          {fmtM(Math.abs(pnl))}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 12px", borderRadius: "0 12px 12px 0", textAlign: "right" }}>
                      <span style={{ color: Number(pct) >= 0 ? "#34d399" : "#f87171", fontSize: "12px", fontWeight: 700 }}>
                        {Number(pct) >= 0 ? "+" : ""}{pct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.7)" }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="rounded-2xl p-6 w-full max-w-sm" style={{ background: "#13132a", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>종목 추가</h3>
              <button onClick={() => setShowModal(false)} style={{ color: "#6b6b8a", cursor: "pointer", background: "none", border: "none" }}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "티커", key: "ticker", placeholder: "예: 005930, AAPL" },
                { label: "종목명", key: "name", placeholder: "예: 삼성전자" },
                { label: "수량", key: "quantity", placeholder: "0" },
                { label: "평균단가", key: "avgPrice", placeholder: "0" },
                { label: "현재가", key: "currentPrice", placeholder: "0" },
                { label: "섹터", key: "sector", placeholder: "예: 반도체" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={{ color: "#9ca3af", fontSize: "12px" }}>{label}</label>
                  <input value={(newH as any)[key]} onChange={(e) => setNewH({ ...newH, [key]: e.target.value })} placeholder={placeholder}
                    className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
                </div>
              ))}
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>유형</label>
                <select value={newH.type} onChange={(e) => setNewH({ ...newH, type: e.target.value as Holding["type"] })}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{ background: "#1e1e36", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px", cursor: "pointer" }}>
                  {["국내주식", "해외주식", "ETF"].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <button onClick={handleAdd}
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 mt-2"
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
