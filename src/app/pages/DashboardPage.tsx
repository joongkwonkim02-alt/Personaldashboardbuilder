import { TrendingUp, TrendingDown, Wallet, Target, CalendarDays, ArrowUpRight, ArrowDownRight, Activity, Star } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router";

const weeklySpending = [
  { day: "월", amount: 45000 },
  { day: "화", amount: 23000 },
  { day: "수", amount: 78000 },
  { day: "목", amount: 34000 },
  { day: "금", amount: 92000 },
  { day: "토", amount: 156000 },
  { day: "일", amount: 67000 },
];

const portfolioTrend = [
  { month: "10월", value: 12000000 },
  { month: "11월", value: 13200000 },
  { month: "12월", value: 12800000 },
  { month: "1월", value: 14500000 },
  { month: "2월", value: 15800000 },
  { month: "3월", value: 17200000 },
];

const assetAllocation = [
  { name: "국내주식", value: 35, color: "#818cf8" },
  { name: "해외주식", value: 30, color: "#34d399" },
  { name: "ETF", value: 20, color: "#f59e0b" },
  { name: "현금", value: 15, color: "#6b7280" },
];

const upcomingEvents = [
  { date: "3월 8일", title: "월세 납부", type: "expense", amount: "650,000원" },
  { date: "3월 10일", title: "급여일", type: "income", amount: "+3,800,000원" },
  { date: "3월 15일", title: "정기 저축 이체", type: "expense", amount: "500,000원" },
  { date: "3월 20일", title: "Netflix 결제", type: "expense", amount: "17,000원" },
];

const goals = [
  { title: "비상금 1,000만원", current: 7200000, target: 10000000, color: "#818cf8" },
  { title: "해외여행 자금", current: 1500000, target: 3000000, color: "#34d399" },
  { title: "투자 포트폴리오 2억", current: 17200000, target: 200000000, color: "#f59e0b" },
];

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  trend,
  trendValue,
  accentColor,
  onClick,
}: {
  title: string;
  value: string;
  sub: string;
  icon: any;
  trend?: "up" | "down";
  trendValue?: string;
  accentColor: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="rounded-xl flex items-center justify-center"
          style={{ width: "40px", height: "40px", background: `${accentColor}20` }}
        >
          <Icon size={18} style={{ color: accentColor }} />
        </div>
        {trend && (
          <div
            className="flex items-center gap-1 rounded-full px-2 py-1"
            style={{
              background: trend === "up" ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
              color: trend === "up" ? "#34d399" : "#f87171",
              fontSize: "11px",
            }}
          >
            {trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <div style={{ color: "#6b6b8a", fontSize: "12px", marginBottom: "4px" }}>{title}</div>
        <div style={{ color: "#fff", fontSize: "20px", fontWeight: 700 }}>{value}</div>
        <div style={{ color: "#6b6b8a", fontSize: "12px", marginTop: "2px" }}>{sub}</div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
          border: "1px solid rgba(99,102,241,0.3)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(ellipse at 80% 50%, rgba(99,102,241,0.6), transparent 60%)",
          }}
        />
        <div className="relative">
          <div style={{ color: "#a5b4fc", fontSize: "13px", marginBottom: "6px" }}>
            🌟 안녕하세요! 오늘도 나만의 세상에 오신 것을 환영합니다
          </div>
          <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>
            3월의 재무 현황이 좋습니다 📈
          </h2>
          <p style={{ color: "#a5b4fc", fontSize: "13px" }}>
            이번 달 목표 대비 저축률 78% 달성 · 투자 수익률 +12.3% · 3개 인생 목표 진행 중
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <StatCard
          title="이번 달 총 수입"
          value="4,250,000원"
          sub="+350,000 전월 대비"
          icon={Wallet}
          trend="up"
          trendValue="+8.9%"
          accentColor="#34d399"
          onClick={() => navigate("/budget")}
        />
        <StatCard
          title="이번 달 총 지출"
          value="2,180,000원"
          sub="예산의 72.6% 사용"
          icon={TrendingDown}
          trend="down"
          trendValue="-3.2%"
          accentColor="#f87171"
          onClick={() => navigate("/budget")}
        />
        <StatCard
          title="투자 포트폴리오"
          value="17,200,000원"
          sub="+2,700,000 수익"
          icon={TrendingUp}
          trend="up"
          trendValue="+18.6%"
          accentColor="#818cf8"
          onClick={() => navigate("/portfolio")}
        />
        <StatCard
          title="이번 달 저축"
          value="1,500,000원"
          sub="목표 2,000,000원"
          icon={Star}
          trend="up"
          trendValue="75%"
          accentColor="#f59e0b"
          onClick={() => navigate("/goals")}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
        {/* Portfolio Trend */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>투자 포트폴리오 추이</h3>
              <p style={{ color: "#6b6b8a", fontSize: "12px" }}>최근 6개월</p>
            </div>
            <div
              className="flex items-center gap-1 rounded-full px-3 py-1"
              style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", fontSize: "12px" }}
            >
              <ArrowUpRight size={12} />
              +43.3%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={portfolioTrend}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b6b8a", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#1a1a2e",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(v: number) => [`${(v / 10000).toFixed(0)}만원`, "평가금액"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#818cf8"
                strokeWidth={2}
                fill="url(#portfolioGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Allocation */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="mb-4">
            <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>자산 배분</h3>
            <p style={{ color: "#6b6b8a", fontSize: "12px" }}>현재 포트폴리오</p>
          </div>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={assetAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {assetAllocation.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{ width: "8px", height: "8px", background: item.color }}
                  />
                  <span style={{ color: "#9ca3af", fontSize: "12px" }}>{item.name}</span>
                </div>
                <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Upcoming Events */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>다가오는 일정</h3>
              <p style={{ color: "#6b6b8a", fontSize: "12px" }}>3월 예정 항목</p>
            </div>
            <CalendarDays size={16} style={{ color: "#6b6b8a" }} />
          </div>
          <div className="flex flex-col gap-3">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                    background:
                      event.type === "income"
                        ? "rgba(52,211,153,0.1)"
                        : "rgba(248,113,113,0.1)",
                  }}
                >
                  {event.type === "income" ? (
                    <ArrowUpRight size={14} style={{ color: "#34d399" }} />
                  ) : (
                    <ArrowDownRight size={14} style={{ color: "#f87171" }} />
                  )}
                </div>
                <div className="flex-1">
                  <div style={{ color: "#e8e8f0", fontSize: "13px", fontWeight: 500 }}>{event.title}</div>
                  <div style={{ color: "#6b6b8a", fontSize: "11px" }}>{event.date}</div>
                </div>
                <div
                  style={{
                    color: event.type === "income" ? "#34d399" : "#f87171",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {event.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>인생 목표 진행</h3>
              <p style={{ color: "#6b6b8a", fontSize: "12px" }}>주요 목표 현황</p>
            </div>
            <Target size={16} style={{ color: "#6b6b8a" }} />
          </div>
          <div className="flex flex-col gap-4">
            {goals.map((goal, i) => {
              const pct = Math.round((goal.current / goal.target) * 100);
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: "#e8e8f0", fontSize: "13px" }}>{goal.title}</span>
                    <span style={{ color: goal.color, fontSize: "12px", fontWeight: 600 }}>{pct}%</span>
                  </div>
                  <div
                    className="rounded-full overflow-hidden"
                    style={{ height: "6px", background: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="rounded-full h-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: goal.color }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span style={{ color: "#6b6b8a", fontSize: "11px" }}>
                      {(goal.current / 10000).toFixed(0)}만원
                    </span>
                    <span style={{ color: "#6b6b8a", fontSize: "11px" }}>
                      {(goal.target / 10000).toFixed(0)}만원
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weekly Spending */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>이번 주 지출</h3>
            <p style={{ color: "#6b6b8a", fontSize: "12px" }}>일별 지출 현황</p>
          </div>
          <div style={{ color: "#f87171", fontSize: "14px", fontWeight: 600 }}>
            총 495,000원
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          {weeklySpending.map((item, i) => {
            const max = Math.max(...weeklySpending.map((d) => d.amount));
            const pct = (item.amount / max) * 100;
            return (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div style={{ color: "#6b6b8a", fontSize: "11px" }}>
                  {(item.amount / 1000).toFixed(0)}K
                </div>
                <div
                  className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{
                    height: `${(pct / 100) * 80}px`,
                    minHeight: "4px",
                    background:
                      i === 4 || i === 5
                        ? "linear-gradient(180deg, #f87171, #ef4444)"
                        : "linear-gradient(180deg, #818cf8, #6366f1)",
                  }}
                />
                <div style={{ color: "#6b6b8a", fontSize: "11px" }}>{item.day}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
