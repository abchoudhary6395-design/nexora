import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { topSalespeopleData } from '../../pages/Analytics/analyticsData';

export default function TopSalespeopleChart() {
  return (
    <div className="nx-panel">
      <div className="nx-panel__header"><h4>Top Salespeople</h4></div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={topSalespeopleData} margin={{ left: -16 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip
            cursor={{ fill: 'var(--color-surface-alt)' }}
            contentStyle={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--fs-xs)',
            }}
          />
          <Bar dataKey="revenue" fill="var(--nx-amber-500)" radius={[6, 6, 0, 0]} barSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
