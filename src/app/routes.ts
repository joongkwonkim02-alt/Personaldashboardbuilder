import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { CalendarPage } from "./pages/CalendarPage";
import { BudgetPage } from "./pages/BudgetPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ResearchPage } from "./pages/ResearchPage";
import { GoalsPage } from "./pages/GoalsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "calendar", Component: CalendarPage },
      { path: "budget", Component: BudgetPage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "research", Component: ResearchPage },
      { path: "goals", Component: GoalsPage },
    ],
  },
]);
