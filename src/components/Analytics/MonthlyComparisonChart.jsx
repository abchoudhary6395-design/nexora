import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { monthlyComparisonData } from '../../pages/Analytics/analyticsData';

export default function MonthlyComparisonChart() {
  return (
    <div className="nx-panel nx-analytics-grid--full">
      <div className="nx-panel__header"><h4>Monthly Revenue — Year over Year</h4></div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={monthlyComparisonData} margin={{ left: -16 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--fs-xs)',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 'var(--fs-xs)' }} iconType="circle" iconSize={8} />
          <Line type="monotone" dataKey="thisYear" name="This Year" stroke="var(--nx-indigo-500)" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="lastYear" name="Last Year" stroke="var(--nx-gray-300)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
