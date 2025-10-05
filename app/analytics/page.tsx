import AnalyticsDashboard from "../../components/analytics-dashboard"
import Header from "../../components/header"
import AuthGuard from "../../components/auth-guard"

export default function AnalyticsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <AnalyticsDashboard />
      </div>
    </AuthGuard>
  )
}
