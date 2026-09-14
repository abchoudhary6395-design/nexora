import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { funnelData } from '../../pages/Analytics/analyticsData';

export default function ConversionFunnelChart() {
  const max = funnelData[0].count;

  return (
    <div className="nx-panel">
      <div className="nx-panel__header"><h4>Sales Funnel</h4></div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={funnelData} layout="vertical" margin={{ left: 8, right: 24 }}>
          <CartesianGrid horizontal={false} stroke="var(--color-border)" />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="stage"
            axisLine={false}
            tickLine={false}
            width={90}
            tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
          />
          <Tooltip
            cursor={{ fill: 'var(--color-surface-alt)' }}
            contentStyle={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--fs-xs)',
            }}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={22}>
            {funnelData.map((entry) => (
              <Cell
                key={entry.stage}
                fill="var(--nx-indigo-500)"
                fillOpacity={0.35 + 0.65 * (entry.count / max)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
