"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ScoreChart({ scores }: { scores: any[] }) {
  const chartData = scores
    .slice()
    .reverse()
    .map((item, index) => ({
      name: `Round ${index + 1}`,
      score: item.score,
    }));

  return (
    <div className="h-80 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Score Progress</h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}