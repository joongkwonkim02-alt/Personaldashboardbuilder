import { useState } from "react";
import { Plus, X, Check, Target, Flame, Trophy, Heart, BookOpen, Dumbbell, Plane, Home, DollarSign, Star, ChevronDown, ChevronUp } from "lucide-react";

type GoalCategory = "재무" | "건강" | "자기계발" | "여행" | "인간관계" | "커리어" | "생활";
type GoalStatus = "진행중" | "완료" | "보류";
type GoalPriority = "높음" | "중간" | "낮음";

interface Milestone {
  id: number;
  text: string;
  done: boolean;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  category: GoalCategory;
  status: GoalStatus;
  priority: GoalPriority;
  targetDate: string;
  progress: number;
  milestones: Milestone[];
  icon: string;
  color: string;
}

const categoryConfig: Record<GoalCategory, { color: string; bg: string; icon: any }> = {
  재무: { color: "#34d399", bg: "rgba(52,211,153,0.15)", icon: DollarSign },
  건강: { color: "#f87171", bg: "rgba(248,113,113,0.15)", icon: Dumbbell },
  자기계발: { color: "#818cf8", bg: "rgba(129,140,248,0.15)", icon: BookOpen },
  여행: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", icon: Plane },
  인간관계: { color: "#fb7185", bg: "rgba(251,113,133,0.15)", icon: Heart },
  커리어: { color: "#a78bfa", bg: "rgba(167,139,250,0.15)", icon: Star },
  생활: { color: "#22d3ee", bg: "rgba(34,211,238,0.15)", icon: Home },
};

const priorityConfig: Record<GoalPriority, { color: string; bg: string }> = {
  높음: { color: "#f87171", bg: "rgba(248,113,113,0.15)" },
  중간: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  낮음: { color: "#6b7280", bg: "rgba(107,114,128,0.15)" },
};

const initialGoals: Goal[] = [
  {
    id: 1, title: "투자 포트폴리오 2억 달성", description: "꾸준한 투자와 복리의 힘으로 2억 달성. 월 200만원 이상 투자 지속.",
    category: "재무", status: "진행중", priority: "높음", targetDate: "2028-12-31",
    progress: 8.6,
    milestones: [
      { id: 1, text: "1,000만원 달성", done: true },
      { id: 2, text: "5,000만원 달성", done: false },
      { id: 3, text: "1억 달성", done: false },
      { id: 4, text: "2억 달성", done: false },
    ],
    icon: "💰", color: "#34d399",
  },
  {
    id: 2, title: "비상금 1,000만원 마련", description: "6개월치 생활비를 비상금으로 유지. 안정적인 재무 기반 구축.",
    category: "재무", status: "진행중", priority: "높음", targetDate: "2026-12-31",
    progress: 72,
    milestones: [
      { id: 1, text: "300만원 달성", done: true },
      { id: 2, text: "500만원 달성", done: true },
      { id: 3, text: "700만원 달성", done: true },
      { id: 4, text: "1,000만원 달성", done: false },
    ],
    icon: "🏦", color: "#818cf8",
  },
  {
    id: 3, title: "유럽 한 달 여행", description: "프랑스, 이탈리아, 스페인, 포르투갈 한 달 여행. 문화 체험과 자기 성찰.",
    category: "여행", status: "진행중", priority: "중간", targetDate: "2027-07-01",
    progress: 50,
    milestones: [
      { id: 1, text: "여행 자금 200만원 저축", done: true },
      { id: 2, text: "여행 계획 수립", done: false },
      { id: 3, text: "숙소 예약", done: false },
      { id: 4, text: "여행 출발!", done: false },
    ],
    icon: "✈️", color: "#f59e0b",
  },
  {
    id: 4, title: "주 3회 운동 습관 만들기", description: "헬스장 등록 후 꾸준히 운동. 건강한 체력과 정신력 기르기.",
    category: "건강", status: "진행중", priority: "높음", targetDate: "2026-06-30",
    progress: 65,
    milestones: [
      { id: 1, text: "헬스장 등록", done: true },
      { id: 2, text: "1개월 연속 운동", done: true },
      { id: 3, text: "3개월 연속 운동", done: false },
      { id: 4, text: "6개월 습관화", done: false },
    ],
    icon: "💪", color: "#f87171",
  },
  {
    id: 5, title: "영어 회화 능숙하게", description: "일상 대화와 비즈니스 영어를 유창하게 구사. 해외 투자 리서치 직접 읽기.",
    category: "자기계발", status: "진행중", priority: "중간", targetDate: "2027-01-01",
    progress: 30,
    milestones: [
      { id: 1, text: "영어 앱 꾸준히 사용 30일", done: true },
      { id: 2, text: "영어 일기 쓰기 시작", done: false },
      { id: 3, text: "외국인과 자연스러운 대화", done: false },
      { id: 4, text: "영어 뉴스 편하게 읽기", done: false },
    ],
    icon: "📚", color: "#a78bfa",
  },
  {
    id: 6, title: "내 집 마련", description: "서울 또는 수도권 아파트 구매. 안정적인 주거 환경 확보.",
    category: "재무", status: "진행중", priority: "높음", targetDate: "2030-12-31",
    progress: 15,
    milestones: [
      { id: 1, text: "청약 통장 개설", done: true },
      { id: 2, text: "종자돈 5,000만원 모으기", done: false },
      { id: 3, text: "청약 당첨 또는 매매", done: false },
    ],
    icon: "🏠", color: "#22d3ee",
  },
];

const LIFE_QUOTES = [
  "천 리 길도 한 걸음부터 — 모든 위대한 여정은 작은 시작에서 출발합니다",
  "오늘의 나는 어제의 내가 만든 것이고, 내일의 나는 오늘의 내가 만드는 것입니다",
  "꿈이 있다면, 그것을 향해 나아가는 것이 곧 삶의 의미입니다",
];

export function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<GoalCategory | "전체">("전체");
  const [newGoal, setNewGoal] = useState({
    title: "", description: "", category: "재무" as GoalCategory,
    priority: "중간" as GoalPriority, targetDate: "", milestones: "",
  });

  const filtered = filterCategory === "전체" ? goals : goals.filter((g) => g.category === filterCategory);

  const toggleMilestone = (goalId: number, milestoneId: number) => {
    setGoals(goals.map((g) => g.id === goalId
      ? { ...g, milestones: g.milestones.map((m) => m.id === milestoneId ? { ...m, done: !m.done } : m) }
      : g
    ));
  };

  const handleAdd = () => {
    if (!newGoal.title) return;
    const milestones = newGoal.milestones.split("\n").filter(Boolean).map((text, i) => ({ id: i + 1, text, done: false }));
    setGoals([...goals, {
      id: Date.now(), title: newGoal.title, description: newGoal.description,
      category: newGoal.category, status: "진행중", priority: newGoal.priority,
      targetDate: newGoal.targetDate, progress: 0, milestones,
      icon: "🎯", color: categoryConfig[newGoal.category].color,
    }]);
    setShowModal(false);
    setNewGoal({ title: "", description: "", category: "재무", priority: "중간", targetDate: "", milestones: "" });
  };

  const completedCount = goals.filter((g) => g.status === "완료").length;
  const activeCount = goals.filter((g) => g.status === "진행중").length;
  const avgProgress = Math.round(goals.filter((g) => g.status === "진행중").reduce((s, g) => s + g.progress, 0) / Math.max(activeCount, 1));

  const getDaysLeft = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Quote Banner */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", border: "1px solid rgba(129,140,248,0.2)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(129,140,248,0.8), transparent 60%)" }} />
        <div className="relative flex items-center gap-4">
          <div className="text-4xl">🌟</div>
          <div>
            <p style={{ color: "#a5b4fc", fontSize: "15px", fontStyle: "italic" }}>"{LIFE_QUOTES[0]}"</p>
            <p style={{ color: "#6b6b8a", fontSize: "12px", marginTop: "6px" }}>나만의 인생 지도를 그려가세요</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "전체 목표", value: goals.length, icon: Target, color: "#818cf8" },
          { label: "진행 중", value: activeCount, icon: Flame, color: "#f59e0b" },
          { label: "완료", value: completedCount, icon: Trophy, color: "#34d399" },
          { label: "평균 달성률", value: `${avgProgress}%`, icon: Star, color: "#a78bfa" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-xl flex items-center justify-center" style={{ width: "36px", height: "36px", background: `${s.color}20` }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <span style={{ color: "#6b6b8a", fontSize: "12px" }}>{s.label}</span>
            </div>
            <div style={{ color: "#fff", fontSize: "24px", fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter & Add */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {(["전체", "재무", "건강", "자기계발", "여행", "인간관계", "커리어", "생활"] as const).map((cat) => (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              className="px-3 py-1.5 rounded-xl text-xs transition-all"
              style={{
                background: filterCategory === cat ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.08)",
                color: filterCategory === cat ? "#fff" : "#6b6b8a",
                border: "none", cursor: "pointer", fontWeight: filterCategory === cat ? 600 : 400,
              }}>{cat}</button>
          ))}
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>
          <Plus size={14} /> 목표 추가
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
        {filtered.map((goal) => {
          const isExpanded = expandedId === goal.id;
          const cfg = categoryConfig[goal.category];
          const daysLeft = getDaysLeft(goal.targetDate);
          const completedMilestones = goal.milestones.filter((m) => m.done).length;
          const IconComp = cfg.icon;

          return (
            <div key={goal.id} className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: `1px solid ${isExpanded ? cfg.color + "40" : "rgba(255,255,255,0.08)"}` }}>
              {/* Card Header */}
              <div className="p-5 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : goal.id)}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style={{ width: "44px", height: "44px", background: cfg.bg }}>
                    <IconComp size={20} style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>{goal.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: cfg.bg, color: cfg.color }}>{goal.category}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: priorityConfig[goal.priority].bg, color: priorityConfig[goal.priority].color }}>
                        {goal.priority}
                      </span>
                    </div>
                  </div>
                  <div style={{ color: "#6b6b8a" }}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between mb-1.5">
                    <span style={{ color: "#9ca3af", fontSize: "12px" }}>달성률</span>
                    <span style={{ color: cfg.color, fontSize: "12px", fontWeight: 700 }}>{goal.progress}%</span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: "8px", background: "rgba(255,255,255,0.08)" }}>
                    <div className="rounded-full h-full transition-all duration-700"
                      style={{ width: `${goal.progress}%`, background: `linear-gradient(90deg, ${cfg.color}cc, ${cfg.color})` }} />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <span style={{ color: "#6b6b8a", fontSize: "11px" }}>
                    🎯 {completedMilestones}/{goal.milestones.length} 마일스톤
                  </span>
                  <span style={{ color: daysLeft < 90 ? "#f87171" : "#6b6b8a", fontSize: "11px" }}>
                    {daysLeft > 0 ? `D-${daysLeft}` : "기한 초과"}
                  </span>
                </div>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ color: "#9ca3af", fontSize: "12px", marginTop: "16px", marginBottom: "16px", lineHeight: "1.6" }}>
                    {goal.description}
                  </p>

                  <h4 style={{ color: "#9ca3af", fontSize: "11px", fontWeight: 600, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    마일스톤
                  </h4>
                  <div className="flex flex-col gap-2">
                    {goal.milestones.map((m) => (
                      <button key={m.id}
                        onClick={() => toggleMilestone(goal.id, m.id)}
                        className="flex items-center gap-3 w-full text-left transition-all hover:opacity-80"
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                        <div className="rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            width: "22px", height: "22px",
                            background: m.done ? cfg.bg : "rgba(255,255,255,0.08)",
                            border: `2px solid ${m.done ? cfg.color : "rgba(255,255,255,0.2)"}`,
                          }}>
                          {m.done && <Check size={10} style={{ color: cfg.color }} />}
                        </div>
                        <span style={{
                          color: m.done ? "#6b6b8a" : "#e8e8f0",
                          fontSize: "13px",
                          textDecoration: m.done ? "line-through" : "none",
                        }}>{m.text}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ color: "#6b6b8a", fontSize: "11px" }}>목표 기한: {goal.targetDate}</span>
                    <span style={{ color: goal.status === "완료" ? "#34d399" : "#f59e0b", fontSize: "11px" }}>
                      ● {goal.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.75)" }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="rounded-2xl p-6 w-full max-w-md overflow-y-auto" style={{ background: "#13132a", border: "1px solid rgba(255,255,255,0.12)", maxHeight: "90vh" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>새 목표 추가</h3>
              <button onClick={() => setShowModal(false)} style={{ color: "#6b6b8a", cursor: "pointer", background: "none", border: "none" }}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>목표 제목</label>
                <input value={newGoal.title} onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })} placeholder="나의 꿈, 목표를 입력하세요"
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>설명</label>
                <textarea value={newGoal.description} onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })} placeholder="목표에 대한 설명을 적어보세요" rows={3}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ color: "#9ca3af", fontSize: "12px" }}>카테고리</label>
                  <select value={newGoal.category} onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as GoalCategory })}
                    className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                    style={{ background: "#1e1e36", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px", cursor: "pointer" }}>
                    {Object.keys(categoryConfig).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: "#9ca3af", fontSize: "12px" }}>우선순위</label>
                  <select value={newGoal.priority} onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as GoalPriority })}
                    className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                    style={{ background: "#1e1e36", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px", cursor: "pointer" }}>
                    {["높음", "중간", "낮음"].map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>목표 기한</label>
                <input type="date" value={newGoal.targetDate} onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "12px" }}>마일스톤 (줄바꿈으로 구분)</label>
                <textarea value={newGoal.milestones} onChange={(e) => setNewGoal({ ...newGoal, milestones: e.target.value })} placeholder="첫 번째 단계&#10;두 번째 단계&#10;세 번째 단계" rows={4}
                  className="w-full mt-1 px-3 py-2 rounded-xl outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "13px" }} />
              </div>
              <button onClick={handleAdd}
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none" }}>
                <Check size={16} /> 목표 추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
