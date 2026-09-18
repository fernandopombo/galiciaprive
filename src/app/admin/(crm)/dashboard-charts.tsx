"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PALETTE = ["#1c1917", "#78716c", "#a8a29e", "#d6d3d1"];

export function BookingsByMonthChart({
  data,
}: {
  data: { month: string; reservas: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
        <XAxis dataKey="month" stroke="#78716c" fontSize={12} tickLine={false} />
        <YAxis stroke="#78716c" fontSize={12} tickLine={false} allowDecimals={false} />
        <Tooltip cursor={{ fill: "#f5f5f4" }} />
        <Bar dataKey="reservas" fill="#1c1917" radius={[4, 4, 0, 0]} maxBarSize={56} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DistributionChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  if (data.length === 0) {
    return (
      <p className="flex h-[260px] items-center justify-center text-sm text-stone-500">
        Sin datos todavía
      </p>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={85}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={PALETTE[index % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-4 space-y-1.5">
        {data.map((entry, index) => (
          <li
            key={entry.name}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2 text-stone-600">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: PALETTE[index % PALETTE.length] }}
              />
              {entry.name}
            </span>
            <span className="text-stone-900">
              {entry.value} ({Math.round((entry.value / total) * 100)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
