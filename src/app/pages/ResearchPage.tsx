import { useState } from "react";
import { Plus, X, Check, Search, Star, StarOff, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, FileText, BookOpen, Lightbulb } from "lucide-react";

type Status = "관심" | "분석중" | "매수검토" | "보유" | "제외";
type Rating = 1 | 2 | 3 | 4 | 5;

interface ResearchNote {
  id: number;
  ticker: string;
  name: string;
  type: "국내주식" | "해외주식" | "ETF" | "암호화폐";
  status: Status;
  rating: Rating;
  targetPrice: string;
  currentPrice: string;
  pros: string[];
  cons: string[];
  memo: string;
  date: string;
  tags: string[];
  starred: boolean;
}

const statusConfig: Record<Status, { color: string; bg: string }> = {
  관심: { color: "#818cf8", bg: "rgba(129,140,248,0.15)" },
  분석중: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  매수검토: { color: "#34d399", bg: "rgba(52,211,153,0.15)" },
  보유: { color: "#4ade80", bg: "rgba(74,222,128,0.15)" },
  제외: { color: "#6b7280", bg: "rgba(107,114,128,0.15)" },
};

const initialNotes: ResearchNote[] = [
  {
    id: 1, ticker: "NVDA", name: "NVIDIA Corporation", type: "해외주식",
    status: "보유", rating: 5,
    targetPrice: "$1,200", currentPrice: "$875",
    pros: ["AI/데이터센터 GPU 독점적 지위", "CUDA 생태계 해자", "H100/H200 수요 폭발적", "마진율 지속 개선"],
    cons: ["밸류에이션 부담 (PER 60x)", "중국 수출 규제 리스크", "AMD 경쟁 심화 가능성"],
    memo: "AI 붐의 핵심 수혜주. 단기 조정 시 추가 매수 고려. 2026년 EPS 성장률 40%+ 예상. 블랙웰 아키텍처 수요 견고.",
    date: "2026-03-01", tags: ["AI", "반도체", "성장주"], starred: true,
  },
  {
    id: 2, ticker: "005930", name: "삼성전자", type: "국내주식",
    status: "보유", rating: 4,
    targetPrice: "90,000원", currentPrice: "74,500원",
    pros: ["HBM 3E 양산 시작", "파운드리 2나노 기술", "글로벌 메모리 1위", "배당 안정성"],
    cons: ["파운드리 TSMC 대비 기술 격차", "중국 리스크", "이재용 사법 리스크"],
    memo: "HBM3E 퀄컴 공급 확정으로 반등 기대. 7만원대에서는 저점 매수 기회로 판단. 목표주가 9만원 유지.",
    date: "2026-02-20", tags: ["반도체", "메모리", "배당"], starred: true,
  },
  {
    id: 3, ticker: "TSLA", name: "Tesla Inc.", type: "해외주식",
    status: "분석중", rating: 3,
    targetPrice: "$350", currentPrice: "$280",
    pros: ["FSD 기술 선도", "에너지 사업 고성장", "브랜드 충성도"],
    cons: ["머스크 리스크", "중국 경쟁 심화", "수익성 압박", "마진 하락 추세"],
    memo: "FSD v13 성능 개선 주시 중. 사이버트럭 생산 정상화 여부 확인 필요. 에너지 사업 분기 실적 체크.",
    date: "2026-02-15", tags: ["전기차", "AI", "에너지"], starred: false,
  },
  {
    id: 4, ticker: "379800", name: "KODEX 미국S&P500", type: "ETF",
    status: "매수검토", rating: 4,
    targetPrice: "20,000원", currentPrice: "16,200원",
    pros: ["미국 대형주 분산투자", "낮은 운용보수", "달러 환노출"],
    cons: ["환율 리스크", "미국 시장 고평가"],
    memo: "매월 정기 매수 대상. 미국 연준 금리 인하 사이클 진입 시 유리. 포트폴리오 핵심 ETF로 편입 계획.",
    date: "2026-02-28", tags: ["ETF", "S&P500", "분산투자"], starred: false,
  },
  {
    id: 5, ticker: "BTC", name: "Bitcoin", type: "암호화폐",
    status: "관심", rating: 3,
    targetPrice: "$120,000", currentPrice: "$85,000",
    pros: ["디지털 금 포지셔닝", "기관 수요 증가", "반감기 효과"],
    cons: ["높은 변동성", "규제 리스크", "실질 사용가치 의문"],
    memo: "포트폴리오 5% 이내 비중으로 관심. 현물 ETF 출시 이후 기관 수요 꾸준히 증가 중. 반감기 이후 사이클 관찰.",
    date: "2026-03-05", tags: ["암호화폐", "디지털자산"], starred: false,
  },
];

export function ResearchPage() {
  const [notes, setNotes] = useState<ResearchNote[]>(initialNotes);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "전체">("전체");
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState({
    ticker: "", name: "", type: "해외주식" as ResearchNote["type"],
    status: "관심" as Status, targetPrice: "", currentPrice: "",
    memo: "", tags: "", pros: "", cons: "",
  });

  const filtered = notes
    .filter((n) => filterStatus === "전체" || n.status === filterStatus)
    .filter((n) => n.ticker.toLowerCase().includes(search.toLowerCase()) || n.name.includes(search));

  const toggleStar = (id: number) => {
    setNotes(notes.map((n) => n.id === id ? { ...n, starred: !n.starred } : n));
  };

  const handleAdd = () => {
    if (!newNote.ticker || !newNote.name) return;
    setNotes([...notes, {
      id: Date.now(), ticker: newNote.ticker, name: newNote.name, type: newNote.type,
      status: newNote.status, rating: 3,
      targetPrice: newNote.targetPrice, currentPrice: newNote.currentPrice,
      pros: newNote.pros.split("\n").filter(Boolean),
      cons: newNote.cons.split("\n").filter(Boolean),
      memo: newNote.memo, date: new Date().toISOString().slice(0, 10),
      tags: newNote.tags.split(",").map((t) => t.trim()).filter(Boolean),
      starred: false,
    }]);
    setShowModal(false);
    setNewNote({ ticker: "", name: "", type: "해외주식", status: "관심", targetPrice: "", currentPrice: "", memo: "", tags: "", pros: "", cons: "" });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="flex items-center gap-2 flex-1 px-4 py-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Search size={14} style={{ color: "#6b6b8a" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="종목 검색..."
              className="flex-1 outline-none bg-transparent"
              style={{ color: "#fff", fontSize: "13px" }} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(["전체", "관심", "분석중", "매수검토", "보유", "제외"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className="px-3 py-1.5 rounded-xl text-xs transition-all"
              style={{
                background: filterStatus === s ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.08)",
                color: filterStatus === s ? "#fff" : "#6b6b8a",
                border: "none", cursor: "pointer", fontWeight: filterStatus === s ? 600 : 400,
              }}>{s}</button>
          ))}
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs transition-all hover:opacity-90 ml-2"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>
            <Plus size={12} /> 추가
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-5 gap-3">
        {(["전체", "관심", "분석중", "매수검토", "보유"] as const).map((s) => {
          const count = s === "전체" ? notes.length : notes.filter((n) => n.status === s).length;
          const cfg = s !== "전체" ? statusConfig[s] : { color: "#818cf8", bg: "rgba(129,140,248,0.1)" };
          return (
            <div key={s} className="rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02]" onClick={() => setFilterStatus(s)}
              style={{ background: filterStatus === s ? cfg.bg : "rgba(255,255,255,0.04)", border: `1px solid ${filterStatus === s ? cfg.color + "40" : "rgba(255,255,255,0.08)"}` }}>
              <div style={{ color: cfg.color, fontSize: "22px", fontWeight: 700 }}>{count}</div>
              <div style={{ color: "#6b6b8a", fontSize: "11px", marginTop: "2px" }}>{s}</div>
            </div>
          );
        })}
      </div>

      {/* Notes List */}
      <div className="flex flex-col gap-3">
        {filtered.map((note) => {
          const isExpanded = expandedId === note.id;
          return (
            <div key={note.id} className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: `1px solid ${isExpanded ? "rgba(129,140,248,0.3)" : "rgba(255,255,255,0.08)"}` }}>
              {/* Header Row */}
              <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : note.id)}>
                <button onClick={(e) => { e.stopPropagation(); toggleStar(note.id); }}
                  style={{ color: note.starred ? "#f59e0b" : "#4b4b6a", cursor: "pointer", background: "none", border: "none" }}>
                  {note.starred ? <Star size={16} fill="#f59e0b" /> : <StarOff size={16} />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span style={{ color: "#fff", fontSize: "15px", fontWeight: 700 }}>{note.ticker}</span>
                    <span style={{ color: "#9ca3af", fontSize: "13px" }}>{note.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: statusConfig[note.status].bg, color: statusConfig[note.status].color }}>
                      {note.status}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(255,255,255,0.08)", color: "#9ca3af" }}>{note.type}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ color: "#6b6b8a", fontSize: "11px" }}>현재가: <span style={{ color: "#e8e8f0" }}>{note.currentPrice}</span></span>
                    <span style={{ color: "#6b6b8a", fontSize: "11px" }}>목표가: <span style={{ color: "#34d399" }}>{note.targetPrice}</span></span>
                    <span style={{ color: "#6b6b8a", fontSize: "11px" }}>{note.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {note.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(129,140,248,0.15)", color: "#818cf8" }}>#{tag}</span>
                  ))}
                </div>
                <div style={{ color: "#6b6b8a" }}>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-0 grid gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                    {/* Pros */}
                    <div className="rounded-xl p-4" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.15)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={14} style={{ color: "#34d399" }} />
                        <span style={{ color: "#34d399", fontSize: "12px", fontWeight: 600 }}>장점</span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {note.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span style={{ color: "#34d399", flexShrink: 0, marginTop: "2px" }}>•</span>
                            <span style={{ color: "#e8e8f0", fontSize: "12px" }}>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div className="rounded-xl p-4" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.15)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingDown size={14} style={{ color: "#f87171" }} />
                        <span style={{ color: "#f87171", fontSize: "12px", fontWeight: 600 }}>리스크</span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {note.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span style={{ color: "#f87171", flexShrink: 0, marginTop: "2px" }}>•</span>
                            <span style={{ color: "#e8e8f0", fontSize: "12px" }}>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Memo */}
                    <div className="rounded-xl p-4" style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.15)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb size={14} style={{ color: "#818cf8" }} />
                        <span style={{ color: "#818cf8", fontSize: "12px", fontWeight: 600 }}>투자 의견</span>
                      </div>
                      <p style={{ color: "#e8e8f0", fontSize: "12px", lineHeight: "1.6" }}>{note.memo}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.75)" }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="rounded-2xl p-6 w-full max-w-lg overflow-y-auto" style={{ background: "#13132a", border: "1px solid rgba(255,255,255,0.12)", maxHeight: "90vh" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>투자 리서치 추가</h3>
              <button onClick={() => setShowModal(false)} style={{ color: "#6b6b8a", cursor: "pointer", background: "none", border: "none" }}><X size={18} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "티커", key: "ticker", placeholder: "AAPL, 005930" },
                { label: "종목명", key: "name", placeholder: "Apple Inc." },
                { label: "현재가", key: "currentPrice", placeholder: "$175" },
                { label: "목표가", key: "targetPrice", placeholder: "$220" },
                { label: "태그 (쉼표구분)", key: "tags", placeholder: "AI, 성장주, 배당" },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className={key === "tags" ? "col-span-2" : ""}>
                  <label style={{ color: "#9ca3af", fontSize: "12px" }}>{label}</label>
                  <input value={(newNote as any)[key]} onChange={(e) => setNewNote({ ...newNote, [key]: e.target.value })} placeholder={placeholder}
                    className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
                </div>
              ))}
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>유형</label>
                <select value={newNote.type} onChange={(e) => setNewNote({ ...newNote, type: e.target.value as ResearchNote["type"] })}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{ background: "#1e1e36", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px", cursor: "pointer" }}>
                  {["국내주식", "해외주식", "ETF", "암호화폐"].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>상태</label>
                <select value={newNote.status} onChange={(e) => setNewNote({ ...newNote, status: e.target.value as Status })}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{ background: "#1e1e36", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px", cursor: "pointer" }}>
                  {["관심", "분석중", "매수검토", "보유", "제외"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>장점 (줄바꿈으로 구분)</label>
                <textarea value={newNote.pros} onChange={(e) => setNewNote({ ...newNote, pros: e.target.value })} placeholder="장점 1&#10;장점 2" rows={3}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
              <div className="col-span-2">
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>리스크 (줄바꿈으로 구분)</label>
                <textarea value={newNote.cons} onChange={(e) => setNewNote({ ...newNote, cons: e.target.value })} placeholder="리스크 1&#10;리스크 2" rows={3}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
              <div className="col-span-2">
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>투자 의견 메모</label>
                <textarea value={newNote.memo} onChange={(e) => setNewNote({ ...newNote, memo: e.target.value })} placeholder="분석 내용을 자유롭게 작성하세요..." rows={3}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
            </div>
            <button onClick={handleAdd}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 mt-4"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none" }}>
              <Check size={16} /> 추가하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
