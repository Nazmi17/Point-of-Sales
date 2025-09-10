import SummaryCards from "./_components/card_summary";
import IncomeExpenseChart from "./_components/income_grafic";

export const metadata = {
  title: "NZ Putra | Management User",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1>Grafik dan chart</h1>
      <SummaryCards />
      <IncomeExpenseChart />
    </div>
  );
}
