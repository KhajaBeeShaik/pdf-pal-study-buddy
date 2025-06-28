import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";

interface QuickSummaryProps {
  summary: any;
  onProceed: () => void;
}

export default function QuickSummary({ summary, onProceed }: QuickSummaryProps) {
  if (!summary) return null;

  // --- derived data ---------------------------------------------------------
  const missingData = useMemo(
    () =>
      summary.columns.map((c: any) => ({
        name: c.name,
        missing: c.missing,
      })),
    [summary]
  );

  const numericStats = useMemo(() => {
    return summary.columns
      .filter((c: any) => summary.numeric_columns.includes(c.name))
      .map((c: any) => ({
        name: c.name,
        min: c.min,
        max: c.max,
        mean: c.mean,
        std: c.std,
        variance: c.std !== undefined ? (c.std as number) ** 2 : undefined,
      }));
  }, [summary]);

  // -------------------------------------------------------------------------
  return (
    <div className="space-y-8">
      {/* Missing Values Section */}
      <section>
        <h4 className="font-semibold text-gray-800 mb-2">Missing Values</h4>
        <div className="w-full h-64 bg-white rounded-md shadow-inner p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={missingData} margin={{ top: 10, right: 20, bottom: 40, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="missing" fill="#26A69A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Column Types Section */}
      <section className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Numeric Columns</h4>
          <ul className="space-y-1">
            {summary.numeric_columns.map((col: string) => (
              <li
                key={col}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-1 mb-1 px-2 py-1 rounded"
              >
                {col}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Categorical Columns</h4>
          <ul className="space-y-1">
            {summary.categorical_columns.map((col: string) => (
              <li
                key={col}
                className="inline-block bg-teal-100 text-teal-800 text-xs font-medium mr-1 mb-1 px-2 py-1 rounded"
              >
                {col}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Numeric Stats Table */}
      <section>
        <h4 className="font-semibold text-gray-800 mb-2">Numeric Statistics</h4>
        <div className="overflow-auto max-h-72 ring-1 ring-gray-200 rounded-md">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 bg-gray-50 border-b text-gray-700">
              <tr>
                <th className="px-3 py-2">Column</th>
                <th className="px-3 py-2">Min</th>
                <th className="px-3 py-2">Max</th>
                <th className="px-3 py-2">Mean</th>
                <th className="px-3 py-2">Std Dev</th>
                <th className="px-3 py-2">Variance</th>
              </tr>
            </thead>
            <tbody>
              {numericStats.map((row) => (
                <tr key={row.name} className="odd:bg-white even:bg-gray-50">
                  <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-3 py-1">{row.min}</td>
                  <td className="px-3 py-1">{row.max}</td>
                  <td className="px-3 py-1">{row.mean}</td>
                  <td className="px-3 py-1">{row.std}</td>
                  <td className="px-3 py-1">{row.variance?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Proceed Button */}
      <div className="text-center pt-2">
        <Button onClick={onProceed} className="bg-[#26A69A] hover:bg-[#00897B]">
          Proceed to Univariate Analysis
        </Button>
      </div>
    </div>
  );
} 