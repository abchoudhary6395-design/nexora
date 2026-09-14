import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const data = [
  { month: 'Feb', revenue: 42000 },
  { month: 'Mar', revenue: 48500 },
  { month: 'Apr', revenue: 45200 },
  { month: 'May', revenue: 56800 },
  { month: 'Jun', revenue: 61200 },
  { month: 'Jul', revenue: 58900 },
  { month: 'Aug', revenue: 68400 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="nx-panel" style={{ padding: 'var(--space-3)', boxShadow: 'var(--shadow-md)' }}>
      <div className="nx-eyebrow">{label}</div>
      <div className="nx-numeric" style={{ fontSize: 'var(--fs-md)', fontWeight: 600 }}>
        ${payload[0].value.toLocaleString()}
      </div>
    </div>
  );
}

export default function RevenueChart() {
  return (
    <div className="nx-panel">
      <div className="nx-panel__header">
        <div>
          <h4>Revenue</h4>
          <span className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Last 7 months</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="nxRevenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--nx-indigo-500)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--nx-indigo-500)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--nx-indigo-500)"
            strokeWidth={2}
            fill="url(#nxRevenueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
